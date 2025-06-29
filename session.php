<?php
session_start();

function verifier_session_admin() {
    if (!isset($_SESSION['admin_id'])) {
        header('Location: /admin/connexion.php');
        exit();
    }
}

function deconnecter() {
    session_destroy();
    header('Location: /');
    exit();
}
?>
