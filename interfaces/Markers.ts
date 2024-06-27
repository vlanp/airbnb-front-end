interface IMarkers {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  description: string;
}

interface ICoordinates {
  latitude: number;
  longitude: number;
}

export default IMarkers;
export { ICoordinates };
