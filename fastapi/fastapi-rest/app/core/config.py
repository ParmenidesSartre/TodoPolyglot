from pydantic_settings import BaseSettings
import os


class Settings(BaseSettings):
    SQLALCHEMY_DATABASE_URL: str = "sqlite:///./test.db"
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    ALGORITHM: str = "HS256"

    class Config:
        env_file = ".env"


settings = Settings()
