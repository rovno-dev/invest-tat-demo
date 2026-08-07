from sqlalchemy import or_
from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user.response import UserCreateResponse
from app.shared.auth import hash_password


def create_user(
    db: Session,
    **kwargs
) -> UserCreateResponse:
    phone = kwargs.get("phone")
    email = kwargs.get("email")
    password = kwargs.get("password")

    if not any([phone, email]):
        raise ValueError("Either email or phone is required")

    errors = {}

    if phone:
        existing_phone_user = db.query(User).filter(User.phone == phone).first()
        if existing_phone_user:
            errors["phone"] = "User with this phone already exists"

    if email:
        existing_email_user = db.query(User).filter(User.email == email).first()
        if existing_email_user:
            errors["email"] = "User with this email already exists"

    if errors:

        return UserCreateResponse(
            created=False,
            errors=errors,
            user=None
        )

    if password:
        kwargs["password"] = hash_password(password)

    new_user = User(**kwargs)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return UserCreateResponse(
        created=True,
        errors=None,
        user=new_user
    )