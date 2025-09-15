import axios from 'axios';
import {useEffect, useState} from 'react';
import Config from 'react-native-config';
import {LatLng} from 'react-native-maps';

function useGetAddress(location: LatLng) {
  const {latitude, longitude} = location;
  const [result, setResult] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const {data} = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=street_address&language=ko&key=${Config.GOOGLE_MAP_API_KEY}`,
        );
        const address = data.results.length
          ? data.results[0].formatted_address
          : `${latitude.toFixed(4)} , ${longitude.toFixed(4)}`;
        setResult(address);
      } catch (error) {
        console.log(error);
        setResult('주소를 알 수 없습니다');
      }
    })();
  }, [longitude, latitude]);

  return result;
}

export default useGetAddress;
