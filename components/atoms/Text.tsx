import React, {PropsWithChildren} from 'react';
import {Text as RNText, TextStyle, useColorScheme} from 'react-native';
import {Colors, colorShema} from '../../App';

const Text: React.FC<PropsWithChildren & {style?: TextStyle}> = ({
  children,
  style,
}) => {
  const isDarkMode = useColorScheme() === colorShema;

  return (
    <RNText
      style={[{color: isDarkMode ? Colors.cream : Colors.darkBlue}, style]}>
      {children}
    </RNText>
  );
};

export default Text;
