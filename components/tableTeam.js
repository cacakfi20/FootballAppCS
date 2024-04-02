import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';


export default function tableTeam({ tym }) {
    const nav = useNavigation();

    const handleTeamPress = (link) => {
        nav.push('Team', link)
    }
    return (
        <TouchableOpacity onPress={() => handleTeamPress(tym.link)} style={styles.content}>
            <Text style={styles.position}>{tym.position}.</Text>
            <Image style={styles.image} source={{uri: tym.logo}}></Image>
            <Text style={styles.name}>{tym.name}</Text>
            <Text style={styles.mp}>{tym.mp}</Text>
            <Text style={styles.points}>{tym.points}</Text>
        </TouchableOpacity>
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
        justifyContent: 'space-between'
    },
    name: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
        marginTop: 14.5,
        flex: 1
    },
    position:{
        color: 'white',
        fontSize: 16,
        marginLeft: 11,
        marginTop: 15,
        width: 25
    },
    mp:{
        color: 'white',
        marginTop: 15,
        marginRight: 20,
        fontSize: 16,
        color: 'white',
        textAlign: 'right'
    },
    points: {
        marginTop: 15,
        marginRight: 20,
        fontSize: 16,
        color: 'white',
        textAlign: 'right'
    },
    image:{
        height: 30,
        width: 30,
        marginTop: 8,
        marginLeft: 10        
    }
});