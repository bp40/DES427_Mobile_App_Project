import {StyleSheet, Text, View, Image} from "react-native";
import React, {useState} from "react";
import {TextInput} from 'react-native-rapi-ui';
import {Button} from 'react-native-rapi-ui';
import {TouchableOpacity} from 'react-native';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from "../utils/firebaseConfig";


export default function Login({navigation}) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = useState(null);

    const handleSignIn = async () => {
        try {
            setError(null);  // Reset error message
            const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
            const user = userCredential.user;
            console.log('User signed in:', user);
            navigation.replace('Restaurant'); // Navigate to home screen after successful sign-in
        } catch (error) {
            setError(error.message);  // Set error if sign-in fails
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
                Login to your Account
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
            </View>

            <View style={{height: 18}}/>

            <Button style={{alignSelf: 'center'}} text="Login" status="danger" onPress={handleSignIn}/>

            <View style={{height: 12}}/>

            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={styles.normText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.linkText}> Sign up</Text>
                </TouchableOpacity>
            </View>

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

    normText: {
        color: '#9c9c9c',
    },

    linkText: {
        color: '#FC0505',
        fontWeight: '600',
        //textDecorationLine: 'underline'
    }


})


