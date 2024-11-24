import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-rapi-ui';
import {useAtomValue, useSetAtom} from "jotai";
import {cartAtom} from "./jotai";

type GroupedCartItem = {
    name: string;
    totalPrice: number;
    totalQuantity: number;
};

type MenuItem = {
    name: string;
    price: number;
};

export default function CartPage({route, navigation}) {
    const {restaurant} = route.params;

    const cart = useAtomValue(cartAtom);
    const setCart = useSetAtom(cartAtom);

    const totalPrice = cart.reduce((acc, item) => acc + parseInt(item.price.toString()), 0);

    const handleAddItem = (item: GroupedCartItem) => {

        const newItem: MenuItem = {
            name: item.name,
            price: item.totalPrice / item.totalQuantity,
        };

        // Add same item to cart
        setCart([...cart, newItem]);
    }

    const handleSubtractItem = (itemToRemove: GroupedCartItem) => {

        const indexOfItem = cart.findIndex(item => item.name === itemToRemove.name);
        if (indexOfItem !== -1) {
            const updatedCart = [...cart];
            updatedCart.splice(indexOfItem, 1);
            setCart(updatedCart);
        }

    }

    const groupedCart = new Map<string, GroupedCartItem>();

    cart.forEach(item => {
        if (groupedCart.has(item.name)) {
            // If item already exists in the map, update the quantity and total price
            const existingItem = groupedCart.get(item.name)!;
            existingItem.totalQuantity++;
            existingItem.totalPrice += parseInt(item.price.toString());
        } else {
            // If item does not exist in the map, add it
            groupedCart.set(item.name, {
                name: item.name,
                totalQuantity: 1,
                totalPrice: parseInt(item.price.toString())
            });
        }
    });

    const summarizedCart = Array.from(groupedCart.values());
    summarizedCart.sort((a, b) => a.name.localeCompare(b.name));


    return (
        <View>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>Checkout [No. Items: {cart.length}]</Text>
                {cart && cart.length > 0 ? (
                    <View style={styles.cartContainer}>
                        {summarizedCart.map((item, index) => (
                            <View key={index} style={styles.cartItem}>
                                <View style={styles.itemDetails}>
                                    <Text style={styles.itemName}>{item.name} x {item.totalQuantity}</Text>
                                    <Text style={styles.itemPrice}>฿{parseInt(item.totalPrice.toString())}</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.addButton}
                                    onPress={() => handleAddItem(item)}>
                                    <Text style={styles.deleteButtonText}>+</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.deleteButton}
                                    onPress={() => handleSubtractItem(item)}>
                                    <Text style={styles.deleteButtonText}>-</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                ) : (
                    <Text style={styles.emptyCartText}>No items in cart</Text>
                )}

                <Text style={styles.totalText} >Total: ฿{totalPrice}</Text>

                <Button
                    text="Confirm"
                    status="warning"
                    style={styles.checkoutButton}
                    onPress={() => navigation.navigate('Location', { restaurant: restaurant, totalPrice: totalPrice, totalQuantity: cart.length })}
                    disabled={cart.length === 0} // Disable the button if there are no items in the cart
                />
                <Button text="Back" status="danger" style={styles.checkoutButton} onPress={() => navigation.goBack()}/>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f8f8f8',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    Screen: {
        height: '85%',
    },
    header: {
        fontFamily: 'Inter',
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'left',
    },
    cartContainer: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: {width: 0, height: 5},
        elevation: 3,
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    itemDetails: {
        flexDirection: 'column',  // Items should be arranged vertically
        flex: 1,
    },
    itemName: {
        fontSize: 18,
        color: '#555',
    },
    itemPrice: {
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold',
    },
    emptyCartText: {
        fontSize: 18,
        color: '#999',
        textAlign: 'center',
        marginTop: 20,
    },
    checkoutButton: {
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 20,
    },
    totalText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginTop: 20
    },
    deleteButton: {
        backgroundColor: '#FF6347',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        margin: 5
    },
    addButton: {
        backgroundColor: '#17af3c',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        margin: 5
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },

});
