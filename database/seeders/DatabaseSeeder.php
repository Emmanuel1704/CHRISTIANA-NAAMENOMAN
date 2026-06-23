<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Admin Chrisnoman',
            'email' => 'Christiananaamenoman@gmail.com',
            'password' => bcrypt('password'),
        ]);

        // Seed Collections
        \App\Models\Collection::create([
            'title' => 'Ethereal Bridal Gown',
            'category' => 'Bridal Wear',
            'description' => 'A stunning hand-beaded bridal gown with silk tulle and intricate lace details.',
            'image_path' => '/assets/images/bridal.png',
            'price' => 2500.00,
        ]);

        \App\Models\Collection::create([
            'title' => 'Ankara Silk Fusion',
            'category' => 'African Prints',
            'description' => 'Modern interpretation of traditional patterns on premium silk fabric.',
            'image_path' => '/assets/images/african.png',
            'price' => 450.00,
        ]);

        \App\Models\Collection::create([
            'title' => 'Midnight Velvet Suit',
            'category' => 'Corporate Wear',
            'description' => 'Tailored velvet suit for the modern businesswoman who values elegance and power.',
            'image_path' => '/assets/images/hero.png',
            'price' => 850.00,
        ]);

        \App\Models\Collection::create([
            'title' => 'Golden Hour Gala',
            'category' => 'Occasion Dresses',
            'description' => 'Shimmering gold evening gown with a dramatic slit and hand-placed crystals.',
            'image_path' => '/assets/images/african.png',
            'price' => 1200.00,
        ]);

        // Seed Testimonials
        \App\Models\Testimonial::create([
            'customer_name' => 'Adesuwa T.',
            'review' => 'Chrisnoman Fashion made my wedding dress a dream come true. The attention to detail was beyond my expectations!',
            'rating' => 5,
        ]);

        \App\Models\Testimonial::create([
            'customer_name' => 'Chioma O.',
            'review' => 'The best tailored suits I have ever owned. Professional, elegant, and perfectly fitted.',
            'rating' => 5,
        ]);
        // Seed Blog Posts
        \App\Models\Post::create([
            'title' => 'The Art of Bridal Customization',
            'slug' => 'art-of-bridal-customization',
            'excerpt' => 'Discover the meticulous process behind creating the perfect wedding gown at Chrisnoman Atelier.',
            'content' => 'Full story about bridal customization...',
            'featured_image' => '/assets/images/bridal.png',
        ]);

        \App\Models\Post::create([
            'title' => '5 Ways to Style African Prints for the Office',
            'slug' => 'style-african-prints-office',
            'excerpt' => 'Break the monotony of corporate wear with these elegant styling tips for Ankara and Kente.',
            'content' => 'Full styling guide for African prints...',
            'featured_image' => '/assets/images/african.png',
        ]);
    }
}
