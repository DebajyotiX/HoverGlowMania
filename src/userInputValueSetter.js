
import { hexToRGB } from "./hexToRGB";
import * as BABYLON from '@babylonjs/core';

function setHighlightColor(shaderMaterial, colorPickerElement) {
    const inputColorhex = hexToRGB(colorPickerElement.value)
    shaderMaterial.setVector3(
        "highLightColor",
        new BABYLON.Vector3(inputColorhex.r, inputColorhex.g, inputColorhex.b)
    );
}

function setHighlightWidth(shaderMaterial, outlineThickness) {
    shaderMaterial.setFloat(
        "highLightThicknessCutoff",
        1.0 - parseFloat(outlineThickness.value)
    )
}

export { setHighlightWidth, setHighlightColor };