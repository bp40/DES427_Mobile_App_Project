import {StyleSheet, Text, View, Image} from "react-native";
import React, {useEffect, useState} from "react";
import {Button} from 'react-native-rapi-ui';
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../utils/firebaseConfig";
import * as Location from "expo-location";
import {useFocusEffect, useIsFocused} from "@react-navigation/native";

function toRad(degrees: number): number {
    return degrees * Math.PI / 180;
}

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    // Radius of the Earth in kilometers
    const R = 6371;

    // Convert degrees to radians
    const lat1Rad = toRad(lat1);
    const lon1Rad = toRad(lon1);
    const lat2Rad = toRad(lat2);
    const lon2Rad = toRad(lon2);

    // Differences in coordinates
    const dlat = lat2Rad - lat1Rad;
    const dlon = lon2Rad - lon1Rad;

    // Haversine formula
    const a = Math.sin(dlat / 2) * Math.sin(dlat / 2) +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) *
        Math.sin(dlon / 2) * Math.sin(dlon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Distance in kilometers
    const distance = R * c;

    return distance;
}

function calculateTravelTime(distance: number, speed: number): number {
    // Time = Distance / Speed
    return distance / speed;
}

function formatMinutesToHHMMSS(minutes: number): string {
    // Calculate hours, minutes, and seconds
    let hours = Math.floor(minutes / 60);
    let remainingMinutes = Math.floor(minutes % 60);
    let seconds = Math.floor((minutes * 60) % 60);

    // Format the result as hh:mm:ss
    return `${padZero(hours)}:${padZero(remainingMinutes)}:${padZero(seconds)}`;
}

// Helper function to ensure two digits for hours, minutes, and seconds
function padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
}

export default function DeliveryNot({route, navigation}) {
    const {restaurant ,totalPrice, totalQuantity} = route.params;

    const [restaurantData, setRestaurantData] = React.useState([]);
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [distance, setDistance] = useState(0);
    const [travelTimeMinutes, setTravelTimeMinutes] = useState(0);

    useEffect(() => {

        setLocation(null);
        setRestaurantData([]);
        setDistance(0);
        setTravelTimeMinutes(0);
        setErrorMsg(null);

        // Function to fetch restaurant data based on its name
        const fetchData = async () => {
            try {
                const q = query(collection(db, 'restaurants'), where('name', '==', restaurant.name));
                const querySnapshot = await getDocs(q);
                const restaurant_result = querySnapshot.docs.map(doc => doc.data());
                return restaurant_result; // Return the fetched data
            } catch (error) {
                console.error('Error getting documents: ', error);
                return []; // Return empty array in case of error
            }
        };

        // Function to get the user's current location
        const getLocation = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return null; // Return null if location access is denied
            }
            const location = await Location.getCurrentPositionAsync({});
            return location.coords; // Return location coordinates
        };

        // Main async function to handle both data fetching and location retrieving
        const fetchRestaurantDataAndLocation = async () => {
            const location = await getLocation(); // Get location first
            if (!location) return; // If location is null (permission denied), exit early

            const restaurantData = await fetchData(); // Fetch restaurant data
            if (restaurantData.length === 0) return; // If no restaurant data, exit early

            const { lat, lon } = restaurantData[0]; // Extract lat/lon from the first restaurant's data

            // Calculate distance and travel time
            const distance = haversineDistance(location.latitude, location.longitude, lat, lon);
            const travelTimeMinutes = calculateTravelTime(distance, 50) * 60;

            setLocation(location); // Set the location state
            setRestaurantData(restaurantData); // Set the restaurant data state
            setDistance(distance); // Set the calculated distance
            setTravelTimeMinutes(travelTimeMinutes); // Set the calculated travel time

            // Debugging logs
            console.log("Restaurant Data:", restaurantData);
            console.log("Location:", location);
            console.log("Location restaurant lat", lat)
            console.log("Location restaurant lon", lon)
            console.log("Distance:", distance);
            console.log("Travel Time (Minutes):", travelTimeMinutes);
        };

        fetchRestaurantDataAndLocation(); // Call the function to start the process

        console.log("test");

    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            // Convert minutes to seconds
            let timeInSeconds = travelTimeMinutes * 60;

            // Decrement by one second
            timeInSeconds -= 1;

            // Convert back to minutes
            const updatedTimeInMinutes = timeInSeconds / 60;

            // Update state with the new time
            setTravelTimeMinutes(updatedTimeInMinutes);
        }, 1000); // 1000ms = 1 second

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, [travelTimeMinutes]);

    useFocusEffect(
        React.useCallback(() => {

            if (travelTimeMinutes <= 0 && location) {
                console.log('Navigating to DeliveryYes');
                navigation.replace('DeliveryYes');
            }

        }, [travelTimeMinutes])
    );


    if (!location) {
        return <Text>Loading...</Text>;
    }

    return (

        <View style={styles.container}>
            <View style={{height: 18}}/>
            <View style={styles.row}>
                <Text style={styles.header}>Delivery in Process</Text>
                <Image
                    source={require('../assets/Loader.png')} // For local image
                    style={{width: 25, height: 25, marginLeft: 6}}
                />
            </View>

            <View style={{height: 8}}/>

            <Text>
                <Text style={{color: '#757575'}}>Food will Arrive in</Text>
                <Text style={{color: '#FC0505', fontWeight: '600'}}> {formatMinutesToHHMMSS(travelTimeMinutes)}</Text>
            </Text>
            <View style={{height: 120}}/>
            <View style={{alignItems: 'center'}}>
                <Image
                    source={require('../assets/rider.png')} // For local image
                    style={{width: 250, height: 250,}}
                />
                <View style={{height: 40}}/>
                <Text style={{color: '#757575'}}>We will notify you once your food arrives</Text>
                <Text style={{color: '#757575'}}> Total Price: ฿{totalPrice} / Total Quantity: {totalQuantity}</Text>

            </View>

            {/* Delete this  */}

            <View style={{height: 40}}/>
            {/*<Button text="TEST" status="danger" onPress={() => {*/}
            {/*    navigation.navigate('DeliveryYes');*/}
            {/*}}/>*/}

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
  