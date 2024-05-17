from sqlalchemy.orm import Session
from app.models.todo import Todo as TodoModel
from app.schemas.todo import TodoCreate
from typing import List, Optional


def get_todo(db: Session, todo_id: int):
    return db.query(TodoModel).filter(TodoModel.id == todo_id).first()


def create_todo(db: Session, todo: TodoCreate, owner_id: int):
    db_todo = TodoModel(**todo.dict(), owner_id=owner_id)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo


def get_todos(
    db: Session,
    owner_id: int,
    title: Optional[str] = None,
    description: Optional[str] = None,
    tags: Optional[str] = None,
    completed: Optional[bool] = None,
    priority: Optional[str] = None,
    due_date: Optional[str] = None
) -> List[TodoModel]:
    query = db.query(TodoModel).filter(TodoModel.owner_id == owner_id)

    if title:
        query = query.filter(TodoModel.title.ilike(f"%{title}%"))
    if description:
        query = query.filter(TodoModel.description.ilike(f"%{description}%"))
    if tags:
        query = query.filter(TodoModel.tags.ilike(f"%{tags}%"))
    if completed is not None:
        query = query.filter(TodoModel.completed == completed)
    if priority:
        query = query.filter(TodoModel.priority == priority)
    if due_date:
        query = query.filter(TodoModel.due_date == due_date)

    return query.all()
