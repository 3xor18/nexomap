import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Overlay } from 'react-native-elements'

export default function Loading(props) {
    const { isVisible, text } = props;

    return (
        <Overlay
            overlayStyle={styles.overlay}
            isVisible={isVisible}
            windowBackgroundColor='rgba(0,0,0,0.5)'
            overlayBackgroundColor='transparent'
        >
            <View style={styles.view}>
                <ActivityIndicator size='large' color='#ff6e17ff' />
                {text && <Text>{text}</Text>}
            </View>
        </Overlay>
    );
}

const styles = StyleSheet.create({
    overlay: {
        height: 100,
        width: 200,
        backgroundColor: '#fff',
        borderColor: '#ff6e17ff',
        borderWidth: 2,
        borderRadius: 10
    },
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
