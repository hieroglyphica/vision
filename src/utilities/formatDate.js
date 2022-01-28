const Pad = (s, w) => {
  s = s.toFixed(0);
  while (s.length < w) {
    s = "0" + s;
  }
  return s;
};

export const FormatDate = (date) => {
  var year = Pad(date.getUTCFullYear(), 4);
  var month = Pad(1 + date.getUTCMonth(), 2);
  var day = Pad(date.getUTCDate(), 2);
  var hour = Pad(date.getUTCHours(), 2);
  var minute = Pad(date.getUTCMinutes(), 2);
  var svalue = date.getUTCSeconds() + date.getUTCMilliseconds() / 1000;
  var second = Pad(Math.round(svalue), 2);
  return `${year}-${month}-${day} ${hour}:${minute}:${second} UTC`;
};

export const ParseDate = (text) => {
  const d = new Date(text);
  if (!Number.isFinite(d.getTime())) {
    console.error(`ERROR: Not a valid date: "${text}"`);
  }
  return d;
};
