import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import Colors from '../theme/Colors';
import {PadTo2} from '../utils/AppFunctions';

interface TimerProps {
  ms: number;
  color?: string;
  style?: object;
  panicColor?: string;
  defaultColor?: string;
  panicTime?: number;
}

export const Timer = ({
  ms,
  style = {},
  panicColor = Colors.currencyRed,
  defaultColor = 'gray',
  panicTime = 60000,
}: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(ms);

  const interval = 1000;

  let intRef;

  useEffect(() => {
    intRef = setTimeout(() => {
      const nextTimeLeft = timeLeft - interval;

      if (nextTimeLeft <= 0) {
        setTimeLeft(0);
        clearTimeout(intRef);
        return;
      }

      setTimeLeft(nextTimeLeft);
    }, interval);

    return () => {
      clearTimeout(intRef);
    };
  });

  const sec = Math.floor((timeLeft / 1000) % 60);
  let min = Math.floor(timeLeft / 60000);
  let hours = Math.floor(timeLeft / (60000 * 60));
  let days = Math.floor(timeLeft / (60000 * 60 * 24));

  let text = `${PadTo2(min)}:${PadTo2(sec)}`;

  if (days > 0) {
    min = Math.floor((timeLeft / 60000) % 60);
    hours = Math.floor((timeLeft / (60000 * 60 * 24)) % 24);

    text = `${days}D ${PadTo2(hours)}:${PadTo2(min)}:${PadTo2(sec)}`;
  } else if (hours > 0) {
    min = Math.floor((timeLeft / 60000) % 60);
    hours = Math.floor((timeLeft / (60000 * 60)));

    text = `${PadTo2(hours)}:${PadTo2(min)}:${PadTo2(sec)}`;
  }

  const colorStyle = {
    color: defaultColor,
    ...style,
  };


  if (timeLeft < panicTime) {
    colorStyle.color = panicColor;
  }

  return <Text style={colorStyle}>{text}</Text>;
};