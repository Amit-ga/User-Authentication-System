registration_cases = [
    ({"email": "user1@gmail.com", "password": "Password123!", "confirmPassword": "Password123!"}, 200, ["message"]),
    ({"email": "user2@example.com", "password": "Password!", "confirmPassword": "Password!"}, 400, ["error"]),
    ({"email": "", "password": "", "confirmPassword": ""}, 400, ["error"]),
    ({"email": "user3@example.com", "password": "short", "confirmPassword": "short"}, 400, ["error"]),
    ({"email": "user4@example.com", "password": "Password123", "confirmPassword": "Password123"}, 400, ["error"]),
    ({"email": "user5@example.com", "password": "password123!", "confirmPassword": "password123"}, 400, ["error"]),

]

login_cases = [
    ({"email": "user1@gmail.com", "password": "Password123!"}, 200, ["token"]),
    ({"email": "user1@gmail.com", "password": "WrongPassword"}, 400, ["error"]),
    ({"email": "nonexistent@gmail.com", "password": "Password123!"}, 400, ["error"]),
    ({"email": "", "password": ""}, 400, ["error"]),
]