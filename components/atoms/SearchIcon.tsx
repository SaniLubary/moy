import * as React from 'react';
import Svg, {Circle, Rect} from 'react-native-svg';

function SearchIcon() {
  return (
    <Svg width={35} height={36} viewBox="0 0 35 36" fill="none">
      <Circle cx={14} cy={14} r={12} stroke="#EEE9DA" strokeWidth={4} />
      <Rect
        x={22.6724}
        y={20.3966}
        width={16.3575}
        height={5}
        rx={2.5}
        transform="rotate(42.854 22.672 20.397)"
        fill="#EEE9DA"
      />
    </Svg>
  );
}

export default SearchIcon;
