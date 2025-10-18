/**
 * Moteur physique simplifié pour le simulateur de drone
 * Modèle à 50 Hz avec intégration Euler
 */

namespace sim {

    // État du drone
    interface DroneState {
        // Position (m)
        x: number;
        y: number;
        z: number;
        
        // Vitesse (m/s)
        vx: number;
        vy: number;
        vz: number;
        
        // Attitude (degrés)
        roll: number;
        pitch: number;
        yaw: number;
        
        // Taux de rotation (degrés/s)
        rollRate: number;
        pitchRate: number;
        yawRate: number;
        
        // Batterie (V)
        battery: number;
    }

    // Commandes du drone
    interface DroneCommands {
        throttle: number;  // 0-100
        roll: number;      // -90 à 90 degrés/s
        pitch: number;     // -90 à 90 degrés/s
        yaw: number;       // -180 à 180 degrés/s
    }

    // Paramètres physiques
    interface PhysicsParams {
        mass: number;          // grammes
        maxTilt: number;       // degrés
        windX: number;         // m/s
        windY: number;         // m/s
        gravity: number;       // m/s²
        dragCoeff: number;     // coefficient de traînée
        liftCoeff: number;     // coefficient de portance
        yawRateMax: number;    // degrés/s
    }

    // Variables globales
    let state: DroneState;
    let commands: DroneCommands;
    let params: PhysicsParams;
    let loopHandle: number;
    let targetX: number = 0;
    let targetY: number = 0;
    let targetZ: number = 0;
    let targetSpeed: number = 0;
    let isMovingToTarget: boolean = false;

    const DT = 0.02; // 50 Hz
    const BATTERY_CAPACITY = 850; // mAh
    const BATTERY_VOLTAGE_FULL = 4.2; // V
    const BATTERY_VOLTAGE_EMPTY = 3.4; // V
    const BATTERY_CURRENT_BASE = 2.0; // A à 50% throttle

    /**
     * Initialise le simulateur
     */
    export function init(): void {
        // État initial
        state = {
            x: 0, y: 0, z: 0,
            vx: 0, vy: 0, vz: 0,
            roll: 0, pitch: 0, yaw: 0,
            rollRate: 0, pitchRate: 0, yawRate: 0,
            battery: BATTERY_VOLTAGE_FULL
        };

        // Commandes initiales
        commands = {
            throttle: 0,
            roll: 0,
            pitch: 0,
            yaw: 0
        };

        // Paramètres par défaut
        params = {
            mass: 250,          // 250g
            maxTilt: 45,        // 45°
            windX: 0,
            windY: 0,
            gravity: 9.81,
            dragCoeff: 0.1,
            liftCoeff: 0.5,
            yawRateMax: 200
        };

        // Démarrer la boucle de simulation
        if (loopHandle) {
            clearInterval(loopHandle);
        }
        loopHandle = setInterval(update, DT * 1000);
    }

    /**
     * Boucle de simulation (50 Hz)
     */
    function update(): void {
        // Contrôle PID simple pour aller vers la cible
        if (isMovingToTarget) {
            updateTargetControl();
        }

        // Physique de vol
        updatePhysics();

        // Gestion de la batterie
        updateBattery();

        // Vérifications de sécurité
        checkSafety();

        // Événements
        checkEvents();
    }

    /**
     * Contrôle pour atteindre la cible
     */
    function updateTargetControl(): void {
        const dx = targetX - state.x;
        const dy = targetY - state.y;
        const dz = targetZ - state.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < 0.1) {
            // Arrivé à destination
            isMovingToTarget = false;
            commands.throttle = 50; // Maintien en vol stationnaire
            commands.roll = 0;
            commands.pitch = 0;
            commands.yaw = 0;
            return;
        }

        // Calcul des commandes pour atteindre la cible
        const maxSpeed = targetSpeed || 1.0;
        
        // Contrôle de position (P simple)
        const kp = 2.0;
        const desiredVx = Math.clamp(-maxSpeed, maxSpeed, kp * dx);
        const desiredVy = Math.clamp(-maxSpeed, maxSpeed, kp * dy);
        const desiredVz = Math.clamp(-maxSpeed, maxSpeed, kp * dz);

        // Conversion en angles
        const vxy = Math.sqrt(desiredVx * desiredVx + desiredVy * desiredVy);
        const desiredRoll = Math.clamp(-params.maxTilt, params.maxTilt, Math.atan2(desiredVy, desiredVx) * 180 / Math.PI);
        const desiredPitch = Math.clamp(-params.maxTilt, params.maxTilt, -Math.atan2(desiredVz, vxy) * 180 / Math.PI);

        // Commande de throttle (base + correction altitude)
        const baseThrottle = 50;
        const altitudeCorrection = Math.clamp(-20, 20, dz * 10);
        commands.throttle = Math.clamp(0, 100, baseThrottle + altitudeCorrection);

        // Commande d'orientation
        commands.roll = desiredRoll;
        commands.pitch = desiredPitch;
        commands.yaw = 0;
    }

    /**
     * Mise à jour de la physique
     */
    function updatePhysics(): void {
        // Conversion des commandes en forces
        const throttleForce = (commands.throttle / 100) * params.liftCoeff * params.mass / 1000;
        const gravityForce = params.gravity * params.mass / 1000;

        // Force verticale nette
        const fz = throttleForce - gravityForce;

        // Conversion des angles en radians
        const rollRad = state.roll * Math.PI / 180;
        const pitchRad = state.pitch * Math.PI / 180;

        // Projection des forces
        const fx = Math.sin(rollRad) * throttleForce;
        const fy = -Math.sin(pitchRad) * throttleForce;
        const fz_net = Math.cos(rollRad) * Math.cos(pitchRad) * fz;

        // Ajout du vent
        fx += params.windX * params.dragCoeff;
        fy += params.windY * params.dragCoeff;

        // Accélération
        const ax = fx / (params.mass / 1000);
        const ay = fy / (params.mass / 1000);
        const az = fz_net / (params.mass / 1000);

        // Intégration Euler (vitesse)
        state.vx += ax * DT;
        state.vy += ay * DT;
        state.vz += az * DT;

        // Traînée aérodynamique
        state.vx *= (1 - params.dragCoeff * DT);
        state.vy *= (1 - params.dragCoeff * DT);
        state.vz *= (1 - params.dragCoeff * DT);

        // Intégration Euler (position)
        state.x += state.vx * DT;
        state.y += state.vy * DT;
        state.z += state.vz * DT;

        // Contrainte au sol
        if (state.z < 0) {
            state.z = 0;
            state.vz = 0;
            if (state.vx * state.vx + state.vy * state.vy < 0.1) {
                // Au sol et immobile
                state.vx = 0;
                state.vy = 0;
            }
        }

        // Dynamique des angles (modèle simplifié)
        const k_attitude = 5.0;  // Gain
        const damping = 0.8;     // Amortissement

        state.rollRate = state.rollRate * damping + (commands.roll - state.roll) * k_attitude * DT;
        state.pitchRate = state.pitchRate * damping + (commands.pitch - state.pitch) * k_attitude * DT;
        state.yawRate = state.yawRate * damping + (commands.yaw - state.yaw) * k_attitude * DT;

        // Limitation des taux
        state.rollRate = Math.clamp(-params.yawRateMax, params.yawRateMax, state.rollRate);
        state.pitchRate = Math.clamp(-params.yawRateMax, params.yawRateMax, state.pitchRate);
        state.yawRate = Math.clamp(-params.yawRateMax, params.yawRateMax, state.yawRate);

        // Intégration des angles
        state.roll += state.rollRate * DT;
        state.pitch += state.pitchRate * DT;
        state.yaw += state.yawRate * DT;

        // Normalisation des angles
        state.yaw = ((state.yaw % 360) + 360) % 360;
    }

    /**
     * Mise à jour de la batterie
     */
    function updateBattery(): void {
        // Consommation basée sur le throttle
        const current = BATTERY_CURRENT_BASE * (commands.throttle / 100);
        const capacityUsed = (current / 1000) * (DT / 3600); // Ah
        const voltageDrop = (capacityUsed / BATTERY_CAPACITY) * (BATTERY_VOLTAGE_FULL - BATTERY_VOLTAGE_EMPTY);
        
        state.battery -= voltageDrop;
        state.battery = Math.max(BATTERY_VOLTAGE_EMPTY, state.battery);

        // Auto-cut si batterie trop faible
        if (state.battery < BATTERY_VOLTAGE_EMPTY + 0.1) {
            commands.throttle = 0;
        }
    }

    /**
     * Vérifications de sécurité
     */
    function checkSafety(): void {
        // Auto-cut si inclinaison trop forte
        if (Math.abs(state.roll) > 80 || Math.abs(state.pitch) > 80) {
            commands.throttle = 0;
            commands.roll = 0;
            commands.pitch = 0;
            commands.yaw = 0;
        }

        // Auto-cut si batterie trop faible
        if (state.battery < BATTERY_VOLTAGE_EMPTY) {
            commands.throttle = 0;
        }
    }

    /**
     * Vérification des événements
     */
    function checkEvents(): void {
        // Événement "tookOff" : altitude > 20cm
        if (state.z > 0.2 && state.vz > 0) {
            // TODO: déclencher événement
        }

        // Événement "landed" : au sol et immobile
        if (state.z < 0.05 && Math.abs(state.vz) < 0.1) {
            // TODO: déclencher événement
        }
    }

    /**
     * Définit la puissance du moteur
     */
    export function setThrottle(throttle: number): void {
        commands.throttle = Math.clamp(0, 100, throttle);
    }

    /**
     * Définit l'orientation
     */
    export function setRPY(roll: number, pitch: number, yaw: number): void {
        commands.roll = Math.clamp(-90, 90, roll);
        commands.pitch = Math.clamp(-90, 90, pitch);
        commands.yaw = Math.clamp(-180, 180, yaw);
    }

    /**
     * Va à une position
     */
    export function goTo(x: number, y: number, z: number, vitesse: number): void {
        targetX = x;
        targetY = y;
        targetZ = z;
        targetSpeed = vitesse;
        isMovingToTarget = true;
    }

    /**
     * Définit le vent
     */
    export function setWind(x: number, y: number): void {
        params.windX = x;
        params.windY = y;
    }

    /**
     * Définit la masse
     */
    export function setMass(masse: number): void {
        params.mass = Math.clamp(100, 1000, masse);
    }

    /**
     * Définit l'inclinaison maximale
     */
    export function setMaxTilt(angle: number): void {
        params.maxTilt = Math.clamp(10, 80, angle);
    }

    /**
     * Obtient l'altitude
     */
    export function getAltitude(): number {
        return state.z;
    }

    /**
     * Obtient le niveau de batterie
     */
    export function getBattery(): number {
        const percent = ((state.battery - BATTERY_VOLTAGE_EMPTY) / (BATTERY_VOLTAGE_FULL - BATTERY_VOLTAGE_EMPTY)) * 100;
        return Math.clamp(0, 100, percent);
    }

    /**
     * Obtient la position X
     */
    export function getX(): number {
        return state.x;
    }

    /**
     * Obtient la position Y
     */
    export function getY(): number {
        return state.y;
    }
}

