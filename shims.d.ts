/**
 * Type definitions for pxt-drone-edu
 */

// Interface pour le simulateur
declare namespace sim {
    /**
     * Initialise le simulateur
     */
    function init(): void;

    /**
     * Définit la puissance du moteur
     */
    function setThrottle(throttle: number): void;

    /**
     * Définit l'orientation (roll, pitch, yaw)
     */
    function setRPY(roll: number, pitch: number, yaw: number): void;

    /**
     * Va à une position spécifique
     */
    function goTo(x: number, y: number, z: number, vitesse: number): void;

    /**
     * Définit les conditions de vent
     */
    function setWind(x: number, y: number): void;

    /**
     * Définit la masse du drone
     */
    function setMass(masse: number): void;

    /**
     * Définit l'inclinaison maximale
     */
    function setMaxTilt(angle: number): void;

    /**
     * Obtient l'altitude actuelle
     */
    function getAltitude(): number;

    /**
     * Obtient le niveau de batterie
     */
    function getBattery(): number;

    /**
     * Obtient la position X
     */
    function getX(): number;

    /**
     * Obtient la position Y
     */
    function getY(): number;
}

