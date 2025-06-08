/* This module provides utility functions for managing authentication
 * in the frontend, including login, registration, token storage, 
 * retrieval of the current user, and logout */

/* Submit login request to backend */
export async function login(email, password) {
  const res = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (res.ok) localStorage.setItem("token", data.token);
  return data;
}

/* Submit registration request to backend */
export async function register(email, password, confirm_password) {
  const res = await fetch("http://localhost:5000/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, confirm_password })
  });
  return res.json();
}

/* Check if user is currently logged in */
export function getUser() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.sub;
  } catch {
    return null;
  }
}

/* Log user out */
export function logout() {
  localStorage.removeItem("token");
}