//Erika Triana 
var scene = new THREE.Scene();

function cubo(x, y, z, color, material, alambrado) {
    var cubeGeometry = new THREE.BoxGeometry(x, y, z);
    var cubeMaterial;
    switch (material) {
        case 'Basic': cubeMaterial = new THREE.MeshBasicMaterial({ color: color, wireframe: alambrado });
            break;

        case 'Standard': cubeMaterial = new THREE.MeshStandardMaterial({ color: color, wireframe: alambrado });
            break;

        case 'Physical': cubeMaterial = new THREE.MeshPhysicalMaterial({ color: color, wireframe: alambrado });
            break;

        case 'Phong': cubeMaterial = new THREE.MeshPhongMaterial({ color: color, wireframe: alambrado });
            break;

        case 'Lambert': cubeMaterial = new THREE.MeshLambertMaterial({ color: color, wireframe: alambrado });
            break;
    }

    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

    scene.add(cube);
    return (cube);
}

function init() {
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xFFFFFF));
    renderer.setSize(window.innerWidth, window.innerHeight);

    var axes = new THREE.AxesHelper(20);
    scene.add(axes);
    
    //  Luz proveniente de un punto en el espacio, semejante al sol.
    light = new THREE.PointLight(0xFFFF00); 
    
    //  Localización de la luz. (x, y, z).
    light.position.set(-10, 30, 25);
    scene.add(light);
    
    // Definir array unidimensional
    Cubo = [];   
    
    // Dimensiones iniciales de los cubos,se modifica el tamaño inicial de los cubos.
    dim = 8; 
    //Dimensiones convertidas para la funcion scale.set 
    dimscale = dim / dim; 
     //Dimensiones del cubo 1 escaladas a la mitad generando el 2 cubo
    dim2 = dimscale / 2;
    //Dimensiones del cubo 2 escaladas a la mitad generando el 3 cubo
    dim3 = dimscale / 4; 
    // Valor para trasladar fuera del origen los cubos
    delta = dim / 2; 
    //Valor para trasladar el cubo 2 al centro del cubo 1
    beta = dim + delta; 
     //Valor para trasladar el cubo 2 en el eje Y
    alpha2 = delta * 2.5;
    //Valor para trasladar el cubo 3 en el eje Y 
    alpha3 = delta * 3.25; 

    Cubo.push(cubo(dim, dim, dim, 0x00FF00, 'Physical', false));
    Cubo.push(cubo(dim, dim, dim, 0xFAF0E6, 'Physical', false));
    Cubo.push(cubo(dim, dim, dim, 0x32CD32, 'Physical', false));

    //Cubo 1 trasladado desde el origen hasta tangente a los ejes
    Cubo[0].translateX(delta); 
    Cubo[0].translateY(delta);
    Cubo[0].translateZ(delta);

    Cubo[1].translateX(delta); //Cubo 2 trasladado al centro del cubo 1
    Cubo[1].translateY(alpha2); //Cubo 2 trasladado en el eje Y para quedar tangente al cubo 1
    Cubo[1].translateZ(delta);
    Cubo[1].scale.set(dim2, dim2, dim2); //Cubo 2 escalado a la mitad del cubo 1

    Cubo[2].translateX(delta); //Cubo 3 trasladado al centro del cubo 2
    Cubo[2].translateY(alpha3); //Cubo 3 trasladado en el eje Y para quedar tangente al cubo 2
    Cubo[2].translateZ(delta);
    Cubo[2].scale.set(dim3, dim3, dim3); //Cubo 3 escalado a la mitad del cubo 2

    camera.position.set(15, 25, 40);
    camera.lookAt(scene.position);

    document.getElementById("webgl-output").appendChild(renderer.domElement);

    renderer.render(scene, camera);
}
//Erika Triana