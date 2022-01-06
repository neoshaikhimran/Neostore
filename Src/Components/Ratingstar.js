import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text,  View,TouchableOpacity,Image } from "react-native";

function Ratingstar({route}) {
  const{name}=route.params;
  
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Image source={{uri:`https://nameless-savannah-21991.herokuapp.com/images/productImages/${name.image}`}} style={styles.Image}/>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.Buttontwo}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.texLogin}>Rating</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
   
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  Buttontwo:{
    marginLeft:20,
    borderRadius:50,
    backgroundColor:'red',
    height:40,
    width:150,
    border:5
    

},
texLogin:{
textAlign:'center',
fontSize:20,
fontWeight:'bold',
color:'white',
marginTop:5

},
Image:{
  height:350,
  width:300,
  justifyContent:'center',
  alignItems: 'center',
  resizeMode: 'contain'
},
});

export default Ratingstar;