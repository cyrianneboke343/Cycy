<?php
require_once '../config/bdd.php';
require_once '../config/session.php';
verifier_session_admin();

$statut = $_GET['statut'] ?? 'tous';
$page_actuelle = max(1, intval($_GET['page'] ?? 1));
$limite = 20;
$debut = ($page_actuelle - 1) * $limite;

$condition = "";
$valeurs = [];

if ($statut !== 'tous') {
    $condition = "WHERE statut = ?";
    $valeurs[] = $statut;
}

$requete_total = $pdo->prepare("SELECT COUNT(*) AS total FROM paiements $condition");
$requete_total->execute($valeurs);
$nombre_total = $requete_total->fetch()['total'];
$nombre_pages = ceil($nombre_total / $limite);

$requete = $pdo->prepare("SELECT * FROM paiements $condition ORDER BY date_paiement DESC LIMIT $limite OFFSET $debut");
$requete->execute($valeurs);
$liste_paiements = $requete->fetchAll();
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Gestion des Paiements</title>
    <link rel="stylesheet" href="../ressource/css/style.css">
</head>
<body>
    <header class="header-dashboard header-admin">
        <div class="conteneur">
            <h1>Gestion des Paiements</h1>
            <nav>
                <a href="tableau-bord.php" class="btn btn-secondaire">Tableau de bord</a>
                <a href="../config/deconnexion.php" class="btn btn-outline">Déconnexion</a>
            </nav>
        </div>
    </header>

    <main class="contenu-dashboard">
        <div class="conteneur">
            <div class="filtres-paiements">
                <?php
                $statuts = ['tous' => 'Tous', 'en_attente' => 'En attente', 'valide' => 'Validés', 'refuse' => 'Refusés'];
                foreach ($statuts as $cle => $libelle) {
                    $classe = ($statut === $cle) ? 'btn-admin' : 'btn-outline';
                    echo "<a href='?statut=$cle' class='btn $classe'>$libelle</a>";
                }
                ?>
            </div>

            <div class="section-paiements">
                <div class="tableau-responsive">
                    <table class="tableau-paiements">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nom complet</th>
                                <th>Matricule</th>
                                <th>Email</th>
                                <th>Montant</th>
                                <th>Date</th>
                                <th>Statut</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($liste_paiements as $paiement): ?>
                                <tr>
                                    <td><?= $paiement['id'] ?></td>
                                    <td><?= htmlspecialchars($paiement['nom'] . ' ' . $paiement['postnom'] . ' ' . $paiement['prenom']) ?></td>
                                    <td><?= htmlspecialchars($paiement['matricule']) ?></td>
                                    <td><?= htmlspecialchars($paiement['email']) ?></td>
                                    <td>$<?= number_format($paiement['montant'], 2) ?></td>
                                    <td><?= date('d/m/Y H:i', strtotime($paiement['date_paiement'])) ?></td>
                                    <td>
                                        <span class="badge badge-<?= $paiement['statut'] ?>">
                                            <?= ucfirst(str_replace('_', ' ', $paiement['statut'])) ?>
                                        </span>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>

                <?php if ($nombre_pages > 1): ?>
                    <div class="pagination">
                        <?php for ($i = 1; $i <= $nombre_pages; $i++): ?>
                            <a href="?page=<?= $i ?>&statut=<?= $statut ?>" class="btn <?= $i === $page_actuelle ? 'btn-admin' : 'btn-outline' ?>">
                                <?= $i ?>
                            </a>
                        <?php endfor; ?>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </main>
</body>
</html>
