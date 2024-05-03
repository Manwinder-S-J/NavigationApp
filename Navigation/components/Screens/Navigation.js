import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

import { GOOGLE_MAPS_APIKEY } from '../../key/googleMapKey';
import ImagePath from '../ImagePath';
import { styles } from '../../styles/styles';
import { showError, useLocationPermission, getCurrentLocation } from '../../helper/HelperFunction';

const Navigation = () => {
  const [state, setState] = useState({
    curLoc: null,
    destinationCords: {},
    isLoading: false,
  });

  const { curLoc, destinationCords } = state;
  const mapRef = useRef(null);
  const navigation = useNavigation();
  // Assuming useLocationPermission returns a boolean
  const permissionGranted = useLocationPermission();

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const { latitude, longitude } = await getCurrentLocation();
        setState(prevState => ({
          ...prevState,
          curLoc: { latitude, longitude },
        }));
      } catch (error) {
        showError(error);
      }
    };

    if (permissionGranted) {
      fetchLocation();
    } else {
      showError('Location permission not granted');
    }
  }, [permissionGranted]);

  const onPressLocation = () => {
    navigation.navigate('ChooseLocation', { getCordinates: fetchValues });
  };

  const fetchValues = (data) => {
    setState(prevState => ({
      ...prevState,
      destinationCords: data.destinationCords,
    }));
  };

  if (!curLoc) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Loading...</Text></View>;

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={curLoc ? {
          latitude: curLoc.latitude,
          longitude: curLoc.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        } : undefined}
      >
        {curLoc && (
          <Marker
            coordinate={curLoc}
            title="Current Location"
            image={ImagePath.icCurLoc}
          />
        )}
        {Object.keys(destinationCords).length > 0 && (
          <Marker
            coordinate={destinationCords}
            title="Drop Location"
            image={ImagePath.icGreenMarker}
          />
        )}
        {Object.keys(destinationCords).length > 0 && (
          <MapViewDirections
            origin={curLoc}
            destination={destinationCords}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor="hotpink"
            optimizeWaypoints={true}
            onReady={() => {
              // Removed automatic fitting to route coordinates to keep user-controlled map zoom and position
            }}
          />
        )}
      </MapView>
      <View style={styles.bottomCard}>
        <Text>Where are you going...?</Text>
        <TouchableOpacity style={styles.inputStyle} onPress={onPressLocation}>
          <Text>Choose your location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Navigation;
