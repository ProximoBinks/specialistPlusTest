import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';

// Fix missing marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom hook to handle panning and zooming the map
function useMapPan() {
  const map = useMap();
  const [initialState, setInitialState] = useState(null); // To store initial map center & zoom

  useEffect(() => {
    if (map) {
      // Save the initial center and zoom of the map when it first loads
      setInitialState({
        center: map.getCenter(),
        zoom: map.getZoom(), // Store the original zoom level
      });
    }
  }, [map]);

  // Pan and zoom to a location with animation
  const panAndZoomToLocation = (lat, lng, zoomLevel = 15) => {
    if (map) {
      map.setView([lat, lng], zoomLevel, { animate: true });
    }
  };

  // Restore the map to its original center and zoom level
  const restoreOriginalView = () => {
    if (map && initialState) {
      map.setView(initialState.center, initialState.zoom, { animate: true }); // Restore the original zoom
    }
  };

  return { panAndZoomToLocation, restoreOriginalView };
}

function FitBounds({ bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds && map) {
      map.fitBounds(bounds, { padding: [50, 50] });
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

  const bounds = [
    [locations[0].lat, locations[0].lng],
    [locations[1].lat, locations[1].lng],
  ];

  return (
    <MapContainer
      center={[-34.9285, 138.6007]} // Initial center
      zoom={12} // Default zoom
      id="map"
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={false}
      dragging={false}
      doubleClickZoom={false}
      touchZoom={false}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      <FitBounds bounds={bounds} />

      {locations.map((location, idx) => (
        <MapMarker key={idx} location={location} />
      ))}
    </MapContainer>
  );
}

// Marker component with hover behaviour to pan and zoom
function MapMarker({ location }) {
  const { panAndZoomToLocation, restoreOriginalView } = useMapPan();

  return (
    <Marker
      position={[location.lat, location.lng]}
      eventHandlers={{
        mouseover: (e) => {
          e.target.openPopup();
          panAndZoomToLocation(location.lat, location.lng, 15); // Pan and zoom in on hover
        },
        mouseout: (e) => {
          e.target.closePopup();
          restoreOriginalView(); // Restore to original zoom and center on hover out
        },
      }}
    >
      <Popup autoPan={false}>
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
  );
}
