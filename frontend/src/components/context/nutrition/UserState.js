import React, { useState, useEffect } from 'react';
import { UserContext } from './UserContext';

const UserState = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found, please login.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/fitness/getuser', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || 'Failed to fetch user data');
          setLoading(false);
          return;
        }

        const height = parseFloat(data.height);
        const weight = parseFloat(data.weight);
        const age = parseInt(data.age);
        const gender = data.gender?.toLowerCase();

        const bmi = weight / ((height / 100) ** 2);
        const bmr = gender === 'male'
          ? 10 * weight + 6.25 * height - 5 * age + 5
          : 10 * weight + 6.25 * height - 5 * age - 161;

        let targetCalories = bmr;
        if (data.goalType === 'lose') targetCalories -= 500;
        if (data.goalType === 'gain') targetCalories += 500;

        setUserData({
          ...data,
          bmi: bmi.toFixed(1),
          targetCalories: Math.round(targetCalories),
        });
        setError('');
      } catch (err) {
        setError('Fetch error: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData, error, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserState;

