import L from "leaflet";
import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Circle,
  Tooltip,
  useMap,
} from "react-leaflet";

import data from "../../datas/t7s/oshicard-checkin";

const FitBoundsToAllMarkers = () => {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(map.getBounds());
  });
  return null;
};

const bounds = L.latLngBounds(data.map((d) => d.pos));

const Map = ({ showChara = false }: { showChara: boolean }) => {
  return (
    <MapContainer bounds={bounds} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map((d) => {
        return (
          <Circle
            key={d.name + "circle"}
            center={d.pos}
            pathOptions={{ color: "red" }}
            radius={(d.km * 1000) / 2}
          >
            <Tooltip>
              {d.name}
              {showChara && ` - ${d.chara}`}
            </Tooltip>
          </Circle>
        );
      })}
      <FitBoundsToAllMarkers />
    </MapContainer>
  );
};

export default Map;
