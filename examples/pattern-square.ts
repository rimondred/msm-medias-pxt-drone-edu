/**
 * Pattern en carré : Voler en formant un carré à 1m d'altitude
 * 
 * Objectifs pédagogiques :
 * - Comprendre les coordonnées 2D
 * - Apprendre à programmer des patterns de vol
 * - Utiliser les boucles pour répéter des actions
 */

// Configuration
const altitude = 1; // Altitude constante de 1m
const cote = 2; // Côté du carré en mètres
const vitesse = 1; // Vitesse de 1m/s

// Initialisation
drone.setMaxTilt(30);

// Décoller à l'altitude de vol
drone.takeOff();
drone.wait(2000);

// Monter à l'altitude de vol
drone.goTo(0, 0, altitude, vitesse);
drone.wait(2000);

// Voler en carré
// Point 1 : (cote, 0)
drone.goTo(cote, 0, altitude, vitesse);
drone.wait(3000);

// Point 2 : (cote, cote)
drone.goTo(cote, cote, altitude, vitesse);
drone.wait(3000);

// Point 3 : (0, cote)
drone.goTo(0, cote, altitude, vitesse);
drone.wait(3000);

// Point 4 : (0, 0) - retour au départ
drone.goTo(0, 0, altitude, vitesse);
drone.wait(3000);

// Stabiliser
drone.setRPY(0, 0, 0);
drone.wait(1000);

// Atterrir
drone.land();

// Message de fin
basic.showString("CARRE TERMINE!");

