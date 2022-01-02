import React, { useEffect, useState } from "react";

/**
 * Checking if bearing angle is insode 0 to 360
 * @param {int} bering angle in degrees 0 to 359
 */
const corrBering = (bering) => {
  if (bering >= 0 || bering < 360) {
    return bering;
  } else if (bering >= 360) {
    return bering - 360;
  } else if (bering < 0) {
    return bering + 360;
  }
};

/**
 *
 * @param {float} degrees
 * @returns radians
 */
function degrees_to_radians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}

export default function AppSogCogObj(props) {
  const [predictorHeadings, setPredictorHeadings] = useState([0, 0, 0]);
  const [predictorPositions, setPredictorPositions] = useState([
    [856.414, 302.342],
    [856.414, 302.342],
    [856.414, 302.342],
  ]);

  useEffect(() => {
    let [predHeadings, predPositions] = predictorPlot(
      props.rot,
      props.heading,
      props.cog,
      props.sogMID,
      props.loa,
      props.woa,
      0.75, // pred_min
      3 // pred_steps
    );
    setPredictorHeadings(predHeadings);
    setPredictorPositions(predPositions);
  }, [props]);

  const predictorPlot = (
    rot,
    hdg,
    cog,
    sog,
    loa,
    woa,
    pred_min,
    pred_steps
  ) => {
    let SVG_X = 856.81;
    let SVG_Y = 302.342;
    let SVG_SHIP = 663;
    let heading_predictions = [];
    let pos_predictions = [];
    let pos_step = [SVG_X, SVG_Y]; // SVG center position 856.81 302.342

    const time_step = pred_min / pred_steps;

    for (let i = 1; i < pred_steps + 1; i++) {
      let predict_minutes = time_step * i;

      // Heading prediction
      let heading_change_prediction = hdg + rot * predict_minutes;
      heading_change_prediction = corrBering(heading_change_prediction);
      heading_predictions.push(heading_change_prediction);

      // Position prediction
      let distance_traveled = sog * (time_step / 60);
      let cog_dir_prediction = cog + rot * predict_minutes;

      let svgPX_NM = (SVG_SHIP / loa) * 1852;
      let svgPX_traveled = distance_traveled * svgPX_NM;

      // Calc position to SVG coordinates
      let SVGx =
        Math.sin(degrees_to_radians(cog_dir_prediction)) * svgPX_traveled;
      let SVGy =
        Math.cos(degrees_to_radians(cog_dir_prediction)) * svgPX_traveled;
      pos_step = [pos_step[0] + SVGx, pos_step[1] - SVGy];

      pos_predictions.push(pos_step);
    }

    return [heading_predictions, pos_predictions];
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="871"
      height="909"
      viewBox="0 0 871 909"
      style={{ height: "100%", width: "100%" }}
    >
      {/* Blurr */}
      <defs>
        <filter
          id="ShipSymbol"
          width="319.271"
          height="729.36"
          x="276.414"
          y="95"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="5"></feOffset>
          <feGaussianBlur result="blur" stdDeviation="6"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="rudder_act_area_S"
          width="77.32"
          height="53.812"
          x="746.68"
          y="740.094"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-2" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-2" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="rudder_act_area_S-2"
          width="77.32"
          height="53.812"
          x="746.991"
          y="509.094"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-3" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-3" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="rudder_act_area_S-3"
          width="77.32"
          height="53.812"
          x="746.68"
          y="273.338"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-4" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-4" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="rudder_act_area_S-4"
          width="77.32"
          height="53.812"
          x="47.411"
          y="740.094"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-5" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-5" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="rudder_act_area_S-5"
          width="77.32"
          height="53.812"
          x="47.411"
          y="509.094"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-6" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-6" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="rudder_act_area_S-6"
          width="77.32"
          height="53.812"
          x="46.997"
          y="274.72"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-7" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-7" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="rudder_act_area_S-7"
          width="77.32"
          height="53.812"
          x="395.754"
          y="830.705"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-8" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-8" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
        <filter
          id="rudder_act_area_S-8"
          width="77.32"
          height="53.812"
          x="397.389"
          y="34.92"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3"></feOffset>
          <feGaussianBlur result="blur-9" stdDeviation="3"></feGaussianBlur>
          <feFlood floodOpacity="0.161"></feFlood>
          <feComposite in2="blur-9" operator="in"></feComposite>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
      </defs>

      <g id="VesselMovementAndObjects" transform="translate(-561 -172)">
        {/* Vessel Object */}
        <g id="VesselSOGandCOG">
          {/* Vessel Predictor */}
          <g id="ShipPathONE" fill="none">
            <path
              fill="rgba(255,255,255,0.5)"
              d="M137.598-18.342c-4.6.005-10.113 1.55-16.387 4.595-6.336 3.074-13.263 7.592-20.59 13.428C93.311 5.505 85.783 12.5 78.245 20.47c-7.642 8.08-15.119 16.98-22.224 26.456-15.114 20.152-27.85 41.988-36.832 63.145-4.845 11.412-8.59 22.607-11.134 33.276C5.365 154.637 4 165.43 4 175.433v451.364c0 4.442.311 8.48.926 12 .575 3.298 1.435 6.247 2.555 8.766 2.01 4.524 4.932 7.87 8.931 10.23 3.643 2.15 8.349 3.58 14.386 4.372 5.953.78 12.812.889 19.339.889 1.723 0 3.436-.008 5.25-.016 1.81-.008 3.682-.016 5.557-.016H217.66c4.941 0 9.693.173 14.288.34 4.173.152 8.114.296 11.836.296 5.594 0 9.822-.34 13.305-1.07 3.888-.816 6.935-2.145 9.314-4.063 2.61-2.105 4.533-5.006 5.878-8.87 1.542-4.428 2.323-10.233 2.323-17.254V175.44c-.016-10.5-1.437-21.694-4.224-33.267-2.627-10.913-6.491-22.274-11.486-33.77-4.713-10.845-10.446-21.849-17.041-32.705a312.381 312.381 0 00-20.82-30.094c-7.264-9.29-14.93-18.023-22.787-25.954-7.692-7.764-15.395-14.591-22.896-20.291-7.469-5.675-14.541-10.085-21.022-13.108-6.405-2.988-12.033-4.533-16.729-4.592m.023-4c42.997.498 140.84 108.194 140.982 197.775V632.4c0 42.863-27.285 34.621-60.944 34.621H60.944C27.286 667.022 0 669.659 0 626.797V175.433C0 90.047 94.981-22.342 137.621-22.342z"
              transform={
                "translate(" +
                predictorPositions[0][0] +
                " " +
                predictorPositions[0][1] +
                ") rotate(" +
                predictorHeadings[0] +
                ")"
              }
              style={{
                transformOrigin: "center",
                transformBox: "fill-box",
              }}
            ></path>
          </g>
          <g id="ShipPathTWO" fill="none">
            <path
              fill="rgba(255,255,255,0.35)"
              d="M137.794-18.342c-4.608.005-10.13 1.551-16.415 4.596-6.345 3.074-13.283 7.592-20.62 13.43-7.32 5.823-14.86 12.817-22.409 20.788-7.652 8.08-15.14 16.98-22.256 26.456C40.96 67.08 28.205 88.916 19.21 110.073c-4.851 11.411-8.602 22.607-11.149 33.275C5.366 154.638 4 165.432 4 175.433v451.364c0 4.441.312 8.478.927 12 .576 3.297 1.437 6.246 2.558 8.764 2.014 4.524 4.94 7.87 8.945 10.23 3.65 2.15 8.363 3.58 14.41 4.374 5.962.78 12.832.889 19.368.889 1.726 0 3.442-.008 5.259-.016 1.812-.008 3.686-.016 5.564-.016H217.97c4.948 0 9.706.173 14.308.34 4.179.152 8.126.296 11.853.296 5.603 0 9.838-.34 13.326-1.07 3.896-.816 6.948-2.146 9.331-4.065 2.614-2.105 4.54-5.006 5.887-8.87 1.543-4.427 2.326-10.231 2.326-17.252V175.44c-.017-10.5-1.44-21.693-4.23-33.266-2.63-10.912-6.5-22.274-11.503-33.768-4.719-10.846-10.46-21.85-17.065-32.706a312.338 312.338 0 00-20.85-30.094c-7.274-9.29-14.951-18.023-22.819-25.954-7.703-7.765-15.417-14.592-22.929-20.292-7.48-5.675-14.563-10.085-21.053-13.108-6.416-2.989-12.053-4.534-16.757-4.593m.023-4c43.058.498 141.04 108.194 141.183 197.775V632.4c0 42.863-27.325 34.621-61.031 34.621H61.03C27.325 667.022 0 669.659 0 626.797V175.433C0 90.047 95.116-22.342 137.817-22.342z"
              transform={
                "translate(" +
                predictorPositions[1][0] +
                " " +
                predictorPositions[1][1] +
                ") rotate(" +
                predictorHeadings[1] +
                ")"
              }
              style={{
                transformOrigin: "center",
                transformBox: "fill-box",
              }}
            ></path>
          </g>
          <g id="ShipPathTHREE" fill="none">
            <path
              fill="rgba(255,255,255,0.2)"
              d="M137.598-18.342c-4.6.005-10.113 1.55-16.387 4.595-6.336 3.074-13.263 7.592-20.59 13.428C93.311 5.505 85.783 12.5 78.245 20.47c-7.642 8.08-15.119 16.98-22.224 26.456-15.114 20.152-27.85 41.988-36.832 63.145-4.845 11.412-8.59 22.607-11.134 33.276C5.365 154.637 4 165.43 4 175.433v451.364c0 4.442.311 8.48.926 12 .575 3.298 1.435 6.247 2.555 8.766 2.01 4.524 4.932 7.87 8.931 10.23 3.643 2.15 8.349 3.58 14.386 4.372 5.953.78 12.812.889 19.339.889 1.723 0 3.436-.008 5.25-.016 1.81-.008 3.682-.016 5.557-.016H217.66c4.941 0 9.693.173 14.288.34 4.173.152 8.114.296 11.836.296 5.594 0 9.822-.34 13.305-1.07 3.888-.816 6.935-2.145 9.314-4.063 2.61-2.105 4.533-5.006 5.878-8.87 1.542-4.428 2.323-10.233 2.323-17.254V175.44c-.016-10.5-1.437-21.694-4.224-33.267-2.627-10.913-6.491-22.274-11.486-33.77-4.713-10.845-10.446-21.849-17.041-32.705a312.381 312.381 0 00-20.82-30.094c-7.264-9.29-14.93-18.023-22.787-25.954-7.692-7.764-15.395-14.591-22.896-20.291-7.469-5.675-14.541-10.085-21.022-13.108-6.405-2.988-12.033-4.533-16.729-4.592m.023-4c42.997.498 140.84 108.194 140.982 197.775V632.4c0 42.863-27.285 34.621-60.944 34.621H60.944C27.286 667.022 0 669.659 0 626.797V175.433C0 90.047 94.981-22.342 137.621-22.342z"
              transform={
                "translate(" +
                predictorPositions[2][0] +
                " " +
                predictorPositions[2][1] +
                ") rotate(" +
                predictorHeadings[2] +
                ")"
              }
              style={{
                transformOrigin: "center",
                transformBox: "fill-box",
              }}
            ></path>
          </g>

          <g filter="url(#ShipSymbol)" transform="translate(561 172)">
            <g id="ShipSymbol-2" fill="#404a50" data-name="ShipSymbol">
              <path
                d="M247.867 667.018c-3.786 0-7.795-.144-12.038-.297-4.671-.168-9.501-.342-14.524-.342H61.965c-1.906 0-3.809.009-5.649.017-1.845.008-3.587.015-5.34.015-6.639 0-13.618-.108-19.677-.894-6.152-.798-10.949-2.24-14.664-4.405-4.075-2.377-7.05-5.744-9.098-10.294-1.138-2.53-2.011-5.493-2.596-8.805C4.317 638.476 4 634.42 4 629.958V176.396c0-10.048 1.387-20.894 4.123-32.236 2.585-10.72 6.394-21.97 11.32-33.436 9.132-21.26 22.082-43.203 37.449-63.455 7.225-9.522 14.828-18.467 22.599-26.587 7.666-8.011 15.322-15.04 22.756-20.894 7.454-5.868 14.502-10.411 20.95-13.503 6.392-3.065 12.014-4.622 16.708-4.627 4.79.06 10.526 1.615 17.052 4.624 6.594 3.04 13.79 7.474 21.388 13.18 7.629 5.729 15.463 12.59 23.285 20.394 7.99 7.971 15.785 16.747 23.172 26.084a313.827 313.827 0 0121.17 30.242c6.705 10.91 12.535 21.967 17.327 32.865 5.078 11.55 9.007 22.967 11.678 33.932 2.832 11.628 4.277 22.873 4.294 33.423v-.006V635.59c0 7.053-.794 12.883-2.361 17.33-1.369 3.885-3.326 6.803-5.984 8.921-2.43 1.936-5.54 3.277-9.508 4.1-3.549.735-7.855 1.077-13.55 1.077z"
                transform="translate(294.41 130.34)"
              ></path>
              <path
                fill="#fff"
                d="M139.88-14.342C103.567-14.252 8 91.683 8 176.396v453.562c0 29.518 12.438 32.453 42.977 32.453l10.989-.032h159.34c5.049 0 9.96.176 14.667.345 4.146.15 8.127.294 11.894.294 18.628 0 27.404-2.705 27.404-27.428V176.41C275.133 90.285 178.079-13.83 139.88-14.342m.047-8c43.717.5 143.2 108.72 143.344 198.738V635.59c0 43.072-27.743 34.79-61.966 34.79H61.965C27.744 670.38 0 673.03 0 629.957V176.396C0 90.594 96.572-22.342 139.927-22.342z"
                transform="translate(294.41 130.34)"
              ></path>
            </g>
          </g>

          {/* COG information */}
          <g id="COG">
            <text
              id="COG_ACT"
              fill="#3bf"
              fontFamily="Roboto-Regular, Roboto"
              fontSize="69"
              transform="translate(904.414 449.244)"
            >
              <tspan x="100" y="0" textAnchor="middle">
                {props.cog.toFixed(1) + "°"}
              </tspan>
            </text>
            <text
              id="COG_description_text"
              fill="rgba(255,255,255,0.65)"
              fontFamily="Roboto-Regular, Roboto"
              fontSize="11"
              transform="translate(904.414 390.244)"
            >
              <tspan x="0" y="0">
                COG
              </tspan>
            </text>
            <path
              id="cogLine"
              fill="none"
              stroke="#707070"
              strokeWidth="2"
              d="M230 0L0 0"
              transform="translate(881.914 464.244)"
            ></path>
          </g>

          {/* SOG information */}
          <g id="SOG_Indicators">
            <g id="AFT_SOG" transform="translate(-7.282 .254)">
              <text
                id="SOG_value_AFT"
                fill="#fff"
                fontFamily="Roboto-Regular, Roboto"
                fontSize="48"
                transform="translate(954.696 907.746)"
              >
                <tspan x="50" y="0" textAnchor="middle">
                  {Math.abs(props.sogAFT).toFixed(1)}
                </tspan>
              </text>

              {props.sogAFT > 0 ? (
                <path
                  id="sog_SB_AFT"
                  fill="#1fb948"
                  d="M27.275 2.941a2 2 0 013.45 0l25.508 43.487a2 2 0 01-1.725 3.012H3.492a2 2 0 01-1.725-3.012z"
                  transform="rotate(90 131.194 992.94)"
                ></path>
              ) : null}

              {props.sogAFT < 0 ? (
                <path
                  id="sog_PS_AFT"
                  fill="#e93629"
                  d="M27.275 2.941a2 2 0 013.45 0l25.508 43.487a2 2 0 01-1.725 3.012H3.492a2 2 0 01-1.725-3.012z"
                  transform="rotate(-90 900.721 19.025)"
                ></path>
              ) : null}
            </g>

            <g id="MID_SOG" fill="#fff" transform="translate(-4.586 2.901)">
              <text
                id="SOG_ACT"
                fontFamily="Roboto-Regular, Roboto"
                fontSize="69"
                transform="translate(933 734.099)"
              >
                <tspan x="70" y="0" textAnchor="middle">
                  {Math.abs(props.sogMID).toFixed(1)}
                </tspan>
              </text>

              {props.sogMID > 0 ? (
                <path
                  id="SOG_FWD_arrow"
                  d="M58.389 1.107a2 2 0 012.6 0l54.255 46.273a2 2 0 01-1.3 3.522H5.427a2 2 0 01-1.3-3.522z"
                  transform="translate(940.313 617.099)"
                ></path>
              ) : null}
              {props.sogMID < 0 ? (
                <path
                  id="SOG_AFT_arrow"
                  d="M58.389 1.107a2 2 0 012.6 0l54.255 46.273a2 2 0 01-1.3 3.522H5.427a2 2 0 01-1.3-3.522z"
                  transform="rotate(180 529.843 401.5)"
                ></path>
              ) : null}
            </g>
            <g id="FWD_SOG" transform="translate(-7.282 -360.416)">
              <text
                id="SOGvalueFWD"
                fill="#fff"
                fontFamily="Roboto-Regular, Roboto"
                fontSize="48"
                transform="translate(954.696 907.746)"
              >
                <tspan x="50" y="0" textAnchor="middle">
                  {Math.abs(props.sogFWD).toFixed(1)}
                </tspan>
              </text>

              {props.sogFWD > 0 ? (
                <path
                  id="SOGsbFWD"
                  fill="#1fb948"
                  d="M27.275 2.941a2 2 0 013.45 0l25.508 43.487a2 2 0 01-1.725 3.012H3.492a2 2 0 01-1.725-3.012z"
                  transform="rotate(90 131.194 992.94)"
                ></path>
              ) : null}

              {props.sogFWD < 0 ? (
                <path
                  id="SOGportFWD"
                  fill="#e93629"
                  d="M27.275 2.941a2 2 0 013.45 0l25.508 43.487a2 2 0 01-1.725 3.012H3.492a2 2 0 01-1.725-3.012z"
                  transform="rotate(-90 900.721 19.025)"
                ></path>
              ) : null}
            </g>
          </g>
        </g>

        {/* Nearby Objects and Warnings */}
        {props.showNearbyObj ? (
          <>
            <g id="Warnings">
              <g id="WarningStarboardAFT">
                <g
                  id="Group_18"
                  data-name="Group 18"
                  transform="translate(122.784 477.455)"
                >
                  <g
                    filter="url(#rudder_act_area_S)"
                    transform="translate(438.22 -305.45)"
                  >
                    <g
                      id="rudder_act_area_S-9"
                      fill="#e93629"
                      data-name="rudder_act_area_S"
                    >
                      <path
                        d="M17.767 57.238L2 52.646V6.028L17.767 2.06l16.045 3.973v46.605l-16.045 4.599z"
                        transform="rotate(90 34.455 780.545)"
                      ></path>
                      <path
                        fill="#b72f25"
                        d="M17.77 4.123L4 7.587v43.558l13.772 4.011 14.04-4.024V7.599L17.77 4.123M17.763 0l18.049 4.469v49.677l-18.05 5.174L0 54.146V4.47L17.763 0z"
                        transform="rotate(90 34.455 780.545)"
                      ></path>
                    </g>
                  </g>
                  <text
                    id="_99m"
                    fill="#fff"
                    data-name="99m"
                    fontFamily="Roboto-Regular, Roboto"
                    fontSize="21"
                    transform="translate(1203 466)"
                  >
                    <tspan x="0" y="0">
                      99m
                    </tspan>
                  </text>
                </g>
                <path
                  id="Path_174"
                  fill="none"
                  stroke="rgba(233,54,41,0.7)"
                  strokeLinecap="round"
                  strokeWidth="8"
                  d="M1134.699 900.92v41.582s-.776 14.481-6.775 20.119c-3.306 3.537-7.354 4.9-11.12 5.741-3.989.893-7.749.8-12.408 1.019"
                  data-name="Path 174"
                ></path>
                <g
                  id="Ellipse_14"
                  fill="#e93629"
                  stroke="#b72f25"
                  strokeWidth="1"
                  data-name="Ellipse 14"
                  transform="translate(1127.414 928)"
                >
                  <circle cx="8" cy="8" r="8" stroke="none"></circle>
                  <circle cx="8" cy="8" r="7.5" fill="none"></circle>
                </g>
                <path
                  id="Line_286"
                  fill="none"
                  stroke="#e93629"
                  strokeDasharray="4"
                  strokeWidth="2"
                  d="M182.086 0L0 0"
                  data-name="Line 286"
                  transform="translate(1135.414 936)"
                ></path>
              </g>
              <g id="WarningStarboardMID">
                <g
                  id="Group_17"
                  data-name="Group 17"
                  transform="translate(123.095 246.455)"
                >
                  <g
                    filter="url(#rudder_act_area_S-2)"
                    transform="translate(437.91 -74.45)"
                  >
                    <g
                      id="rudder_act_area_S-10"
                      fill="#e93629"
                      data-name="rudder_act_area_S"
                    >
                      <path
                        d="M17.767 57.238L2 52.646V6.028L17.767 2.06l16.045 3.973v46.605l-16.045 4.599z"
                        transform="rotate(90 150.11 665.2)"
                      ></path>
                      <path
                        fill="#b72f25"
                        d="M17.77 4.123L4 7.587v43.558l13.772 4.011 14.04-4.024V7.599L17.77 4.123M17.763 0l18.049 4.469v49.677l-18.05 5.174L0 54.146V4.47L17.763 0z"
                        transform="rotate(90 150.11 665.2)"
                      ></path>
                    </g>
                  </g>
                  <text
                    id="_99m-2"
                    fill="#fff"
                    data-name="99m"
                    fontFamily="Roboto-Regular, Roboto"
                    fontSize="21"
                    transform="translate(1203 466)"
                  >
                    <tspan x="0" y="0">
                      99m
                    </tspan>
                  </text>
                </g>
                <path
                  id="Path_169"
                  fill="#e93629"
                  stroke="rgba(233,54,41,0.7)"
                  strokeLinecap="round"
                  strokeWidth="8"
                  d="M1134.646 657v96"
                  data-name="Path 169"
                ></path>
                <g
                  id="Ellipse_10"
                  fill="#e93629"
                  stroke="#b72f25"
                  strokeWidth="1"
                  data-name="Ellipse 10"
                  transform="translate(1126.414 697)"
                >
                  <circle cx="8" cy="8" r="8" stroke="none"></circle>
                  <circle cx="8" cy="8" r="7.5" fill="none"></circle>
                </g>
                <path
                  id="Line_281"
                  fill="none"
                  stroke="#e93629"
                  strokeDasharray="4"
                  strokeWidth="2"
                  d="M182.086 0L0 0"
                  data-name="Line 281"
                  transform="translate(1134.414 705)"
                ></path>
              </g>
              <g id="WarningStarboardFWD">
                <g
                  id="Group_16"
                  data-name="Group 16"
                  transform="translate(122.784 10.699)"
                >
                  <g
                    filter="url(#rudder_act_area_S-3)"
                    transform="translate(438.22 161.3)"
                  >
                    <g
                      id="rudder_act_area_S-11"
                      fill="#e93629"
                      data-name="rudder_act_area_S"
                    >
                      <path
                        d="M17.767 57.238L2 52.646V6.028L17.767 2.06l16.045 3.973v46.605l-16.045 4.599z"
                        transform="rotate(90 267.83 547.17)"
                      ></path>
                      <path
                        fill="#b72f25"
                        d="M17.77 4.123L4 7.587v43.558l13.772 4.011 14.04-4.024V7.599L17.77 4.123M17.763 0l18.049 4.469v49.677l-18.05 5.174L0 54.146V4.47L17.763 0z"
                        transform="rotate(90 267.83 547.17)"
                      ></path>
                    </g>
                  </g>
                  <text
                    id="_99m-3"
                    fill="#fff"
                    data-name="99m"
                    fontFamily="Roboto-Regular, Roboto"
                    fontSize="21"
                    transform="translate(1203 466)"
                  >
                    <tspan x="0" y="0">
                      99m
                    </tspan>
                  </text>
                </g>
                <path
                  id="Path_172"
                  fill="none"
                  stroke="rgba(233,54,41,0.7)"
                  strokeLinecap="round"
                  strokeWidth="8"
                  d="M1124 424.436c3.146 9.352 10.489 27.62 10.669 56.726s0 35.652 0 35.652"
                  data-name="Path 172"
                ></path>
                <g
                  id="Ellipse_11"
                  fill="#e93629"
                  stroke="#b72f25"
                  strokeWidth="1"
                  data-name="Ellipse 11"
                  transform="translate(1127.414 461)"
                >
                  <circle cx="8" cy="8" r="8" stroke="none"></circle>
                  <circle cx="8" cy="8" r="7.5" fill="none"></circle>
                </g>
                <path
                  id="Line_279"
                  fill="none"
                  stroke="#e93629"
                  strokeDasharray="4"
                  strokeWidth="2"
                  d="M181.086 0L0 0"
                  data-name="Line 279"
                  transform="translate(1135.414 469)"
                ></path>
              </g>
              <g id="WarningPortAFT">
                <g
                  id="Group_21"
                  data-name="Group 21"
                  transform="translate(-576.486 477.455)"
                >
                  <g
                    filter="url(#rudder_act_area_S-4)"
                    transform="translate(1137.49 -305.45)"
                  >
                    <g
                      id="rudder_act_area_S-12"
                      fill="#e93629"
                      data-name="rudder_act_area_S"
                    >
                      <path
                        d="M17.767 57.238L2 52.646V6.028L17.767 2.06l16.045 3.973v46.605l-16.045 4.599z"
                        transform="rotate(90 -315.18 430.91)"
                      ></path>
                      <path
                        fill="#b72f25"
                        d="M17.77 4.123L4 7.587v43.558l13.772 4.011 14.04-4.024V7.599L17.77 4.123M17.763 0l18.049 4.469v49.677l-18.05 5.174L0 54.146V4.47L17.763 0z"
                        transform="rotate(90 -315.18 430.91)"
                      ></path>
                    </g>
                  </g>
                  <text
                    id="_99m-4"
                    fill="#fff"
                    data-name="99m"
                    fontFamily="Roboto-Regular, Roboto"
                    fontSize="21"
                    transform="translate(1203 466)"
                  >
                    <tspan x="0" y="0">
                      99m
                    </tspan>
                  </text>
                </g>
                <path
                  id="Path_180"
                  fill="none"
                  stroke="rgba(233,54,41,0.7)"
                  strokeLinecap="round"
                  strokeWidth="8"
                  d="M859.414 899.539v36.918s.686 14.9 6.318 21.507c2.845 3.207 6.879 8.637 23.791 10.189h0"
                  data-name="Path 180"
                ></path>
                <path
                  id="Line_282"
                  fill="none"
                  stroke="#e93629"
                  strokeDasharray="4"
                  strokeWidth="2"
                  d="M182.086 0L0 0"
                  data-name="Line 282"
                  transform="translate(677.327 936)"
                ></path>
                <g
                  id="Ellipse_17"
                  fill="#e93629"
                  stroke="#b72f25"
                  strokeWidth="1"
                  data-name="Ellipse 17"
                  transform="translate(851.414 928)"
                >
                  <circle cx="8" cy="8" r="8" stroke="none"></circle>
                  <circle cx="8" cy="8" r="7.5" fill="none"></circle>
                </g>
              </g>
              <g id="WarningPortMID">
                <g
                  id="Group_24"
                  data-name="Group 24"
                  transform="translate(-576.486 246.455)"
                >
                  <g
                    filter="url(#rudder_act_area_S-5)"
                    transform="translate(1137.49 -74.45)"
                  >
                    <g
                      id="rudder_act_area_S-13"
                      fill="#e93629"
                      data-name="rudder_act_area_S"
                    >
                      <path
                        d="M17.767 57.238L2 52.646V6.028L17.767 2.06l16.045 3.973v46.605l-16.045 4.599z"
                        transform="rotate(90 -199.68 315.41)"
                      ></path>
                      <path
                        fill="#b72f25"
                        d="M17.77 4.123L4 7.587v43.558l13.772 4.011 14.04-4.024V7.599L17.77 4.123M17.763 0l18.049 4.469v49.677l-18.05 5.174L0 54.146V4.47L17.763 0z"
                        transform="rotate(90 -199.68 315.41)"
                      ></path>
                    </g>
                  </g>
                  <text
                    id="_99m-5"
                    fill="#fff"
                    data-name="99m"
                    fontFamily="Roboto-Regular, Roboto"
                    fontSize="21"
                    transform="translate(1203 466)"
                  >
                    <tspan x="0" y="0">
                      99m
                    </tspan>
                  </text>
                </g>
                <path
                  id="Path_178"
                  fill="#e93629"
                  stroke="rgba(233,54,41,0.7)"
                  strokeLinecap="round"
                  strokeWidth="8"
                  d="M859.413 657v96"
                  data-name="Path 178"
                ></path>
                <path
                  id="Line_284"
                  fill="none"
                  stroke="#e93629"
                  strokeDasharray="4"
                  strokeWidth="2"
                  d="M182.086 0L0 0"
                  data-name="Line 284"
                  transform="translate(677.327 705)"
                ></path>
                <g
                  id="Ellipse_15"
                  fill="#e93629"
                  stroke="#b72f25"
                  strokeWidth="1"
                  data-name="Ellipse 15"
                  transform="translate(851.414 697)"
                >
                  <circle cx="8" cy="8" r="8" stroke="none"></circle>
                  <circle cx="8" cy="8" r="7.5" fill="none"></circle>
                </g>
              </g>
              <g id="WarningPortFWD">
                <g
                  id="Group_25"
                  data-name="Group 25"
                  transform="translate(-576.899 12.08)"
                >
                  <g
                    filter="url(#rudder_act_area_S-6)"
                    transform="translate(1137.9 159.92)"
                  >
                    <g
                      id="rudder_act_area_S-14"
                      fill="#e93629"
                      data-name="rudder_act_area_S"
                    >
                      <path
                        d="M17.767 57.238L2 52.646V6.028L17.767 2.06l16.045 3.973v46.605l-16.045 4.599z"
                        transform="rotate(90 -82.7 198.02)"
                      ></path>
                      <path
                        fill="#b72f25"
                        d="M17.77 4.123L4 7.587v43.558l13.772 4.011 14.04-4.024V7.599L17.77 4.123M17.763 0l18.049 4.469v49.677l-18.05 5.174L0 54.146V4.47L17.763 0z"
                        transform="rotate(90 -82.7 198.02)"
                      ></path>
                    </g>
                  </g>
                  <text
                    id="_99m-6"
                    fill="#fff"
                    data-name="99m"
                    fontFamily="Roboto-Regular, Roboto"
                    fontSize="21"
                    transform="translate(1203 466)"
                  >
                    <tspan x="0" y="0">
                      99m
                    </tspan>
                  </text>
                </g>
                <path
                  id="Path_179"
                  fill="none"
                  stroke="rgba(233,54,41,0.7)"
                  strokeLinecap="round"
                  strokeWidth="8"
                  d="M869.393 426.783c-8.172 21.05-9.982 44.867-9.982 44.867v46.547"
                  data-name="Path 179"
                ></path>
                <path
                  id="Line_285"
                  fill="none"
                  stroke="#e93629"
                  strokeDasharray="4"
                  strokeWidth="2"
                  d="M182.086 0L0 0"
                  data-name="Line 285"
                  transform="translate(676.914 470.625)"
                ></path>
                <g
                  id="Ellipse_16"
                  fill="#e93629"
                  stroke="#b72f25"
                  strokeWidth="1"
                  data-name="Ellipse 16"
                  transform="translate(851 462.625)"
                >
                  <circle cx="8" cy="8" r="8" stroke="none"></circle>
                  <circle cx="8" cy="8" r="7.5" fill="none"></circle>
                </g>
              </g>
              <g id="WarningStern">
                <path
                  id="Path_171"
                  fill="none"
                  stroke="rgba(233,54,41,0.7)"
                  strokeLinecap="round"
                  strokeWidth="8"
                  d="M965.889 968.706h60.447"
                  data-name="Path 171"
                ></path>
                <g
                  id="Ellipse_13"
                  fill="#e93629"
                  stroke="#b72f25"
                  strokeWidth="1"
                  data-name="Ellipse 13"
                  transform="translate(988.389 960)"
                >
                  <circle cx="8" cy="8" r="8" stroke="none"></circle>
                  <circle cx="8" cy="8" r="7.5" fill="none"></circle>
                </g>
                <g
                  id="Group_20"
                  data-name="Group 20"
                  transform="translate(-228.143 568.066)"
                >
                  <g
                    filter="url(#rudder_act_area_S-7)"
                    transform="translate(789.14 -396.07)"
                  >
                    <g
                      id="rudder_act_area_S-15"
                      fill="#e93629"
                      data-name="rudder_act_area_S"
                    >
                      <path
                        d="M17.767 57.238L2 52.646V6.028L17.767 2.06l16.045 3.973v46.605l-16.045 4.599z"
                        transform="rotate(90 -186.32 650.39)"
                      ></path>
                      <path
                        fill="#b72f25"
                        d="M17.77 4.123L4 7.587v43.558l13.772 4.011 14.04-4.024V7.599L17.77 4.123M17.763 0l18.049 4.469v49.677l-18.05 5.174L0 54.146V4.47L17.763 0z"
                        transform="rotate(90 -186.32 650.39)"
                      ></path>
                    </g>
                  </g>
                  <text
                    id="_99m-7"
                    fill="#fff"
                    data-name="99m"
                    fontFamily="Roboto-Regular, Roboto"
                    fontSize="21"
                    transform="translate(1203 466)"
                  >
                    <tspan x="0" y="0">
                      99m
                    </tspan>
                  </text>
                </g>
                <path
                  id="Line_280"
                  fill="none"
                  stroke="#e93629"
                  strokeDasharray="4"
                  strokeWidth="2"
                  d="M0 40L0 0"
                  data-name="Line 280"
                  transform="translate(995.914 968.5)"
                ></path>
              </g>
              <g id="WarningBow">
                <path
                  id="Path_173"
                  fill="none"
                  stroke="rgba(233,54,41,0.7)"
                  strokeLinecap="round"
                  strokeWidth="8"
                  d="M955.309 304.054h0c25.968-21.679 40.1-20.051 40.1-20.051s14.719-1.117 41.148 19.993"
                  data-name="Path 173"
                ></path>
                <g
                  id="Ellipse_12"
                  fill="#e93629"
                  stroke="#b72f25"
                  strokeWidth="1"
                  data-name="Ellipse 12"
                  transform="translate(987.414 276)"
                >
                  <circle cx="8" cy="8" r="8" stroke="none"></circle>
                  <circle cx="8" cy="8" r="7.5" fill="none"></circle>
                </g>
                <g
                  id="Group_19"
                  data-name="Group 19"
                  transform="translate(-226.508 -227.72)"
                >
                  <g
                    filter="url(#rudder_act_area_S-8)"
                    transform="translate(787.51 399.72)"
                  >
                    <g
                      id="rudder_act_area_S-16"
                      fill="#e93629"
                      data-name="rudder_act_area_S"
                    >
                      <path
                        d="M17.767 57.238L2 52.646V6.028L17.767 2.06l16.045 3.973v46.605l-16.045 4.599z"
                        transform="rotate(90 212.395 253.315)"
                      ></path>
                      <path
                        fill="#b72f25"
                        d="M17.77 4.123L4 7.587v43.558l13.772 4.011 14.04-4.024V7.599L17.77 4.123M17.763 0l18.049 4.469v49.677l-18.05 5.174L0 54.146V4.47L17.763 0z"
                        transform="rotate(90 212.395 253.315)"
                      ></path>
                    </g>
                  </g>
                  <text
                    id="_99m-8"
                    fill="#fff"
                    data-name="99m"
                    fontFamily="Roboto-Regular, Roboto"
                    fontSize="21"
                    transform="translate(1203 466)"
                  >
                    <tspan x="0" y="0">
                      99m
                    </tspan>
                  </text>
                </g>
                <path
                  id="Line_283"
                  fill="none"
                  stroke="#e93629"
                  strokeDasharray="4"
                  strokeWidth="2"
                  d="M0 35.476L0.086 0"
                  data-name="Line 283"
                  transform="translate(995.414 248.5)"
                ></path>
              </g>
            </g>
            <g id="NearByObjects">
              <g id="TopPear">
                <rect
                  id="Rectangle_80"
                  width="870"
                  height="45"
                  fill="#404a50"
                  data-name="Rectangle 80"
                  rx="7"
                  transform="translate(562 172)"
                ></rect>
                <text
                  id="_20m"
                  fill="#3bf"
                  data-name="20m"
                  fontFamily="Roboto-Regular, Roboto"
                  fontSize="28"
                  transform="translate(973 204.5)"
                >
                  <tspan x="0" y="0">
                    20
                  </tspan>
                  <tspan y="0" fontSize="20">
                    m
                  </tspan>
                </text>
                <text
                  id="_2m"
                  fill="#ec8800"
                  data-name="2m"
                  fontFamily="Roboto-Regular, Roboto"
                  fontSize="18"
                  transform="translate(986 204.5)"
                >
                  <tspan x="0" y="0">
                    2
                  </tspan>
                  <tspan y="0" fontSize="14">
                    m
                  </tspan>
                </text>
                <g
                  id="Group_6"
                  fill="none"
                  stroke="#ec8800"
                  strokeLinecap="round"
                  strokeWidth="4"
                  data-name="Group 6"
                  transform="translate(987 216.867)"
                >
                  <path
                    id="Line_273"
                    d="M0 0L20 0"
                    data-name="Line 273"
                    transform="translate(0 24.09)"
                  ></path>
                  <path
                    id="Line_274"
                    d="M0 24.09L0 0"
                    data-name="Line 274"
                    transform="translate(10)"
                  ></path>
                </g>
                <g
                  id="Group_7"
                  fill="none"
                  stroke="#3bf"
                  strokeLinecap="round"
                  strokeWidth="4"
                  data-name="Group 7"
                  transform="translate(987 216.867)"
                >
                  <path
                    id="Line_273-2"
                    d="M0 0L20 0"
                    data-name="Line 273"
                    transform="translate(0 49.579)"
                  ></path>
                  <path
                    id="Line_274-2"
                    d="M0 49.579L0 0"
                    data-name="Line 274"
                    transform="translate(10)"
                  ></path>
                </g>
              </g>
              <g id="AftPear">
                <rect
                  id="Rectangle_77"
                  width="870"
                  height="40"
                  fill="#404a50"
                  data-name="Rectangle 77"
                  rx="7"
                  transform="translate(562 1041)"
                ></rect>
                <text
                  id="_20m-2"
                  fill="#3bf"
                  data-name="20m"
                  fontFamily="Roboto-Regular, Roboto"
                  fontSize="28"
                  transform="translate(973 1071)"
                >
                  <tspan x="0" y="0">
                    20
                  </tspan>
                  <tspan y="0" fontSize="20">
                    m
                  </tspan>
                </text>
                <text
                  id="_2m-2"
                  fill="#ec8800"
                  data-name="2m"
                  fontFamily="Roboto-Regular, Roboto"
                  fontSize="18"
                  transform="translate(986 1071)"
                >
                  <tspan x="0" y="0">
                    2
                  </tspan>
                  <tspan y="0" fontSize="14">
                    m
                  </tspan>
                </text>
                <g
                  id="Group_9"
                  fill="none"
                  stroke="#ec8800"
                  strokeLinecap="round"
                  strokeWidth="4"
                  data-name="Group 9"
                  transform="translate(-122.406 3.99)"
                >
                  <path
                    id="Line_273-3"
                    d="M0 0L20 0"
                    data-name="Line 273"
                    transform="translate(1109.406 1012.921)"
                  ></path>
                  <path
                    id="Line_274-3"
                    d="M0 0L0 24.09"
                    data-name="Line 274"
                    transform="translate(1119.406 1012.921)"
                  ></path>
                </g>
                <g
                  id="Group_8"
                  fill="none"
                  stroke="#3bf"
                  strokeLinecap="round"
                  strokeWidth="4"
                  data-name="Group 8"
                  transform="translate(-122.406 -21.5)"
                >
                  <path
                    id="Line_273-4"
                    d="M0 0L20 0"
                    data-name="Line 273"
                    transform="translate(1109.406 1012.921)"
                  ></path>
                  <path
                    id="Line_274-4"
                    d="M0 0L0 49.579"
                    data-name="Line 274"
                    transform="translate(1119.406 1012.921)"
                  ></path>
                </g>
              </g>
              <g id="StarboardPear">
                <rect
                  id="StarboardObject"
                  width="60"
                  height="906.5"
                  fill="#404a50"
                  rx="7"
                  transform="translate(1372 174)"
                ></rect>
                <g id="StarboardPearACT">
                  <text
                    id="StarboardACTvalue"
                    fill="#3bf"
                    fontFamily="Roboto-Regular, Roboto"
                    fontSize="28"
                    transform="translate(1379.009 637)"
                  >
                    <tspan x="0" y="0">
                      20
                    </tspan>
                    <tspan y="0" fontSize="20">
                      m
                    </tspan>
                  </text>
                  <g
                    id="Marker"
                    fill="none"
                    stroke="#3bf"
                    strokeLinecap="round"
                    strokeWidth="4"
                  >
                    <path
                      id="Line_273-5"
                      d="M0 0L57.017 0"
                      data-name="Line 273"
                      transform="translate(1315.991 626.5)"
                    ></path>
                    <path
                      id="Line_274-5"
                      d="M0 0L0 20"
                      data-name="Line 274"
                      transform="translate(1315.991 616.5)"
                    ></path>
                  </g>
                </g>
                <g id="StarboardPearSET">
                  <text
                    id="StarboardSETvalue"
                    fill="#ec8800"
                    fontFamily="Roboto-Regular, Roboto"
                    fontSize="18"
                    transform="translate(1392.009 633)"
                  >
                    <tspan x="0" y="0">
                      2
                    </tspan>
                    <tspan y="0" fontSize="14">
                      m
                    </tspan>
                  </text>
                  <g
                    id="StarboardSetMarker"
                    fill="none"
                    stroke="#ec8800"
                    strokeLinecap="round"
                    strokeWidth="4"
                  >
                    <path
                      id="Line_273-6"
                      d="M0 0L23.071 0"
                      data-name="Line 273"
                      transform="translate(1349.938 626.5)"
                    ></path>
                    <path
                      id="Line_274-6"
                      d="M0 0L0 20"
                      data-name="Line 274"
                      transform="translate(1349.938 615)"
                    ></path>
                  </g>
                </g>
              </g>
              <g id="PortPear">
                <rect
                  id="PortObject"
                  width="60"
                  height="906.5"
                  fill="#404a50"
                  rx="7"
                  transform="translate(562 173.5)"
                ></rect>
                <g id="PortPearACT">
                  <text
                    id="PortACTvalue"
                    fill="#3bf"
                    fontFamily="Roboto-Regular, Roboto"
                    fontSize="28"
                    transform="translate(567.241 637.25)"
                  >
                    <tspan x="0" y="0">
                      20
                    </tspan>
                    <tspan y="0" fontSize="20">
                      m
                    </tspan>
                  </text>
                  <g
                    id="PortMarkerAct"
                    fill="none"
                    stroke="#3bf"
                    strokeLinecap="round"
                    strokeWidth="4"
                    transform="translate(620.741 617.25)"
                  >
                    <path
                      id="Line_273-7"
                      d="M57.017 0L0 0"
                      data-name="Line 273"
                      transform="translate(0 10)"
                    ></path>
                    <path
                      id="Line_274-7"
                      d="M0 0L0 20"
                      data-name="Line 274"
                      transform="translate(57.017)"
                    ></path>
                  </g>
                </g>
                <g id="PortPearSET">
                  <text
                    id="PortSETvalue"
                    fill="#ec8800"
                    fontFamily="Roboto-Regular, Roboto"
                    fontSize="18"
                    transform="translate(580.741 633.25)"
                  >
                    <tspan x="0" y="0">
                      2
                    </tspan>
                    <tspan y="0" fontSize="14">
                      m
                    </tspan>
                  </text>
                  <g
                    id="PortMarker"
                    fill="none"
                    stroke="#ec8800"
                    strokeLinecap="round"
                    strokeWidth="4"
                    transform="translate(620.741 617.25)"
                  >
                    <path
                      id="Line_273-8"
                      d="M23.071 0L0 0"
                      data-name="Line 273"
                      transform="translate(0 10)"
                    ></path>
                    <path
                      id="Line_274-8"
                      d="M0 0L0 20"
                      data-name="Line 274"
                      transform="translate(23.071)"
                    ></path>
                  </g>
                </g>
              </g>
              <circle
                id="RoundObj"
                cx="30.5"
                cy="30.5"
                r="30.5"
                fill="#404a50"
                transform="translate(561 172)"
              ></circle>
            </g>
          </>
        ) : null}
      </g>
    </svg>
  );
}
