var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');


// Create mouse struct that will hold x and y
var mouse = {
    x: undefined,
    y: undefined
}

// Max circle radius
var maxRadius = 44;

// Array that holds all color values
var colorArray = [
    '#3F3F37',
    '#D6D6B1',
    '#494331',
    '#878472',
    '#DE541E'    
];

// Event listener that gets mouse x,y position
window.addEventListener('mousemove', 
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
})


// Event listener that adjusts canvas width based on resized window
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});


// Circle object
function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;

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

        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        // Draw on canvas
        this.draw();
    }
}


// Create a circle array that holds all circle objects
var circleArray = [];

// Initiation function. Gets called at the start of the program and when resizing window.
function init() {

    circleArray = [];

    // Create circles with random variables and push to array
    for (var i = 0; i < 500; i++) {

        var radius = Math.random() * 4 + 1;

        var x = Math.random() * (window.innerWidth - radius * 2) + radius;
        var y = Math.random() * (window.innerHeight - radius * 2) + radius;

        var dx = (Math.random() - 0.5) * 1.5;
        var dy = (Math.random() - 0.5 )* 2;

        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

// Animation loop
function animate() {
    animationId = requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

init();
animate();