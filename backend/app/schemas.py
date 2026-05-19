from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class LeadCreate(BaseModel):
    name: str
    email: str
    company: Optional[str] = None
    message: str

class LeadResponse(BaseModel):
    id: int
    name: str
    email: str
    company: Optional[str]
    message: str
    created_at: datetime

    class Config:
        from_attributes = True

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    history: List[ChatMessage]
    message: str