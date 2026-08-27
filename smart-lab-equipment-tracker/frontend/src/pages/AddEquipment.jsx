import { useState } from "react";
import { useEquipment } from "../context/EquipmentContext";
import "./Equipment.css";

function AddEquipment() {
  const { addEquipment } = useEquipment();

  const [equipment, setEquipment] = useState({
    id: "",
    name: "",
    category: "",
    location: "",
    status: "Available",
    description: "",
  });

  const handleChange = (e) => {
    setEquipment({
      ...equipment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addEquipment(equipment);

    alert("Equipment added successfully!");

    setEquipment({
      id: "",
      name: "",
      category: "",
      location: "",
      status: "Available",
      description: "",
    });
  };

  return (
    <div className="equipment-page">

      <div className="equipment-header">
        <div>
          <h1>Add Equipment</h1>
          <p>Add new laboratory equipment here.</p>
        </div>
      </div>

      <form className="equipment-form" onSubmit={handleSubmit}>

        <h2>Equipment Details</h2>

        <input
          type="text"
          name="id"
          placeholder="Equipment ID (e.g. EQ002)"
          value={equipment.id}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="name"
          placeholder="Equipment Name"
          value={equipment.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={equipment.category}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={equipment.location}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={equipment.status}
          onChange={handleChange}
        >
          <option value="Available">Available</option>
          <option value="Borrowed">Borrowed</option>
          <option value="Maintenance">Maintenance</option>
        </select>

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={equipment.description}
          onChange={handleChange}
        />

        <button type="submit" className="add-button">
          Add Equipment
        </button>

      </form>

    </div>
  );
}

export default AddEquipment;