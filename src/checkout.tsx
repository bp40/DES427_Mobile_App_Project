import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Button } from 'react-native-rapi-ui';


export default function CheckOut({ navigation }){
return(
    <View style = {styles.container} >
        <Text style={styles.header}>Delivery info</Text>
        <View style={{ height: 55 }} />
        <Text style = {styles.s_header}>Your MOM's Location</Text>
        <Text style = {styles.body}>Your MOM's Location</Text>
        <View style={{ height: 55 }} />
        <View style={{alignItems: 'center'}}> 
            <Button style = {{paddingHorizontal: 100 }}
                text="Confirm" 
                status="danger" 
                onPress={() => { navigation.navigate('DeliveryNot'); }}
            />
             <View style={{ height: 10 }} />
             <Button style = {{paddingHorizontal: 104 }}
                text="Cancel" 
                color = '#D9D9D9' 
                onPress={() => { navigation.navigate('Home'); }} 
            />
        </View>
    </View>
    
)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 30,
    },
    header: {
        fontFamily: 'Inter', 
        fontSize: 20, 
        color: 'black', 
        fontWeight: 'bold', textAlign: 'left'
    },
    s_header: {
        fontFamily: 'Inter', 
        fontSize: 12, 
        color: 'black', 
        fontWeight: '600', textAlign: 'left'
    },
    body : {
        fontFamily: 'Inter', 
        fontSize: 10, 
        color: 'black', 
        fontWeight: '600', textAlign: 'left'}

  });
  