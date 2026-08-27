import { useState } from "react";
import { useEquipment } from "../context/EquipmentContext";
import "./Equipment.css";

function Equipment() {
  const [search, setSearch] = useState("");
  const [editingEquipment, setEditingEquipment] = useState(null);

  const {
    equipment,
    deleteEquipment,
    updateEquipment,
  } = useEquipment();

  const filteredEquipment = equipment.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${name}?`
    );

    if (confirmDelete) {
      deleteEquipment(id);
    }
  };

  const handleEdit = (item) => {
    setEditingEquipment(item);
  };

  const handleEditChange = (e) => {
    setEditingEquipment({
      ...editingEquipment,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    await updateEquipment(
      editingEquipment.id,
      {
        name: editingEquipment.name,
        category: editingEquipment.category,
        location: editingEquipment.location,
        status: editingEquipment.status,
        description: editingEquipment.description || "",
      }
    );

    setEditingEquipment(null);

    alert("Equipment updated successfully!");
  };

  return (
    <div className="equipment-page">

      <div className="equipment-header">
        <div>
          <h1>Equipment</h1>
          <p>View and manage all laboratory equipment.</p>
        </div>
      </div>

      <div className="equipment-actions">

        <input
          className="search-box"
          type="text"
          placeholder="🔍 Search equipment..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {editingEquipment && (
        <form
          className="equipment-form"
          onSubmit={handleUpdate}
        >
          <h2>Edit Equipment</h2>

          <input
            type="text"
            name="name"
            placeholder="Equipment Name"
            value={editingEquipment.name}
            onChange={handleEditChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={editingEquipment.category}
            onChange={handleEditChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={editingEquipment.location}
            onChange={handleEditChange}
            required
          />

          <select
            name="status"
            value={editingEquipment.status}
            onChange={handleEditChange}
          >
            <option value="Available">Available</option>
            <option value="Borrowed">Borrowed</option>
            <option value="Maintenance">Maintenance</option>
          </select>

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={editingEquipment.description || ""}
            onChange={handleEditChange}
          />

          <div>

            <button
              type="submit"
              className="add-button"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={() => setEditingEquipment(null)}
            >
              Cancel
            </button>

          </div>

        </form>
      )}

      <div className="equipment-table-container">

        <table className="equipment-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Equipment Name</th>
              <th>Category</th>
              <th>Location</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredEquipment.map((item) => (

              <tr key={item.id}>

                <td>{item.id}</td>

                <td>
                  <strong>{item.name}</strong>
                </td>

                <td>{item.category}</td>

                <td>{item.location}</td>

                <td>
                  <span
                    className={`status status-${item.status.toLowerCase()}`}
                  >
                    {item.status}
                  </span>
                </td>

                <td>

                  <button
                    className="edit-button"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-button"
                    onClick={() =>
                      handleDelete(item.id, item.name)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Equipment;