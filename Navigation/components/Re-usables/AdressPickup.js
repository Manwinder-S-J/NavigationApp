import React from 'react';
import { View, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { GOOGLE_MAPS_APIKEY } from '../../key/googleMapKey';
import { styles } from '../../styles/styles';

const AdressPickup = ({
    placeholderText,
    fetchAddress
}) => {
  const onPressAddress = (data, details) => {
    // console.log("details===>", details)
    const lat = details.geometry.location.lat
    const lng = details.geometry.location.lng
    fetchAddress(lat, lng)
  }
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder={placeholderText}
        onPress={onPressAddress}
        fetchDetails={true}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'en',
        }}
        styles={{
            textInputContainer: styles.containerStyle,
            textInput: styles.textInputStyle
        }}
      />
    </View>
  );
}

export default AdressPickup;