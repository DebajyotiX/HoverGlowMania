import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders/OBJ/objFileLoader';
import '@babylonjs/loaders/glTF/2.0/glTFLoader';


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


    BABYLON.SceneLoader.ImportMesh("", "../asset/", "monkeyAsset.obj", scene, function (meshes) {

        // Warning🔴: Dont forget to set material to "baseShaderMaterial" in callback, while importing a mesh.
        meshes[0].material = baseShaderMaterial;

        meshes[0].scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
        meshes[0].rotation.y = Math.PI; 
        // meshes[0].flipFaces(true); // for inverted Mesh
    });

    // BABYLON.SceneLoader.Append("../asset/", "monkeyAsset.glb", scene, function (scene) {
    //     console.log("Callback: monkey loaded!!!");
    //   }); // Library Problem: BJS - [17:01:08]: Unable to load from ../asset/monkeyAsset.glb: this._babylonScene._forceBlockMaterialDirtyMechanism is not a function


    return scene;
};



export { createScene };

