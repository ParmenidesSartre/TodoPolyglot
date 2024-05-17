from sqlalchemy import Column, Integer, String, DateTime, Boolean, Enum, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base
import enum

class PriorityEnum(str, enum.Enum):
    low = "Low"
    medium = "Medium"
    high = "High"

class StatusEnum(str, enum.Enum):
    pending = "Pending"
    in_progress = "InProgress"
    completed = "Completed"

class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    due_date = Column(DateTime, nullable=True)
    priority = Column(Enum(PriorityEnum), default=PriorityEnum.medium)
    status = Column(Enum(StatusEnum), default=StatusEnum.pending)
    tags = Column(String)
    completed = Column(Boolean, default=False)

    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="todos")
