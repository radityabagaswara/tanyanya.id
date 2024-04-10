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
        Schema::create('pages', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('header_image_path')->nullable();
            $table->string('username');
            $table->date('username_updated_at')->nullable();
            $table->text('bio')->nullable()->default('Welcome to my page, feel free to ask me any questions!');
            $table->boolean('is_accepting_questions')->default(false);
            $table->boolean('allow_anon_questions')->default(false);
            $table->foreignUlid('user_id')->constrained('users')->cascadeOnDelete();
            $table->ulid('overlay_key');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pages');
    }
};
