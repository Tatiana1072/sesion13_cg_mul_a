var scene = new THREE.Scene();
function cubo(x, y, z, color, material, alambrado) {
   var cubeGeometry = new THREE.BoxGeometry(x, y, z);
   var cubeMaterial;
   switch (material) {
      case 'Phong':
         cubeMaterial = new THREE.MeshPhongMaterial({
            color: color,
            wireframe: alambrado
         });
         break;
      case 'Standard':
         cubeMaterial = new THREE.MeshStandardMaterial({
            color: color,
            wireframe: alambrado
         });
         break;
      case 'Physical':
         cubeMaterial = new THREE.MeshPhysicalMaterial({
            color: color,
            wireframe: alambrado
         });
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

   var axes = new THREE.AxesHelper(50);
   scene.add(axes);

   //Creacion de los 3 cubos con sus caracteristicas
   Cubo = []; //Se define un array para almacenar los 3 cubos
var tam = prompt("Digite la longitud del lado del cubo");
if(tam<=0){
   //Error();
alert("Las dimensiones del cubo deberían ser mayores y diferentes de 0");
}else
   //dimension inicial de los cubos
   Cubo.push(cubo(tam, tam, tam, 0xCCCC99, 'Phong', false));
   Cubo.push(cubo(tam, tam, tam, 0xCBCCCA, 'Phong', false));
   Cubo.push(cubo(tam, tam, tam, 0xCBCCCA, 'Phong', false));

   for(i=0; i<3; i++){//se translada los tres cubos con uno de sus vertices al origen de coordenadas
   Cubo[i].translateX(tam/2);
   Cubo[i].translateZ(tam/2);
   Cubo[i].translateY(tam/2);
}

for(i=1; i<3; i++){//transformaciones de escalado y translacion sobre el eje Y
//Escalado que hace que las dimensiones sean la mitad del cubo anterior
escala=1/(2*i);//Escalado de la mitad del cubo anterior
unidades=(3*tam)/4+((3*tam)/8)*(i-1);
Cubo[i].scale.set(escala, escala, escala);
Cubo[i].translateY(unidades);
}

f=prompt("Digite el angulo de giro del cubo. (Entre 0° y 90°)")
if(f>90){
   //Error();
alert("El angulo que debe ingresar debería estar comprendido entre 0° y 90° ");
}else
angulo=Math.PI*f/180;
Cubo[0].rotateY(angulo);
Cubo[2].rotateY(angulo);

   //EJES: X rojo, Y verde, Z azul

var h=tam/(Math.sin(angulo)+Math.cos(angulo)+1)
var x=h*Math.sin(angulo)
var y=(tam-h)*Math.tan(angulo)

//posicionamiento de la luz
light = new THREE.PointLight(0xFFFFFF);
   light.position.set(5*tam, 8*tam, 10*tam);
   scene.add(light);
//posicionamiento de la camara
   camera.position.set(1.5*tam, 3.3*tam, 6.7*tam);
   camera.lookAt(scene.position);
//agrega la salida del render al elemento html
   document.getElementById("webgl-output").appendChild(renderer.domElement);
   renderer.render(scene, camera);
}



