import * as BABYLON from '@babylonjs/core';
import { createScene } from './src/createScene';
import { pickMousePointerObjects } from './src/pickMousePointerObjects';
import { setHoverEffect } from './src/sethoverEffect';
import { setHighlightColor, setHighlightWidth } from './src/userInputValueSetter';
import { hexToRGB } from './src/hexToRGB';

//------------Babylon BoilerPlate---------------

const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas);
const scene = createScene(canvas, engine);

// -------------Initialize Shaders--------------

// Import Custom Shaders into scene
// Warning: Shaders GLSL code files(.fx) must be in same folder as index.html.
const baseShaderMaterial = new BABYLON.ShaderMaterial("shader", scene, "./phongShader", {
    attributes: ["position", "normal", "uv"],
    uniforms: ["world", "worldView", "worldViewProjection", "view", "projection", "cameraPosition"],
});

const shaderMaterial = new BABYLON.ShaderMaterial("shader", scene, "./meshHighlight", {
    attributes: ["position", "normal", "uv"],
    uniforms: ["world", "worldView", "worldViewProjection", "view", "projection", "cameraPosition"],
});

shaderMaterial.setVector3(
    "highLightColor",
    new BABYLON.Vector3(0.5, 0., 1.)
);

shaderMaterial.setFloat(
    "highLightThicknessCutoff",
    0.8
);

//------------EventHandlers---------------

const colorPicker = document.getElementById("colorpicker");
colorPicker.onchange = () => setHighlightColor(shaderMaterial, colorPicker);

const outlineThickness = document.getElementById("outlineWidthSlider");
outlineThickness.onchange = () => setHighlightWidth(shaderMaterial, outlineThickness);

//------------GameLoop---------------

let previouslyHoveredObject = null;
engine.runRenderLoop(function () {
    //hover
    let currentlyHoveredObject = pickMousePointerObjects(scene);
    previouslyHoveredObject = setHoverEffect(previouslyHoveredObject, currentlyHoveredObject, baseShaderMaterial, shaderMaterial);
    scene.render();
});
