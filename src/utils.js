export function formatTime(s) {
  const dtFormat = new Intl.DateTimeFormat("en-GB", {
    timeStyle: "medium",
    timeZone: "UTC",
  });
  return dtFormat.format(new Date(s * 1e3));
}

/**
 *
 * @param {int} direction format to always show 3 number ex. "000"
 */
export function formatDirection(direction) {
  direction = direction % 360;
  if (direction < 0) {
    direction = direction + 360;
  }

  if (direction >= 100) {
    return direction;
  } else if (direction >= 10) {
    return "0" + direction;
  } else {
    return "00" + direction;
  }
}
