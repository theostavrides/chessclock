const chessTimeParser = (milliseconds) => {
  if (milliseconds <= 0) return "00:00.0"
  if (milliseconds < 1000) return `00:00.` + (milliseconds.toString()[0]);

  let secs = Math.floor(milliseconds / 1000);

  if (secs < 10) {
    let millisecs = milliseconds % 1000
    return `00:${timeString(secs)}.${millisecs.toString()[0]}`;
  }

  let seconds;
  if (secs < 60) return `00:${timeString(secs)}`;

  let minutes;
  if (secs < 3600) {
    minutes = timeString(Math.floor( secs / 60 ));
    seconds = timeString( secs % 60 );
    return `${minutes}:${seconds}`;
  }

  let hours;
  hours = timeString(Math.floor( secs / 3600 ));
  minutes = timeString(Math.floor( secs % 3600 / 60 ));
  seconds = timeString( secs % 3600 % 60 );
  return `${hours}:${minutes}:${seconds}`;
}

const timeString = (value) => {
  let str;
  value < 10 ? str = `0${value}` : str = value.toString();
  return str
}

export default chessTimeParser;