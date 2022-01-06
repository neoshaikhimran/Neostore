import React from "react";
import { View,TextInput,StyleSheet} from "react-native";


export default function Search() {
    return (
      <View style={styles.Container}>
        <TextInput placeholder="Search" style={styles.Search}></TextInput>
      </View>
    );
  }

  const styles = StyleSheet.create({
      Container:{
        backgroundColor:'white',
      },
      Search:{
            borderRadius:25
      }
  })