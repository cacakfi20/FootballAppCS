import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function DateBar({ nav ,setSelectedUrl}) {
  const dnyVTydnu = ["NE", "PO", "ÚT", "ST", "ČT", "PÁ", "SO"];

  const handleDatePress = (item) => {
    const url = 'https://int.soccerway.com/matches/2024/' + item.link;
    setSelectedUrl(url);
  }

  function generateDates(days) {
    let seznam = [];
    let dnes = new Date();

    for (let i = days - 1; i >= 0; i--) {
      let novyDen = new Date(dnes.getTime() - i * 24 * 60 * 60 * 1000);
      let denVTydnu = dnyVTydnu[novyDen.getDay()];
      let den = novyDen.getDate();
      let mesic = novyDen.getMonth() + 1; // Měsíce začínají od 0
      let datum = `${den}.${mesic}.`;
      let linkMesic = (novyDen.getMonth() + 1).toString().padStart(2, '0');
      let linkDen = den.toString().padStart(2, '0');
      let linkDatum = `${linkMesic}/${linkDen}/`;
      seznam.push({ datum: datum, day: denVTydnu, link: linkDatum});
    }

    for (let i = 0; i < days; i++) {
      let novyDen = new Date(dnes.getTime() + i * 24 * 60 * 60 * 1000);
      let denVTydnu = dnyVTydnu[novyDen.getDay()];
      let den = novyDen.getDate();
      let mesic = novyDen.getMonth() + 1; // Měsíce začínají od 0
      let datum = `${den}.${mesic}.`;
      let linkMesic = (novyDen.getMonth() + 1).toString().padStart(2, '0');
      let linkDen = den.toString().padStart(2, '0');
      let linkDatum = `${linkMesic}/${linkDen}/`;
      seznam.push({ datum: datum, day: denVTydnu, link: linkDatum });
    }
    return seznam;
  }

  let days = 5;
  let dateList = generateDates(days);

 // date = item.day + ' ' + item.datum;
  //today = dnes.getDate() + ' ' + get.getMonth();

  return (
    <View style={{height:'8%', marginBottom:'7%'}}>
    <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1}}>
      {dateList &&
        dateList.map((item, index) => (
          <TouchableOpacity onPress={() => handleDatePress(item)} key={index} style={{height:'100%', flex: 1, aspectRatio: 1, paddingTop: '4%', borderColor: '#494949', borderWidth: 1, borderLeftWidth: 0 }}>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 10, fontWeight: '500' }}>{item.datum + ' ' + item.day}</Text>
          </TouchableOpacity>
        ))}
    </ScrollView>
    </View>
  );
}

