import React from 'react';
import { Text, Icon, View } from 'native-base';
import theme from '../../utils/theme';

export interface DateAndPriceProps {
  date: string;
  price: number;
}

export default function DateAndPrice(props: DateAndPriceProps) {
  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon
          active
          name="calendar"
          type="MaterialCommunityIcons"
          style={{
            color: theme.primaryColor,
            fontSize: 17,
            alignSelf: 'center',
          }}
        />
        <Text style={{ marginLeft: 3 }}>{props.date}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon
          active
          name="currency-eur"
          type="MaterialCommunityIcons"
          style={{
            color: theme.primaryColor,
            fontSize: 17,
            alignSelf: 'center',
          }}
        />
        <Text note style={{ marginLeft: 3 }}>
          {props.price} Euro
        </Text>
      </View>
    </>
  );
}
