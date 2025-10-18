/**
 * Drone Education Extension
 * Extension pédagogique pour apprendre le pilotage de drones
 * avec simulateur intégré
 */

//% weight=100 color=#00D9FF icon="\uf135"
namespace drone {

    // Variables globales pour l'état du drone
    let isInitialized = false;
    let isFlying = false;
    let currentThrottle = 0;
    let currentRoll = 0;
    let currentPitch = 0;
    let currentYaw = 0;
    let eventHandlers: { [key: string]: () => void } = {};

    /**
     * Initialise le drone (appelé automatiquement)
     */
    function init() {
        if (isInitialized) return;
        isInitialized = true;
        
        // Initialiser le simulateur si disponible
        if (typeof sim !== 'undefined') {
            sim.init();
        }
    }

    /**
     * Décolle le drone
     */
    //% block="décoller"
    //% blockId=drone_takeoff
    //% weight=90
    export function takeOff() {
        init();
        if (isFlying) return;
        
        isFlying = true;
        currentThrottle = 60; // Throttle initial pour décoller
        
        if (typeof sim !== 'undefined') {
            sim.setThrottle(currentThrottle);
        }
        
        // Événement après un court délai
        control.runInBackground(() => {
            basic.pause(500);
            triggerEvent("tookOff");
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
        
        currentThrottle = 0;
        currentRoll = 0;
        currentPitch = 0;
        currentYaw = 0;
        
        if (typeof sim !== 'undefined') {
            sim.setThrottle(0);
            sim.setRPY(0, 0, 0);
        }
        
        isFlying = false;
        
        // Événement après un court délai
        control.runInBackground(() => {
            basic.pause(500);
            triggerEvent("landed");
        });
    }

    /**
     * Définit la puissance du moteur (throttle)
     * @param pourcentage puissance de 0 à 100
     */
    //% block="définir puissance %pourcentage"
    //% blockId=drone_set_throttle
    //% pourcentage.min=0 pourcentage.max=100 pourcentage.defl=50
    //% weight=80
    export function setThrottle(pourcentage: number) {
        init();
        currentThrottle = Math.clamp(0, 100, pourcentage);
        
        if (typeof sim !== 'undefined') {
            sim.setThrottle(currentThrottle);
        }
    }

    /**
     * Définit l'orientation du drone (roll, pitch, yaw)
     * @param roulis angle de roulis en degrés/s (-90 à 90)
     * @param tangage angle de tangage en degrés/s (-90 à 90)
     * @param lacet angle de lacet en degrés/s (-180 à 180)
     */
    //% block="définir orientation roulis %roulis tangage %tangage lacet %lacet"
    //% blockId=drone_set_rpy
    //% roulis.min=-90 roulis.max=90 roulis.defl=0
    //% tangage.min=-90 tangage.max=90 tangage.defl=0
    //% lacet.min=-180 lacet.max=180 lacet.defl=0
    //% weight=79
    export function setRPY(roulis: number, tangage: number, lacet: number) {
        init();
        currentRoll = Math.clamp(-90, 90, roulis);
        currentPitch = Math.clamp(-90, 90, tangage);
        currentYaw = Math.clamp(-180, 180, lacet);
        
        if (typeof sim !== 'undefined') {
            sim.setRPY(currentRoll, currentPitch, currentYaw);
        }
    }

    /**
     * Va à une position spécifique
     * @param x position X en mètres
     * @param y position Y en mètres
     * @param z altitude en mètres
     * @param vitesse vitesse en m/s
     */
    //% block="aller à position X %x Y %y altitude %z vitesse %vitesse"
    //% blockId=drone_goto
    //% x.defl=0 y.defl=0 z.defl=1 vitesse.defl=1
    //% weight=78
    export function goTo(x: number, y: number, z: number, vitesse: number) {
        init();
        
        if (typeof sim !== 'undefined') {
            sim.goTo(x, y, z, vitesse);
        }
    }

    /**
     * Attend pendant un certain temps
     * @param ms temps en millisecondes
     */
    //% block="attendre %ms ms"
    //% blockId=drone_wait
    //% ms.min=0 ms.max=10000 ms.defl=1000
    //% weight=77
    export function wait(ms: number) {
        basic.pause(ms);
    }

    /**
     * Définit un gestionnaire d'événement
     * @param event type d'événement
     * @param handler fonction à exécuter
     */
    //% block="quand événement %event"
    //% blockId=drone_on_event
    //% weight=70
    export function onEvent(event: DroneEvent, handler: () => void) {
        eventHandlers[event] = handler;
    }

    /**
     * Déclenche un événement
     */
    function triggerEvent(event: string) {
        if (eventHandlers[event]) {
            eventHandlers[event]();
        }
    }

    /**
     * Définit les conditions environnementales (pour la pédagogie)
     * @param ventX vent horizontal en m/s
     * @param ventY vent latéral en m/s
     */
    //% block="définir vent X %ventX Y %ventY"
    //% blockId=drone_set_wind
    //% weight=60
    export function setWind(ventX: number, ventY: number) {
        if (typeof sim !== 'undefined') {
            sim.setWind(ventX, ventY);
        }
    }

    /**
     * Définit la masse du drone
     * @param masse masse en grammes
     */
    //% block="définir masse %masse g"
    //% blockId=drone_set_mass
    //% masse.min=100 masse.max=1000 masse.defl=250
    //% weight=59
    export function setMass(masse: number) {
        if (typeof sim !== 'undefined') {
            sim.setMass(masse);
        }
    }

    /**
     * Définit l'inclinaison maximale
     * @param angle angle en degrés
     */
    //% block="définir inclinaison max %angle°"
    //% blockId=drone_set_max_tilt
    //% angle.min=10 angle.max=80 angle.defl=45
    //% weight=58
    export function setMaxTilt(angle: number) {
        if (typeof sim !== 'undefined') {
            sim.setMaxTilt(angle);
        }
    }

    /**
     * Obtient l'altitude actuelle
     */
    //% block="altitude"
    //% blockId=drone_get_altitude
    //% weight=50
    export function getAltitude(): number {
        if (typeof sim !== 'undefined') {
            return sim.getAltitude();
        }
        return 0;
    }

    /**
     * Obtient le niveau de batterie
     */
    //% block="batterie"
    //% blockId=drone_get_battery
    //% weight=49
    export function getBattery(): number {
        if (typeof sim !== 'undefined') {
            return sim.getBattery();
        }
        return 100;
    }

    /**
     * Obtient la position X
     */
    //% block="position X"
    //% blockId=drone_get_x
    //% weight=48
    export function getX(): number {
        if (typeof sim !== 'undefined') {
            return sim.getX();
        }
        return 0;
    }

    /**
     * Obtient la position Y
     */
    //% block="position Y"
    //% blockId=drone_get_y
    //% weight=47
    export function getY(): number {
        if (typeof sim !== 'undefined') {
            return sim.getY();
        }
        return 0;
    }

    /**
     * Types d'événements
     */
    export enum DroneEvent {
        //% block="décollage"
        tookOff = "tookOff",
        //% block="atterrissage"
        landed = "landed",
        //% block="mission terminée"
        missionDone = "missionDone"
    }

    // Initialisation automatique
    init();
}

