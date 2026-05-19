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

export async function getAnalyticsSummary() {
  const res = await fetch(`${API_URL}/analytics/summary`);
  return res.json();
}

export async function getBookingsPerHotel() {
  const res = await fetch(`${API_URL}/analytics/bookings-per-hotel`);
  return res.json();
}

export async function getTopCities() {
  const res = await fetch(`${API_URL}/analytics/top-cities`);
  return res.json();
}

export async function getOccupancyRate() {
  const res = await fetch(`${API_URL}/analytics/occupancy-rate`);
  return res.json();
}

export async function getReviewsByHotel(hotelId) {
  const res = await fetch(`${API_URL}/hotels/${hotelId}/reviews`);
  return res.json();
}

export async function createPayment(paymentData) {
  const res = await fetch(`${API_URL}/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentData),
  });

  return res.json();
}

export async function getPayments() {
  const res = await fetch(`${API_URL}/payments`);
  return res.json();
}

export async function searchHotels(destination) {
  const params = new URLSearchParams();

  if (destination) {
    params.append("destination", destination);
  }

  const res = await fetch(`${API_URL}/hotels/search/?${params.toString()}`);
  return res.json();
}