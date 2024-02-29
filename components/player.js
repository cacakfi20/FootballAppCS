import { StyleSheet, Text, ScrollView, Image, View } from 'react-native';
import React from 'react';


export default function Player({ hrac }) {
    if (hrac.name == '')
    {
        return;
    } else {
        return (
            <ScrollView horizontal={true} style={styles.content}>
              <Text style={styles.playerNumber}>{hrac.shirtNumber}</Text>
              <Text style={styles.playerName}>{hrac.name}</Text>
              <View style={{width: 15, height: 15}}>
                <Image style={styles.bookingImage} source={{uri: hrac.bookingLink}}></Image>
              </View>
              <Text style={styles.bookingMinute}>{hrac.bookingMinute}</Text>
            </ScrollView>
          );
    }
  }
  const styles = StyleSheet.create({
    content:{
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        borderLeftColor: 'black',
        borderLeftWidth: 0.5,
        borderRightColor: 'black',
        borderRightWidth: 0.5,
        width: '100%',
        overflow: 'hidden',
        height: 'auto'
    },
    playerName: {
        color: 'white',
        fontSize: 15,
        paddingLeft: 10,
        maxWidth: "80%",
    },
    playerNumber:{
        color: 'white',
        fontSize: 15,
        maxWidth: '80%'
    },
    bookingImage:{
        width: '100%',
        height: '100%',
        marginLeft: 6,
        marginTop: 2
    },
    bookingMinute:{
        color: 'white',
        fontSize: 15,
        marginLeft: 11,
        maxWidth: '80%',
    }
});