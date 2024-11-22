import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data if needed
  }, []);

  return { user, setUser };
}
