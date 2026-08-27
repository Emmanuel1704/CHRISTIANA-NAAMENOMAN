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
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->timestamps();
        });

        // Seed default designer values
        DB::table('settings')->insert([
            [
                'key' => 'designer_name',
                'value' => 'Christiana Naamenomah',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'designer_bio',
                'value' => 'Christiana Naamenomah is the visionary founder and lead designer behind Chrisnoman Fashion House. Specializing exclusively in luxury ladies\' wear, she crafts structured corsetry, exquisite hand-beaded bridal gowns, and modern African gala dresses. With a keen eye for color and form, Christiana translates raw lace, silk, and vibrant Ankara prints into timeless silhouettes that celebrate female confidence and elegance.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'designer_image',
                'value' => '/assets/images/designer/designer_1.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
