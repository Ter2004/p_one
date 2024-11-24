import { BASE_URL } from "../utils/constants";

export async function fetchUsers() {
  try {
    const response = await fetch(`${BASE_URL}/api/users`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch users');
    }

    return await response.json();
  } catch (err) {
    console.error('Error fetching users:', err);
    throw new Error('Unable to connect to the server. Please try again later.');
  }
}

export async function updateUserRole(userId: string, newRole: string) {
  try {
    const response = await fetch(`${BASE_URL}/api/users`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, role: newRole }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update user role');
    }

    return await response.json();
  } catch (err) {
    console.error('Error updating user role:', err);
    throw new Error('Unable to connect to the server. Please try again later.');
  }
}
