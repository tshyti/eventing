import React from 'react';
import { View } from 'native-base';
import TouchableCategory from '../../components/Home/TouchableCategory';
import RootLayout from '../../components/RootLayout/RootLayout';
import { FlatList } from 'react-native';
import EventCard from '../../components/EventCard/EventCard';

export default function HomeScreen() {
  return (
    <RootLayout>
      <FlatList
        data={[
          { iconName: 'home', text: 'test' },
          { iconName: 'silverware', text: 'food' },
        ]}
        renderItem={({ item }) => (
          <TouchableCategory
            style={{ marginLeft: 10 }}
            iconName={item.iconName}
            text={item.text}
          />
        )}
        keyExtractor={item => item.iconName}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 5 }}
      />
      <View style={{ marginHorizontal: 10, marginTop: 10 }}>
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </View>
    </RootLayout>
  );
}
