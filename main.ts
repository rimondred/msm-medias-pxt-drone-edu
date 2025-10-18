/**
 * Drone Education Extension
 * Extension pédagogique pour apprendre le pilotage de drones
 * avec simulateur intégré
 */

//% weight=100 color=#00D9FF icon="\uf135"
namespace drone {

    // Variables globales pour l'état du drone
    let isFlying = false;
    let currentThrottle = 0;
    let currentAltitude = 0;
    let currentBattery = 100;
    let currentPosX = 0;
    let currentPosY = 0;

    /**
     * Décolle le drone
     */
    //% block="décoller"
    //% blockId=drone_takeoff
    //% weight=90
    export function takeOff() {
        if (isFlying) return;
        
        isFlying = true;
        currentThrottle = 60;
        currentAltitude = 0;
        
        // Simulation de décollage
        control.runInBackground(() => {
            basic.pause(1000);
            currentAltitude = 1;
        });
    }

    /**
     * Atterrit le drone
     */
    //% block="atterrir"
    //% blockId=drone_land
    //% weight=89
    export function land() {
        if (!isFlying) return;
        
        isFlying = false;
        currentThrottle = 0;
        
        // Simulation d'atterrissage
        control.runInBackground(() => {
            basic.pause(1000);
            currentAltitude = 0;
        });
    }

    /**
     * Définit la puissance du moteur (throttle)
     */
    //% block="définir puissance à $percentage"
    //% blockId=drone_set_throttle
    //% percentage.min=0 percentage.max=100
    //% weight=85
    export function setThrottle(percentage: number) {
        currentThrottle = Math.max(0, Math.min(100, percentage));
        
        // Simuler la montée/descente
        if (isFlying) {
            if (currentThrottle > 50) {
                currentAltitude += 0.1;
            } else if (currentThrottle < 40) {
                currentAltitude = Math.max(0, currentAltitude - 0.1);
            }
        }
    }

    /**
     * Définit l'orientation du drone
     */
    //% block="définir orientation roulis $roll tangage $pitch lacet $yaw"
    //% blockId=drone_set_rpy
    //% roll.min=-90 roll.max=90
    //% pitch.min=-90 pitch.max=90
    //% yaw.min=-180 yaw.max=180
    //% weight=80
    export function setRPY(roll: number, pitch: number, yaw: number) {
        // Simulation simple de mouvement
        if (isFlying) {
            currentPosX += pitch * 0.01;
            currentPosY += roll * 0.01;
        }
    }

    /**
     * Va à une position spécifique
     */
    //% block="aller à position X $x Y $y altitude $z vitesse $speed"
    //% blockId=drone_go_to
    //% x.min=-10 x.max=10
    //% y.min=-10 y.max=10
    //% z.min=0 z.max=5
    //% speed.min=0.1 speed.max=2
    //% weight=75
    export function goTo(x: number, y: number, z: number, speed: number) {
        if (!isFlying) return;
        
        // Simulation de mouvement vers la position
        currentPosX = x;
        currentPosY = y;
        currentAltitude = z;
    }

    /**
     * Attend un certain nombre de millisecondes
     */
    //% block="attendre $ms ms"
    //% blockId=drone_wait
    //% ms.min=100 ms.max=10000
    //% weight=70
    export function wait(ms: number) {
        basic.pause(ms);
    }

    /**
     * Retourne l'altitude actuelle
     */
    //% block="altitude"
    //% blockId=drone_altitude
    //% weight=60
    export function altitude(): number {
        return currentAltitude;
    }

    /**
     * Retourne le niveau de batterie
     */
    //% block="batterie"
    //% blockId=drone_battery
    //% weight=59
    export function battery(): number {
        // Simulation de consommation de batterie
        if (isFlying) {
            currentBattery = Math.max(0, currentBattery - 0.1);
        }
        return currentBattery;
    }

    /**
     * Retourne la position X
     */
    //% block="position X"
    //% blockId=drone_pos_x
    //% weight=58
    export function positionX(): number {
        return currentPosX;
    }

    /**
     * Retourne la position Y
     */
    //% block="position Y"
    //% blockId=drone_pos_y
    //% weight=57
    export function positionY(): number {
        return currentPosY;
    }

    /**
     * Définit les conditions de vent
     */
    //% block="définir vent X $x Y $y"
    //% blockId=drone_set_wind
    //% x.min=-5 x.max=5
    //% y.min=-5 y.max=5
    //% weight=50
    export function setWind(x: number, y: number) {
        // Simulation du vent sur la position
        if (isFlying) {
            currentPosX += x * 0.01;
            currentPosY += y * 0.01;
        }
    }

    /**
     * Définit la masse du drone
     */
    //% block="définir masse à $mass g"
    //% blockId=drone_set_mass
    //% mass.min=50 mass.max=1000
    //% weight=45
    export function setMass(mass: number) {
        // La masse affecte la consommation de batterie
        if (isFlying) {
            currentBattery = Math.max(0, currentBattery - mass * 0.001);
        }
    }

    /**
     * Définit l'inclinaison maximale
     */
    //% block="définir inclinaison max à $angle"
    //% blockId=drone_set_max_tilt
    //% angle.min=10 angle.max=80
    //% weight=40
    export function setMaxTilt(angle: number) {
        // Limite de sécurité (simulation)
        if (Math.abs(currentPosX) > angle || Math.abs(currentPosY) > angle) {
            // Auto-cut si inclinaison trop élevée
            isFlying = false;
            currentThrottle = 0;
        }
    }

    /**
     * Types d'événements
     */
    export enum DroneEvent {
        TookOff = 1,
        Landed = 2,
        MissionDone = 3
    }

    /**
     * Gestionnaire d'événements
     */
    //% block="quand événement $event"
    //% blockId=drone_on_event
    //% weight=30
    export function onEvent(event: DroneEvent, handler: () => void) {
        // Simulation simple d'événements
        control.runInBackground(() => {
            if (event === DroneEvent.TookOff && isFlying) {
                handler();
            } else if (event === DroneEvent.Landed && !isFlying) {
                handler();
            } else if (event === DroneEvent.MissionDone) {
                handler();
            }
        });
    }
}
