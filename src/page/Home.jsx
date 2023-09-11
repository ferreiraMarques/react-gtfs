import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, DivIcon, point } from "leaflet";
import { Container, List, ListItem, ListItemText } from "@mui/material";

import "../App.css";
import "leaflet/dist/leaflet.css";

import Navbar from "../components/Navbar";
import { chargerStops, getShapes } from "../functions/fetch";

const createCustomIcon = (cluster) => {
  return new DivIcon({
    html: `<div className="cluster-icon">
    ${cluster.getChildCount()}
  </div>`,
    className: "cluster-icon",
    iconSize: point(33, 33, true),
  });
};

const limeOptions = { color: "lime" };

export default function Home() {
  const [markers, setMarkets] = useState([]);
  const [lines, setLines] = useState([]);

  const createIcon = (type) => {
    let icon = null;

    switch (type) {
      case 1:
        icon = new Icon({
          iconUrl: "https://cdn-icons-png.flaticon.com/512/3448/3448677.png",
          iconSize: [38, 38],
        });
        break;

      default:
        icon = new Icon({
          iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
          iconSize: [38, 38],
        });
        break;
    }

    return icon;
  };

  useEffect(() => {
    setMarkets(chargerStops());
    setLines(getShapes());
  }, []);

  return (
    <Container>
      <Navbar />
      <div className="App">
        <MapContainer center={[19.41922974887051, -99.1532256861485]} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={createCustomIcon}
          >
            {markers.map((marker, index) => (
              <Marker
                key={index}
                position={marker.geocode}
                icon={createIcon(marker.type)}
              >
                <Popup>
                  <h2>{marker.title}</h2>
                  <p>{marker.description}</p>
                  {marker.calendar_stop.map((time, index) => (
                    <div>
                      <List dense={true} key={index}>
                        <ListItem>
                          <ListItemText
                            primary={`Hora de llegada: ${time.arrival_time} - Hora de salida: ${time.departure_time}`}
                          />
                        </ListItem>
                      </List>

                      {time.travels.map((travel, index) => (
                        <List dense={true} key={index}>
                          <ListItem>
                            <ListItemText
                              primary={`Ruta: ${travel.trip_short_name} - indentificacion: ${travel.route_id}`}
                            />
                          </ListItem>
                        </List>
                      ))}

                      {time.frequencie.map((frecu, index) => (
                        <List dense={true} key={index}>
                          <ListItem>
                            <ListItemText
                              primary={`Frecuencia: ${frecu.start_time} - ${frecu.end_time}`}
                            />
                          </ListItem>
                        </List>
                      ))}
                    </div>
                  ))}
                </Popup>
              </Marker>
            ))}

            <Polyline pathOptions={limeOptions} positions={lines}></Polyline>
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </Container>
  );
}
