/* eslint-disable */
export default `\
#define SHADER_NAME ais-target-layer-fragment-shader

precision highp float;

varying vec4 vFillColor;

void main(void) {
  gl_FragColor = vFillColor;
  gl_FragColor = picking_filterPickingColor(gl_FragColor);
}
`
/* eslint-enable */
