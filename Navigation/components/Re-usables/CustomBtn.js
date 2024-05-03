import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomBtn = ({
    onPress = () => { },
    btnStyle = {},
    textStyle = {},
    btnText
}) => {
  return (
    <TouchableOpacity
        onPress={onPress}
        style= {{...styles.btnStyle, ...btnStyle}}
    >
        <Text style={{ ...styles.textStyle, ...textStyle }}>{btnText}</Text>
    </TouchableOpacity>
  );
}

export default CustomBtn;

const styles = StyleSheet.create({

    btnStyle: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#004AAD',
        borderWidth: 1,
        color: 'white',
        borderBlockColor: '#004AAD',
        borderRadius: 8,
    },
    textStyle: { // Define default text style (optional)
        color: 'white',
        fontWeight: 'bold' // Default text color
    },
})