/**
 * Configuration de l'éditeur MakeCode
 * Icônes et catégories pour les blocs
 */

namespace drone {

    /**
     * Catégories de blocs
     */
    export enum BlockCategory {
        //% block="Contrôle"
        Control = 0,
        //% block="Navigation"
        Navigation = 1,
        //% block="Capteurs"
        Sensors = 2,
        //% block="Configuration"
        Config = 3,
        //% block="Événements"
        Events = 4
    }

    /**
     * Couleurs des blocs
     */
    export const BlockColors = {
        Control: "#00D9FF",
        Navigation: "#4CAF50",
        Sensors: "#FF9800",
        Config: "#9C27B0",
        Events: "#F44336"
    };

}

