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

export function formatLatitude(latitudeInDegrees, pression = 2) {
  let latString = ""

  if ((typeof latitudeInDegrees) === "number") {

    let lonStr = latitudeInDegrees.toString();
    latString += lonStr.slice(0, (lonStr.indexOf("."))) + "° "


    latString += ((latitudeInDegrees % 1) * 60)?.toFixed(pression) + "´ "

    if (latitudeInDegrees > 0) {
      latString += "N"
    } else {
      latString += "S"
    }
  }
  return latString
}

export function formatLongitude(longitudeInDegrees, pression = 2) {
  let longString = ""
  if ((typeof longitudeInDegrees) === "number") {
    if (longitudeInDegrees > -100 && longitudeInDegrees < 100) {
      longString += "0"
    }
    if (longitudeInDegrees.toFixed(0) < 10 && longitudeInDegrees.toFixed(0) > -10) {
      longString += "0"
    }

    //  longitudeInDegrees.toFixed(0)
    let lonStr = longitudeInDegrees.toString();
    longString += lonStr.slice(0, (lonStr.indexOf("."))) + "° "

    let minutes = (longitudeInDegrees % 1) * 60
    if (minutes < 10) {
      longString += "0"
      longString += minutes.toFixed(pression) + "´ "
    } else {
      longString += minutes.toFixed(pression) + "´ "
    }


    if (longitudeInDegrees < 0) {
      longString += "W"
    } else {
      longString += "E"
    }
  }
  return longString
}

/**
 * Calculate distance between coordinates 
 * @param  {[float]} lat1 latitude start
 * @param  {[float]} lon1 longitude start
 * @param  {[float]} lat2 latitude end
 * @param  {[float]} lon2 longitude end
 * @return {[float]} distance in nautical miles
 */
export function calcDistanceBetween(lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = toRadians(lat2 - lat1);
  var dLon = toRadians(lon2 - lon1);
  lat1 = toRadians(lat1);
  lat2 = toRadians(lat2);

  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  let nm = d / 1.852

  return nm.toFixed(2)
}

// Converts numeric degrees to radians
export function toRadians(Value) {
  return Value * Math.PI / 180;
}

// Converts from radians to degrees.
export function toDegrees(radians) {
  return radians * 180 / Math.PI;
}

/**
 * Calculate bearing between coordinates 
 * @param  {[float]} lat1 latitude start
 * @param  {[float]} lon1 longitude start
 * @param  {[float]} lat2 latitude end
 * @param  {[float]} lon2 longitude end
 * @return {[float]} bearing in degrees from start 
 */
export function calcBearingBetween(lat1, lon1, lat2, lon2) {
  let startLat = toRadians(lat1);
  let startLng = toRadians(lon1);
  let destLat = toRadians(lat2);
  let destLng = toRadians(lon2);

  let y = Math.sin(destLng - startLng) * Math.cos(destLat);
  let x = Math.cos(startLat) * Math.sin(destLat) -
    Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
  let brng = Math.atan2(y, x);
  brng = toDegrees(brng);
  brng = (brng + 360) % 360
  return brng.toFixed(1);
}