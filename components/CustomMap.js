import 'mapbox-gl/dist/mapbox-gl.css';
import { useState, useRef } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';

// const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const MAPBOX_TOKEN = "pk.eyJ1IjoicHJveGltb2JpbmtzIiwiYSI6ImNtNjhtaWcycjA5MHQydW9jZG12dTN2eW0ifQ.lSgeDwz-4KCfGxuMf5tjeA"

export default function CustomMap() {
  const locations = [
    {
      name: 'Specialist Plus - St Morris',
      lat: -34.91342,
      lng: 138.65407,
      address: '1A Williams Ave, St Morris, SA 5068',
      phone: '(08) 8423 6477',
      directionsUrl: 'https://www.google.com/maps/dir//Specialist+Plus+-+St+Morris/data=!4m6!4m5!1m0!1m2!1m1!1s0x6ab0cb7939e68915:0xf78c5ddd0d188532!2m2!1d138.65407417729955!2d-34.91342997284493',
    },
    {
      name: 'Specialist Plus - Richmond',
      lat: -34.93642,
      lng: 138.55058,
      address: '129 Marion Rd, Richmond, SA 5033',
      phone: '(08) 8423 6477',
      directionsUrl: 'https://www.google.com/maps/dir//Specialist+Plus+-+Richmond/data=!4m6!4m5!1m0!1m2!1m1!1s0x6ab0c5bf38d8d881:0xdfddaf4dc6ed69ef!2m2!1d138.5505827773002!2d-34.93641647283698',
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
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/light-v10"
        style={{ width: '100%', height: '100%' }}
        initialViewState={{
          latitude: -34.92866,
          longitude: 138.59863,
          zoom: 11,
        }}
        // Make sure the map itself is not interfering with pointer events:
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
            <div
              style={{ cursor: 'pointer', color: 'red', fontSize: '1.4em' }}
              onMouseEnter={() => handleMarkerMouseEnter(loc.name)}
              onMouseLeave={handleMarkerMouseLeave}
            >
              ●
            </div>
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
              // Try making the popup fully interactive:
              interactive={true}
              style={{ zIndex: 1000 }}
            >
              <div
                style={{ pointerEvents: 'auto' }}
                onMouseEnter={handlePopupMouseEnter}
                onMouseLeave={handlePopupMouseLeave}
              >
                <h3 className="font-semibold">{loc.name}</h3>
                <p>{loc.address}</p>
                <p>Tel: {loc.phone}</p>
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
