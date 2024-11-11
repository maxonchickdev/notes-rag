"""
Model A routers
"""

from fastapi import APIRouter
from app.models.model_a import ModelA

router = APIRouter()
model_a = ModelA()

@router.post('/model_a/train')
def train_model_a():
    """
    Train model A
    """
    return model_a.train()

@router.post('/model_a/predict')
def predict_model_a():
    """
    Predict result with model A
    """
    return model_a.predict()
