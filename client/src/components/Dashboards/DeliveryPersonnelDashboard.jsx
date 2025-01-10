import React, { useState, useEffect } from 'react';
import { fetchMealDeliveries, updateMealDeliveryById } from '../../services/api'; // Assuming API functions are defined

export const DeliveryPersonnelDashboard = () => {
  const [deliveries, setDeliveries] = useState([]);

  // Fetch deliveries assigned to the delivery personnel
  useEffect(() => {
    const loadDeliveries = async () => {
      try {
        const response = await fetchMealDeliveries(); // Fetch deliveries assigned to the current delivery personnel
        setDeliveries(response.data); // Assuming response contains the data
      } catch (error) {
        console.error('Error fetching deliveries:', error);
      }
    };

    loadDeliveries();
  }, []);

  // Handle marking the meal as delivered
  const handleMarkAsDelivered = async (mealId) => {
    try {
      await updateMealDeliveryById(mealId, { deliveryStatus: 'delivered' });
      // Update local state to reflect the status change
      const updatedDeliveries = deliveries.map((meal) =>
        meal._id === mealId ? { ...meal, deliveryStatus: 'delivered' } : meal
      );
      setDeliveries(updatedDeliveries);
    } catch (error) {
      console.error('Error marking as delivered:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Delivery Personnel Dashboard</h1>
      <div className="delivery-list">
        {deliveries.length === 0 ? (
          <p className="text-lg text-gray-600">No deliveries assigned</p>
        ) : (
          <ul className="space-y-4">
            {deliveries.map((meal) => (
              <li
                key={meal._id}
                className="p-4 bg-white border rounded-lg shadow-md hover:bg-gray-50"
              >
                <div className="meal-info space-y-2">
                  <h3 className="text-xl font-medium">Meal: {meal.mealType}</h3>
                  <p className="text-gray-600">Patient ID: {meal.patientId}</p>
                  <p className="text-gray-600">Delivery Time: {new Date(meal.deliveryTime).toLocaleString()}</p>
                  <p className="text-gray-600">Delivery Status: {meal.deliveryStatus}</p>
                  <p className="text-gray-600">Delivery Notes: {meal.deliveryNotes || 'No special instructions'}</p>
                </div>
                <button
                  onClick={() => handleMarkAsDelivered(meal._id)}
                  disabled={meal.deliveryStatus === 'delivered'}
                  className={`mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-300`}
                >
                  Mark as Delivered
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
