import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
    loadingContainer: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    searchInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
  
    //  Navigation.jsx style
    bottomCard: {
        position: 'absolute',
        backgroundColor: 'white',
        width: '100%',
        padding: 30,
        borderTopEndRadius: 24,
        borderTopStartRadius: 24,
        bottom: 0,
    },
    inputStyle: {
        backgroundColor: 'white',
        borderRadius: 4,
        borderWidth: 1,
        alignItems: 'center',
        height: 40,
        justifyContent: 'center',
        marginTop: 16,
    },
      
    // ChooseLocation.jsx
    chooselocation: {
        backgroundColor: 'white',
        flex: 1,
        padding: 24,
    },
    emptyView: {
        marginBottom: 16,
    },
      
    // AdressPickup.jsx
    containerStyle: {
        backgroundColor: 'white',
    },
    textInputStyle: {
        height: 48,
        color: 'black',
        fontSize: 16,
        backgroundColor: '#F3F3F3'
    }
}) 