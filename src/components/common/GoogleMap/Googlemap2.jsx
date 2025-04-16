import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const Googlemap2 = (props) => {
  const { location } = props;
  const displayMarkers = () => {
    return location?.map((store, index) => {
      return (
        <Marker
          key={index}
          position={{
            lat: store?.location?.coordinates?.[1],
            lng: store?.location?.coordinates?.[0],
          }}
        />
      );
    });
  };

  return (

    <>
      <Map
        google={props.google}
        zoom={7.7}
        initialCenter={{ lat: 4.624335, lng: -74.063644 }}
        defaultOptions={{ disableDefaultUI: true }}
      >
        {displayMarkers()}
      </Map>
    </>
  );
};
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(Googlemap2);
