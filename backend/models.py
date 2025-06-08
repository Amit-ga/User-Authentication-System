"""
This file defines simple reusable data validation models using Pydantic.
These models are used for structured request parsing and input validation.
Note: This project does not use a database, so these are not ORM models.
"""

from pydantic import BaseModel, EmailStr, Field, ValidationError, field_validator
from pydantic_core import PydanticCustomError
import re

class RegisterModel(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)
    confirm_password: str

    @field_validator("password")
    def validate_password_strength(cls, value):
        if not re.search(r"[A-Z]", value):
            raise PydanticCustomError("password_uppercase", "Password must contain at least one uppercase letter")
        if not re.search(r"\d", value):
            raise PydanticCustomError("password_digit", "Password must contain at least one digit")
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", value):
            raise PydanticCustomError("password_special", "Password must contain at least one special character")
        return value

class LoginModel(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    token: str