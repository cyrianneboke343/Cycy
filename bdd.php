<?php
$serveur = "localhost";
$utilisateur = "root";
$mot_de_passe = "";
$base_donnees = "paiement";

try {
    $pdo = new PDO("mysql:host=$serveur;dbname=$base_donnees;charset=utf8", $utilisateur, $mot_de_passe);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage());
}
?>
