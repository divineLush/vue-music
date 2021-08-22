const formatTime = (time) => {
  const minutes = Math.floor(time / 60) || 0;
  const seconds = Math.round((time - minutes * 60) || 0);
  const prependZero = seconds < 10 ? '0' : '';

  return `${minutes}:${prependZero}${seconds}`;
};

export default formatTime;
