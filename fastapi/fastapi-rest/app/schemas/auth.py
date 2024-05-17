from pydantic import BaseModel, Field


class OAuth2EmailRequestForm(BaseModel):
    email: str = Field(..., description="The email address of the user")
    password: str = Field(..., description="The password of the user")
