const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

/**
 * Login function
 * @param email - User email
 * @param password - User password
 * @returns User data and token
 */
export async function login(email: string, password: string) {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();
    // Store token in localStorage
    localStorage.setItem('token', data.token);
    return data;
  } catch (err) {
    console.error('Error during login:', err);
    throw new Error('Unable to connect to the server. Please try again later.');
  }
}

/**
 * Register function
 * @param email - User email
 * @param password - User password
 * @returns User data
 */
export async function register(email: string, password: string) {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    return await response.json();
  } catch (err) {
    console.error('Error during registration:', err);
    throw new Error('Unable to connect to the server. Please try again later.');
  }
}

/**
 * Logout function
 */
export function logout() {
  // Clear token from localStorage
  localStorage.removeItem('token');
  console.log('User logged out successfully.');
}

/**
 * Fetch authenticated user data
 * @returns User data
 */
export async function fetchUserData() {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found, please log in.');
    }

    const response = await fetch(`${BASE_URL}/api/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch user data');
    }

    return await response.json();
  } catch (err) {
    console.error('Error fetching user data:', err);
    throw err;
  }
}
