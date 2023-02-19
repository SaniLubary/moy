import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleProp,
  StyleSheet,
  StyleSheetProperties,
  Text,
  TextStyle,
  useColorScheme,
  View,
} from 'react-native';

type TextStyledProps = PropsWithChildren<{
  variant: 'primary' | 'secondary'
  style?: StyleProp<TextStyle>
}>

function TextStyled({ variant, children, style }: TextStyledProps): JSX.Element {
  return (
    <Text style={[
      { color: variant === "primary" ? '#3B5361' : '#EEE9DA' },
      style
    ]}>
      {children}
    </Text>
  )
}

type BillCardProps = PropsWithChildren<{
  data: { details: string, ammount: number, date: Date };
}>;

function BillCard({ data }: BillCardProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.billCardContainer}>
      <View style={styles.billCardSection}>
        <TextStyled variant='primary' style={{ maxWidth: '80%' }}>
          {data.details}
        </TextStyled>
        <TextStyled variant='primary'>{data.ammount}</TextStyled>
      </View>
      <View style={styles.billCardSection}>
        <TextStyled variant='primary'>{data.date.getDate()}/{data.date.getMonth()}/{data.date.getFullYear()}</TextStyled>
        <TextStyled variant='primary'>Repeat Bill</TextStyled>
      </View>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#3B5361' : '#EEE9DA',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={{ gap: 16, marginHorizontal: 34 }}>
          <BillCard data={{ ammount: 234, date: new Date(), details: 'some details' }} />
          <BillCard data={{ ammount: 234, date: new Date(), details: 'some very large detail for this specific bill right here' }} />
          <BillCard data={{ ammount: 234, date: new Date(), details: 'some details' }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  billCardContainer: {
    padding: 8,
    backgroundColor: '#BDCDD6',
    flex: 1,
    borderRadius: 4,
    gap: 8
  },
  billCardSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  }
});

export default App;
