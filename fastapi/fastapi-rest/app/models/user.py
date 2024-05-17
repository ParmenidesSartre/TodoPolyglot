from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.db.base import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    google_id = Column(String, unique=True, nullable=True)
    facebook_id = Column(String, unique=True, nullable=True)

    todos = relationship("Todo", back_populates="owner", cascade="all, delete-orphan")
    logs = relationship("Log", back_populates="user", cascade="all, delete-orphan")
