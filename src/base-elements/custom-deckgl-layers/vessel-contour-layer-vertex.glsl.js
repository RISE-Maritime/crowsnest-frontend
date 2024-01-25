/* eslint-disable */
export default `\
#define SHADER_NAME vessel-layer-vertex-shader

attribute vec3 positions;

attribute vec3 instancePositions;
attribute vec3 instancePositions64Low;
attribute float instanceHeading;
attribute float instanceLength;
attribute float instanceBeam;
attribute vec4 instanceFillColors;

attribute vec3 instancePickingColors;

uniform float opacity;

varying vec4 vFillColor;

varying vec2 unitPosition;
varying float unitBeam;
varying float unitLength;

vec3 rotateZ(vec3 vector, float angle) {
  mat2 rotationMatrix = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
  return vec3(rotationMatrix * vector.xy, vector.z);
}

void main(void) {

  vec3 center = project_position(instancePositions);
  vec3 vertex = positions * project_size(instanceLength/2.0);
  vertex = rotateZ(vertex, instanceHeading);
  gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, vertex);
      
  vFillColor = vec4(instanceFillColors.rgb, instanceFillColors.a * opacity);
  unitPosition = positions.xy;
  unitBeam = instanceBeam/(instanceLength);

  picking_setPickingColor(instancePickingColors);
}
`
/* eslint-enable */
