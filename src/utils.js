const EARTH_RADIUS = 6378.1

export function formatTime(s) {
  const dtFormat = new Intl.DateTimeFormat("en-GB", {
    timeStyle: "medium",
    timeZone: "UTC",
  })
  return dtFormat.format(new Date(s * 1e3))
}

/**
 *
 * @param {int} direction format to always show 3 number ex. "000" as string
 */
export function formatDirection(direction) {
  direction = direction % 360
  if (direction < 0) {
    direction = direction + 360
  }

  if (direction >= 100) {
    return direction
  } else if (direction >= 10) {
    return "0" + direction
  } else {
    return "00" + direction
  }
}

export function keepWithin360(direction) {
  direction = direction % 360
  if (direction < 0) {
    direction = direction + 360
  }
  return direction
}

export function formatLatitude(latitudeInDegrees, pression = 2) {
  let latString = ""

  if (typeof latitudeInDegrees === "number") {
    let lonStr = latitudeInDegrees.toString()
    latString += lonStr.slice(0, lonStr.indexOf(".")) + "° "

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
  if (typeof longitudeInDegrees === "number") {
    if (longitudeInDegrees > -100 && longitudeInDegrees < 100) {
      longString += "0"
    }
    if (longitudeInDegrees.toFixed(0) < 10 && longitudeInDegrees.toFixed(0) > -10) {
      longString += "0"
    }

    //  longitudeInDegrees.toFixed(0)
    let lonStr = longitudeInDegrees.toString()
    longString += lonStr.slice(0, lonStr.indexOf(".")) + "° "

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
 * @param  {[string]} unit unit of distance "nm" for nautical miles (No other unit implemented)
 * @param  {[int]} pression number of decimal to output (3 decimals is precision to 1 meter)
 * @return {[float]} distance in nautical miles
 */
export function calcDistanceBetween(lat1, lon1, lat2, lon2, unit = "nm", pression = 3) {
  var R = 6371 // km
  var dLat = toRadians(lat2 - lat1)
  var dLon = toRadians(lon2 - lon1)
  lat1 = toRadians(lat1)
  lat2 = toRadians(lat2)

  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c
  if (unit === "nm") {
    let nm = d / 1.852
    return nm.toFixed(pression)
  }
  if (unit === "km") {
    return d.toFixed(pression)
  } else {
    let meters = d * 1000
    return meters.toFixed(pression)
  }
}

// Converts numeric degrees to radians
export function toRadians(Value) {
  return (Value * Math.PI) / 180
}

// Converts from radians to degrees.
export function toDegrees(radians) {
  return (radians * 180) / Math.PI
}

/**
 * Calculate bearing or course between coordinates
 * @param  {[float]} lat1 latitude start
 * @param  {[float]} lon1 longitude start
 * @param  {[float]} lat2 latitude end
 * @param  {[float]} lon2 longitude end
 * @return {[float]} bearing in degrees from start
 */
export function calcBearingBetween(lat1, lon1, lat2, lon2) {
  let startLat = toRadians(lat1)
  let startLng = toRadians(lon1)
  let destLat = toRadians(lat2)
  let destLng = toRadians(lon2)

  let y = Math.sin(destLng - startLng) * Math.cos(destLat)
  let x = Math.cos(startLat) * Math.sin(destLat) - Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng)
  let brng = Math.atan2(y, x)
  brng = toDegrees(brng)
  brng = (brng + 360) % 360
  brng = Math.round(brng * 100) / 100

  return brng
}

/**
 * Calculate end position from position with bearing and distance
 * @param  {[float]} latitude in degrees
 * @param  {[float]} longitude in degrees
 * @param  {[float]} bearing in degrees from north
 * @param  {[float]} distance in nauctical miles
 * @param  {[float]} distance_unit default "km"
 * @return [float, float] --> [final_lon, final_lat] 
 */
export function calcPosFromBearingDistance(latitude, longitude, bearing, distance, distance_unit = "km") {
  const bearing_rad = toRadians(bearing)

  if (distance_unit === "km") {
    distance = distance * 1.852
  }
  const init_lat = toRadians(latitude)
  const init_lon = toRadians(longitude)

  const final_lat =
    (180 / Math.PI) *
    Math.asin(
      Math.sin(init_lat) * Math.cos(distance / EARTH_RADIUS) +
        Math.cos(init_lat) * Math.sin(distance / EARTH_RADIUS) * Math.cos(bearing_rad)
    )
  const final_lon =
    (180 / Math.PI) *
    (init_lon +
      Math.atan2(
        Math.sin(bearing_rad) * Math.sin(distance / EARTH_RADIUS) * Math.cos(init_lat),
        Math.cos(distance / EARTH_RADIUS) - Math.sin(init_lat) * Math.sin(final_lat)
      ))

  return [final_lon, final_lat]
}

/**
 * Calculate True Wind Speed from Relative
 * @param  {[float]} heading heading (degrees)
 * @param  {[float]} sog speed over ground (knots)
 * @param  {[float]} wind_speed_rel Wind speed relative (meters per second)
 * @param  {[float]} wind_dir_rel Wind direction relative (degrees)
 * @return {[float]} True wind speed in meters per second
 */
export function calc_wind_speed_and_dir_true(heading, sog, wind_speed_rel, wind_dir_rel) {
  let sog_ms
  if (sog == 0) {
    sog_ms = 0.001
  } else {
    let KNOTS_TO_METERS_PER_SECOND_FACTOR = 1.944
    sog_ms = sog / KNOTS_TO_METERS_PER_SECOND_FACTOR
  }
  let true_wind_speed = Math.sqrt(
    sog_ms ** 2 + wind_speed_rel ** 2 - 2 * sog_ms * wind_speed_rel * Math.cos(toRadians(wind_dir_rel))
  )
  let true_wind_dir = toDegrees(
    Math.acos((wind_speed_rel ** 2 - true_wind_speed ** 2 - sog_ms ** 2) / (2 * true_wind_speed * sog_ms))
  )
  true_wind_dir = heading + wind_dir_rel

  if (true_wind_dir > 360) {
    true_wind_dir = true_wind_dir - 360
  }
  return { speed: true_wind_speed, direction: true_wind_dir }
}

/**
 * Calculate True Wind Direction from Relative
 * @param  {[float]} sog speed over ground (knots)
 * @param  {[float]} wind_speed_rel Wind speed relative (meters per second)
 * @param  {[float]} wind_dir_rel Wind direction relative (degrees)
 * @return {[float]} True wind speed in meters per second
 */
export function calc_wind_direction_true(sog, wind_speed_rel, wind_dir_rel) {
  let KNOTS_TO_METERS_PER_SECOND_FACTOR = 1.944
  let sog_ms = sog / KNOTS_TO_METERS_PER_SECOND_FACTOR
  let true_wind_speed = Math.sqrt(
    sog_ms ** 2 + wind_speed_rel ** 2 - 2 * sog_ms * wind_speed_rel * Math.cos(toRadians(wind_dir_rel))
  )
  return true_wind_speed
}

/**
 * Calculate Time To Go from distance and speed
 * @param  {[float]} distance distance in nautical miles
 * @param  {[float]} speed speed in knots
 * @return {[float]} Time to go in hours
 */
export function calc_time_to_go(distance, speed) {
  let time_to_go = speed / distance
  return time_to_go
}

/**
 * Convert hours to string hours and minutes
 * @param  {[number]} distance distance in nautical miles
 * @return {[string]} "HHH:MM:SS"
 */
export function intHoursToStrHoursAndMinutes(hours) {
  const hoursAsInt = parseInt(hours)
  const hoursAsFloat = parseFloat(hours)
  const minutes = (hoursAsFloat - hoursAsInt) * 60
  const seconds = (minutes - parseInt(minutes)) * 60
  const minutesStr = minutes.toFixed(0).toString().padStart(2, "0")
  return `${hoursAsInt}:${minutesStr}:${seconds.toFixed(0)}`
}

/**
 * Calculate turn radius circle
 * @param  {[number]} radius in nautical miles
 * @param  {[number]} course_in to WP in degrees
 * @param  {[number]} course_out of WP in degrees
 * @param  {[number]} wp_latitude in degrees
 * @param  {[number]} wp_longitude in degrees
 */
export function calc_turn_radius_circle(radius, course_in, course_out, wp_latitude, wp_longitude) {
  // --- Get circle center coordinates ---

  let turn_dir = identifyTurn(course_in, course_out) // Identify the turn direction
  // Calculate the bearing to the circle center
  let course_diff = calculateBearingDifference(course_in, course_out)
  let inner_angle_deg = 180 - course_diff
  let bearing_to_circle_center = 0
  if (turn_dir == "starboard") {
    bearing_to_circle_center = (course_out + inner_angle_deg / 2) % 360
  } else if (turn_dir == "port") {
    bearing_to_circle_center = (course_out - inner_angle_deg / 2) % 360
  }

  // Calculate the distance to the circle center
  let inner_angle_rad = toRadians(Math.abs(inner_angle_deg)) // Convert degrees to radians
  let distance_to_turning_center = radius / Math.sin(inner_angle_rad / 2) // Calculate distance to turning center
  // Calculate the coordinates of the circle center
  let pos_circle_center = calcPosFromBearingDistance(
    wp_latitude,
    wp_longitude,
    bearing_to_circle_center,
    distance_to_turning_center,
    "nm"
  )
  // --- Get start & end coordinates ---
  // Distance to start and stop of turn
  let turn_start_end_distance_from_wp = Math.sqrt(Math.pow(distance_to_turning_center, 2) - Math.pow(radius, 2))
  let reversed_course_in = (course_in - 180) % 360

  let pos_turn_start = calcPosFromBearingDistance(
    wp_latitude,
    wp_longitude,
    reversed_course_in,
    turn_start_end_distance_from_wp,
    "nm"
  )
  let pos_turn_end = calcPosFromBearingDistance(wp_latitude, wp_longitude, course_out, turn_start_end_distance_from_wp, "nm")
  // Get turn line coordinates

  // Bering start
  let bearin_to_start_pos = calcBearingBetween(pos_circle_center[1], pos_circle_center[0], pos_turn_start[1], pos_turn_start[0])
  // Bering end
  let bearin_to_end_pos = calcBearingBetween(pos_circle_center[1], pos_circle_center[0], pos_turn_end[1], pos_turn_end[0])
  // Define number of line segments (higher number = smoother line)
  let turn_wps = []

  let bearing_total_diff = calculateBearingDifference(bearin_to_start_pos, bearin_to_end_pos)
  let step_incremental = bearing_total_diff / 10

  if (turn_dir == "port") {
    for (let i = 1; i < 11; i++) {
      let bearing_incremental = (bearin_to_start_pos - step_incremental * i) % 360
      let pos_turn_point = calcPosFromBearingDistance(
        pos_circle_center[1],
        pos_circle_center[0],
        bearing_incremental,
        radius,
        "nm"
      )
      turn_wps.push([pos_turn_point[0], pos_turn_point[1]])
    }
  } else {
    for (let i = 1; i < 11; i++) {
      let bearing_incremental = (bearin_to_start_pos + step_incremental * i) % 360
      let pos_turn_point = calcPosFromBearingDistance(
        pos_circle_center[1],
        pos_circle_center[0],
        bearing_incremental,
        radius,
        "nm"
      )
      turn_wps.push([pos_turn_point[0], pos_turn_point[1]])
    }
  }

  return {
    pos_circle_center: pos_circle_center,
    pos_turn_start: pos_turn_start,
    pos_turn_end: pos_turn_end,
    turn_wps: turn_wps,
  }
}

function calculateBearingDifference(bearing1, bearing2) {
  // Ensure both bearings are within the range [0, 360)
  bearing1 = ((bearing1 % 360) + 360) % 360
  bearing2 = ((bearing2 % 360) + 360) % 360

  // Calculate the absolute difference between bearings
  let diff = Math.abs(bearing1 - bearing2)

  // Choose the smaller angle between the direct difference and the complement
  diff = Math.min(diff, 360 - diff)

  return diff
}

function identifyTurn(initialHeading, finalHeading) {
  let diff = finalHeading - initialHeading

  if (diff > 180) {
    diff = diff - 360
  } else if (diff < -180) {
    diff = diff + 360
  }

  if (diff < 0) {
    return "port"
  } else {
    return "starboard"
  }
}
