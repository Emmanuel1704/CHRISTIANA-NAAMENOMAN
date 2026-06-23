<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$count = \App\Models\Collection::where('category', 'Bridal Wear')->count();
echo "Total Bridal Wear collections: " . $count . "\n";
