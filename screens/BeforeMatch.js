import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Menu from '../components/menu.js';
import League from '../components/league.js';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from "react-native";
import FootballMatch from '../components/footballMatch.js';



export default function BeforeMatch({leagueId, navigation}) {

    return (
        <View style={styles.container}>
            <Menu nav={navigation}/>
            <League leagueID={leagueId} nav={navigation}/>
            <View>
            </View>
        </View>
      );
}



const styles = StyleSheet.create({
    container: {
      backgroundColor: '#100E21',
      height: '100%'
    },
});