"""
Model B routers
"""

from fastapi import APIRouter
from app.models.model_b import ModelB

router = APIRouter()
model_b = ModelB()

@router.post('/model_b/train')
def train_model_a():
    """
    Train model B
    """
    return model_b.train()

@router.post('/model_b/predict')
def predict_model_a():
    """
    Predict result with model B
    """
    return model_b.predict()
