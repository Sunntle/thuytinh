import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  DirectionsRenderer,
  Autocomplete,
  InfoBox,
} from "@react-google-maps/api";
import { Button, Col, Row, Skeleton, Typography } from "antd";
import { memo, useRef, useState } from "react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
const center = {
  lat: 10.8524972,
  lng: 106.6259193,
};

const key = "AIzaSyAy1u4tQoExOEJdUu_XsOMt6wfK5CxvSos";

// eslint-disable-next-line react/prop-types
function Map({mapRef}) {
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
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
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
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }
  if (!isLoaded) {
    return <Skeleton />;
  }

  return (
    <Row ref={mapRef} gutter={[10, 10]} align={"top"} justify={"center"} className="px-6 xl:px-12">
       <Col xs={24} lg={12}>
        <div className="w-full h-12 uppercase font-semibold text-lg text-primary text-center mb-3">
            Xem địa chỉ trên bản đồ
          </div>
        <Row gutter={[10, 10]} align={"middle"} className="mb-3">
        <Col xs={24} sm={12} md={12}>
          <Row gutter={[10, 10]}>
            <Col xs={12}>
              <Autocomplete className="h-full">
                <input
                  className="p-2 w-full h-full rounded-md border border-gray-300"
                  type="text"
                  placeholder="Bắt đầu"
                  ref={originRef}
                />
              </Autocomplete>
            </Col>
            <Col xs={12}>
              <Autocomplete className="h-full">
                <input
                  className="p-2 w-full h-full rounded-md border border-gray-300"
                  type="text"
                  placeholder="Kết thúc"
                  ref={destiantionRef}
                />
              </Autocomplete>
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={12} md={12} className="flex">
          <Button
            className="me-2 hover:bg-black hover:text-white border border-solid border-gray-300 rounded-md"
            type="submit"
            onClick={calculateRoute}
          >
            Tính khoảng cách
          </Button>
          <Button
            aria-label="center back"
            icon={<FaLocationArrow />}
            onClick={() => {
              map.panTo(center);
              map.setZoom(15);
            }}
            className="me-2 hover:bg-black "
          />
          <Button
            aria-label="center back"
            icon={<FaTimes />}
            onClick={clearRoute}
            className="hover:bg-black "
          />
        </Col>
      </Row>
      <Typography.Paragraph>Khoảng cách: <b>{distance}</b> </Typography.Paragraph>
      <Typography.Paragraph>
        Thời gian ước tính: <b>{duration}</b>
      </Typography.Paragraph>
      </Col>
      <Col xs={24} lg={12}>
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
        <Marker position={center}>
          <InfoBox options={{ closeBoxURL: '', enableEventPropagation: true }}>
            <p className="bg-primary text-white rounded-md p-1 whitespace-nowrap px-2 w-max">Nhà hàng hải sản Thủy Tinh</p>
          </InfoBox>
        </Marker>
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
      </Col>
    </Row>
     
  );
}
export default memo(Map);
