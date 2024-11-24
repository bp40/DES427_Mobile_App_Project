import React, {useEffect, useState} from 'react';
import {ScrollView, View, StyleSheet, Text, Image, TextInput} from 'react-native';
import {Layout, Button} from 'react-native-rapi-ui';
import {db} from "../utils/firebaseConfig";
import {collection, getDocs} from "firebase/firestore";
import {useSetAtom} from "jotai/index";
import {cartAtom} from "./jotai";

type MenuItem = {
    name: string;
    price: number;
};

type LocationData = {
    image_url: string;
    lat: string;
    lon: string;
    menu: MenuItem[];
    id: string;
    name: string;
    rating: Number
};

const RestaurantBrowsePage = ({navigation}) => {

    const [restaurants, setRestaurants] = useState<LocationData[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const setCart = useSetAtom(cartAtom);

    // Filtered restaurants based on search query
    const filteredRestaurants = restaurants.filter((restaurant) =>
        restaurant.name && restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleNavigateToMenu = (restaurant: LocationData) => {
        setCart([]); // Clear
        navigation.navigate('Menu', {restaurant: restaurant});
    };

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'restaurants'));

                const fetchedRestaurants: LocationData[] = [];
                querySnapshot.forEach((doc) => {
                    const restaurant = doc.data() as LocationData; // Cast doc data as LocationData type
                    restaurant.id = doc.id; // Set the restaurant ID
                    fetchedRestaurants.push(restaurant); // Push to array
                    console.log(restaurant.name);
                });

                setRestaurants(fetchedRestaurants); // Set all fetched restaurants at once
            } catch (error) {
                console.error('Error fetching restaurants:', error);
            }
        };

        fetchRestaurants();
    }, []);

    return (
        <Layout style={styles.container}>
            {/* Search Field */}
            <TextInput
                style={styles.searchInput}
                placeholder="Search for a restaurant"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />

            {/* Restaurant List */}
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {filteredRestaurants.map((restaurant) => (
                    <View key={restaurant.id} style={styles.card}>
                        <Image source={{uri: restaurant.image_url}} style={styles.restaurantImage}/>
                        <View style={styles.textContainer}>
                            <Text style={styles.restaurantName}>{restaurant.name}</Text>
                            <Text style={styles.restaurantDescription}>{"" + restaurant.rating}</Text>
                        </View>
                        <Button
                            status="danger"
                            text="Browse Menu"
                            onPress={() => handleNavigateToMenu(restaurant)}
                        />
                    </View>
                ))}
            </ScrollView>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#f9f9f9',
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    card: {
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        elevation: 5,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    restaurantImage: {
        width: '100%',
        height: 180,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    textContainer: {
        padding: 15,
    },
    restaurantName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    restaurantDescription: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
    },
    searchInput: {
        height: 40,
        marginHorizontal: 20,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 10,
        marginBottom: 20,
        fontSize: 16,
        backgroundColor: '#fff',
        color: '#333',
    },
});

export default RestaurantBrowsePage;
