import {StyleSheet, Text, View, Image} from "react-native";
import React from "react";
import {Button} from 'react-native-rapi-ui';

export default function DeliveryYes({navigation}) {

    const [date, setDate] = React.useState(new Date());

    return (

        //Loader.png

        <View style={styles.container}>
            <View style={{height: 18}}/>
            <View style={styles.row}>
                <Text style={styles.header}>Delivery Complete</Text>
                <Image
                    source={require('../assets/Check.png')} // For local image
                    style={{width: 25, height: 25, marginLeft: 6}}
                />
            </View>

            <View style={{height: 8}}/>

            <Text>
                <Text style={{color: '#757575'}}>Food Arrived at</Text>
                <Text style={{color: '#FC0505', fontWeight: '600'}}> {date.toLocaleTimeString()} </Text>
            </Text>
            <View style={{height: 120}}/>
            <View style={{alignItems: 'center'}}>

                <Image
                    source={require('../assets/complete.png')} // For local image
                    style={{width: 250, height: 250,}}
                />
                <View style={{height: 40}}/>

            </View>

            <View style={{height: 80}}/>
            <View style={{alignItems: 'center'}}>
                <Button style={{paddingHorizontal: 100}}
                        text="Return Home" status="danger" onPress={() => {
                    navigation.replace('Restaurant');
                }}/>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        padding: 30,
    },
    header: {
        fontFamily: 'Inter',
        fontSize: 25,
        color: 'black',
        fontWeight: 'bold', textAlign: 'left'
    },
    row: {
        flexDirection: 'row', // Aligns items in a horizontal row
        alignItems: 'center', // Vertically aligns the text and image in the center
    },
});
  