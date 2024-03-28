import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';


export default function flipingcard({ id, filepath }) {
    return (
        <View key={id} style={styles.cardView }>
            <Image source={{ uri: filepath }} style={styles.imageStyle} />
            <Image source={require('../imgSrc/imageBack.png')} style={styles.imageStyle} />
        </View>

    )

} 


const styles = StyleSheet.create({
    imageStyle: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    cardView: {
        width: '25%', // Each card takes 25% of the container's width
        height: '25%', // Each card takes 25% of the container's height
        padding: 1, // Adjust padding as needed
    },
});