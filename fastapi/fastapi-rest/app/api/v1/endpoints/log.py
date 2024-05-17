from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.log import Log, LogCreate
from app.crud import log as crud_log
from app.api.deps import get_db

router = APIRouter()

@router.post("/", response_model=Log)
def create_log(log: LogCreate, db: Session = Depends(get_db)):
    return crud_log.create_log(db=db, log=log)

@router.get("/{log_id}", response_model=Log)
def read_log(log_id: int, db: Session = Depends(get_db)):
    db_log = crud_log.get_log(db, log_id=log_id)
    if db_log is None:
        raise HTTPException(status_code=404, detail="Log not found")
    return db_log
