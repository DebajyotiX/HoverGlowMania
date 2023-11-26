precision highp float;

// Lights
varying vec3 vPositionW;
varying vec3 vNormalW;
varying vec3 vPosition;
varying vec3 vNormal;

// Refs
uniform vec3 cameraPosition;
uniform mat4 world;
uniform vec3 highLightColor;
uniform float highLightThicknessCutoff;


void main(void) {

    // Light(its the same fake light source, used in the phong shader)
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
    
    // ---- Highlight ------------------

    // Fresnel
    float fresnelTerm = dot(viewDirectionW, vNormalW);
    fresnelTerm = clamp(1.0 - fresnelTerm, 0., 1.);
    
    float zCoordinate = gl_FragCoord.z;
    if (fresnelTerm > highLightThicknessCutoff) {
        gl_FragDepth = 0.1;
        gl_FragColor = vec4(highLightColor, 1.);
    }
    else {
        gl_FragDepth = zCoordinate;
        gl_FragColor = vec4(color * ndl + vec3(specComp), 1.);
    }
}