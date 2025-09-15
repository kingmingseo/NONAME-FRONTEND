import Geolocation from "@react-native-community/geolocation";
import { useEffect, useState } from "react";
import { LatLng } from "react-native-maps";
import useAppState from "./useAppstate";
import numbers from "@/constants/numbers";

function useUserLocation() {
  const [userLocation, setUserLocation] = useState<LatLng>({
    ...numbers.INITIAL_LOCATION
  }

  );
  const [isUserLocationError, setIsUserLocationError] = useState(false);
  const { isComeback } = useAppState();
  useEffect(() => {
    if (!isComeback) {
      return
    }
    Geolocation.getCurrentPosition(
      info => {
        setUserLocation(info.coords)
        setIsUserLocationError(false)
      },
      () => setIsUserLocationError(true),
    );
  }, [isComeback]);



  return { userLocation, isUserLocationError }
}



export default useUserLocation