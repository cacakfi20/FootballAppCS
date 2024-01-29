import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

export default function DateBar({ nav }) {
  const dnyVTydnu = ["NE", "PO", "ÚT", "ST", "ČT", "PÁ", "SO"];

  const handleDatePress = (item) => {
    console.log(item.datum);
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
      seznam.push({ datum: datum, day: denVTydnu });
    }

    for (let i = 0; i < days; i++) {
      let novyDen = new Date(dnes.getTime() + i * 24 * 60 * 60 * 1000);
      let denVTydnu = dnyVTydnu[novyDen.getDay()];
      let den = novyDen.getDate();
      let mesic = novyDen.getMonth() + 1; // Měsíce začínají od 0
      let datum = `${den}.${mesic}.`;
      seznam.push({ datum: datum, day: denVTydnu });
    }
    return seznam;
  }

  let days = 5;
  let dateList = generateDates(days);

  return (
    <View style={{height:'8%', marginBottom:'7%'}}>
    <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1}}>
      {dateList &&
        dateList.map((item, index) => (
          <TouchableOpacity onPress={handleDatePress(item)} key={index} style={{height:'100%', flex: 1, aspectRatio: 1, paddingTop: '4%', borderColor: '#494949', borderWidth: 1, borderLeftWidth: 0 }}>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 10, fontWeight: '500' }}>{item.day + ' ' + item.datum}</Text>
          </TouchableOpacity>
        ))}
    </ScrollView>
    </View>
  );
}

