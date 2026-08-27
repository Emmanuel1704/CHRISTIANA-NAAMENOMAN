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
        Schema::table('collections', function (Blueprint $table) {
            $table->string('currency')->default('GHS')->after('price');
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->string('currency')->default('GHS')->after('total_amount');
            $table->string('payment_method')->default('whatsapp')->after('payment_status'); // momo, whatsapp, cod
            $table->string('momo_network')->nullable()->after('payment_method'); // mtn, telecel, at
            $table->string('momo_number')->nullable()->after('momo_network');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('collections', function (Blueprint $table) {
            $table->dropColumn('currency');
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['currency', 'payment_method', 'momo_network', 'momo_number']);
        });
    }
};
