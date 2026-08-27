import { useEquipment } from "../context/EquipmentContext";
import "./Statistics.css";

function Statistics() {
  const { equipment } = useEquipment();

  const totalEquipment = equipment.length;

  const availableEquipment = equipment.filter(
    (item) => item.status === "Available"
  ).length;

  const borrowedEquipment = equipment.filter(
    (item) => item.status === "Borrowed"
  ).length;

  const maintenanceEquipment = equipment.filter(
    (item) => item.status === "Maintenance"
  ).length;

  const categoryCounts = {};

  equipment.forEach((item) => {
    if (categoryCounts[item.category]) {
      categoryCounts[item.category]++;
    } else {
      categoryCounts[item.category] = 1;
    }
  });

  return (
    <div className="statistics-page">

      <div className="statistics-header">
        <h1>Statistics</h1>
        <p>View laboratory equipment statistics.</p>
      </div>

      <div className="statistics-cards">

        <div className="stat-card">
          <h3>Total Equipment</h3>
          <h2>{totalEquipment}</h2>
        </div>

        <div className="stat-card">
          <h3>Available</h3>
          <h2>{availableEquipment}</h2>
        </div>

        <div className="stat-card">
          <h3>Borrowed</h3>
          <h2>{borrowedEquipment}</h2>
        </div>

        <div className="stat-card">
          <h3>Maintenance</h3>
          <h2>{maintenanceEquipment}</h2>
        </div>

      </div>

      <div className="category-section">

        <h2>Equipment by Category</h2>

        <table className="statistics-table">

          <thead>
            <tr>
              <th>Category</th>
              <th>Number of Equipment</th>
            </tr>
          </thead>

          <tbody>

            {Object.entries(categoryCounts).map(
              ([category, count]) => (
                <tr key={category}>
                  <td>{category}</td>
                  <td>{count}</td>
                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Statistics;