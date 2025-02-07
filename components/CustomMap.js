import 'mapbox-gl/dist/mapbox-gl.css';
import { useState, useRef } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';

// If you have a public token, load via NEXT_PUBLIC_* or keep it hardcoded:
const MAPBOX_TOKEN =
  'pk.eyJ1IjoicHJveGltb2JpbmtzIiwiYSI6ImNtNjhtaWcycjA5MHQydW9jZG12dTN2eW0ifQ.lSgeDwz-4KCfGxuMf5tjeA';

export default function CustomMap() {
  const locations = [
    {
      name: 'Specialist Plus - St Morris',
      lat: -34.91342,
      lng: 138.65407,
      address: '1A Williams Ave, St Morris, SA 5068',
      phone: '(08) 8423 6477',
      directionsUrl:
        'https://www.google.com/maps/dir//Specialist+Plus+-+St+Morris/data=!4m6!4m5!1m0!1m2!1m1!1s0x6ab0cb7939e68915:0xf78c5ddd0d188532!2m2!1d138.65407417729955!2d-34.91342997284493',
    },
    {
      name: 'Specialist Plus - Richmond',
      lat: -34.93642,
      lng: 138.55058,
      address: '129 Marion Rd, Richmond, SA 5033',
      phone: '(08) 8423 6477',
      directionsUrl:
        'https://www.google.com/maps/dir//Specialist+Plus+-+Richmond/data=!4m6!4m5!1m0!1m2!1m1!1s0x6ab0c5bf38d8d881:0xdfddaf4dc6ed69ef!2m2!1d138.5505827773002!2d-34.93641647283698',
    },
  ];

  const [openPopup, setOpenPopup] = useState(null);
  const [hovering, setHovering] = useState(false);
  const closeTimer = useRef(null);

  function clearCloseTimer() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function closePopup() {
    if (!hovering) {
      console.log('Closing popup...');
      setOpenPopup(null);
    }
  }

  const handleMarkerMouseEnter = (locName) => {
    console.log('Marker mouse enter:', locName);
    clearCloseTimer();
    setOpenPopup(locName);
    setHovering(true);
  };

  const handleMarkerMouseLeave = () => {
    console.log('Marker mouse leave');
    setHovering(false);
    clearCloseTimer();
    closeTimer.current = setTimeout(() => {
      closePopup();
    }, 500);
  };

  const handlePopupMouseEnter = () => {
    console.log('Popup mouse enter');
    clearCloseTimer();
    setHovering(true);
  };

  const handlePopupMouseLeave = () => {
    console.log('Popup mouse leave');
    setHovering(false);
    clearCloseTimer();
    closeTimer.current = setTimeout(() => {
      closePopup();
    }, 500);
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
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/light-v10"
        style={{ width: '100%', height: '100%' }}
        initialViewState={{
          latitude: -34.92866,
          longitude: 138.59863,
          zoom: 11,
        }}
        // Disable interactive behaviors (optional)
        dragPan={false}
        scrollZoom={false}
        dragRotate={false}
        doubleClickZoom={false}
        touchZoomRotate={false}
        keyboard={false}
      >
        {locations.map((loc) => (
          <Marker
            key={loc.name}
            latitude={loc.lat}
            longitude={loc.lng}
            anchor="bottom"
          >
            <img
              src="/marker.png"
              alt={loc.name}
              style={{ height: '40px', width: 'auto', cursor: 'pointer' }}
              onMouseEnter={() => handleMarkerMouseEnter(loc.name)}
              onMouseLeave={handleMarkerMouseLeave}
            />
          </Marker>
        ))}

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
              style={{ zIndex: 1000 }}
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
      </Map>
    </div>
  );
}