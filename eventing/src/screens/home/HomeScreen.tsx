import React from 'react';
import { View, Text } from 'native-base';
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
            style={{ marginLeft: 7 }}
            iconName={item.iconName}
            text={item.text}
          />
        )}
        keyExtractor={item => item.iconName}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        // style={{ height: '10%' }}
      />
      <View style={{ marginHorizontal: 5 }}>
        <EventCard />
      </View>
    </RootLayout>
  );
}
