/* eslint-disable */
export default `\
#define SHADER_NAME ais-target-layer-vertex-shader
precision highp float;  
attribute vec3 vertices;

attribute vec3 instancePositions;
attribute vec3 instancePositions64Low;
attribute float instanceHeading;
attribute float instanceSpeed;
attribute float instanceCourse;
attribute highp float instanceTimestamp;
attribute vec4 instanceFillColors;


attribute vec3 instancePickingColors;

uniform float opacity;
uniform float iconSize;
uniform highp float currentTime;

varying vec4 vFillColor;


vec3 rotateZ(vec3 vector, float angle) {
  mat2 rotationMatrix = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
  return vec3(rotationMatrix * vector.xy, vector.z);
}

vec3 translateXY(vec3 vector, float angle, float distance) {
  vec3 translation_vector = vec3(project_size(distance)*sin(angle),project_size(distance)*cos(angle),0);
  vector = vector + translation_vector;
  return vector;
}


void main(void) {

  vec3 mod_vertices = vertices * project_size(iconSize);
  mod_vertices = rotateZ(mod_vertices, radians(instanceHeading));
  float elapsedTime = currentTime - instanceTimestamp;
  float distance = 0.514444*instanceSpeed*elapsedTime;
  mod_vertices = translateXY(mod_vertices, radians(instanceCourse), distance);
  gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, mod_vertices);
      
  vFillColor = vec4(instanceFillColors.rgb, instanceFillColors.a * opacity);

  picking_setPickingColor(instancePickingColors);
}
`
/* eslint-enable */
