import { createContext, useContext, useEffect, useState } from "react";

const EquipmentContext = createContext();

const API_URL = "http://localhost:5000/api/equipment";

export function EquipmentProvider({ children }) {
  const [equipment, setEquipment] = useState([]);

  // Load equipment from MongoDB
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setEquipment(data);
      })
      .catch((error) => {
        console.error("Error fetching equipment:", error);
      });
  }, []);

  // Add equipment
  const addEquipment = async (newEquipment) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEquipment),
      });

      const savedEquipment = await response.json();

      setEquipment((currentEquipment) => [
        ...currentEquipment,
        savedEquipment,
      ]);
    } catch (error) {
      console.error("Error adding equipment:", error);
    }
  };

  // Delete equipment
  const deleteEquipment = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      setEquipment((currentEquipment) =>
        currentEquipment.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Error deleting equipment:", error);
    }
  };

  // Update equipment
  const updateEquipment = async (id, updatedData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const updatedEquipment = await response.json();

      setEquipment((currentEquipment) =>
        currentEquipment.map((item) =>
          item.id === id ? updatedEquipment : item
        )
      );
    } catch (error) {
      console.error("Error updating equipment:", error);
    }
  };

  return (
    <EquipmentContext.Provider
      value={{
        equipment,
        addEquipment,
        deleteEquipment,
        updateEquipment,
      }}
    >
      {children}
    </EquipmentContext.Provider>
  );
}

export function useEquipment() {
  return useContext(EquipmentContext);
}