from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.todo import Todo, TodoCreate
from app.crud import todo as crud_todo
from app.api.deps import get_db, get_current_user
from app.models.user import User
from typing import List, Optional

router = APIRouter()


@router.post("/", response_model=Todo, summary="Create a new todo item",
             description="Create a new todo item and associate it with the currently authenticated user.")
def create_todo(
    todo: TodoCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return crud_todo.create_todo(db=db, todo=todo, owner_id=current_user.id)


@router.get("/{todo_id}", response_model=Todo)
def read_todo(todo_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_todo = crud_todo.get_todo(db, todo_id=todo_id)
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return db_todo


@router.get("/", response_model=List[Todo], summary="Get todos with search and filter")
def get_todos(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    title: Optional[str] = None,
    description: Optional[str] = None,
    tags: Optional[str] = None,
    completed: Optional[bool] = None,
    priority: Optional[str] = None,
    due_date: Optional[str] = None
):
    return crud_todo.get_todos(
        db,
        owner_id=current_user.id,
        title=title,
        description=description,
        tags=tags,
        completed=completed,
        priority=priority,
        due_date=due_date
    )
