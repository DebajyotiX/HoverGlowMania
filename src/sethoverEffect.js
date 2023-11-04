import { setShaderMaterial } from "./setShaderMaterial";

function setHoverEffect(previouslyHoveredObject, currentlyHoveredObject, baseShaderMaterial, shaderMaterial) {
    if (previouslyHoveredObject === null && currentlyHoveredObject !== null) {
        setShaderMaterial(currentlyHoveredObject, shaderMaterial);
        previouslyHoveredObject = currentlyHoveredObject;
    }
    else if (previouslyHoveredObject === null && currentlyHoveredObject === null) {
        //empty
    }
    else if (previouslyHoveredObject !== null && currentlyHoveredObject === null) {
        setShaderMaterial(previouslyHoveredObject, baseShaderMaterial);
        previouslyHoveredObject = null;
    }
    else if (previouslyHoveredObject !== null && currentlyHoveredObject !== null && previouslyHoveredObject !== currentlyHoveredObject) {
        setShaderMaterial(currentlyHoveredObject, shaderMaterial);
        setShaderMaterial(previouslyHoveredObject, baseShaderMaterial);
        previouslyHoveredObject = currentlyHoveredObject;
    }
    return previouslyHoveredObject;
}
export { setHoverEffect };