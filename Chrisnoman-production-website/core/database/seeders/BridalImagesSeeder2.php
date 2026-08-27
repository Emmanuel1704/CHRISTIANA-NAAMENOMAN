<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Collection;

class BridalImagesSeeder2 extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $images = [
            [
                'title' => 'Lace Mini Dress',
                'category' => 'Bridal Wear',
                'description' => 'A beautifully detailed lace mini dress, perfect for a chic and modern bridal look or reception.',
                'image_path' => 'collections/bridal_lace_mini_dress.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Corset One Shoulder Gown',
                'category' => 'Bridal Wear',
                'description' => 'An elegant corset-style gown with a stunning one-shoulder lace sleeve and tailored fit.',
                'image_path' => 'collections/bridal_corset_one_shoulder.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Long Sleeve Lace Gown',
                'category' => 'Bridal Wear',
                'description' => 'A classic and graceful long sleeve lace gown featuring intricate patterns and a regal silhouette.',
                'image_path' => 'collections/bridal_long_sleeve_lace_gown.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Deep V-Neck Pearl Dress',
                'category' => 'Bridal Wear',
                'description' => 'A glamorous deep V-neck bridal dress adorned with pearl embellishments and delicate long sleeves.',
                'image_path' => 'collections/bridal_deep_v_neck_pearl.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Short Dress with Bow',
                'category' => 'Bridal Wear',
                'description' => 'A playful yet elegant short bridal dress featuring a charming oversized bow and intricate lace detailing.',
                'image_path' => 'collections/bridal_short_dress_bow.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ];

        Collection::insert($images);
    }
}
