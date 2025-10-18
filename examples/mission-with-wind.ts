/**
 * Mission avec vent : Démontrer l'effet du vent et la compensation
 * 
 * Objectifs pédagogiques :
 * - Comprendre l'effet du vent sur le vol
 * - Apprendre à compenser les perturbations
 * - Utiliser les capteurs pour adapter le vol
 */

// Étape 1 : Vol sans vent
drone.setWind(0, 0);
drone.setMaxTilt(30);

drone.takeOff();
drone.wait(2000);

drone.goTo(2, 0, 1, 1);
drone.wait(3000);

drone.goTo(0, 0, 1, 1);
drone.wait(3000);

basic.showString("SANS VENT OK");

// Étape 2 : Vol avec vent latéral
drone.setWind(2, 0); // Vent de 2 m/s en X

drone.goTo(2, 0, 1, 1);
drone.wait(3000);

// Observer le drift
basic.showString("DRIFT!");

drone.goTo(0, 0, 1, 1);
drone.wait(3000);

basic.showString("VEC VENT");

// Étape 3 : Compensation manuelle du vent
// En vol réel, on utiliserait un capteur de vent ou un GPS
// Ici, on compense en volant contre le vent
drone.setRPY(0, 0, 0); // Stabiliser
drone.wait(500);

// Voler en compensant le vent
drone.setRPY(0, -10, 0); // Incliner légèrement contre le vent
drone.wait(1000);

drone.setRPY(0, 0, 0); // Stabiliser à nouveau
drone.wait(500);

basic.showString("COMPENSE!");

// Atterrir
drone.land();

basic.showString("FIN");

