<?php

// Sibling core bootstrap loader
define('LARAVEL_START', microtime(true));

// Register the Composer autoloader...
require __DIR__.'/../core/vendor/autoload.php';

// Bootstrap Laravel
$app = require_once __DIR__.'/../core/bootstrap/app.php';

// Bind custom public path
$app->usePublicPath(__DIR__);

// Run storage:link command dynamically
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$status = $kernel->call('storage:link');

echo "<h2>Chrisnoman Atelier Symlink Tool</h2>";
echo "<p>Artisan Command status: " . ($status === 0 ? "SUCCESS" : "ERROR ($status)") . "</p>";
echo "<p>Storage link has been created successfully. You can now delete this <code>symlink.php</code> file from your server for security.</p>";
