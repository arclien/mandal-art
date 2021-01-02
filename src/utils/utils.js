export const getRoundTwoPrecision = (number) => Math.round(number * 100) / 100;

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export const isEmptyObject = (obj) => {
  return JSON.stringify(obj) === '{}' || Object.keys(obj).length === 0;
};
