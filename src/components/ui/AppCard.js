import React from 'react'
import { StyleSheet, View} from 'react-native'

export const AppCard = props => (
    <View style={ {...styles.default, ...props.style} }>
        {props.children}
    </View>
)

const styles = StyleSheet.create({
    default: {
        //borderWidth: 2,
        backgroundColor: '#fff',
        borderColor: 'green',
        borderRadius: 10,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowRadius: 2,
        shadowOpacity: 0.3,
        shadowOffset: {width: 2, height:2},
        elevation: 8
    }
})