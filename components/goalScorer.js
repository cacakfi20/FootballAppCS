import { StyleSheet, Text, Image, View } from 'react-native';
import React from 'react';


export default function GoalScorer({ goalScorer }) {
    console.log(goalScorer);
    return (
        <View > 
            {goalScorer.away == false &&(                
            <View style={styles.content}>
                <Text style={styles.minute}>{goalScorer.minute}</Text>
                <View>
                    <Image style={styles.image} source={{uri: goalScorer.image}}></Image>
                </View>
                <Text style={styles.name}>{goalScorer.name}</Text>
                <Text style={styles.assist}>{goalScorer.assist}</Text>
            </View>
            )}
            {goalScorer.away == true && (
                <View style={styles.awaycontent}>
                    <Text style={styles.awayassist}>{goalScorer.assist}</Text>
                    <Text style={styles.awayname}>{goalScorer.name}</Text>
                    <View>
                        <Image style={styles.awayimage} source={{uri: goalScorer.image}}></Image>
                    </View>
                    <Text style={styles.awayminute}>{goalScorer.minute}</Text>
                </View>
            )}
        </View>
        );
  }
  const styles = StyleSheet.create({
    content:{
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10
    },
    name: {
        color: 'white',
        fontSize: 15,
        paddingLeft: 10,
        marginTop: 2,
        maxWidth: "80%",
    },
    assist:{
        color: '#b7adad',
        fontSize: 10,
        marginTop: 6,
        marginLeft: 5
    },
    image:{
        width: '5%',
        height: '50%',
        marginLeft: 6,
        marginTop: 3,
        width: 16, 
        height: 16
    },
    minute:{
        color: 'white',
        fontSize: 15,
        marginLeft: 11,
        maxWidth: '80%',
        marginTop: 4
    },
    awaycontent:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10
    },
    awayname: {
        color: 'white',
        fontSize: 15,
        paddingLeft: 10,
        maxWidth: "80%",
        marginTop: 2
    },
    awayassist:{
        color: '#b7adad',
        fontSize: 12,
        marginTop: 6,
        marginLeft: 5
    },
    awayimage:{
        width: '5%',
        height: '50%',
        marginLeft: 6,
        marginTop: 3,
        width: 16, 
        height: 16
    },
    awayminute:{
        color: 'white',
        fontSize: 15,
        marginLeft: 11,
        maxWidth: '80%',
        marginTop: 4
    }
});