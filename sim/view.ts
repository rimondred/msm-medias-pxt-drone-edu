/**
 * Vue Canvas 2D pour le simulateur de drone
 * Vue 3D simplifiée avec projection isométrique
 */

namespace sim {

    // Configuration du Canvas
    const CANVAS_WIDTH = 400;
    const CANVAS_HEIGHT = 400;
    const GRID_SIZE = 50;
    const DRONE_SIZE = 20;

    // Variables
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let isPaused: boolean = false;
    let windX: number = 0;
    let windY: number = 0;

    /**
     * Initialise le rendu
     */
    export function initView(): void {
        // Créer le canvas
        canvas = document.createElement('canvas');
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        canvas.style.border = '2px solid #00D9FF';
        canvas.style.borderRadius = '8px';
        canvas.style.background = '#E8F4F8';

        // Ajouter au DOM
        const container = document.getElementById('sim-container');
        if (container) {
            container.appendChild(canvas);
        }

        // Obtenir le contexte
        ctx = canvas.getContext('2d');

        // Créer les contrôles
        createControls();

        // Démarrer le rendu
        requestAnimationFrame(render);
    }

    /**
     * Crée les contrôles de l'interface
     */
    function createControls(): void {
        const container = document.getElementById('sim-container');
        if (!container) return;

        // Contrôles
        const controls = document.createElement('div');
        controls.style.marginTop = '10px';
        controls.style.display = 'flex';
        controls.style.gap = '10px';
        controls.style.alignItems = 'center';

        // Bouton Pause/Resume
        const pauseBtn = document.createElement('button');
        pauseBtn.textContent = '⏸ Pause';
        pauseBtn.style.padding = '8px 16px';
        pauseBtn.style.borderRadius = '4px';
        pauseBtn.style.border = 'none';
        pauseBtn.style.background = '#00D9FF';
        pauseBtn.style.color = 'white';
        pauseBtn.style.cursor = 'pointer';
        pauseBtn.onclick = () => {
            isPaused = !isPaused;
            pauseBtn.textContent = isPaused ? '▶ Resume' : '⏸ Pause';
        };

        // Bouton Reset
        const resetBtn = document.createElement('button');
        resetBtn.textContent = '🔄 Reset';
        resetBtn.style.padding = '8px 16px';
        resetBtn.style.borderRadius = '4px';
        resetBtn.style.border = 'none';
        resetBtn.style.background = '#FF6B6B';
        resetBtn.style.color = 'white';
        resetBtn.style.cursor = 'pointer';
        resetBtn.onclick = () => {
            init();
            isPaused = false;
            pauseBtn.textContent = '⏸ Pause';
        };

        // Slider Vent X
        const windXLabel = document.createElement('label');
        windXLabel.textContent = 'Vent X:';
        windXLabel.style.marginLeft = '20px';
        
        const windXSlider = document.createElement('input');
        windXSlider.type = 'range';
        windXSlider.min = '-5';
        windXSlider.max = '5';
        windXSlider.value = '0';
        windXSlider.step = '0.5';
        windXSlider.oninput = (e) => {
            windX = parseFloat((e.target as HTMLInputElement).value);
            setWind(windX, windY);
        };

        const windXValue = document.createElement('span');
        windXValue.textContent = '0 m/s';
        windXValue.style.minWidth = '60px';
        windXValue.style.display = 'inline-block';

        windXSlider.oninput = (e) => {
            windX = parseFloat((e.target as HTMLInputElement).value);
            windXValue.textContent = windX + ' m/s';
            setWind(windX, windY);
        };

        // Slider Vent Y
        const windYLabel = document.createElement('label');
        windYLabel.textContent = 'Vent Y:';
        windYLabel.style.marginLeft = '20px';
        
        const windYSlider = document.createElement('input');
        windYSlider.type = 'range';
        windYSlider.min = '-5';
        windYSlider.max = '5';
        windYSlider.value = '0';
        windYSlider.step = '0.5';

        const windYValue = document.createElement('span');
        windYValue.textContent = '0 m/s';
        windYValue.style.minWidth = '60px';
        windYValue.style.display = 'inline-block';

        windYSlider.oninput = (e) => {
            windY = parseFloat((e.target as HTMLInputElement).value);
            windYValue.textContent = windY + ' m/s';
            setWind(windX, windY);
        };

        // Ajouter les contrôles
        controls.appendChild(pauseBtn);
        controls.appendChild(resetBtn);
        controls.appendChild(windXLabel);
        controls.appendChild(windXSlider);
        controls.appendChild(windXValue);
        controls.appendChild(windYLabel);
        controls.appendChild(windYSlider);
        controls.appendChild(windYValue);

        container.appendChild(controls);
    }

    /**
     * Boucle de rendu
     */
    function render(): void {
        if (!isPaused) {
            draw();
        }
        requestAnimationFrame(render);
    }

    /**
     * Dessine la scène
     */
    function draw(): void {
        if (!ctx) return;

        // Effacer
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Dessiner la grille au sol
        drawGrid();

        // Dessiner l'ombre du drone
        drawShadow();

        // Dessiner le drone
        drawDrone();

        // Dessiner le HUD
        drawHUD();
    }

    /**
     * Dessine la grille au sol
     */
    function drawGrid(): void {
        ctx.strokeStyle = '#B0BEC5';
        ctx.lineWidth = 1;

        const centerX = CANVAS_WIDTH / 2;
        const centerY = CANVAS_HEIGHT / 2;

        // Grille isométrique
        for (let i = -5; i <= 5; i++) {
            // Lignes parallèles à X
            ctx.beginPath();
            ctx.moveTo(centerX - 5 * GRID_SIZE + i * GRID_SIZE, centerY - 2.5 * GRID_SIZE);
            ctx.lineTo(centerX + 5 * GRID_SIZE + i * GRID_SIZE, centerY + 2.5 * GRID_SIZE);
            ctx.stroke();

            // Lignes parallèles à Y
            ctx.beginPath();
            ctx.moveTo(centerX - 5 * GRID_SIZE, centerY - 2.5 * GRID_SIZE - i * GRID_SIZE);
            ctx.lineTo(centerX + 5 * GRID_SIZE, centerY + 2.5 * GRID_SIZE - i * GRID_SIZE);
            ctx.stroke();
        }

        // Axes
        ctx.strokeStyle = '#00D9FF';
        ctx.lineWidth = 2;

        // Axe X (rouge)
        ctx.beginPath();
        ctx.moveTo(centerX - 3 * GRID_SIZE, centerY - 1.5 * GRID_SIZE);
        ctx.lineTo(centerX + 3 * GRID_SIZE, centerY + 1.5 * GRID_SIZE);
        ctx.stroke();

        // Axe Y (vert)
        ctx.beginPath();
        ctx.moveTo(centerX - 3 * GRID_SIZE, centerY + 1.5 * GRID_SIZE);
        ctx.lineTo(centerX + 3 * GRID_SIZE, centerY - 1.5 * GRID_SIZE);
        ctx.stroke();
    }

    /**
     * Dessine l'ombre du drone
     */
    function drawShadow(): void {
        const centerX = CANVAS_WIDTH / 2;
        const centerY = CANVAS_HEIGHT / 2;

        const x = getX();
        const y = getY();

        // Projection isométrique
        const isoX = centerX + (x - y) * GRID_SIZE;
        const isoY = centerY + (x + y) * GRID_SIZE * 0.5;

        // Ombre (ellipse)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.beginPath();
        ctx.ellipse(isoX, isoY, DRONE_SIZE, DRONE_SIZE * 0.3, 0, 0, 2 * Math.PI);
        ctx.fill();
    }

    /**
     * Dessine le drone
     */
    function drawDrone(): void {
        const centerX = CANVAS_WIDTH / 2;
        const centerY = CANVAS_HEIGHT / 2;

        const x = getX();
        const y = getY();
        const z = getAltitude();

        // Projection isométrique
        const isoX = centerX + (x - y) * GRID_SIZE;
        const isoY = centerY + (x + y) * GRID_SIZE * 0.5 - z * GRID_SIZE * 0.5;

        // Corps du drone (croix)
        ctx.strokeStyle = '#1E1E1E';
        ctx.fillStyle = '#00D9FF';
        ctx.lineWidth = 3;

        // Bras horizontal
        ctx.beginPath();
        ctx.moveTo(isoX - DRONE_SIZE, isoY);
        ctx.lineTo(isoX + DRONE_SIZE, isoY);
        ctx.stroke();

        // Bras vertical
        ctx.beginPath();
        ctx.moveTo(isoX, isoY - DRONE_SIZE);
        ctx.lineTo(isoX, isoY + DRONE_SIZE);
        ctx.stroke();

        // Centre
        ctx.beginPath();
        ctx.arc(isoX, isoY, 5, 0, 2 * Math.PI);
        ctx.fill();

        // Hélices (4 cercles)
        const propSize = 8;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        
        ctx.beginPath();
        ctx.arc(isoX - DRONE_SIZE, isoY, propSize, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(isoX + DRONE_SIZE, isoY, propSize, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(isoX, isoY - DRONE_SIZE, propSize, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(isoX, isoY + DRONE_SIZE, propSize, 0, 2 * Math.PI);
        ctx.fill();

        // Orientation (flèche)
        const yaw = 0; // TODO: obtenir du state
        const arrowLength = 15;
        const arrowX = isoX + Math.cos(yaw * Math.PI / 180) * arrowLength;
        const arrowY = isoY + Math.sin(yaw * Math.PI / 180) * arrowLength;

        ctx.strokeStyle = '#FF6B6B';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(isoX, isoY);
        ctx.lineTo(arrowX, arrowY);
        ctx.stroke();
    }

    /**
     * Dessine le HUD (Heads-Up Display)
     */
    function drawHUD(): void {
        const padding = 10;
        const lineHeight = 20;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(padding, padding, 150, 100);

        ctx.fillStyle = '#00D9FF';
        ctx.font = '14px monospace';
        ctx.textAlign = 'left';

        let y = padding + 20;

        // Altitude
        ctx.fillText('Altitude: ' + getAltitude().toFixed(2) + ' m', padding + 5, y);
        y += lineHeight;

        // Batterie
        const battery = getBattery();
        ctx.fillText('Batterie: ' + battery.toFixed(0) + '%', padding + 5, y);
        y += lineHeight;

        // Position
        ctx.fillText('X: ' + getX().toFixed(2) + ' m', padding + 5, y);
        y += lineHeight;

        ctx.fillText('Y: ' + getY().toFixed(2) + ' m', padding + 5, y);
        y += lineHeight;

        // Barre de batterie
        const barWidth = 120;
        const barHeight = 8;
        const barX = padding + 5;
        const barY = y;

        ctx.fillStyle = '#333';
        ctx.fillRect(barX, barY, barWidth, barHeight);

        const barFill = (battery / 100) * barWidth;
        ctx.fillStyle = battery > 30 ? '#4CAF50' : '#FF6B6B';
        ctx.fillRect(barX, barY, barFill, barHeight);
    }

    // Initialiser la vue
    initView();
}

