import React from 'react';
import { Image } from 'react-native';
import { Card, CardItem, Text, View } from 'native-base';
import DateAndPrice from './DateAndPrice';
import SaveEventButton from './SaveEventButton';

export default function EventCard() {
  return (
    <Card>
      <CardItem cardBody>
        <Image
          source={{
            uri: `https://unumfestival.com/wp-content/uploads/2020/03/jojojoj.jpg`,
          }}
          style={{ height: 200, flex: 1 }}
        />
      </CardItem>
      <CardItem style={{ marginRight: 0, paddingRight: 0 }}>
        <View style={{ flex: 3 }}>
          <Text>Unum Festival</Text>
          <Text note>Tirana</Text>
        </View>
        <View style={{ flex: 3 }}>
          <DateAndPrice date="08 Jun - 15 Jun" price={12} />
        </View>
        <View style={{ flex: 1 }}>
          <SaveEventButton isSaved={false} />
        </View>
      </CardItem>
    </Card>
  );
}
