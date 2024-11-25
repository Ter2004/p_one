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
    // Store token and user data in localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem(
      'user',
      JSON.stringify({ id: data.id, role: data.role })
    );
    return data;
  } catch (err: any) {
    console.error('Error during login:', err.message || err);
    throw new Error(err.message || 'Unable to connect to the server. Please try again later.');
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
  } catch (err: any) {
    console.error('Error during registration:', err.message || err);
    throw new Error(err.message || 'Unable to connect to the server. Please try again later.');
  }
}

/**
 * Logout function
 */
export function logout() {
  // Clear token and user data from localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('user');
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
      throw new Error('No token found. Please log in.');
    }

    const response = await fetch(`${BASE_URL}/api/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        logout(); // Clear stored data on unauthorized access
        throw new Error('Session expired. Please log in again.');
      }

      const error = await response.text(); // Handle unexpected non-JSON response
      console.error('Invalid response from server:', error);
      throw new Error('Failed to fetch user data.');
    }

    const data = await response.json();
    return data;
  } catch (err: any) {
    console.error('Error fetching user data:', err.message || err);
    throw new Error(err.message || 'Unable to fetch user data. Please try again later.');
  }
}

/**
 * Check if the user is authenticated
 * @returns Boolean indicating authentication status
 */
export function isAuthenticated(): boolean {
  const token = localStorage.getItem('token');
  return !!token;
}

/**
 * Get current user role
 * @returns User role as a string
 */
export function getUserRole(): string | null {
  const user = localStorage.getItem('user');
  if (user) {
    try {
      return JSON.parse(user).role;
    } catch (err) {
      console.error('Error parsing user data:', err);
      return null;
    }
  }
  return null;
}

/**
 * Decode user data safely
 * @returns Decoded user object or null
 */
export function getUserData(): { id: string; role: string } | null {
  const user = localStorage.getItem('user');
  if (user) {
    try {
      return JSON.parse(user);
    } catch (err) {
      console.error('Error decoding user data:', err);
      return null;
    }
  }
  return null;
}

/**
 * Validate if user is authorized for admin-specific actions
 * @returns Boolean indicating admin status
 */
export function isAdmin(): boolean {
  const userRole = getUserRole();
  return userRole === 'admin';
}
