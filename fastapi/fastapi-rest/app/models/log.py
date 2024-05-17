from sqlalchemy import Column, Integer, String, DateTime, Enum, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base
import enum
from datetime import datetime

class LogLevelEnum(str, enum.Enum):
    info = "info"
    warn = "warn"
    error = "error"
    debug = "debug"

class Log(Base):
    __tablename__ = "logs"

    id = Column(Integer, primary_key=True, index=True)
    level = Column(Enum(LogLevelEnum), nullable=False, default=LogLevelEnum.info)
    message = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    meta = Column(String)  # Store meta as a JSON string

    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    user = relationship("User", back_populates="logs")
