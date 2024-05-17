from fastapi import FastAPI
from app.db.session import engine
from app.db.base import Base
from fastapi.security import OAuth2PasswordBearer
from app.api.v1.endpoints import user, todo, log, auth

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="My Todo API",
    description="This API allows users to manage their todo items. Users can create, read, update, and delete todo items. Each todo item is associated with a user.",
    version="1.0.0",
    contact={
        "name": "API Support",
        "url": "http://www.example.com/support",
        "email": "support@example.com",
    },
    license_info={
        "name": "Apache 2.0",
        "url": "http://www.apache.org/licenses/LICENSE-2.0.html",
    },
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/token")

app.include_router(user.router, prefix="/api/v1/users", tags=["Users"])
app.include_router(todo.router, prefix="/api/v1/todos", tags=["todos"])
app.include_router(log.router, prefix="/api/v1/logs", tags=["logs"])
app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
