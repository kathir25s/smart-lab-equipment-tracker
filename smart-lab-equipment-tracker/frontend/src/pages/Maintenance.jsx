import { useEquipment } from "../context/EquipmentContext";
import "./Maintenance.css";

function Maintenance() {
  const { equipment } = useEquipment();

  const maintenanceEquipment = equipment.filter(
    (item) => item.status === "Maintenance"
  );

  return (
    <div className="maintenance-page">

      <div className="maintenance-header">
        <h1>Maintenance</h1>
        <p>Track equipment that requires maintenance.</p>
      </div>

      <div className="maintenance-summary">
        <h2>Equipment Under Maintenance</h2>
        <span>{maintenanceEquipment.length} Equipment</span>
      </div>

      {maintenanceEquipment.length === 0 ? (

        <div className="no-maintenance">
          <h3>🎉 No Equipment Under Maintenance</h3>
          <p>All laboratory equipment is currently in good condition.</p>
        </div>

      ) : (

        <div className="maintenance-table-container">

          <table className="maintenance-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Equipment Name</th>
                <th>Category</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {maintenanceEquipment.map((item) => (

                <tr key={item.id}>

                  <td>{item.id}</td>

                  <td>
                    <strong>{item.name}</strong>
                  </td>

                  <td>{item.category}</td>

                  <td>{item.location}</td>

                  <td>
                    <span className="maintenance-status">
                      Maintenance
                    </span>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}

export default Maintenance;