# Programma gia testing twn authentication APIs

import requests

class APIClient:
    def __init__(self, base_url):
        self.base_url = base_url
        self.session = requests.Session()  # Session gia na menoun ta cookies
    
    def register(self, username, password):
        url = f"{self.base_url}/auth/register"
        payload = {"username": username, "password": password}
        response = self.session.post(url, json=payload)
        return self._handle_response(response)
    
    def login(self, username, password):
        url = f"{self.base_url}/auth/login"
        payload = {"username": username, "password": password}
        response = self.session.post(url, json=payload)
        return self._handle_response(response)
    
    def logout(self):
        url = f"{self.base_url}/auth/logout"
        response = self.session.post(url)
        return self._handle_response(response)
    
    def get_current_user(self):
        url = f"{self.base_url}/users/me"
        response = self.session.get(url)
        return self._handle_response(response)
    
    def delete_account(self):
        url = f"{self.base_url}/users/delete"
        response = self.session.delete(url)
        return self._handle_response(response)
    
    def _handle_response(self, response):
        try:
            response.raise_for_status() # HTTPError gia bad responses (4xx, 5xx)
            return {
                "success": True,
                "status_code": response.status_code,
                "data": response.json()
            }
        except requests.exceptions.HTTPError as e:
            return {
                "success": False,
                "status_code": response.status_code,
                "error": str(e),
                "details": response.json() if response.headers.get("Content-Type") == "application/json" else response.text
            }
        except Exception as e:
            return {
                "success": False,
                "status_code": None,
                "error": str(e)
            }

# Main programma
base_url = "http://localhost:3482"
client = APIClient(base_url)

# Register
print("Registering new user:")
print(client.register("testuser", "password123"))

# Login
print("\nLogging in:")
print(client.login("testuser", "password123"))

# Current user info
print("\nFetching current user details:")
print(client.get_current_user())

# Delete account (has to be logged in)
print("\nDeleting account:")
print(client.delete_account())

# Logout
print("\nLogging out:")
print(client.logout())
