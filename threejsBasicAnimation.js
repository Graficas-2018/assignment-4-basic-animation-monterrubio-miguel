var renderer = null, 
scene = null, 
camera = null,
directionalLight = null,
root = null,
group = null,
cube = null;

var animator = null,
jsonLoader = null,
duration = 5, // sec
loopAnimation = false;

function loadJson()
{
    if(!jsonLoader)
    jsonLoader = new THREE.JSONLoader();
    
    jsonLoader.load(
        '../models/monster/monster.js',

        function(geometry, materials)
        {
            var material = materials[0];
            
            var object = new THREE.Mesh(geometry, material);
            object.castShadow = true;
            object. receiveShadow = true;
            object.scale.set(0.002, 0.002, 0.002);
            object.position.y = -1;
            object.position.x = 1.5;
            monster = object;
            group.add(object);
        },
        function ( xhr ) {

            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
        },
        // called when loading has errors
        function ( error ) {
    
            console.log( 'An error happened' );
    
        });
}

function run() 
{
    requestAnimationFrame(function() { run(); });

    // Render the scene
    renderer.render( scene, camera );

    // Update the animations
    KF.update();

    // Update the camera controller
    orbitControls.update();
}

var directionalLight = null;
var spotLight = null;
var ambientLight = null;
var mapUrl = "../images/checker_large.gif";

function createScene(canvas) 
{

    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    // Set the viewport size
    renderer.setSize(canvas.width, canvas.height);

    // Create a new Three.js scene
    scene = new THREE.Scene();

    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 4000 );
    camera.position.set(0, 0, 8);
    scene.add(camera);

    // Add a directional light to show off the object
    directionalLight = new THREE.DirectionalLight( 0xffffff, 1);

    // Create a group to hold all the objects
    root = new THREE.Object3D;

    // Create and add all the lights
    directionalLight.position.set(0, 1, 2);
    root.add(directionalLight);


    // Create a group to hold the objects
    group = new THREE.Object3D;
    root.add(group);

    // Create the objects
    loadJson();

    // Now add the group to our scene
    scene.add( root );
}

function initAnimations() 
{
    animator = new KF.KeyFrameAnimator;
    animator.init({ 
        interps:
            [
                { 
                    keys:[0, .5, 1], 
                    values:[
                            { y : 0 },
                            { y : Math.PI  },
                            { y : Math.PI * 2 },
                            ],
                    target:group.rotation
                },
            ],
        loop: loopAnimation,
        duration: duration * 1000,
    });
}

function playAnimations()
{
    animator.start();
}