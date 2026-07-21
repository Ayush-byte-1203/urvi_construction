import requests
resp = requests.post("http://127.0.0.1:8000/api/token/", data={"username": "admin", "password": "admin123"})
print(resp.status_code)
print(resp.json())
