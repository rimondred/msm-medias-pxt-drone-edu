/**
 * Drone Education Extension
 */

//% weight=100 color=#00D9FF icon="\uf135"
namespace drone {

    /**
     * Décolle le drone
     */
    //% block="décoller"
    //% blockId=drone_takeoff
    //% weight=90
    export function takeOff() {
        basic.showString("DÉCOLLAGE");
    }

    /**
     * Atterrit le drone
     */
    //% block="atterrir"
    //% blockId=drone_land
    //% weight=89
    export function land() {
        basic.showString("ATTERRISSAGE");
    }

    /**
     * Définit la puissance du moteur
     */
    //% block="définir puissance à $percentage"
    //% blockId=drone_set_throttle
    //% percentage.min=0 percentage.max=100
    //% weight=85
    export function setThrottle(percentage: number) {
        basic.showNumber(percentage);
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
        return 1;
    }

    /**
     * Retourne le niveau de batterie
     */
    //% block="batterie"
    //% blockId=drone_battery
    //% weight=59
    export function battery(): number {
        return 100;
    }
}
