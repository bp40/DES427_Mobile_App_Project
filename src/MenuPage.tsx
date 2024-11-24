import React, {useState} from 'react';
import {View, Text, FlatList, TextInput, StyleSheet} from 'react-native';
import {Button} from 'react-native-rapi-ui';
import {RouteProp} from '@react-navigation/native';
import {LocationData} from './types';
import {useAtomValue, useSetAtom} from "jotai";
import {cartAtom} from "./jotai";

type MenuPageRouteProp = RouteProp<{ Menu: { restaurant: LocationData } }, 'Menu'>;

interface MenuPageProps {
    route: MenuPageRouteProp;
    navigation: any;
}

type MenuItem = {
    name: string;
    price: number;
};


const MenuPage = ({route, navigation}: MenuPageProps) => {
    const {restaurant} = route.params;

    const cart = useAtomValue(cartAtom);
    const setCart = useSetAtom(cartAtom);

    const [menu, setMenu] = useState<MenuItem[]>(restaurant.menu);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredMenu = menu.filter((menu) =>
        menu.name && menu.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddToCart = (item) => {
        setCart([...cart, item]);
    };


    return (
        <View style={styles.container}>
            <Text style={styles.restaurantName}>{restaurant.name}</Text>

            <TextInput
                style={styles.searchInput}
                placeholder="Search for a menu item"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />

            <FlatList
                data={filteredMenu}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                    <View style={styles.menuItem}>
                        <View style={styles.itemDetails}>
                            <View style={styles.nameRow}>
                                <Text style={styles.menuItemName}>{item.name}</Text>
                            </View>
                            <View style={styles.priceRow}>
                                <Text style={styles.menuItemPrice}>฿{item.price}</Text>
                            </View>
                        </View>
                        <Button
                            text="Add"
                            status="danger"
                            onPress={() => handleAddToCart(item)}
                            style={styles.addButton}
                        />
                    </View>
                )}
            />

            <Button text={`View Cart (${cart.length})`} style={styles.cartButton} status="warning"
                    onPress={() => navigation.navigate('Cart', {cart: cart, restaurant: restaurant})}/>
            <Button text="Back" status="danger" onPress={() => navigation.goBack()}/>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    restaurantName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    restaurantDescription: {
        marginVertical: 10,
        fontSize: 16,
    },
    menuItem: {
        marginBottom: 15,
        marginVertical: 10,
        borderBottomWidth: 1,
        paddingBottom: 10,
    },
    itemDetails: {
        marginBottom: 10, // Space between name, price and button
    },
    nameRow: {
        marginBottom: 5, // Adds space between the name and the price
    },
    priceRow: {
        marginBottom: 10, // Optional: adds space below the price before the button
    },
    menuItemName: {
        fontSize: 18,
    },
    menuItemPrice: {
        fontSize: 16,
        color: 'gray',
    },
    addButton: {
        marginTop: 10, // Space between price and button
    },
    cartButton: {
        marginTop: 20,
        marginBottom: 20,
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


export default MenuPage;
