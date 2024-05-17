from sqlalchemy.orm import Session
from app.models import Log
from app.schemas.log import LogCreate

def get_log(db: Session, log_id: int):
    return db.query(Log).filter(Log.id == log_id).first()

def create_log(db: Session, log: LogCreate):
    db_log = Log(**log.dict())
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return db_log

