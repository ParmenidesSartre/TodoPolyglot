from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import enum

class PriorityEnum(str, enum.Enum):
    low = "Low"
    medium = "Medium"
    high = "High"

class StatusEnum(str, enum.Enum):
    pending = "Pending"
    in_progress = "InProgress"
    completed = "Completed"

class TodoBase(BaseModel):
    title: str
    description: str
    due_date: Optional[datetime] = None
    priority: PriorityEnum = PriorityEnum.medium
    status: StatusEnum = StatusEnum.pending
    tags: Optional[str] = None
    completed: bool = False

class TodoCreate(TodoBase):
    pass

class TodoUpdate(TodoBase):
    pass

class Todo(TodoBase):
    id: int
    owner_id: int

    class Config:
        from_attributes = True
