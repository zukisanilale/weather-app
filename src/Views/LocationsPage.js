import { useState, useEffect } from "react";

export default function LocationsPage() {
  const [favorites, setFavorites] = useState([]);
  const [venueName, setVenueName] = useState("");
  const [venueAddress, setVenueAddress] = useState("");

  // Load saved favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // Persist favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = () => {
    if (!venueName || !venueAddress) return;

    const newVenue = {
      venueId: Date.now().toString(), // simple unique id
      name: venueName,
      address: venueAddress,
    };

    setFavorites((prev) => [...prev, newVenue]);
    setVenueName("");
    setVenueAddress("");
  };

  const removeFavorite = (venueId) => {
    setFavorites((prev) => prev.filter((v) => v.venueId !== venueId));
  };

  return (
    <div className="container">
      <h2>Saved Locations</h2>
      <p>Manage your cities here.</p>

      {/* Add new location */}
      <div>
        <input
          type="text"
          placeholder="Venue Name"
          value={venueName}
          onChange={(e) => setVenueName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Venue Address"
          value={venueAddress}
          onChange={(e) => setVenueAddress(e.target.value)}
        />
        <button onClick={addFavorite}>Add Location</button>
      </div>

      {/* Display favorites */}
      <ul>
        {favorites.map((venue) => (
          <li key={venue.venueId}>
            <strong>{venue.name}</strong> - {venue.address}{" "}
            <button onClick={() => removeFavorite(venue.venueId)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}