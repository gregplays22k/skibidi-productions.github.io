const { Engine, World, Bodies, Render, Runner, Mouse, MouseConstraint, Vector } = Matter;

let engine;
let world;
let humans = [];
let zombies = [];
let buildings = [];
let tanks = [];
let resources = { wood: 100, stone: 50, food: 200 };
let gameTime = 0;
let isNight = false;
let buildingMode = null;
let heldObject = null;
let mouseDownTime = 0;
let fightMode = false;
let zombieSpawnInterval = null;
let takeoverMode = false;
let controlledHuman = null;
let keys = {};

function init() {
    engine = Engine.create();
    world = engine.world;

    const render = Render.create({
        element: document.getElementById('simulation-area'),
        engine: engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            wireframes: false,
            background: '#87ceeb'
        }
    });

    Render.run(render);

    const runner = Runner.create();
    Runner.run(runner, engine);

    const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight - 25, window.innerWidth, 50, { isStatic: true, render: { fillStyle: 'brown' } });
    World.add(world, ground);

    setInterval(update, 16);
    setInterval(createResourceBox, 15000);
    setInterval(createAnimal, 10000);
    setInterval(spawnZombies, 5000);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: { visible: false }
        }
    });

    World.add(world, mouseConstraint);
    render.mouse = mouse;

    Matter.Events.on(mouseConstraint, 'mousedown', (event) => {
        mouseDownTime = Date.now();
        heldObject = event.source.body;
    });

    Matter.Events.on(mouseConstraint, 'mouseup', (event) => {
        const timeDiff = Date.now() - mouseDownTime;
        if (timeDiff > 500 && heldObject) {
            deleteObject(heldObject);
        } else if (event.source.body && event.source.body.resourceType) {
            resources[event.source.body.resourceType] += event.source.body.resourceAmount;
            createEffect(event.mouse.position.x, event.mouse.position.y, 'resource');
            World.remove(world, event.source.body);
        } else if (takeoverMode && humans.some(human => human.body === event.source.body)) {
            controlledHuman = humans.find(human => human.body === event.source.body);
        }
        heldObject = null;
    });

    document.addEventListener('keydown', (event) => {
        keys[event.key] = true;
    });
    document.addEventListener('keyup', (event) => {
        keys[event.key] = false;
    });
}

function spawnZombies() {
    for (let i = 0; i < 3; i++) {
        const x = Math.random() * window.innerWidth;
        const y = 50;
        createZombie(x, y);
    }
}

function update() {
    gameTime++;
    if (gameTime % 600 === 0) {
        isNight = !isNight;
        updateBackground();
    }

    humans.forEach(human => {
        human.update();
        if (human.sick && Math.random() < 0.001) {
            World.remove(world, human.body);
            humans = humans.filter(h => h !== human);
        }
    });
    zombies.forEach(zombie => zombie.update());
    tanks.forEach(tank => tank.update());

    handleCollisions();
    updateUI();

    if (controlledHuman) {
        if (keys['ArrowLeft']) {
            Matter.Body.setVelocity(controlledHuman.body, { x: -5, y: controlledHuman.body.velocity.y });
        }
        if (keys['ArrowRight']) {
            Matter.Body.setVelocity(controlledHuman.body, { x: 5, y: controlledHuman.body.velocity.y });
        }
    }
}

function updateBackground() {
    const simulationArea = document.getElementById('simulation-area');
    simulationArea.style.background = isNight ? '#191970' : '#87ceeb';
}

function setBuildingMode(mode) {
    buildingMode = mode;
    document.getElementById('building-mode').textContent = `Mode: ${mode ? mode : "Select"}`;
}

function placeObject(x, y) {
    if (buildingMode === 'human') {
        createHuman(getRandomXPosition(), window.innerHeight - 75, 'normal');
    } else if (buildingMode === 'armyHuman') {
        createHuman(getRandomXPosition(), window.innerHeight - 75, 'army');
    } else if (buildingMode === 'building') {
        createBuilding(getRandomXPosition(), window.innerHeight - 75);
    } else if (buildingMode === 'tank') {
        createTank(getRandomXPosition(), window.innerHeight - 75);
    }
}

function getRandomXPosition() {
    return Math.random() * window.innerWidth;
}

function deleteObject(body) {
    if (humans.some(human => human.body === body)) {
        let human = humans.find(h => h.body === body);
        World.remove(world, body);
        humans = humans.filter(h => h !== human);
    } else if (zombies.some(zombie => zombie.body === body)) {
        let zombie = zombies.find(z => z.body === body);
        World.remove(world, body);
        zombies = zombies.filter(z => z !== zombie);
    } else if (buildings.some(building => building.body === body)) {
        let building = buildings.find(b => b.body === body);
        World.remove(world, body);
        buildings = buildings.filter(b => b !== building);
    } else if (tanks.some(tank => tank.body === body)) {
        let tank = tanks.find(t => t.body === body);
        World.remove(world, body);
        tanks = tanks.filter(t => t !== tank);
    }
}

function createHuman(x, y, type) {
    let human = Bodies.rectangle(x, y, 30, 60, { render: { fillStyle: type === 'army' ? 'green' : 'blue' } });
    World.add(world, human);
    humans.push({
        body: human,
        type: type,
        sick: false,
        update: function() {
            if (fightMode && zombies.length > 0) {
                let nearestZombie = zombies.reduce((prev, curr) => (Vector.magnitude(Vector.sub(curr.body.position, this.body.position)) < Vector.magnitude(Vector.sub(prev.body.position, this.body.position)) ? curr : prev));
                let direction = Vector.normalise(Vector.sub(nearestZombie.body.position, this.body.position));
                Matter.Body.setVelocity(this.body, { x: direction.x * 2, y: this.body.velocity.y });
            }
        }
    });
}

function createZombie(x, y
