import { StyleSheet, Text, View,Image } from 'react-native';
import React from 'react';


export default function SquadPlayerA({ player }) {
    if (player.position === "A")
    {
        return (
            <View style={{width: '100%', borderBottomColor: 'grey', borderBottomWidth: 1, paddingTop: '5%', paddingBottom: '5%', display: 'flex'}}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}> 
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{color: 'white', fontSize: 20, width: 30, textAlign: 'center', marginRight: 10, marginLeft: 10}}>{player.number}</Text>
                        <Image 
                            style={{ width: 23, height: 20, marginRight: 10 }}
                            source={{ uri: 'https://int.soccerway.com/media/v2.8.1/img/flags/24x24/plain/' + player.flags.split(' ')[2].replace("_16_right", "") + '.png' }}
                        />
                        <Text style={{ color: 'white', fontSize: 20 }}>{player.players}</Text>
                    </View>
                    <Text style={{color: 'white', fontSize: 20, marginRight: 20}}>{player.age}</Text>
                </View>
            </View>
          );
    }
}