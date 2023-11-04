precision highp float;

// Lights
varying vec3 vPositionW;
varying vec3 vNormalW;
varying vec3 vPosition;
varying vec3 vNormal;

// Refs
uniform vec3 cameraPosition;
uniform mat4 world;

void main(void) {

    // Light(it's not a real light source)
    vec3 vLightPosition = vec3(3,5,-10);

    // World values
    vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));
    vec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));
    vec3 viewDirectionW = normalize(cameraPosition - vPositionW);

    // Light
    vec3 lightVectorW = normalize(vLightPosition - vPositionW);
    vec3 color = vec3(0.5, 0.5, 1.);

    // diffuse
    float ndl = max(0., dot(vNormalW, lightVectorW));

    // Specular
    vec3 angleW = normalize(viewDirectionW + lightVectorW);
    float specComp = max(0., dot(vNormalW, angleW));
    specComp = pow(specComp, max(1., 64.)) * 2.;
    gl_FragColor = vec4(color * ndl + vec3(specComp), 1.);

}