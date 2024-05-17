from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import enum

class LogLevelEnum(str, enum.Enum):
    info = "info"
    warn = "warn"
    error = "error"
    debug = "debug"

class LogBase(BaseModel):
    level: LogLevelEnum
    message: str
    timestamp: datetime = datetime.utcnow()
    meta: Optional[str] = None

class LogCreate(LogBase):
    pass

class Log(LogBase):
    id: int
    user_id: Optional[int] = None

    class Config:
        from_attributes = True
