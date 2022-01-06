import React from "react";
import { View,Text,StyleSheet} from "react-native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

export default function Location() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 24.83073230,
            longitude: 67.10113298,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
           </MapView>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'red'
    },
    map: {
      flex: 1
    }
  })