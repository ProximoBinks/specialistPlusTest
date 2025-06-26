import 'mapbox-gl/dist/mapbox-gl.css';
import { useState, useRef } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';

// If you have a public token, load via NEXT_PUBLIC_* or keep it hardcoded:
const MAPBOX_TOKEN =
  'pk.eyJ1IjoicHJveGltb2JpbmtzIiwiYSI6ImNtNjhtaWcycjA5MHQydW9jZG12dTN2eW0ifQ.lSgeDwz-4KCfGxuMf5tjeA';

export default function CustomMap() {
  const locations = [
    {
      name: 'Specialist Plus - Richmond',
      lat: -34.93630292750359,
      lng: 138.55301536048418,
      address: '129 Marion Rd, Richmond, SA 5033',
      phone: '(08) 8423 6477',
      directionsUrl:
        'https://www.google.com/maps/dir//Specialist+Plus+-+Richmond/data=!4m6!4m5!1m0!1m2!1m1!1s0x6ab0c5bf38d8d881:0xdfddaf4dc6ed69ef!2m2!1d138.5505827773002!2d-34.93641647283698',
    },
  ];

  const [openPopup, setOpenPopup] = useState(null);
  const mapRef = useRef(null);
  const closeTimer = useRef(null);
  const isHoveringMarker = useRef(false);
  const isHoveringPopup = useRef(false);

  // Initial map view state
  const initialViewState = {
    latitude: -34.93630292750359,
    longitude: 138.55301536048418,
    zoom: 13,
  };

  function clearCloseTimer() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function schedulePopupClose() {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => {
      // Only close if neither marker nor popup is being hovered
      if (!isHoveringMarker.current && !isHoveringPopup.current) {
        console.log('Closing popup and zooming out');
        setOpenPopup(null);
        // Zoom back out when popup closes
        if (mapRef.current) {
          mapRef.current.flyTo({
            center: [138.55301536048418, -34.93630292750359],
            zoom: 13,
            duration: 1000,
          });
        }
      }
    }, 300);
  }

  const handleMarkerMouseEnter = (location) => {
    console.log('Marker mouse enter:', location.name);
    isHoveringMarker.current = true;
    clearCloseTimer();
    setOpenPopup(location.name);
    
    // Zoom in to the location
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [location.lng, location.lat],
        zoom: 16,
        duration: 1000,
      });
    }
  };

  const handleMarkerMouseLeave = () => {
    console.log('Marker mouse leave');
    isHoveringMarker.current = false;
    schedulePopupClose();
  };

  const handlePopupMouseEnter = () => {
    console.log('Popup mouse enter');
    isHoveringPopup.current = true;
    clearCloseTimer();
  };

  const handlePopupMouseLeave = () => {
    console.log('Popup mouse leave');
    isHoveringPopup.current = false;
    schedulePopupClose();
  };

  return (
    <div style={{ width: '100%', height: '500px' }}>
      {/* 
        Global style to load GothamBook font from /public/fonts/GothamBook.otf.
        In production, you'd likely put this in a global CSS or custom _document.js.
      */}
      <style jsx global>{`
        @font-face {
          font-family: 'GothamBook';
          src: url('/fonts/GothamBook.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
        }
      `}</style>

      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/light-v10"
        style={{ width: '100%', height: '100%' }}
        initialViewState={initialViewState}
        // Disable user scroll - only programmatic zoom allowed
        dragPan={true}
        scrollZoom={false}
        dragRotate={false}
        doubleClickZoom={false}
        touchZoomRotate={false}
        keyboard={false}
      >
        {/* Render popups first so they appear behind markers */}
        {locations
          .filter((loc) => loc.name === openPopup)
          .map((loc) => (
            <Popup
              key={loc.name}
              latitude={loc.lat}
              longitude={loc.lng}
              anchor="bottom"
              offset={[0, -10]}
              closeButton={false}
              closeOnClick={false}
              interactive={true}
              style={{ zIndex: 100 }}
            >
              {/* 
                w-[300px] for width,
                no background color, no border, no shadow.
                Apply the custom font by referencing 'GothamBook'.
              */}
              <div
                className="w-full p-2 text-sm"
                style={{
                  pointerEvents: 'auto',
                  backgroundColor: 'transparent',
                  border: 'none',
                  boxShadow: 'none',
                  fontFamily: 'GothamBook, sans-serif',
                }}
                onMouseEnter={handlePopupMouseEnter}
                onMouseLeave={handlePopupMouseLeave}
              >
                <h3 className="text-sm font-semibold mb-1">{loc.name}</h3>
                <p className="mb-1">{loc.address}</p>
                <p className="mb-1"><a href="tel:+61884236477" className="underline">Tel: {loc.phone}</a></p>
                <a
                  href={loc.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Get Directions
                </a>
              </div>
            </Popup>
          ))}

        {/* Render markers last so they appear on top */}
        {locations.map((loc) => (
          <Marker
            key={loc.name}
            latitude={loc.lat}
            longitude={loc.lng}
            anchor="bottom"
            style={{ zIndex: 200 }}
          >
            <img
              src="/marker.png"
              alt={loc.name}
              style={{ 
                height: '40px', 
                width: 'auto', 
                cursor: 'pointer',
                zIndex: 200,
                position: 'relative'
              }}
              onMouseEnter={() => handleMarkerMouseEnter(loc)}
              onMouseLeave={handleMarkerMouseLeave}
            />
          </Marker>
        ))}
      </Map>
    </div>
  );
}