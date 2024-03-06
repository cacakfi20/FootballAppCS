import { StyleSheet, Text, Image, View } from 'react-native';
import React from 'react';


export default function tableTeam({ tym }) {
    return (
        <View style={styles.content}>
            <Text style={styles.position}>{tym.position}.</Text>
            <Text style={styles.name}>{tym.name}</Text>
            <Text style={styles.points}>{tym.points}</Text>
        </View>
        );
  }
  const styles = StyleSheet.create({
    content:{
        display: 'flex',
        flexDirection: 'row',
        height: 50,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#494949',
    },
    name: {
        color: 'white',
        fontSize: 20,
        marginLeft: 10,
        marginTop: 12.5,
        flex: 1
    },
    position:{
        color: 'white',
        fontSize: 16,
        marginLeft: 11,
        marginTop: 15,
    },
    points: {
        marginTop: 15,
        marginRight: 20,
        fontSize: 16,
        color: 'white',
        textAlign: 'right'
    }

});