var boton = document.getElementById("boton");
const ruleta = new Audio('sonidos/ruleta.mp3');
const descuento = new Audio('sonidos/descuento.mp3');
const giro_parca = new Audio('sonidos/giro.mp3');
const muerte = new Audio('sonidos/muerte.mp3');
const ganar = new Audio('sonidos/LaBruja.mp3');
const elementosSalir = document.querySelectorAll('.salir');
const click = new Audio('sonidos/click.mp3');

const moustros = new Audio('sonidos/monstruos_tontos.mp3');
moustros.play();
moustros.loop = true;

elementosSalir.forEach(elemento => {
  elemento.addEventListener('touchend', () => {
      click.play();
  });
});


document.getElementById('boton').addEventListener('click', () => {
  moustros.pause();
  ruleta.play();
});

document.getElementById("boton").addEventListener("click", () => {
    boton.style.filter = "drop-shadow(0 0 3px white) drop-shadow(0 0 3px white)";


    const ruleta = document.getElementById("ruleta");
    
    ruleta.style.transition = 'none';
    ruleta.style.transform = 'rotate(0deg)';
    
    const girosCompletos = 1440;
    const anguloSeccion = 360 / 7;
  
    const secciones = [
        'toppings',
        'muerte',
        'giro',
        'muerte',
        'descuento',
        'muerte', 
        'chocolate'
    ];
  
    const seccionSeleccionada = Math.floor(Math.random() * secciones.length);
    const anguloFinal = girosCompletos + seccionSeleccionada * anguloSeccion + anguloSeccion / 2;
  
    setTimeout(() => {
        ruleta.style.transition = 'transform 8s cubic-bezier(0.33, 1, 0.68, 1)';
        ruleta.style.transform = `rotate(${anguloFinal}deg)`;
    }, 8);
    
    function mostrarResultado(seccion) {
        
        document.querySelectorAll('.resultado').forEach(div => div.style.display = 'none');
       
        const divResultado = document.getElementById(secciones[seccion]);
        if (divResultado) {
          divResultado.style.display = 'block';
        }
        switch (secciones[seccion]) {
          case 'chocolate':
          case 'toppings':
              ganar.play();
              canvas.width = window.innerWidth; 
              canvas.height = window.innerHeight * 0.9; 
              canvas.style.zIndex = "10"; // Hacer que el canvas sobresalga
              animate(); // Iniciar la animación del confetti
              break;
          case 'descuento':
              descuento.play();
          break;
          case 'giro':
              giro_parca.play();
          break;
          case 'muerte':
              muerte.play();
          break;
          default:
              canvas.style.zIndex = "-1"; // Dejar el canvas atrás si no es chocolate/toppings
      }
      

}
    
  
    setTimeout(() => {
        mostrarResultado(seccionSeleccionada);
    }, 8000);  
});


function girar() {
    click.play();
    document.getElementById("giro").style.display = "none";
    location.reload();
    moustros.play();
  
}

let params = new URLSearchParams(window.location.search);
let icon = params.get('imagen');
const nombre = params.get('nombre');
document.getElementById('nombre').textContent = nombre;
if (icon) {
    document.getElementById('imagen').src = icon;
}





const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
const confetti = [];
let confettiCount = 120;
var color = 'yellow';
const maxConfetti = 220; // Número máximo de confetis a mantener en pantalla

class Petal {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = -Math.random() * canvas.height;
    this.vy = Math.random() * 3 + 2;
    this.vx = Math.random() * 10 - 5 + Math.sin(Date.now() * 0.001) * 2;
    this.size = Math.random() * 15 + 5;
    this.rotation = Math.random() * Math.PI * 2;
    this.color = color;
  }

  update() {
    this.y += this.vy;
    this.x += this.vx;
    this.rotation += 0.05;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.fillStyle = this.color;

    // Forma de pétalo
    ctx.beginPath();
    ctx.moveTo(0, -this.size * 0.5);
    ctx.bezierCurveTo(this.size * 0.3, -this.size * 0.2, this.size * 0.5, 0, 0, this.size * 0.5);
    ctx.bezierCurveTo(-this.size * 0.5, 0, -this.size * 0.3, -this.size * 0.2, 0, -this.size * 0.5);
    ctx.fill();

    ctx.restore();
  }
}

for (let i = 0; i < confettiCount; i++) {
  confetti.push(new Petal());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confetti.forEach((petal, index) => {
    petal.update();
    petal.draw();

    // Cambié la condición para que los confetis no se eliminen tan rápido
    if (petal.y > canvas.height + 20) { // Se eliminan después de caer más allá de la pantalla
      confetti.splice(index, 1); // Eliminar solo un confetti a la vez
      confettiCount--;
    }
  });

  // Mantener siempre el número de confetis en el límite máximo
  if (confettiCount < maxConfetti) {
    // Crear nuevos confetis si es necesario
    confetti.push(new Petal());
    confettiCount++;
  }

  requestAnimationFrame(animate);
}

animate();

function salir(){
  window.location.href= "final.html";
}


