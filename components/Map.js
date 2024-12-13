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

function useMapPan() {
  const map = useMap();
  const [initialState, setInitialState] = useState(null);
  const hasSetInitialState = useRef(false);

  useEffect(() => {
    if (map && !hasSetInitialState.current) {
      const setInitialMapState = () => {
        setInitialState({
          center: map.getCenter(),
          zoom: map.getZoom(),
        });
        hasSetInitialState.current = true;
        map.off('moveend', setInitialMapState);
      };
      map.on('moveend', setInitialMapState);
    }
  }, [map]);

  const panAndZoomToLocation = (lat, lng, zoomLevel = 15) => {
    if (map) {
      map.setView([lat, lng], zoomLevel, { animate: true });
    }
  };

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
      directionsUrl:
        'https://www.google.com/maps/dir//Specialist+Plus+-+St+Morris/data=!4m6!4m5!1m0!1m2!1m1!1s0x6ab0cb7939e68915:0xf78c5ddd0d188532!2m2!1d138.65407417729955!2d-34.91342997284493'
    },
    {
      lat: -34.93637249596742,
      lng: 138.5531469675588,
      name: 'Specialist Plus - Richmond',
      address: '129 Marion Rd, Richmond, SA 5033',
      phone: '(08) 8423 6477',
      directionsUrl:
        'https://www.google.com/maps/dir//Specialist+Plus+-+Richmond/data=!4m6!4m5!1m0!1m2!1m1!1s0x6ab0c5bf38d8d881:0xdfddaf4dc6ed69ef!2m2!1d138.5505827773002!2d-34.93641647283698'
    },
  ];

  const bounds = locations.map((loc) => [loc.lat, loc.lng]);

  return (
    <MapContainer
      center={[-34.9285, 138.6007]}
      zoom={12}
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

function MapMarker({ location }) {
  const { panAndZoomToLocation, restoreOriginalView } = useMapPan();
  const markerRef = useRef(null);

  const handleMouseOver = (e) => {
    e.target.openPopup();
    panAndZoomToLocation(location.lat, location.lng, 15);
  };

  const handleMouseOut = () => {
    // Let the popup manage closing
  };

  const handlePopupMouseLeave = () => {
    if (markerRef.current) {
      markerRef.current.closePopup();
      restoreOriginalView();
    }
  };

  return (
    <Marker
      ref={markerRef}
      position={[location.lat, location.lng]}
      eventHandlers={{
        mouseover: handleMouseOver,
        mouseout: handleMouseOut,
      }}
    >
      <Popup autoPan={false} closeButton={false}>
        <div onMouseLeave={handlePopupMouseLeave}>
          <h3 className="font-semibold">{location.name}</h3>
          <p>{location.address}</p>
          <p>Tel: {location.phone}</p>
          <a
            href={location.directionsUrl}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Directions
          </a>
        </div>
      </Popup>
    </Marker>
  );
}