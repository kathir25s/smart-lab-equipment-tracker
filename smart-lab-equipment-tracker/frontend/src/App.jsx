import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { EquipmentProvider, useEquipment } from "./context/EquipmentContext";

import Equipment from "./pages/Equipment";
import AddEquipment from "./pages/AddEquipment";
import Maintenance from "./pages/Maintenance";
import Statistics from "./pages/Statistics";

function Dashboard() {
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

  return (
    <>
      <h1>Smart Lab Equipment Tracker</h1>

      <p className="subtitle">
        Manage and monitor laboratory equipment
      </p>

      <div className="cards">

        <div className="card">
          <h3>Total Equipment</h3>
          <h2>{totalEquipment}</h2>
        </div>

        <div className="card">
          <h3>Available</h3>
          <h2>{availableEquipment}</h2>
        </div>

        <div className="card">
          <h3>Borrowed</h3>
          <h2>{borrowedEquipment}</h2>
        </div>

        <div className="card">
          <h3>Maintenance</h3>
          <h2>{maintenanceEquipment}</h2>
        </div>

      </div>

      <section className="equipment-section">

        <h2>Recent Equipment</h2>

        <table>

          <thead>
            <tr>
              <th>Equipment ID</th>
              <th>Equipment Name</th>
              <th>Lab</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {equipment.slice(-5).reverse().map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.location}</td>
                <td>{item.status}</td>
              </tr>
            ))}

          </tbody>

        </table>

      </section>
    </>
  );
}

function App() {
  return (
    <EquipmentProvider>

      <BrowserRouter>

        <div className="app">

          {/* Sidebar */}

          <aside className="sidebar">

            <h2>Smart Lab</h2>

            <nav>

              <Link to="/" className="nav-link">
                🏠 Dashboard
              </Link>

              <Link to="/equipment" className="nav-link">
                🔬 Equipment
              </Link>

              <Link to="/add-equipment" className="nav-link">
                ➕ Add Equipment
              </Link>

              <Link to="/maintenance" className="nav-link">
                🔧 Maintenance
              </Link>

              <Link to="/statistics" className="nav-link">
                📊 Statistics
              </Link>

            </nav>

          </aside>

          {/* Main Content */}

          <main className="main-content">

            <Routes>

              <Route
                path="/"
                element={<Dashboard />}
              />

              <Route
                path="/equipment"
                element={<Equipment />}
              />

              <Route
                path="/add-equipment"
                element={<AddEquipment />}
              />

              <Route
                path="/maintenance"
                element={<Maintenance />}
              />

              <Route
                path="/statistics"
                element={<Statistics />}
              />

            </Routes>

          </main>

        </div>

      </BrowserRouter>

    </EquipmentProvider>
  );
}

export default App;