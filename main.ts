/**
 * Drone Education Extension
 * Simulateur de drone avec animation sur les LEDs du micro:bit
 */

//% weight=100 color=#00D9FF icon="\uf135"
namespace drone {

    let isFlying = false;
    let currentAltitude = 0;
    let currentBattery = 100;

    /**
     * Dessine un drone sur les LEDs
     */
    function drawDrone() {
        basic.clearScreen();
        
        // Corps du drone (croix)
        led.plot(2, 2); // Centre
        
        // Hélices (4 points)
        led.plotBrightness(2, 0, 128); // Haut
        led.plotBrightness(2, 4, 128); // Bas
        led.plotBrightness(0, 2, 128); // Gauche
        led.plotBrightness(4, 2, 128); // Droite
        
        // LEDs de puissance
        if (isFlying) {
            led.plot(1, 1);
            led.plot(3, 1);
            led.plot(1, 3);
            led.plot(3, 3);
        }
    }

    /**
     * Animation de décollage
     */
    function animateTakeoff() {
        for (let i = 0; i < 5; i++) {
            basic.clearScreen();
            // Drone qui monte
            led.plot(2, 4 - i);
            led.plotBrightness(2, 4 - i - 1, 128);
            led.plotBrightness(2, 4 - i + 1, 128);
            led.plotBrightness(1, 4 - i, 128);
            led.plotBrightness(3, 4 - i, 128);
            basic.pause(200);
        }
        drawDrone();
    }

    /**
     * Animation d'atterrissage
     */
    function animateLanding() {
        for (let i = 0; i < 5; i++) {
            basic.clearScreen();
            // Drone qui descend
            led.plot(2, i);
            led.plotBrightness(2, i - 1, 128);
            led.plotBrightness(2, i + 1, 128);
            led.plotBrightness(1, i, 128);
            led.plotBrightness(3, i, 128);
            basic.pause(200);
        }
        basic.clearScreen();
    }

    /**
     * Animation de vol
     */
    function animateFlying() {
        basic.clearScreen();
        // Drone qui bouge
        for (let i = 0; i < 3; i++) {
            led.plot(2, 2);
            led.plotBrightness(2, 1, 128);
            led.plotBrightness(2, 3, 128);
            led.plotBrightness(1, 2, 128);
            led.plotBrightness(3, 2, 128);
            basic.pause(100);
            
            basic.clearScreen();
            led.plot(2, 2);
            led.plotBrightness(1, 1, 128);
            led.plotBrightness(3, 3, 128);
            led.plotBrightness(1, 3, 128);
            led.plotBrightness(3, 1, 128);
            basic.pause(100);
        }
        drawDrone();
    }

    /**
     * Décolle le drone
     */
    //% block="décoller"
    //% blockId=drone_takeoff
    //% weight=90
    export function takeOff() {
        if (isFlying) return;
        
        isFlying = true;
        currentAltitude = 1;
        currentBattery = 100;
        
        animateTakeoff();
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
        currentAltitude = 0;
        
        animateLanding();
    }

    /**
     * Définit la puissance du moteur
     */
    //% block="définir puissance à $percentage"
    //% blockId=drone_set_throttle
    //% percentage.min=0 percentage.max=100
    //% weight=85
    export function setThrottle(percentage: number) {
        if (!isFlying) return;
        
        // Animation de puissance
        drawDrone();
        basic.pause(100);
    }

    /**
     * Va à une position spécifique
     */
    //% block="aller à position X $x Y $y altitude $z"
    //% blockId=drone_go_to
    //% x.min=-10 x.max=10
    //% y.min=-10 y.max=10
    //% z.min=0 z.max=5
    //% weight=75
    export function goTo(x: number, y: number, z: number) {
        if (!isFlying) return;
        
        currentAltitude = z;
        
        // Animation de mouvement
        animateFlying();
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
        if (isFlying) {
            currentBattery = Math.max(0, currentBattery - 1);
        }
        return currentBattery;
    }

    /**
     * Affiche l'état du drone
     */
    //% block="afficher état du drone"
    //% blockId=drone_show_status
    //% weight=50
    export function showStatus() {
        if (isFlying) {
            basic.showString("VOL", 100);
        } else {
            basic.showString("SOL", 100);
        }
        drawDrone();
    }
}
