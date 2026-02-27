from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import torch
import logging
from model.predictor import Predictor
from utils.config import NUM_CLASSES

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Qhanawi API",
    description="Backend para detección de enfermedades en cultivos",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
logger.info(f"Usando dispositivo: {device}")

try:
    predictor = Predictor(
        model_path="./model/model_deteccion_enfermedades_plantas.pt",
        device=device
    )
    logger.info("Modelo cargado exitosamente")
except Exception as e:
    logger.error(f"Error cargando modelo: {e}")
    raise

@app.get("/")
async def root():
    return {"message": "Backend activo"}

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "device": str(device),
        "model_classes": NUM_CLASSES
    }

@app.post("/api/predict")
async def predict(file: UploadFile = File(...)):
    """
    Endpoint principal: recibe imagen y devuelve predicción
    """
    try:
        if not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="El archivo debe ser una imagen")
        
        img_bytes = await file.read()
        
        result = predictor.predict(img_bytes)
        
        return JSONResponse(content=result)
        
    except Exception as e:
        logger.error(f"Error en predicción: {e}")
        raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")

@app.post("/api/predict/batch")
async def predict_batch(files: list[UploadFile] = File(...)):
    """
    Endpoint opcional: predicción múltiple
    """
    results = []
    for file in files:
        img_bytes = await file.read()
        result = predictor.predict(img_bytes)
        results.append(result)
    
    return {"results": results}