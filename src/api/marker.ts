import {Marker} from '@/types/domain';
import {axiosInstance} from './axios';

async function getMarkers(): Promise<Marker[]> {
  const {data} = await axiosInstance.get('/marker/my');

  return data;
}

export {getMarkers};
