import pytest
from flask import Flask
from flask.testing import FlaskClient
from routes import auth_bp
from .tests_data import registration_cases, login_cases

@pytest.fixture
def app():
    app = Flask(__name__)
    app.config["TESTING"] = True
    app.register_blueprint(auth_bp, url_prefix="/api")
    return app

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.mark.parametrize("payload, expected_status, expected_keys", registration_cases)
def test_register_cases(client: FlaskClient, payload, expected_status, expected_keys):
    response = client.post("/api/register", json=payload)
    assert response.status_code == expected_status
    for key in expected_keys:
        assert key in response.get_json()

@pytest.mark.parametrize("payload, expected_status, expected_keys", login_cases)
def test_login_cases(client: FlaskClient, payload, expected_status, expected_keys):
    if payload["email"] == "user1@example.com" and expected_status == 200:
        client.post("/api/register", json={
            "email": "user1@gmail.com",
            "password": "Password123!",
            "confirmPassword": "Password123!"
        })
    response = client.post("/api/login", json=payload)
    assert response.status_code == expected_status
    for key in expected_keys:
        assert key in response.get_json()