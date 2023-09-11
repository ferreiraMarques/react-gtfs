import stops from "../data/stop";
import stop_times from "../data/stop_times";
import trips from "../data/trips";
import shapes from "../data/shape";
import frequencies from "../data/frequencies";

export const chargerStops = () => {
  const stopsBus = stops.map((stop) => {
    return {
      geocode: [stop.stop_lat, stop.stop_lon],
      title: stop.stop_name,
      description: stop.zone_id,
      calendar_stop: getStopTime(stop.stop_id).map((stopTime) => {
        return {
          ...stopTime,
          travels: getTrips(stopTime.trip_id),
          frequencie: getFrequencie(stopTime.trip_id),
        };
      }),
      type: 1,
    };
  });
  return stopsBus;
};

export const getStopTime = (stopId) => {
  return stop_times.filter((time) => time.stop_id === stopId);
};

export const getTrips = (tripId) => {
  return trips.filter((trip) => trip.trip_id === tripId);
};

export const getFrequencie = (tripId) => {
  return frequencies.filter((frequencie, index) => frequencie.trip_id == tripId);
};

export const getShapes = () => {
  return shapes.map((shape) => [shape.shape_pt_lat, shape.shape_pt_lon]);
};
