import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState, useRef } from 'react';
import L from 'leaflet';

// Fix missing marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom hook to handle panning and zooming the map
function useMapPan() {
  const map = useMap();
  const [initialState, setInitialState] = useState(null); // To store initial map center & zoom
  const hasSetInitialState = useRef(false); // To ensure we set initialState only once

  useEffect(() => {
    if (map && !hasSetInitialState.current) {
      const setInitialMapState = () => {
        setInitialState({
          center: map.getCenter(),
          zoom: map.getZoom(),
        });
        hasSetInitialState.current = true;
        map.off('moveend', setInitialMapState); // Remove listener after setting initial state
      };

      // Wait for the map to finish moving (e.g., after fitBounds)
      map.on('moveend', setInitialMapState);
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
      map.setView(initialState.center, initialState.zoom, { animate: true });
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
      lat: -34.91337112978169,
      lng: 138.6566237800252,
      name: 'Specialist Plus - St Morris',
      address: '1A Williams Ave, St Morris, SA 5068',
      phone: '(08) 8423 6477',
    },
    {
      lat: -34.93637249596742,
      lng: 138.5531469675588,
      name: 'Specialist Plus - Richmond',
      address: '129 Marion Rd, Richmond, SA 5033',
      phone: '(08) 8423 6477',
    },
  ];

  const bounds = locations.map((loc) => [loc.lat, loc.lng]);

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

// Marker component with hover behavior to pan and zoom
function MapMarker({ location }) {
  const { panAndZoomToLocation, restoreOriginalView } = useMapPan();

  const handleMouseOver = (e) => {
    e.target.openPopup();
    panAndZoomToLocation(location.lat, location.lng, 15); // Pan and zoom in on hover
  };

  const handleMouseOut = (e) => {
    const toElement = e.originalEvent.relatedTarget;

    if (
      toElement &&
      (toElement.closest('.leaflet-popup') ||
        toElement.closest('.leaflet-marker-icon'))
    ) {
      // The mouse is moving to the popup or another marker, do nothing
      return;
    }

    e.target.closePopup();
    restoreOriginalView(); // Restore to original zoom and center on hover out
  };

  const handlePopupMouseOut = (e) => {
    const toElement = e.originalEvent.relatedTarget;

    if (
      toElement &&
      (toElement.closest('.leaflet-popup') ||
        toElement.closest('.leaflet-marker-icon'))
    ) {
      // Mouse is moving to the marker or popup, do nothing
      return;
    }

    e.target._source.closePopup(); // Close the popup
    restoreOriginalView();
  };

  return (
    <Marker
      position={[location.lat, location.lng]}
      eventHandlers={{
        mouseover: handleMouseOver,
        mouseout: handleMouseOut,
      }}
    >
      <Popup
        autoPan={false}
        eventHandlers={{
          mouseout: handlePopupMouseOut,
        }}
      >
        <div>
          <h3 className="font-semibold">{location.name}</h3>
          <p>{location.address}</p>
          <p>Tel: {location.phone}</p>
          <a
            href="https://www.google.com/maps"
            className="text-blue-500 hover:underline"
          >
            Get Directions
          </a>
        </div>
      </Popup>
    </Marker>
  );
}
