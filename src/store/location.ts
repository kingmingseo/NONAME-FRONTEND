import {LatLng} from 'react-native-maps';
import {create} from 'zustand';

interface LocationState {
  moveLocation: LatLng | null;
  selectedLocation: LatLng | null;
  setMoveLocation: (location: LatLng | null) => void;
  setSelectedLocation: (location: LatLng | null) => void;
}

const useLocationStore = create<LocationState>(set => ({
  moveLocation: null,
  selectedLocation: null,
  setMoveLocation: (moveLocation: LatLng | null) =>
    set(state => ({...state, moveLocation})),
  setSelectedLocation: (selectedLocation: LatLng | null) =>
    set(state => ({...state, selectedLocation})),
}));

export default useLocationStore;
