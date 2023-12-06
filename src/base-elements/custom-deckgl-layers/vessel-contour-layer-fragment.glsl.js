/* eslint-disable */
export default `\
#define SHADER_NAME vessel-layer-fragment-shader

precision highp float;

uniform bool filled;
uniform float stroked;
uniform bool antialiasing;

varying vec4 vFillColor;
varying vec2 unitPosition;
varying float unitBeam;

void main(void) {
  if (unitPosition.y >= 0.7) {
    if (abs(unitPosition.x) <= (1.0 - abs(unitPosition.y))*unitBeam/0.3) {
      gl_FragColor = vFillColor;
    } else {
      discard;
    }
  } else {
    if (abs(unitPosition.x) <= unitBeam) {
      gl_FragColor = vFillColor;
    } else {
      discard;
    }
  }
  gl_FragColor = picking_filterPickingColor(gl_FragColor);
}
`
/* eslint-enable */
