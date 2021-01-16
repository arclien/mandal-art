import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export const getRoundTwoPrecision = (number) => Math.round(number * 100) / 100;

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export const isEmptyObject = (obj) => {
  return JSON.stringify(obj) === '{}' || Object.keys(obj).length === 0;
};

export const insertItemOnArray = (arr, index, newItem) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted item
  newItem,
  // part of the array after the specified index
  ...arr.slice(index),
];

export const replaceArrayOnArray = (arr, index, newArray) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted item
  newArray,
  // part of the array after the specified index
  ...arr.slice(index + 1),
];

export const replaceObejctOnArray = (arr, item) => {
  return arr.map((x) => (item.id === x.id ? item : x));
};

export const getUUID = () => uuidv4();

export const isBrowserIE = () => {
  const ua = window.navigator.userAgent;
  const trident = ua.indexOf('Trident/');
  if (trident > 0) {
    const rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }
  return false;
};

export const browserOpen = (
  address,
  target = '_blank',
  features = !isBrowserIE() ? 'noopener=yes,noreferrer=yes' : ''
) => {
  window.open(address, target, features);
};

export const renderHtmlWithNewLine = (string) =>
  string.split('\n').map((line) => {
    return (
      <span key={line}>
        {line}
        <br />
      </span>
    );
  });
