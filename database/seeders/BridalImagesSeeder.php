<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Collection;

class BridalImagesSeeder extends Seeder
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
                'title' => 'Silver Embroidery Gown',
                'category' => 'Bridal Wear',
                'description' => 'A stunning bridal gown featuring intricate silver embroidery and a flattering mermaid silhouette.',
                'image_path' => 'collections/bridal_silver_embroidery_gown.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Pearl Embellished Mini Dress',
                'category' => 'Bridal Wear',
                'description' => 'An elegant mini bridal dress adorned with delicate pearl embellishments and a high lace neckline.',
                'image_path' => 'collections/bridal_pearl_embellished_mini.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Lace Gown with Long Train',
                'category' => 'Bridal Wear',
                'description' => 'A breathtaking long-sleeve lace bridal gown with a dramatic flowing train for a majestic entrance.',
                'image_path' => 'collections/bridal_lace_long_train.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Ice Blue Lace Gown',
                'category' => 'Bridal Wear',
                'description' => 'A unique and modern ice blue bridal gown crafted from delicate lace with a high neckline.',
                'image_path' => 'collections/bridal_blue_lace_gown.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Short Lace Bridal Dress',
                'category' => 'Bridal Wear',
                'description' => 'A chic and modern short lace bridal dress with a deep V-neckline and elegant long sleeves.',
                'image_path' => 'collections/bridal_short_lace_dress.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ];

        Collection::insert($images);
    }
}
