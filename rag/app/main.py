"""
RAG microservice
"""

from fastapi import FastAPI
from app.routers.model_a_router import router as model_a_router

app = FastAPI()

app.include_router(model_a_router)
# app.include_router(model_b_router)

@app.get('/')
def root():
    return {'message': 'Welcome to the ML Model Training API'}
