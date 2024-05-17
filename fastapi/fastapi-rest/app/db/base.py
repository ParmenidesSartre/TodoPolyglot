from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

from app.models.user import User
from app.models.todo import Todo
from app.models.log import Log
