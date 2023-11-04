import * as BABYLON from '@babylonjs/core';

/*
Creating a scene in Babylon.js is easy: 
just add some 3D actors, a touch of lighting,
and a pinch of camera magic – voila! instant blockbuster🍿💥!"
*/

function createScene(canvas, engine) {
    const scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 3, new BABYLON.Vector3(0, 0, 0), scene);
    camera.setPosition(new BABYLON.Vector3(0, 0, -3));
    camera.attachControl(canvas, true);

    // Custom shaders
    // Warning: 🔴 Shaders GLSL code files(.fx) must be in same folder as index.html.
    const baseShaderMaterial = new BABYLON.ShaderMaterial("shader", scene, "./phongShader", {
        attributes: ["position", "normal", "uv"],
        uniforms: ["world", "worldView", "worldViewProjection", "view", "projection", "cameraPosition"],
    });

    // 3 spheres 🟣🟣🟣
    const sphere1 = new BABYLON.MeshBuilder.CreateSphere();
    sphere1.material = baseShaderMaterial;
    sphere1.position.x = -0.5;

    const sphere2 = new BABYLON.MeshBuilder.CreateSphere();
    sphere2.material = baseShaderMaterial;

    const sphere3 = new BABYLON.MeshBuilder.CreateSphere();
    sphere3.material = baseShaderMaterial;
    sphere3.position.x = 0.5;

    return scene;
};



export { createScene };

