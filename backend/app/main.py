from fastapi import FastAPI, Depends, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

from . import models, schemas, database
from .ai_service import generate_chat_response
from .email_service import send_lead_notification

# Create DB tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Codenixia Nexus Automation Solutions API")

# Configure CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with exact frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/chat")
async def chat_endpoint(req: schemas.ChatRequest):
    response_text = generate_chat_response(req.history, req.message)
    return {"reply": response_text}

@app.post("/api/leads", response_model=schemas.LeadResponse)
async def create_lead(
    lead: schemas.LeadCreate, 
    background_tasks: BackgroundTasks, 
    db: Session = Depends(database.get_db)
):
    db_lead = models.Lead(**lead.model_dump())
    db.add(db_lead)
    db.commit()
    db.refresh(db_lead)
    
    # Trigger asynchronous email
    background_tasks.add_task(
        send_lead_notification,
        name=lead.name,
        email=lead.email,
        company=lead.company,
        message=lead.message
    )
    
    return db_lead

@app.get("/api/admin/leads", response_model=List[schemas.LeadResponse])
async def get_leads(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    leads = db.query(models.Lead).order_by(models.Lead.created_at.desc()).offset(skip).limit(limit).all()
    return leads