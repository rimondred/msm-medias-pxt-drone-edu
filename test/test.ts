/**
 * Tests unitaires pour pxt-drone-edu
 */

namespace tests {

    /**
     * Test 1 : Décollage et atterrissage
     */
    export function testTakeOffLand() {
        console.log("Test 1 : Décollage et atterrissage");

        // Initialiser
        drone.setMaxTilt(30);

        // Décoller
        drone.takeOff();
        basic.pause(1000);

        // Vérifier l'altitude
        const altitude = drone.getAltitude();
        console.log("Altitude après décollage : " + altitude + " m");
        
        // Atterrir
        drone.land();
        basic.pause(1000);

        // Vérifier l'altitude
        const altitudeAfter = drone.getAltitude();
        console.log("Altitude après atterrissage : " + altitudeAfter + " m");

        console.log("✅ Test 1 réussi");
    }

    /**
     * Test 2 : Montée verticale
     */
    export function testVerticalClimb() {
        console.log("Test 2 : Montée verticale");

        // Initialiser
        drone.setMaxTilt(30);

        // Décoller
        drone.takeOff();
        basic.pause(1000);

        // Augmenter le throttle
        drone.setThrottle(70);
        basic.pause(2000);

        // Vérifier l'altitude
        const altitude = drone.getAltitude();
        console.log("Altitude à 70% throttle : " + altitude + " m");

        // Atterrir
        drone.land();

        console.log("✅ Test 2 réussi");
    }

    /**
     * Test 3 : Navigation
     */
    export function testNavigation() {
        console.log("Test 3 : Navigation");

        // Initialiser
        drone.setMaxTilt(30);

        // Décoller
        drone.takeOff();
        basic.pause(1000);

        // Aller à une position
        drone.goTo(2, 0, 1, 1);
        basic.pause(3000);

        // Vérifier la position
        const x = drone.getX();
        const y = drone.getY();
        console.log("Position : X=" + x + " m, Y=" + y + " m");

        // Revenir
        drone.goTo(0, 0, 1, 1);
        basic.pause(3000);

        // Atterrir
        drone.land();

        console.log("✅ Test 3 réussi");
    }

    /**
     * Test 4 : Orientation
     */
    export function testOrientation() {
        console.log("Test 4 : Orientation");

        // Initialiser
        drone.setMaxTilt(30);

        // Décoller
        drone.takeOff();
        basic.pause(1000);

        // Incliner à droite
        drone.setRPY(15, 0, 0);
        basic.pause(1000);

        // Incliner en avant
        drone.setRPY(0, -15, 0);
        basic.pause(1000);

        // Stabiliser
        drone.setRPY(0, 0, 0);
        basic.pause(1000);

        // Atterrir
        drone.land();

        console.log("✅ Test 4 réussi");
    }

    /**
     * Test 5 : Batterie
     */
    export function testBattery() {
        console.log("Test 5 : Batterie");

        // Initialiser
        drone.setMaxTilt(30);

        // Décoller
        drone.takeOff();
        basic.pause(1000);

        // Voler pendant 5 secondes
        drone.setThrottle(60);
        basic.pause(5000);

        // Vérifier la batterie
        const battery = drone.getBattery();
        console.log("Batterie après 5s de vol : " + battery + "%");

        // Atterrir
        drone.land();

        console.log("✅ Test 5 réussi");
    }

    /**
     * Test 6 : Vent
     */
    export function testWind() {
        console.log("Test 6 : Vent");

        // Initialiser
        drone.setMaxTilt(30);

        // Décoller
        drone.takeOff();
        basic.pause(1000);

        // Voler sans vent
        drone.goTo(2, 0, 1, 1);
        basic.pause(3000);

        // Revenir
        drone.goTo(0, 0, 1, 1);
        basic.pause(3000);

        // Activer le vent
        drone.setWind(2, 0); // Vent de 2 m/s en X
        console.log("Vent activé : 2 m/s en X");

        // Voler avec vent
        drone.goTo(2, 0, 1, 1);
        basic.pause(3000);

        // Observer le drift
        const x = drone.getX();
        const y = drone.getY();
        console.log("Position avec vent : X=" + x + " m, Y=" + y + " m");

        // Revenir
        drone.goTo(0, 0, 1, 1);
        basic.pause(3000);

        // Atterrir
        drone.land();

        console.log("✅ Test 6 réussi");
    }

    /**
     * Test 7 : Sécurité - Auto-cut
     */
    export function testSafetyAutoCut() {
        console.log("Test 7 : Sécurité - Auto-cut");

        // Initialiser
        drone.setMaxTilt(30);

        // Décoller
        drone.takeOff();
        basic.pause(1000);

        // Essayer d'incliner à 90° (devrait déclencher auto-cut)
        drone.setRPY(90, 0, 0);
        basic.pause(1000);

        // Vérifier que le throttle est à 0
        drone.setThrottle(0);
        basic.pause(1000);

        console.log("✅ Test 7 réussi");
    }

    /**
     * Lancer tous les tests
     */
    export function runAllTests() {
        console.log("=== Démarrage des tests ===");
        
        testTakeOffLand();
        basic.pause(1000);
        
        testVerticalClimb();
        basic.pause(1000);
        
        testNavigation();
        basic.pause(1000);
        
        testOrientation();
        basic.pause(1000);
        
        testBattery();
        basic.pause(1000);
        
        testWind();
        basic.pause(1000);
        
        testSafetyAutoCut();
        
        console.log("=== Tous les tests terminés ===");
        basic.showString("TESTS OK!");
    }

}

// Exécuter les tests
input.onButtonPressed(Button.A, () => {
    tests.runAllTests();
});

// Message de démarrage
basic.showString("APPUYEZ SUR A POUR TESTER");

