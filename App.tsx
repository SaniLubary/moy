import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import HamburgerMenu from './components/atoms/HamburgerMenu';
import SearchIcon from './components/atoms/SearchIcon';
import Text from './components/atoms/Text';
import LinearGradient from 'react-native-linear-gradient';

export const Colors = {
  darkBlue: '#3B5361',
  cream: '#EEE9DA',
};

const monthsMock = [
  {month: 'Jan', ammountLeft: 43, height: 0},
  {month: 'Feb', ammountLeft: -214, height: 0},
  {month: 'Mar', ammountLeft: 434, height: 0},
  {month: 'Apr', ammountLeft: 23, height: 0},
  {month: 'May', ammountLeft: 24, height: 0},
  {month: 'Jun', ammountLeft: -34, height: 0},
  {month: 'Jul', ammountLeft: 24, height: 0},
  {month: 'Aug', ammountLeft: -443, height: 0},
  {month: 'Sep', ammountLeft: 534, height: 0},
  {month: 'Oct', ammountLeft: 234, height: 0},
  {month: 'Nov', ammountLeft: -134, height: 0},
  {month: 'Dec', ammountLeft: 334, height: 0},
];

export const colorShema = 'light';

function App(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const isDarkMode = useColorScheme() === colorShema;
  const [months, setMonths] =
    useState<{month: string; ammountLeft: number; height: number}[]>(
      monthsMock,
    );

  const monthWithHigherIncomeLeft = useMemo(
    () =>
      months.reduce((prevMonth, currentMonth) =>
        prevMonth.ammountLeft > currentMonth.ammountLeft
          ? prevMonth
          : currentMonth,
      ),
    [months],
  );

  const mainStyles = {
    flex: 1,
    padding: 14,
    backgroundColor: isDarkMode ? Colors.darkBlue : Colors.cream,
  };

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  const calculateHeight = useCallback(
    (ammountLeft: number, monthToUpdate: number) => {
      const maxHeight = 40;
      const currentMonthPercentageOverHigherMonthsIncome =
        (ammountLeft / monthWithHigherIncomeLeft.ammountLeft) * 100;

      const height =
        (currentMonthPercentageOverHigherMonthsIncome / 100) * maxHeight;
      setMonths(lastMonths => {
        const newMonths = [...lastMonths];
        newMonths[monthToUpdate].height = height;
        return newMonths;
      });
      return Math.abs(height);
    },
    [monthWithHigherIncomeLeft],
  );

  const calculateColor = (currentMonth: (typeof months)[0], i: number) => {
    if (currentMonth.height < 0) {
      return 'black';
    }

    const prevMonth = months[i - 1];
    if (prevMonth) {
      return prevMonth.ammountLeft <= currentMonth.ammountLeft
        ? 'green'
        : 'red';
    }
    return 'green';
  };

  const startingLineHeight1 = useRef(new Animated.Value(0)).current;
  const startingLineHeight2 = useRef(new Animated.Value(0)).current;
  const startingLineHeight3 = useRef(new Animated.Value(0)).current;
  const startingLineHeight4 = useRef(new Animated.Value(0)).current;
  const startingLineHeight5 = useRef(new Animated.Value(0)).current;
  const startingLineHeight6 = useRef(new Animated.Value(0)).current;
  const startingLineHeight7 = useRef(new Animated.Value(0)).current;
  const startingLineHeight8 = useRef(new Animated.Value(0)).current;
  const startingLineHeight9 = useRef(new Animated.Value(0)).current;
  const startingLineHeight10 = useRef(new Animated.Value(0)).current;
  const startingLineHeight11 = useRef(new Animated.Value(0)).current;
  const startingLineHeight12 = useRef(new Animated.Value(0)).current;

  const [animations] = useState([
    startingLineHeight1,
    startingLineHeight2,
    startingLineHeight3,
    startingLineHeight4,
    startingLineHeight5,
    startingLineHeight6,
    startingLineHeight7,
    startingLineHeight8,
    startingLineHeight9,
    startingLineHeight10,
    startingLineHeight11,
    startingLineHeight12,
  ]);

  useEffect(() => {
    if (!months) {
      return;
    }
    Animated.parallel(
      animations.map((animation, i) =>
        Animated.timing(animation, {
          toValue: calculateHeight(months[i].ammountLeft, i),
          duration: Math.abs(months[i].ammountLeft * 2),
          useNativeDriver: false,
        }),
      ),
    ).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animations, calculateHeight]);

  return (
    <SafeAreaView style={mainStyles}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={mainStyles.backgroundColor}
      />
      <View style={styles.navbar}>
        <TouchableOpacity
          onPress={() => console.log('open menu')}
          style={{alignItems: 'center'}}>
          <HamburgerMenu />
        </TouchableOpacity>
        <View style={styles.serachInput}>
          <TextInput
            style={{color: Colors.cream}}
            placeholder="Search..."
            placeholderTextColor={Colors.cream}
            value={searchTerm}
            onChangeText={setSearchTerm}
            onSubmitEditing={handleSearch}
          />
        </View>
        <TouchableOpacity onPress={handleSearch} style={{alignItems: 'center'}}>
          <SearchIcon />
        </TouchableOpacity>
      </View>
      <LinearGradient colors={['#6096B4', '#93BFCF']} style={styles.analytics}>
        <View style={{flexDirection: 'row', marginBottom: 8}}>
          <Text style={{marginRight: 8, flex: 2, fontSize: 18}}>
            Cuanto Te Quedo?
          </Text>
          <View style={styles.statisticsGraphic}>
            {months.map((val, i) => {
              console.log(val.height);
              return (
                <Animated.View
                  key={val.month}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    backgroundColor: calculateColor(val, i),
                    margin: 4,
                    width: 8,
                    height: animations[i],
                    alignSelf: 'baseline',
                    marginTop: val.height < 0 ? 0 : 50 - val.height,
                    marginBottom: val.height < 0 ? Math.abs(val.height) + 4 : 0,
                    top: val.height < 0 ? animations[i] : 0,
                  }}
                />
              );
            })}
          </View>
        </View>
        <ScrollView horizontal style={{flexDirection: 'row'}}>
          {months.map((val, i) => (
            <View
              key={val.month + 'displayed-months'}
              style={{marginHorizontal: 10}}>
              <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  backgroundColor: Colors.darkBlue,
                  borderRadius: 14,
                  paddingVertical: 3,
                  paddingHorizontal: 17,
                  marginBottom: 6,
                }}>
                <Text>{val.month}</Text>
              </View>
              <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  backgroundColor: Colors.cream,
                  borderRadius: 14,
                  paddingVertical: 3,
                  paddingHorizontal: 17,
                }}>
                <Text style={{color: calculateColor(val, i)}}>
                  {val.ammountLeft}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serachInput: {
    flex: 1,
    borderColor: Colors.cream,
    borderRadius: 8,
    borderWidth: 1,
    margin: 8,
    marginHorizontal: 14,
  },
  analytics: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: Colors.cream,
    borderRadius: 8,
    padding: 14,
    backgroundGradient: 'linear-gradient(180deg, #6096B4 0%, #93BFCF 100%)',
  },
  statisticsGraphic: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.cream,
    borderRadius: 8,
    minHeight: 50,
  },
});
export default App;
