import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./Views/HomePage";
import LoginPage from "./Views/LoginPage";
import RegisterPage from "./Views/RegisterPage";
import WeatherDashboard from "./Views/WeatherDashboard";
import LocationsPage from "./Views/LocationsPage";
import AlertsPage from "./Views/AlertsPage";
import WatchlistPage from "./Views/WatchlistPage";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/locations">Locations</Link>
          <Link to="/alerts">Alerts</Link>
          <Link to="/watchlist">Watchlist</Link>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<WeatherDashboard />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;