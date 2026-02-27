import torch
import torch.nn.functional as F
from .resnet import load_model
from utils.preprocess import preprocess_image
from utils.config import CLASS_NAMES

class Predictor:
    def __init__(self, model_path: str, device: str = "cpu"):
        self.device = device
        self.model = load_model(model_path, device)
        
    def predict(self, img_bytes: bytes) -> dict:
        # Preprocesar
        img_tensor = preprocess_image(img_bytes).to(self.device)
        
        # Inferencia
        with torch.no_grad():
            output = self.model(img_tensor)
            probs = F.softmax(output, dim=1)
            confidence, predicted = torch.max(probs, 1)
        
        # Parsear resultados
        predicted_class = CLASS_NAMES[predicted.item()]
        confidence_value = confidence.item()
        
        # Top 3
        top_probs, top_classes = torch.topk(probs, 3)
        top_3 = [
            {
                "class": CLASS_NAMES[idx.item()],
                "probability": round(prob.item(), 4)
            }
            for idx, prob in zip(top_classes[0], top_probs[0])
        ]
        
        # Determinar si está saludable
        is_healthy = "healthy" in predicted_class.lower()
        
        return {
            "success": True,
            "data": {
                "predicted_class": predicted_class,
                "confidence": round(confidence_value, 4),
                "is_healthy": is_healthy,
                "top_3": top_3,
                "model_version": "resnet-custom-v1"
            }
        }