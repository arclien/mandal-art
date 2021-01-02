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

export const getUUID = () => uuidv4();
