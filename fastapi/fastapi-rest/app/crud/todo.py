from sqlalchemy.orm import Session
from app.models.todo import Todo as TodoModel
from app.schemas.todo import TodoCreate


def get_todo(db: Session, todo_id: int):
    return db.query(TodoModel).filter(TodoModel.id == todo_id).first()


def create_todo(db: Session, todo: TodoCreate, owner_id: int):
    db_todo = TodoModel(**todo.dict(), owner_id=owner_id)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo
