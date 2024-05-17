from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional
import re


class UserBase(BaseModel):
    name: str = Field(..., strip_whitespace=True, min_length=1)
    email: EmailStr


class UserCreate(UserBase):
    password: str = Field(..., strip_whitespace=True, min_length=8)

    @validator('password')
    def password_complexity(cls, value):
        if not re.match(r'^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$', value):
            raise ValueError(
                'Password must contain at least one uppercase letter, one lowercase letter, and one digit.')
        return value


class UserUpdate(BaseModel):
    name: Optional[str] = Field(None, strip_whitespace=True, min_length=1)
    email: Optional[EmailStr]
    password: Optional[str] = Field(None, strip_whitespace=True, min_length=8)

    @validator('password')
    def password_complexity(cls, value):
        if value and not re.match(r'^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$', value):
            raise ValueError(
                'Password must contain at least one uppercase letter, one lowercase letter, and one digit.')
        return value


class User(UserBase):
    id: int

    class Config:
        from_attributes = True
