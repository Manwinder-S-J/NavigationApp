import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from '../../styles/styles';
import AdressPickup from '../Re-usables/AdressPickup';
import CustomBtn from '../Re-usables/CustomBtn';
import { showError, showSuccess, getCurrentLocation } from '../../helper/HelperFunction';

export default function ChooseLocation(props) {
  const navigation = useNavigation();

  const [state, setState] = useState({
    pickupCords: {},
    destinationCords: {}
  });

  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  const { pickupCords, destinationCords } = state;

  const checkValid = () => {
    if (!useCurrentLocation && Object.keys(pickupCords).length === 0) {
      showError('Please enter your pickup location');
      return false;
    }
    if (Object.keys(destinationCords).length === 0) {
      showError('Please enter your destination cords');
      return false;
    }
    return true;
  };

  const onDone = () => {
    const isValid = checkValid();
    console.log("is valid...?", isValid);
    if (isValid) {
      props.route.params.getCordinates({
        pickupCords,
        destinationCords
      });
      showSuccess("Route successfully created");
      navigation.goBack();
    }
  };

  const toggleUseCurrentLocation = async () => {
    setUseCurrentLocation(previousState => !previousState);
    if (!useCurrentLocation) {
      try {
        const { latitude, longitude } = await getCurrentLocation();
        setState({
          ...state,
          pickupCords: {
            latitude,
            longitude
          }
        });
      } catch (error) {
        showError(error);
      }
    } else {
      setState({
        ...state,
        pickupCords: {}
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        keyboardShouldPersistTaps='handled'
        style={styles.chooselocation}
      >
        <View style={styles.switchContainer}>
          <Text>Use Current Location for Pickup:</Text>
          <Switch
            value={useCurrentLocation}
            onValueChange={toggleUseCurrentLocation}
          />
        </View>
        {!useCurrentLocation && (
          <AdressPickup
            placeholderText="Enter pickup location"
            fetchAddress={(lat, lng) => setState({
              ...state, pickupCords: {
                latitude: lat,
                longitude: lng
              }
            })}
          />
        )}
        <View style={styles.emptyView}/>
        <AdressPickup
          placeholderText="Enter destination location"
          fetchAddress={(lat, lng) => setState({
            ...state, destinationCords: {
              latitude: lat,
              longitude: lng
            }
          })}
        />
        <CustomBtn
          btnText="Submit"
          btnStyle={{ marginTop: 24 }}
          onPress={onDone}
        />
      </ScrollView>
    </View>
  );
}
