import {StyleSheet, Text, View, Image} from "react-native";
import React, {useEffect, useState} from "react";
import {Button} from 'react-native-rapi-ui';
import MapView, {Callout, Marker} from 'react-native-maps';

import * as Location from 'expo-location';

export default function LocationPage({route, navigation}) {
    const {restaurant, totalPrice, totalQuantity} = route.params;

    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);
        })();
    }, []);

    if (errorMsg) {
        return <Text>{errorMsg}</Text>;
    }

    if (!location) {
        return <Text>Loading...</Text>;
    }

    const lat = parseFloat(restaurant.lat);
    const lon = parseFloat(restaurant.lon);
    console.log("test", restaurant.name);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Location</Text>
            <View style={{height: 55}}/>

            <View style={{ flex: 1 }}>
                <MapView
                    style={{ flex: 1 }}
                    showsUserLocation={true}
                    region={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {/* User Location Marker */}
                    <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />

                    {/* Restaurant Marker with Callout */}
                    <Marker coordinate={{ latitude: lat, longitude: lon }}>
                        <Callout tooltip={true} onPress={() => console.log('pressed')}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                {restaurant.name}
                            </Text>
                        </Callout>
                    </Marker>
                </MapView>
            </View>


            <View style={{height: 55}}/>
            <Button text="Confirm" status="danger" onPress={() => navigation.replace('DeliveryNot', {restaurant: restaurant, totalPrice: totalPrice, totalQuantity: totalQuantity})}/>
            <View style={{height: 55}}/>

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
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold', textAlign: 'left'
    }
});
  