var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// // Recs
// c.fillStyle = 'rgba(255, 0, 0, 0.5)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(255, 200, 0, 0.5)';
// c.fillRect(300, 100, 100, 100);
// c.fillStyle = 'rgba(0, 0, 255, 0.5)';
// c.fillRect(100, 300, 100, 100);
// c.fillStyle = 'rgba(300, 200, 100, 255)';
// c.fillRect(500, 100, 100, 100);


// console.log(canvas);


// // Line
// c.beginPath();
// c.moveTo(300, 300);
// c.lineTo(500, 200);
// c.lineTo(600, 500);
// c.strokeStyle = "gray";
// c.stroke();

// // Arc / Circle
// c.beginPath();
// c.arc(300, 400, 30, 0, Math.PI * 2, false);
// c.strokeStyle = 'blue';
// c.stroke();


// // Arc / Circle
// for (var i = 300; i < 500; i += 50) {
//     for (var j = 300; j < 500; j += 50) {
//         c.beginPath();
//         c.arc(i, j, 30, 0, Math.PI * 2, false);
//         c.strokeStyle = 'blue';
//         c.stroke();
//     }
// }


// // random circles
// for (var i = 0; i < 30; i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;

//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = 'green';
//     c.stroke();
// }


// c.beginPath();
// c.arc(300, 300, 35, 0, Math.PI * 2, false);
// c.strokeStyle = 'blue';
// c.stroke();

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 44;
var minRadius = 3;


var colorArray = [
    '#3F3F37',
    '#D6D6B1',
    '#494331',
    '#878472',
    '#DE541E'    
];


window.addEventListener('mousemove', 
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
})


// Circle object
function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    var color = colorArray[Math.floor(Math.random() * colorArray.length)];

    // Draw circle onto canvas
    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = color;
        c.fill();
    }

    // Updates position. Change direction if collision with boundaries.
    this.update = function() {

        // if x axis collisions
        if ((this.x + this.radius > innerWidth) || (this.x - this.radius < 0)) {
            this.dx = -this.dx;
        }
        
    
        // if y axis collisions
        if ((this.y + this.radius > innerHeight) || (this.y - this.radius < 0)) {
            this.dy = -this.dy;
        }

        // Increment position
        this.x += this.dx;
        this.y += this.dy;

        // Mouse interaction. If within 50 of mouse position, increase size.
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50  &&  mouse.y - this.y > -50) {

            if (this.radius < maxRadius) {
                this.radius += 1;   
            }

        } else if (this.radius > minRadius) {
            this.radius -= 1;
        }

        // Draw on canvas
        this.draw();
    }
}


// Create a circle array that holds all circle objects
var circleArray = [];

// Create 120 circles with random variables and push to array
for (var i = 0; i < 120; i++) {

    var radius = Math.random() * 5 + 1;

    var x = Math.random() * (window.innerWidth - radius * 2) + radius;
    var y = Math.random() * (window.innerHeight - radius * 2) + radius;

    var dx = (Math.random() - 0.5) * 2;
    var dy = (Math.random() - 0.5 )* 4;

    circleArray.push(new Circle(x, y, dx, dy, radius));
}


// Animation loop
function animate() {
    animationId = requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

animate();