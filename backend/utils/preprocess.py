import cv2
import numpy as np
import torch
from .config import MEAN, STD, IMAGE_SIZE

def preprocess_image(img_bytes: bytes) -> torch.Tensor:
    """
    Preprocesamiento:
    - Resize a 256x256
    - Normalización con mean/std del dataset
    - Convertir a tensor CHW
    """
    nparr = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    
    img_resized = cv2.resize(img, (IMAGE_SIZE, IMAGE_SIZE))
    
    img_norm = img_resized.astype(np.float32) / 255.0
    mean = np.array(MEAN, dtype=np.float32)
    std = np.array(STD, dtype=np.float32)
    img_norm = (img_norm - mean) / std
    
    img_tensor = torch.from_numpy(img_norm).permute(2, 0, 1).unsqueeze(0).float()
    
    return img_tensor