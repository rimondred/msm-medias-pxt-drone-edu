/**
 * Mission de base : Décoller, avancer, pivoter, revenir, atterrir
 * 
 * Objectifs pédagogiques :
 * - Comprendre les commandes de base
 * - Apprendre la séquence décollage → vol → atterrissage
 * - Utiliser les fonctions de positionnement
 */

// Initialisation
drone.setMaxTilt(30); // Limiter l'inclinaison pour plus de stabilité

// Décoller
drone.takeOff();
drone.wait(2000); // Attendre que le drone soit stable

// Avancer de 2 mètres en X
drone.goTo(2, 0, 1, 1); // X=2m, Y=0m, Z=1m, vitesse=1m/s
drone.wait(3000); // Attendre l'arrivée

// Pivoter de 90° (en utilisant yaw)
drone.setRPY(0, 0, 90); // Roulis=0, Tangage=0, Lacet=90°
drone.wait(1000); // Attendre la rotation

// Revenir à la position de départ
drone.goTo(0, 0, 1, 1); // X=0m, Y=0m, Z=1m, vitesse=1m/s
drone.wait(3000); // Attendre l'arrivée

// Stabiliser
drone.setRPY(0, 0, 0); // Remettre à zéro
drone.wait(1000);

// Atterrir
drone.land();

// Message de fin
basic.showString("MISSION TERMINEE!");

