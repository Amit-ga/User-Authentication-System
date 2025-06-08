import re
from email_validator import validate_email, EmailNotValidError


def is_valid_password(password):
    """ Valid password must have:
    at least 8 characters long
    1 uppercase
    1 numeric
    1 special character
    """
    if len(password) < 8:
        return { False: "Password must be at least 8 characters long" }
    if not re.search(r"[A-Z]", password):
        return { False: "Password must contain at least one uppercase letter" }
    if not re.search(r"\d", password):
        return { False: "Password must contain at least one digit" }
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        return { False: "Password must contain at least one special character" }
    return { True : "All password requirements are met" }

def is_valid_email(email):
    try:
        valid = validate_email(email)
        return { True: "Valid email" }
    except EmailNotValidError as e:
        return { False: str(e) }
