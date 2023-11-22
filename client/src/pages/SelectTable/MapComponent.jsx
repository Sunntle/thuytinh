import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  DirectionsRenderer,
  Autocomplete,
} from "@react-google-maps/api";
import { Button, Input, Skeleton } from "antd";
import { memo, useRef, useState } from "react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";

const center = {
  lat: 10.8524972,
  lng: 106.6259193,
};

const key = "AIzaSyAy1u4tQoExOEJdUu_XsOMt6wfK5CxvSos";

function Map() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: key,
    libraries: ["places"],
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const originRef = useRef(null);
  const destiantionRef = useRef(null);

  async function calculateRoute() {
    if (
      originRef.current.input.value === "" ||
      destiantionRef.current.input.value === ""
    ) {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.input.value,
      destination: destiantionRef.current.input.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.input.value = "";
    destiantionRef.current.input.value = "";
  }

  const onLoad = (autocomplete) => {
    console.log(autocomplete);
    // originRef.current.input = autocomplete;
  };
  const onPlaceChanged = (string) => {
   console.log(string);
  };
  if (!isLoaded) {
    return <Skeleton />;
  }
  return (
    <div>
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        options={{ types: ["geocode"] }}
      >
        <Input type="text" placeholder="Origin" ref={originRef} />
      </Autocomplete>
      <Autocomplete onLoad={onLoad}>
        <Input type="text" placeholder="Destination" ref={destiantionRef} />
      </Autocomplete>
      <Button type="submit" onClick={calculateRoute}>
        Calculate Route
      </Button>
      <div>Distance: {distance} </div>
      <div>Duration: {duration} </div>
      <Button
        aria-label="center back"
        icon={<FaLocationArrow />}
        onClick={() => {
          map.panTo(center);
          map.setZoom(15);
        }}
      />
      <Button
        aria-label="center back"
        icon={<FaTimes />}
        onClick={clearRoute}
      />
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "400px" }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map) => setMap(map)}
      >
        <Marker position={center} />
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </div>
  );
}
export default memo(Map);
