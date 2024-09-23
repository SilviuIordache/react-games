export const convertMsToSeconds = (value) => {
  const valueInSeconds = value / 1000;

  const toFixedValue = parseFloat(valueInSeconds.toFixed(3));

  return toFixedValue;
};
