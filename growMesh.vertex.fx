// Attributes
attribute vec3 position;
attribute vec3 normal;

// Uniforms
uniform mat4 world;
uniform mat4 worldViewProjection;

// Varying
varying vec3 vPositionW;
varying vec3 vNormalW;
varying vec3 vPosition;
varying vec3 vNormal;


void main(void) {
    vec3 newPosition = position + 0.11*normal; // if flipped normal, use - instead of +

    vec4 outPosition = worldViewProjection * vec4(newPosition, 1.0);
    gl_Position = outPosition;
    vNormalW = normalize(vec3(world * vec4(normal, 0.0)));
    vPositionW = vec3(world * vec4(newPosition, 1.0));

    vPosition = newPosition;
    vNormal = normal;
}