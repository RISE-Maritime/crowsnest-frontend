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