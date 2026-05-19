export const API_URL = "http://127.0.0.1:8000";

export async function getHotels() {
  const res = await fetch(`${API_URL}/hotels`);
  return res.json();
}

export async function getHotel(id) {
  const res = await fetch(`${API_URL}/hotels/${id}`);
  return res.json();
}

export async function getRoomsByHotel(hotelId) {
  const res = await fetch(`${API_URL}/hotels/${hotelId}/rooms`);
  return res.json();
}

export async function getUsers() {
  const res = await fetch(`${API_URL}/users`);
  return res.json();
}

export async function getBookings() {
  const res = await fetch(`${API_URL}/bookings`);
  return res.json();
}

export async function createBooking(bookingData) {
  const res = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });

  return res.json();
}

export async function createUser(userData) {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return res.json();
}