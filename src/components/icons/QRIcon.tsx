import React from 'react';
import {Path, Svg} from 'react-native-svg';

type QRIconProps = {
  width: number;
  height: number;
};

export const QRIcon = ({width, height}: QRIconProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 230 230">
      <Path
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        d="M200,5C197.1,5 198,5 225,5L225,30.79L225,6"
      />
      <Path
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        d="M5,15C5,51.8 5,5 5,5L10.19,5L30,5"
      />
      <Path
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        d="M200,225C200,225 200,225 225,225L225,200.21L225,200"
      />
      <Path
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        d="M5,200C5,200 5,210 5,225L30.90,225L7,225"
      />
    </Svg>
  );
};
