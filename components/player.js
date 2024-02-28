import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';


export default function Player({ hrac }) {

    if (hrac.name == '')
    {
        return;
    } else {
        return (
            <View style={styles.content}>
              <Text style={styles.playerNumber}>{hrac.shirtNumber}</Text>
              <Text style={styles.playerName}>{hrac.name}</Text>
              
              <Image style={styles.bookingImage} source={{uri: hrac.bookingLink}}></Image>
              <Text style={styles.bookingMinute}>{hrac.bookingMinute}</Text>
            </View>
          );
    }
  }

  const styles = StyleSheet.create({
    content:{
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        borderColor: '#9E9E9E',
        borderWidth: 1
    },
    playerName: {
        color: 'white',
        fontSize: 15,
        paddingLeft: 10
    },
    playerNumber:{
        color: 'white',
        fontSize: 15
    },
    bookingImage:{
        width: '8%',
        height: '65%'
    },
    bookingMinute:{
        color: 'white',
        fontSize: 15
    }
});