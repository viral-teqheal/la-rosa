import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const Googlemap = (props) => {
  const { location } = props;

  return (
    <>
      <Map
        google={props.google}
        zoom={10}
        initialCenter={{ lat: location?.[1], lng: location?.[0] }}
        defaultOptions={{ disableDefaultUI: true }}
      >
        <Marker position={{ lat: location?.[1], lng: location?.[0] }} />
      </Map>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(Googlemap);
