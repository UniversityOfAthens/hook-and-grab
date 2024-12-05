# Programma gia testing olwn twn APIs
# Paizei na mh douleuei swsta.

import requests

class APIClient:
    def __init__(self, base_url):
        self.base_url = base_url
        self.session = requests.Session()  # Session gia na menoun ta cookies

    # Authentication APIs
    def register(self, username, password, email, firstName, lastName, dateOfBirth, phone=None):
        url = f"{self.base_url}/auth/register"
        payload = {
            "username": username,
            "password": password,
            "email": email,
            "firstName": firstName,
            "lastName": lastName,
            "dateOfBirth": dateOfBirth,
            "phone": phone
        }
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

    # User APIs
    def get_current_user(self):
        url = f"{self.base_url}/users/me"
        response = self.session.get(url)
        return self._handle_response(response)

    def delete_account(self):
        url = f"{self.base_url}/users/delete"
        response = self.session.delete(url)
        return self._handle_response(response)

    def update_profile_picture(self, image_path):
        url = f"{self.base_url}/users/profile-picture"
        files = {'profilePicture': open(image_path, 'rb')}
        response = self.session.post(url, files=files)
        return self._handle_response(response)

    def search_users(self, keyword):
        url = f"{self.base_url}/users/search"
        params = {'keyword': keyword}
        response = self.session.get(url, params=params)
        return self._handle_response(response)

    # Product APIs
    def get_all_products(self):
        url = f"{self.base_url}/products/"
        response = self.session.get(url)
        return self._handle_response(response)

    def get_product_by_id(self, product_id):
        url = f"{self.base_url}/products/{product_id}"
        response = self.session.get(url)
        return self._handle_response(response)

    def create_product(self, title, description, price, isFree, isOpenToTrade, image_paths):
        url = f"{self.base_url}/products/"
        data = {
            'title': title,
            'description': description,
            'price': price,
            'isFree': isFree,
            'isOpenToTrade': isOpenToTrade
        }
        files = [('images', open(image_path, 'rb')) for image_path in image_paths]
        response = self.session.post(url, data=data, files=files)
        return self._handle_response(response)

    def delete_product(self, product_id):
        url = f"{self.base_url}/products/{product_id}"
        response = self.session.delete(url)
        return self._handle_response(response)

    def search_products(self, keyword=None, minPrice=None, maxPrice=None, isFree=None, isOpenToTrade=None):
        url = f"{self.base_url}/products/search"
        params = {}
        if keyword:
            params['keyword'] = keyword
        if minPrice is not None:
            params['minPrice'] = minPrice
        if maxPrice is not None:
            params['maxPrice'] = maxPrice
        if isFree is not None:
            params['isFree'] = str(isFree).lower()
        if isOpenToTrade is not None:
            params['isOpenToTrade'] = str(isOpenToTrade).lower()
        response = self.session.get(url, params=params)
        return self._handle_response(response)

    # Boat APIs
    def get_all_boats(self):
        url = f"{self.base_url}/boats/"
        response = self.session.get(url)
        return self._handle_response(response)

    def get_boat_by_id(self, boat_id):
        url = f"{self.base_url}/boats/{boat_id}"
        response = self.session.get(url)
        return self._handle_response(response)

    def create_boat(self, title, description, pricePerDay, location, image_paths):
        url = f"{self.base_url}/boats/"
        data = {
            'title': title,
            'description': description,
            'pricePerDay': pricePerDay,
            'location': location
        }
        files = [('images', open(image_path, 'rb')) for image_path in image_paths]
        response = self.session.post(url, data=data, files=files)
        return self._handle_response(response)

    def delete_boat(self, boat_id):
        url = f"{self.base_url}/boats/{boat_id}"
        response = self.session.delete(url)
        return self._handle_response(response)

    # Booking APIs
    def create_booking(self, boatId, startDate, endDate):
        url = f"{self.base_url}/bookings/"
        payload = {
            "boatId": boatId,
            "startDate": startDate,
            "endDate": endDate
        }
        response = self.session.post(url, json=payload)
        return self._handle_response(response)

    def get_bookings_for_owner(self):
        url = f"{self.base_url}/bookings/owner"
        response = self.session.get(url)
        return self._handle_response(response)

    def get_bookings_for_renter(self):
        url = f"{self.base_url}/bookings/renter"
        response = self.session.get(url)
        return self._handle_response(response)

    def update_booking_status(self, booking_id, status):
        url = f"{self.base_url}/bookings/{booking_id}/status"
        payload = {"status": status}
        response = self.session.put(url, json=payload)
        return self._handle_response(response)

    # Helper function to handle responses
    def _handle_response(self, response):
        try:
            response.raise_for_status()  # HTTPError gia bad responses (4xx, 5xx)
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
if __name__ == "__main__":
    base_url = "http://localhost:3482"
    client = APIClient(base_url)

    # Register a new user
    print("Registering new user:")
    print(client.register(
        username="testuser",
        password="password123",
        email="testuser@example.com",
        firstName="Test",
        lastName="User",
        dateOfBirth="1990-01-01"
    ))

    # Login
    print("\nLogging in:")
    print(client.login("testuser", "password123"))

    # Update profile picture
    print("\nUpdating profile picture:")
    # Replace 'path_to_profile_picture.jpg' with the actual file path
    print(client.update_profile_picture(r"D:\New D\Random Stuff\Stuff\20241202_093210.jpg"))

    # Get current user info
    print("\nFetching current user details:")
    print(client.get_current_user())

    # Search users
    print("\nSearching users:")
    print(client.search_users(keyword="test"))

    # Create a product
    print("\nCreating a new product:")
    # Replace 'path_to_product_image.jpg' with actual file paths
    product_response = client.create_product(
        title="Test Product",
        description="This is a test product.",
        price=99.99,
        isFree=False,
        isOpenToTrade=True,
        image_paths=[r"D:\New D\Random Stuff\Stuff\31115036749040078194969897754165248.jpeg", r"D:\New D\Random Stuff\Stuff\419741099_952619539765178_8351807119986232768_n.jpg"]
    )
    print(product_response)
    product_id = None
    if product_response['success']:
        product_id = product_response['data']['product']['id']

    # Get all products
    print("\nGetting all products:")
    print(client.get_all_products())

    # Get product by ID
    if product_id:
        print(f"\nGetting product by ID ({product_id}):")
        print(client.get_product_by_id(product_id))

    # Search products
    print("\nSearching products:")
    print(client.search_products(keyword="Test", minPrice=50, maxPrice=150, isOpenToTrade=True))

    # Delete product
    if product_id:
        print(f"\nDeleting product with ID ({product_id}):")
        print(client.delete_product(product_id))

    # Create a boat listing
    print("\nCreating a new boat listing:")
    # Replace 'path_to_boat_image.jpg' with actual file paths
    boat_response = client.create_boat(
        title="Test Boat",
        description="This is a test boat.",
        pricePerDay=250.00,
        location="Test Harbor",
        image_paths=[r"D:\New D\Random Stuff\Stuff\31154976496912663230996481396703232.jpeg", r"D:\New D\Random Stuff\Stuff\2022-08-26_20.53.28.png"]
    )
    print(boat_response)
    boat_id = None
    if boat_response['success']:
        boat_id = boat_response['data']['boat']['id']

    # Get all boats
    print("\nGetting all boats:")
    print(client.get_all_boats())

    # Get boat by ID
    if boat_id:
        print(f"\nGetting boat by ID ({boat_id}):")
        print(client.get_boat_by_id(boat_id))

    # Create a booking request
    if boat_id:
        print("\nCreating a booking request:")
        booking_response = client.create_booking(
            boatId=boat_id,
            startDate="2023-11-01",
            endDate="2023-11-05"
        )
        print(booking_response)
        booking_id = None
        if booking_response['success']:
            booking_id = booking_response['data']['booking']['id']

        # Get bookings for owner
        print("\nGetting bookings for owner:")
        print(client.get_bookings_for_owner())

        # Get bookings for renter
        print("\nGetting bookings for renter:")
        print(client.get_bookings_for_renter())

        # Update booking status
        if booking_id:
            print(f"\nUpdating booking status for booking ID ({booking_id}):")
            print(client.update_booking_status(
                booking_id=booking_id,
                status="approved"
            ))

    # Delete boat
    if boat_id:
        print(f"\nDeleting boat with ID ({boat_id}):")
        print(client.delete_boat(boat_id))

    # Delete account
    print("\nDeleting account:")
    print(client.delete_account())

    # Logout
    print("\nLogging out:")
    print(client.logout())
