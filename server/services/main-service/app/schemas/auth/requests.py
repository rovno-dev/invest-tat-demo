from pydantic import BaseModel, EmailStr, Field, field_validator
from pydantic_extra_types.phone_numbers import PhoneNumber

class EmailLoginRequest(BaseModel):
    email: str  # We'll validate with a custom regex

    @field_validator('email')
    @classmethod
    def validate_email(cls, v: str) -> str:
        import re
        # Simple email regex that allows .test, .local, etc.
        if not re.match(r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$', v):
            raise ValueError('Invalid email address')
        return v

class EmailConfirmRequest(BaseModel):
    code: str

class SmsLoginRequest(BaseModel):
    phone: PhoneNumber = Field(description="Номер телефона")

class SmsConfirmRequest(BaseModel):
    code: str

class RegisterViaPhoneRequest(BaseModel):
    phone: PhoneNumber = Field(description="Номер телефона")
    password: str = Field(min_length=8, description="Минимум 8 символов")

    @field_validator('password')
    @classmethod
    def check_password_strength(cls, v):
        return v

class RegisterViaEmailRequest(BaseModel):
    email: str  # Use same custom validation
    password: str

    @field_validator('email')
    @classmethod
    def validate_email(cls, v: str) -> str:
        import re
        if not re.match(r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$', v):
            raise ValueError('Invalid email address')
        return v
