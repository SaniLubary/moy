import * as React from 'react';
import Svg, {Rect} from 'react-native-svg';

function HamburgerMenu() {
  return (
    <Svg width={47} height={30} viewBox="0 0 47 30" fill="none">
      <Rect width={47} height={8} rx={4} fill="#EEE9DA" />
      <Rect y={11} width={47} height={8} rx={4} fill="#EEE9DA" />
      <Rect y={22} width={47} height={8} rx={4} fill="#EEE9DA" />
    </Svg>
  );
}

export default HamburgerMenu;
