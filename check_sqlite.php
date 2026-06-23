<?php
$pdo = new PDO('sqlite:' . __DIR__ . '/database/database.sqlite');
$stmt = $pdo->query("SELECT count(*) as cnt FROM collections WHERE category='Bridal Wear'");
$row = $stmt->fetch();
echo "Bridal Wear count in sqlite: " . $row['cnt'] . "\n";
