//Crear una escena en la que estarán todos los elementos como objetos, camaras y luces. 
var scene = new THREE.Scene();

function cubo(x, y, z, color, material, alambrado){
    var cubeGeometry = new THREE.BoxGeometry(x, y, z);
    var cubeMaterial;
    switch(material){
     case 'Basic': cubeMaterial = new THREE.MeshBasicMaterial({color: color, wireframe: alambrado});
      break;

     case 'Standard': cubeMaterial = new THREE.MeshStandardMaterial({color: color, wireframe: alambrado});
      break;

     case 'Physical': cubeMaterial = new THREE.MeshPhysicalMaterial({color: color, wireframe: alambrado});
      break;

     case 'Phong': cubeMaterial = new THREE.MeshPhongMaterial({color: color, wireframe: alambrado});
      break;

     case 'Lambert': cubeMaterial = new THREE.MeshLambertMaterial({color: color, wireframe: alambrado});
      break;
    }
    
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

    //Añadir "cube" a la escena
    scene.add(cube);
    return(cube);
}
function init() {

    //Crear una cámara, la cual define a dónde estamos mirando
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    //Crear render y se establecer el tamaño
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);

    //Mostrar los ejes en pantalla.
    var axes = new THREE.AxesHelper(20);
    scene.add(axes);

    //Se agrega luz

    //Luz proveniente de un punto en el espacio, semejante al sol
    light = new THREE.PointLight(0xFFFF00); 
    // Localización de la luz (x, y, z)
    light.position.set( -10, 10, 10 );             
    scene.add( light ); 

    //Definir array unidimensional para almacenar tres cubos
    Cubo = [];  
    //Valor dimensiones iniciales de los cubos
    dim = 8; 
    delta= dim/2;
    diagonal= Math.sqrt(Math.pow(delta, 2)+ Math.pow(delta, 2));
    Angulo = ((Math.PI)/6);
    Angulo_2= ((Math.PI)/4)-Angulo;
    valor=(Math.cos(Angulo_2))*diagonal;
    Cubo.push(cubo(dim, dim, dim, 'red', 'Physical', false)); //Se agrega el cubo 0.

    Cubo.push(cubo(dim, dim, dim, 'pink', 'Physical', false)); //Se agrega el cubo 1.

    Cubo.push(cubo(dim, dim, dim, 'yellow', 'Physical', false)); //Se agrega el cubo 2.

   //Se trasladan los cubos con sus vértices al origen de coordenadas
    for(i=0; i<3; i++){  
      Cubo[i].translateX(valor); 
      Cubo[i].translateZ(valor); 
      Cubo[i].translateY(delta); 
    }
    //Transformacion escalado y traslación sobre el eje Y
    for(i=1; i<3; i++){ 

        //Escalado a la mitad del cubo anterior
        escala= 1/(2*i); 
        unidades=dim/2+dim/4+((((dim/2)+(dim/4))/2))*(i-1); //Da la posición para que los cubos queden superpuestos.
        Cubo[i].scale.set(escala, escala, escala); 
        Cubo[i].translateY(unidades); 

    }

    Cubo[0].rotateY(Angulo);
    Cubo[2].rotateY(Angulo);


    //Posicionamiento de la cámara
    camera.position.set(-3*dim, 4*dim, 3*dim);
    camera.lookAt(scene.position);
    //Agrega la salida del render al elemento html.
    document.getElementById("webgl-output").appendChild(renderer.domElement);

    // renderiza la escena.
    renderer.render(scene, camera);
}