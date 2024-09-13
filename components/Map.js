// components/Map.js
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import L from 'leaflet';

// Fix missing marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Helper function to automatically fit bounds based on locations
function FitBounds({ bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds && map) {
      map.fitBounds(bounds, { padding: [50, 50] }); // Fit the map around the markers
    }
  }, [map, bounds]);
  return null;
}

export default function Map() {
  const locations = [
    {
      lat: -34.921230,
      lng: 138.649740,
      name: 'Specialist Plus - St Morris',
      address: '1A Williams Ave, St Morris, SA 5068',
      phone: '(08) 8423 6477',
    },
    {
      lat: -34.944660,
      lng: 138.560370,
      name: 'Specialist Plus - Richmond',
      address: '129 Marion Rd, Richmond, SA 5033',
      phone: '(08) 8423 6477',
    },
  ];

  // Calculate bounds for the two locations
  const bounds = [
    [locations[0].lat, locations[0].lng],
    [locations[1].lat, locations[1].lng],
  ];

  return (
    <MapContainer
      center={[-34.9285, 138.6007]} // Initial center, overridden by fitBounds
      zoom={12} // Default zoom
      id="map"
      style={{ height: "100%", width: "100%" }} // Ensure the map has full width and height
      scrollWheelZoom={false} // Disable scroll zoom to lock the map
      dragging={false} // Disable dragging
      doubleClickZoom={false} // Disable zoom on double click
      touchZoom={false} // Disable touch zoom
      zoomControl={false} // Remove zoom controls
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" // Monochrome tile layer
      />
      {locations.map((location, idx) => (
        <Marker 
          key={idx} 
          position={[location.lat, location.lng]}
          eventHandlers={{
            mouseover: (e) => e.target.openPopup(), // Open popup on hover
            mouseout: (e) => e.target.closePopup(), // Close popup when mouse leaves
          }}
        >
          <Popup>
            <div>
              <h3 className="font-semibold">{location.name}</h3>
              <p>{location.address}</p>
              <p>Tel: {location.phone}</p>
              <a href="https://www.google.com/maps" className="text-blue-500 hover:underline">
                Get Directions
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
      <FitBounds bounds={bounds} />
    </MapContainer>
  );
}
