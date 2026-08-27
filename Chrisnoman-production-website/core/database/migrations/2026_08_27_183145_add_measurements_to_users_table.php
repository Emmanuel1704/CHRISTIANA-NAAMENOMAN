<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->float('bust')->nullable();
            $table->float('waist')->nullable();
            $table->float('hips')->nullable();
            $table->float('underbust')->nullable();
            $table->float('shoulder')->nullable();
            $table->float('sleeve')->nullable();
            $table->float('length')->nullable();
            $table->text('saved_designs')->nullable(); // JSON stored as text for compatibility
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['bust', 'waist', 'hips', 'underbust', 'shoulder', 'sleeve', 'length', 'saved_designs']);
        });
    }
};
