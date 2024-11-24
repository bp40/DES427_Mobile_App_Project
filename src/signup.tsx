import {StyleSheet, Text, View, Image} from "react-native";
import React, {useState} from "react";
import {TextInput} from 'react-native-rapi-ui';
import {Button} from 'react-native-rapi-ui';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebaseConfig';

export default function SignUp({navigation}) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = useState(null);

    const handleSignUp = async () => {
        try {
            setError(null);  // Reset error message
            const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
            const user = userCredential.user;
            console.log('User created:', user);
            navigation.replace('Restaurant'); // Navigate to another screen after successful sign-up
        } catch (error) {
            setError(error.message);  // Set error if sign-up fails
        }
    };

    return (

        <View style={styles.container}>
            <View style={{height: 55}}/>
            <View style={{alignItems: 'center'}}>
                <Image
                    source={require('../assets/logo_transparent.png')} // For local image
                    style={{width: 213, height: 113}}
                />
            </View>

            <View style={{height: 50}}/>

            <Text style={{fontFamily: 'Inter', fontSize: 20, color: 'black', fontWeight: '600', textAlign: 'center'}}>
                Create your Account
            </Text>

            <View style={{height: 18}}/>

            <View style={styles.input}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={(val) => setEmail(val)}
                />


                <View style={{height: 18}}/>


                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(val) => setPassword(val)}
                />
                <View style={{height: 18}}/>

            </View>

            <View style={{height: 18}}/>

            <Button style={{alignSelf: 'center'}} text="Submit" status="danger" onPress={handleSignUp}/>

            {error ? (
                <Text style={{color: 'red', fontSize: 12, marginTop: 5}}>
                    {error}
                </Text>
            ) : null}


        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        padding: 70
    },
    input: {
        width: 250
    },

    signin_q: {
        alignItems: 'center'
    },

    normText: {
        color: '#9c9c9c',
    },

    linkText: {
        color: '#FC0505',
        textDecorationLine: 'underline'
    }


})