
function pickMousePointerObjects(scene) {
    const hitObject = scene.pick(scene.pointerX, scene.pointerY);
    if (hitObject.pickedMesh !== null)
        return hitObject.pickedMesh;
    else
        return null;
};

export { pickMousePointerObjects };
