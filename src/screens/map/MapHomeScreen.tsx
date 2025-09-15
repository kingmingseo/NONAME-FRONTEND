import {Alert, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import MapView, {LatLng, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import DrawerButton from '@/components/common/DrawerButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '@/constants/colors';
import useUserLocation from '@/hooks/useUserLocation';
import numbers from '@/constants/numbers';
import usePermission from '@/hooks/usePermission';
import Toast from 'react-native-toast-message';
import CustomMarker from '@/components/common/CustomMarker';
import useMoveMapView from '@/hooks/useMoveMapView';
import MapIconButton from '@/components/map/MapIconButton';
import {StackNavigationProp} from '@react-navigation/stack';
import {MapStackParamList} from '@/types/navigation';
import {useNavigation} from '@react-navigation/native';
import useGetMarkers from '@/hooks/queries/useGetMarkers';
import MarkerModal from '@/components/map/MarkerModal';
import useModal from '@/hooks/useModal';
import useLocationStore from '@/store/location';
import MarkerFilterAction from '@/components/map/MarkerFilterAction';
import useFilterStore from '@/store/filter';
import useThemeStorage from '@/hooks/useThemeStorage';
import {Theme} from '@/store/theme';

type Navigation = StackNavigationProp<MapStackParamList>;

const MapHomeScreen = () => {
  const navigation = useNavigation<Navigation>();
  const inset = useSafeAreaInsets();
  const {filters} = useFilterStore();
  const {theme} = useThemeStorage();
  const styles = styling(theme);
  const [markerId, setMarkerId] = useState<number>();
  const {data: markers = []} = useGetMarkers({
    select: data =>
      data.filter(
        marker =>
          filters[marker.color] === true &&
          filters[String(marker.score)] === true,
      ),
  });
  const {selectedLocation, setSelectedLocation} = useLocationStore();
  const {userLocation, isUserLocationError} = useUserLocation();
  const {mapRef, moveMapView, handleChangeDelta} = useMoveMapView();
  const markerModal = useModal();
  const filterAction = useModal();
  usePermission('LOCATION');

  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      Toast.show({
        type: 'error',
        text1: '위치 권한을 허용해주세요',
        position: 'bottom',
      });
      return;
    }
    moveMapView(userLocation);
  };

  const handlePressMarker = (coordinate: LatLng, id: number) => {
    moveMapView(coordinate);
    setMarkerId(id);
    markerModal.show();
  };

  const handlePressAddPost = () => {
    if (!selectedLocation) {
      Alert.alert(
        '추가할 위치를 선택해주세요',
        '지도를 길게 누르면 위치가 선택됩니다',
      );
      return;
    }
    navigation.navigate('AddLocation', {location: selectedLocation});
    setSelectedLocation(null);
  };
  return (
    <>
      <DrawerButton
        style={[styles.drawerButton, {top: inset.top + 10}]}
        color={colors[theme].WHITE}
      />
      <MapView
        userInterfaceStyle={theme}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        region={{
          ...(userLocation ?? {...numbers.INITIAL_LOCATION}),
          ...numbers.INITIAL_DELTA,
        }}
        googleMapId="2d4c0cadf28fc1a5c3924c8a"
        onRegionChangeComplete={handleChangeDelta}
        toolbarEnabled={false}
        onLongPress={({nativeEvent}) =>
          setSelectedLocation(nativeEvent.coordinate)
        }>
        {markers.map(({id, color, score, ...coordinate}) => (
          <CustomMarker
            key={id}
            color={color}
            coordinate={coordinate}
            score={score}
            onPress={() => handlePressMarker(coordinate, id)}
          />
        ))}
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>
      <View style={styles.buttonList}>
        <MapIconButton
          name="magnifying-glass"
          onPress={() => navigation.navigate('SearchLocation')}
        />
        <MapIconButton name="filter" onPress={filterAction.show} />
        <MapIconButton name="plus" onPress={handlePressAddPost} />

        <MapIconButton
          name="location-crosshairs"
          onPress={handlePressUserLocation}
        />
      </View>
      <MarkerModal
        markerId={Number(markerId)}
        isVisible={markerModal.isVisible}
        hide={markerModal.hide}
      />
      <MarkerFilterAction
        isVisible={filterAction.isVisible}
        hideAction={filterAction.hide}
      />
    </>
  );
};

export default MapHomeScreen;

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerButton: {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1,
      paddingVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: colors[theme].PINK_700,
      borderTopRightRadius: 50,
      borderBottomRightRadius: 50,
      boxShadow: '1px 1px 3px rbga(0,0,0,0.5)',
    },

    buttonList: {
      position: 'absolute',
      bottom: 70,
      right: 20,
      zIndex: 1,
    },
  });
