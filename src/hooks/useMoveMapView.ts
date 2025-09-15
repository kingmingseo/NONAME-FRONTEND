import numbers from '@/constants/numbers';
import useLocationStore from '@/store/location';
import {useEffect, useRef, useState} from 'react';
import MapView, {LatLng, Region} from 'react-native-maps';

type Delta = Pick<Region, 'latitudeDelta' | 'longitudeDelta'>;

function useMoveMapView() {
  const [regionDelta, setRegionDelta] = useState<Delta>(numbers.INITIAL_DELTA);
  const {moveLocation, setMoveLocation} = useLocationStore();
  const mapRef = useRef<MapView | null>(null);

  const moveMapView = (coordinate: LatLng, delta?: Delta) => {
    mapRef.current?.animateToRegion({
      ...coordinate,
      ...(delta ?? regionDelta),
    });
  };

  const handleChangeDelta = (region: Region) => {
    const {latitudeDelta, longitudeDelta} = region;
    setRegionDelta({latitudeDelta, longitudeDelta});
  };

  useEffect(() => {
    if (moveLocation) {
      moveMapView(moveLocation);
      setMoveLocation(null); // 사용 후 상태 초기화
    }
  }, [moveLocation]);

  return {mapRef, moveMapView, handleChangeDelta};
}

export default useMoveMapView;
