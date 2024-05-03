import React, { useState, useEffect } from "react";
import { showMessage } from "react-native-flash-message";
import * as Location from 'expo-location';

// Utility functions for showing messages
export const showError = (message) => {
    showMessage({
        message,
        type: 'danger',
        icon: 'danger',
    });
};

export const showSuccess = (message) => {
    showMessage({
        message,
        type: 'success',
        icon: 'success',
    });
};

// Custom hook for location permission
export const useLocationPermission = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
  
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let locationResult = await Location.getCurrentPositionAsync({});
        setLocation(locationResult);
      })();
    }, []);

    return { location, errorMsg };
};

export const getCurrentLocation = () => new Promise(async (resolve, reject) => {
    try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            reject('Permission to access location was denied');
            return;
        }

        const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        const cords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        };
        resolve(cords);
    } catch (error) {
        reject(error.message);
    }
});
