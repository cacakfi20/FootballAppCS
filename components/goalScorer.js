import { StyleSheet, Text, Image, View } from 'react-native';
import React from 'react';


export default function GoalScorer({ goalScorer }) {
    return (
        <View style={styles.content}>
            <Text style={styles.name}>{goalScorer.name}</Text>
            <Text style={styles.minute}>{goalScorer.minute}</Text>
            <View style={{width: 350, height: 35}}>
                <Image style={styles.image} source={{uri: goalScorer.image}}></Image>
            </View>
        </View>
        );
  }
  const styles = StyleSheet.create({
    content:{
        display: 'flex',
        flexDirection: 'row',
    },
    name: {
        color: 'white',
        fontSize: 20,
        paddingLeft: 10,
        maxWidth: "80%",
    },
    image:{
        width: '5%',
        height: '50%',
        marginLeft: 6,
        marginTop: 2
    },
    minute:{
        color: 'white',
        fontSize: 15,
        marginLeft: 11,
        maxWidth: '80%',
    }
});