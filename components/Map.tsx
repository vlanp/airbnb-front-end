import { StyleSheet } from "react-native";
import IMarkers, { ICoordinates } from "../interfaces/Markers";
import MapView, { Marker } from "react-native-maps";

const Map = ({
  markers,
  coordinates,
}: {
  markers: Array<IMarkers>;
  coordinates: ICoordinates;
}) => {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
      showsUserLocation={false}
    >
      {markers.map((marker) => {
        return (
          <Marker
            key={marker.id}
            coordinate={{
              longitude: marker.longitude,
              latitude: marker.latitude,
            }}
            title={marker.title}
            description={marker.description}
          />
        );
      })}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    backgroundColor: "blue",
    width: "100%",
    height: 250,
  },
});

export default Map;
