import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import * as THREE from 'three';

const Game = () => {
  const mountRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [hasSpeedBoost, setHasSpeedBoost] = useState(false);
  const [powerUpTimer, setPowerUpTimer] = useState(0);

  useEffect(() => {
    let animationFrameId;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);
    
    // Player cube
    const playerGeometry = new THREE.BoxGeometry(1, 1, 1);
    const playerMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    const player = new THREE.Mesh(playerGeometry, playerMaterial);
    scene.add(player);
    
    // Lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 0, 5);
    scene.add(light);
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    // Camera position
    camera.position.z = 10;
    
    // Arrays for game objects
    const obstacles = [];
    const powerUps = [];
    
    // Game state
    let gameSpeed = 0.1;
    let baseSpeed = 0.1;
    
    // Background color transition
    scene.background = new THREE.Color(0x000033);
    
    // Create obstacle
    function createObstacle() {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
      const obstacle = new THREE.Mesh(geometry, material);
      
      // Random position
      obstacle.position.x = Math.random() * 10 - 5;
      obstacle.position.y = Math.random() * 8 - 4;
      obstacle.position.z = -20;
      
      scene.add(obstacle);
      obstacles.push(obstacle);
    }
    
    // Create power-up
    function createPowerUp() {
      const geometry = new THREE.SphereGeometry(0.5, 32, 32);
      const material = new THREE.MeshPhongMaterial({ 
        color: 0xffff00,
        emissive: 0xffff00,
        emissiveIntensity: 0.5
      });
      const powerUp = new THREE.Mesh(geometry, material);
      
      powerUp.position.x = Math.random() * 10 - 5;
      powerUp.position.y = Math.random() * 8 - 4;
      powerUp.position.z = -20;
      
      scene.add(powerUp);
      powerUps.push(powerUp);
    }
    
    // Check collision
    function checkCollision(obj1, obj2) {
      const distance = obj1.position.distanceTo(obj2.position);
      return distance < 1.5;
    }
    
    // Movement controls
    const keys = { left: false, right: false, up: false, down: false };
    
    window.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'ArrowLeft':
        case 'a':
          keys.left = true;
          break;
        case 'ArrowRight':
        case 'd':
          keys.right = true;
          break;
        case 'ArrowUp':
        case 'w':
          keys.up = true;
          break;
        case 'ArrowDown':
        case 's':
          keys.down = true;
          break;
      }
    });
    
    window.addEventListener('keyup', (e) => {
      switch(e.key) {
        case 'ArrowLeft':
        case 'a':
          keys.left = false;
          break;
        case 'ArrowRight':
        case 'd':
          keys.right = false;
          break;
        case 'ArrowUp':
        case 'w':
          keys.up = false;
          break;
        case 'ArrowDown':
        case 's':
          keys.down = false;
          break;
      }
    });
    
    // Animation loop
    let frameCount = 0;
    function animate() {
      if (!gameOver) {
        animationFrameId = requestAnimationFrame(animate);
        
        // Player animation
        player.rotation.x += 0.01;
        player.rotation.y += 0.01;
        
        // Player movement
        if (keys.left && player.position.x > -5) player.position.x -= 0.1;
        if (keys.right && player.position.x < 5) player.position.x += 0.1;
        if (keys.up && player.position.y < 4) player.position.y += 0.1;
        if (keys.down && player.position.y > -4) player.position.y -= 0.1;
        
        // Create new obstacles
        frameCount++;
        if (frameCount % 60 === 0) {
          createObstacle();
          setScore(prev => prev + 1);
        }
        
        // Update obstacles
        for (let i = obstacles.length - 1; i >= 0; i--) {
          obstacles[i].position.z += gameSpeed;
          obstacles[i].rotation.x += 0.02;
          obstacles[i].rotation.z += 0.02;
          
          // Check collision
          if (checkCollision(player, obstacles[i])) {
            setGameOver(true);
          }
          
          // Remove obstacles that passed the player
          if (obstacles[i].position.z > 5) {
            scene.remove(obstacles[i]);
            obstacles.splice(i, 1);
          }
        }
        
        // Update power-ups
        for (let i = powerUps.length - 1; i >= 0; i--) {
          powerUps[i].position.z += gameSpeed;
          powerUps[i].rotation.y += 0.05;
          
          if (checkCollision(player, powerUps[i])) {
            scene.remove(powerUps[i]);
            powerUps.splice(i, 1);
            setHasSpeedBoost(true);
            setPowerUpTimer(300); // 5 seconds (60 frames per second)
            gameSpeed = baseSpeed * 2;
          }
          
          if (powerUps[i] && powerUps[i].position.z > 5) {
            scene.remove(powerUps[i]);
            powerUps.splice(i, 1);
          }
        }
        
        // Power-up timer
        if (powerUpTimer > 0) {
          setPowerUpTimer(prev => prev - 1);
        } else if (hasSpeedBoost) {
          setHasSpeedBoost(false);
          gameSpeed = baseSpeed;
        }
        
        // Spawn power-ups
        if (frameCount % 300 === 0) { // Every 5 seconds
          createPowerUp();
        }
        
        // Increase base game speed gradually
        baseSpeed += 0.0001;
        if (!hasSpeedBoost) {
          gameSpeed = baseSpeed;
        }
        
        // Update background color based on score
        const hue = (score % 360) / 360;
        scene.background.setHSL(hue, 0.5, 0.1);
        
        renderer.render(scene, camera);
      }
    }
    animate();
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [gameOver]);

  return (
    <div style={{ position: 'relative' }}>
      <div ref={mountRef} />
      <div style={{
        position: 'absolute',
        top: 20,
        left: 20,
        color: 'white',
        fontFamily: 'Arial',
        fontSize: '24px'
      }}>
        Score: {score}
        {hasSpeedBoost && 
          <div style={{ color: '#ffff00' }}>
            SPEED BOOST! {Math.ceil(powerUpTimer / 60)}s
          </div>
        }
      </div>
      {gameOver && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontFamily: 'Arial',
          fontSize: '48px',
          textAlign: 'center'
        }}>
          Game Over!<br/>
          Final Score: {score}<br/>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              fontSize: '24px',
              marginTop: '20px',
              cursor: 'pointer'
            }}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

const container = document.getElementById('renderDiv');
const root = ReactDOM.createRoot(container);
root.render(<Game />);
