-- Chrisnoman Fashion House MySQL Database Dump
-- Generated on 2026-08-27 18:35:01
SET FOREIGN_KEY_CHECKS=0;

-- --------------------------------------------------------
-- Table structure for table `migrations`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE ``migrations` `(`id` bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY AUTO_INCREMENT not null, `migration` varchar(255) not null, `batch` int not null);

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
('1', '0001_01_01_000000_create_users_table', '1'),
('2', '0001_01_01_000001_create_cache_table', '1'),
('3', '0001_01_01_000002_create_jobs_table', '1'),
('4', '2026_05_14_144409_create_collections_table', '1'),
('5', '2026_05_14_144410_create_bookings_table', '1'),
('6', '2026_05_14_144410_create_testimonials_table', '1'),
('7', '2026_05_14_150107_add_ecommerce_fields_to_collections', '1'),
('8', '2026_05_14_150108_create_orders_table', '1'),
('9', '2026_05_14_150109_create_order_items_table', '1'),
('10', '2026_05_14_150613_create_posts_table', '1'),
('11', '2026_05_14_151350_create_reviews_table', '1'),
('12', '2026_05_14_151351_create_newsletter_subscribers_table', '1'),
('13', '2026_05_15_171249_create_messages_table', '1'),
('14', '2026_08_27_111500_add_currency_and_payment_fields', '2'),
('15', '2026_08_27_113500_add_fabric_option_to_bookings', '3'),
('16', '2026_08_27_133500_add_images_to_bookings_table', '4'),
('17', '2026_08_27_141100_create_settings_table', '5'),
('18', '2026_08_27_181333_add_production_stage_to_bookings_table', '6'),
('19', '2026_08_27_183145_add_measurements_to_users_table', '7');

-- --------------------------------------------------------
-- Table structure for table `users`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE ``users` `(`id` bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY AUTO_INCREMENT not null, `name` varchar(255) not null, `email` varchar(255) not null, `email_verified_at` datetime, `password` varchar(255) not null, `remember_token` varchar(255), `created_at` datetime, `updated_at` datetime, `bust` float, `waist` float, `hips` float, `underbust` float, `shoulder` float, `sleeve` float, `length` float, `saved_designs` text);

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `bust`, `waist`, `hips`, `underbust`, `shoulder`, `sleeve`, `length`, `saved_designs`) VALUES
('1', 'Admin Chrisnoman', 'Christiananaamenoman@gmail.com', '2026-08-27 10:41:30', '$2y$12$MV5J0n7ddteFWZGCDSdQIeg5IaScUuy4Uo4LT32BHbOSCUgaJZkhi', '2YNhMHryTd', '2026-08-27 10:41:30', '2026-08-27 10:41:30', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------
-- Table structure for table `password_reset_tokens`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE ``password_reset_tokens` `(`email` varchar(255) not null, `token` varchar(255) not null, `created_at` datetime, primary key (`email`));

-- Table is empty

-- --------------------------------------------------------
-- Table structure for table `sessions`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE ``sessions` `(`id` varchar(255) not null, `user_id` int, `ip_address` varchar(255), `user_agent` text, `payload` text not null, `last_activity` int not null, primary key (`id`));

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('NlCGQ9DmSqKsAzUImJq4nlRm9ymWCRDrt8CkTBDw', '1', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJ4OXkzSjJRNkcxRDFlRzc4bXdkdnFnVm94aGhKRk9YejNDTHJkc3M4IiwibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiOjEsIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfSwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdFwvZmFzaGlvblwvcHVibGljXC9zaXplLWd1aWRlIiwicm91dGUiOiJzaXplLWd1aWRlIn19', '1787854100'),
('MqbUouYR5qRFeo8G8rlGOZorhwp8BHm1Sgxhsfn9', NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJVb1YyWXIwd1g1UktEQmp5MnU4cmZhbDF3RWI3UXNKOVhzZUNrOW5XIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdFwvZmFzaGlvblwvcHVibGljIiwicm91dGUiOiJob21lIn0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', '1787855091');

-- --------------------------------------------------------
-- Table structure for table `cache`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `cache`;
CREATE TABLE ``cache` `(`key` varchar(255) not null, `value` text not null, `expiration` int not null, primary key (`key`));

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('chrisnoman-fashion-cache-christiananaamenoman@gmail.com|::1:timer', 'i:1787855147;', '1787855147'),
('chrisnoman-fashion-cache-christiananaamenoman@gmail.com|::1', 'i:1;', '1787855147');

-- --------------------------------------------------------
-- Table structure for table `cache_locks`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `cache_locks`;
CREATE TABLE ``cache_locks` `(`key` varchar(255) not null, `owner` varchar(255) not null, `expiration` int not null, primary key (`key`));

-- Table is empty

-- --------------------------------------------------------
-- Table structure for table `jobs`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `jobs`;
CREATE TABLE ``jobs` `(`id` bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY AUTO_INCREMENT not null, `queue` varchar(255) not null, `payload` text not null, `attempts` int not null, `reserved_at` int, `available_at` int not null, `created_at` int not null);

-- Table is empty

-- --------------------------------------------------------
-- Table structure for table `job_batches`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `job_batches`;
CREATE TABLE ``job_batches` `(`id` varchar(255) not null, `name` varchar(255) not null, `total_jobs` int not null, `pending_jobs` int not null, `failed_jobs` int not null, `failed_job_ids` text not null, `options` text, `cancelled_at` int, `created_at` int not null, `finished_at` int, primary key (`id`));

-- Table is empty

-- --------------------------------------------------------
-- Table structure for table `failed_jobs`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE ``failed_jobs` `(`id` bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY AUTO_INCREMENT not null, `uuid` varchar(255) not null, `connection` varchar(255) not null, `queue` varchar(255) not null, `payload` text not null, `exception` text not null, `failed_at` datetime not null default CURRENT_TIMESTAMP);

-- Table is empty

-- --------------------------------------------------------
-- Table structure for table `collections`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `collections`;
CREATE TABLE ``collections` `(`id` bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY AUTO_INCREMENT not null, `title` varchar(255) not null, `category` varchar(255) not null, `description` text, `image_path` varchar(255) not null, `created_at` datetime, `updated_at` datetime, `price` numeric not null default '0', `stock_status` varchar(255) not null default 'in_stock', `currency` varchar(255) not null default 'GHS');

INSERT INTO `collections` (`id`, `title`, `category`, `description`, `image_path`, `created_at`, `updated_at`, `price`, `stock_status`, `currency`) VALUES
('1', 'Ethereal Bridal Gown', 'Bridal Wear', 'A stunning hand-beaded bridal gown with silk tulle and intricate lace details.', '/assets/images/bridal.png', '2026-08-27 10:41:30', '2026-08-27 10:41:30', '2500', 'in_stock', 'GHS'),
('2', 'Ankara Silk Fusion', 'African Prints', 'Modern interpretation of traditional patterns on premium silk fabric.', '/assets/images/african.png', '2026-08-27 10:41:30', '2026-08-27 10:41:30', '450', 'in_stock', 'GHS'),
('3', 'Midnight Velvet Suit', 'Corporate Wear', 'Tailored velvet suit for the modern businesswoman who values elegance and power.', '/assets/images/hero.png', '2026-08-27 10:41:30', '2026-08-27 10:41:30', '850', 'in_stock', 'GHS'),
('4', 'Golden Hour Gala', 'Occasion Dresses', 'Shimmering gold evening gown with a dramatic slit and hand-placed crystals.', '/assets/images/african.png', '2026-08-27 10:41:30', '2026-08-27 10:41:30', '1200', 'in_stock', 'GHS'),
('5', 'Silver Embroidery Gown', 'Bridal Wear', 'A stunning bridal gown featuring intricate silver embroidery and a flattering mermaid silhouette.', 'collections/bridal_silver_embroidery_gown.jpg', '2026-08-27 11:03:17', '2026-08-27 11:03:17', '0', 'in_stock', 'GHS'),
('6', 'Pearl Embellished Mini Dress', 'Bridal Wear', 'An elegant mini bridal dress adorned with delicate pearl embellishments and a high lace neckline.', 'collections/bridal_pearl_embellished_mini.jpg', '2026-08-27 11:03:17', '2026-08-27 11:03:17', '0', 'in_stock', 'GHS'),
('7', 'Lace Gown with Long Train', 'Bridal Wear', 'A breathtaking long-sleeve lace bridal gown with a dramatic flowing train for a majestic entrance.', 'collections/bridal_lace_long_train.jpg', '2026-08-27 11:03:17', '2026-08-27 11:03:17', '0', 'in_stock', 'GHS'),
('8', 'Ice Blue Lace Gown', 'Bridal Wear', 'A unique and modern ice blue bridal gown crafted from delicate lace with a high neckline.', 'collections/bridal_blue_lace_gown.jpg', '2026-08-27 11:03:17', '2026-08-27 11:03:17', '0', 'in_stock', 'GHS'),
('9', 'Short Lace Bridal Dress', 'Bridal Wear', 'A chic and modern short lace bridal dress with a deep V-neckline and elegant long sleeves.', 'collections/bridal_short_lace_dress.jpg', '2026-08-27 11:03:17', '2026-08-27 11:03:17', '0', 'in_stock', 'GHS'),
('10', 'Lace Mini Dress', 'Bridal Wear', 'A beautifully detailed lace mini dress, perfect for a chic and modern bridal look or reception.', 'collections/bridal_lace_mini_dress.jpg', '2026-08-27 11:03:18', '2026-08-27 11:03:18', '0', 'in_stock', 'GHS'),
('11', 'Corset One Shoulder Gown', 'Bridal Wear', 'An elegant corset-style gown with a stunning one-shoulder lace sleeve and tailored fit.', 'collections/bridal_corset_one_shoulder.jpg', '2026-08-27 11:03:18', '2026-08-27 11:03:18', '0', 'in_stock', 'GHS'),
('12', 'Long Sleeve Lace Gown', 'Bridal Wear', 'A classic and graceful long sleeve lace gown featuring intricate patterns and a regal silhouette.', 'collections/bridal_long_sleeve_lace_gown.jpg', '2026-08-27 11:03:18', '2026-08-27 11:03:18', '0', 'in_stock', 'GHS'),
('13', 'Deep V-Neck Pearl Dress', 'Bridal Wear', 'A glamorous deep V-neck bridal dress adorned with pearl embellishments and delicate long sleeves.', 'collections/bridal_deep_v_neck_pearl.jpg', '2026-08-27 11:03:18', '2026-08-27 11:03:18', '0', 'in_stock', 'GHS'),
('14', 'Short Dress with Bow', 'Bridal Wear', 'A playful yet elegant short bridal dress featuring a charming oversized bow and intricate lace detailing.', 'collections/bridal_short_dress_bow.jpg', '2026-08-27 11:03:18', '2026-08-27 11:03:18', '0', 'in_stock', 'GHS');

-- --------------------------------------------------------
-- Table structure for table `bookings`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `bookings`;
CREATE TABLE ``bookings` `(`id` bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY AUTO_INCREMENT not null, `customer_name` varchar(255) not null, `phone` varchar(255) not null, `email` varchar(255) not null, `service_type` varchar(255) not null, `appointment_date` datetime not null, `status` varchar(255) not null default 'pending', `notes` text, `created_at` datetime, `updated_at` datetime, `fabric_option` varchar(255) not null default 'Not Applicable', `fabric_image_path` varchar(255), `style_image_path` varchar(255), `production_stage` varchar(255) not null default 'pending');

-- Table is empty

-- --------------------------------------------------------
-- Table structure for table `testimonials`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `testimonials`;
CREATE TABLE ``testimonials` `(`id` bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY AUTO_INCREMENT not null, `customer_name` varchar(255) not null, `review` text not null, `rating` int not null default '5', `image_path` varchar(255), `created_at` datetime, `updated_at` datetime);

INSERT INTO `testimonials` (`id`, `customer_name`, `review`, `rating`, `image_path`, `created_at`, `updated_at`) VALUES
('1', 'Adesuwa T.', 'Chrisnoman Fashion made my wedding dress a dream come true. The attention to detail was beyond my expectations!', '5', NULL, '2026-08-27 10:41:30', '2026-08-27 10:41:30'),
('2', 'Chioma O.', 'The best tailored suits I have ever owned. Professional, elegant, and perfectly fitted.', '5', NULL, '2026-08-27 10:41:30', '2026-08-27 10:41:30');

-- --------------------------------------------------------
-- Table structure for table `orders`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE ``orders` `(`id` bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY AUTO_INCREMENT not null, `customer_name` varchar(255) not null, `email` varchar(255) not null, `phone` varchar(255) not null, `address` text not null, `total_amount` numeric not null, `status` varchar(255) not null default 'pending', `payment_status` varchar(255) not null default 'unpaid', `created_at` datetime, `updated_at` datetime, `currency` varchar(255) not null default 'GHS', `payment_method` varchar(255) not null default 'whatsapp', `momo_network` varchar(255), `momo_number` varchar(255));

INSERT INTO `orders` (`id`, `customer_name`, `email`, `phone`, `address`, `total_amount`, `status`, `payment_status`, `created_at`, `updated_at`, `currency`, `payment_method`, `momo_network`, `momo_number`) VALUES
('1', 'Emmanuel Amoako Baah', 'emmanuelamoakobaah7@gmail.com', '0200037259', 'Lawman Station', '2500', 'pending', 'paid', '2026-08-27 13:03:41', '2026-08-27 13:03:41', 'GHS', 'momo', 'mtn', '0540827677');

-- --------------------------------------------------------
-- Table structure for table `order_items`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `order_items`;
CREATE TABLE ``order_items` `(`id` bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY AUTO_INCREMENT not null, `order_id` int not null, `collection_id` int not null, `quantity` int not null default '1', `price` numeric not null, `created_at` datetime, `updated_at` datetime, foreign key(`order_id`) references `orders`(`id`) on delete cascade, foreign key(`collection_id`) references `collections`(`id`) on delete cascade);

INSERT INTO `order_items` (`id`, `order_id`, `collection_id`, `quantity`, `price`, `created_at`, `updated_at`) VALUES
('1', '1', '5', '1', '0', '2026-08-27 13:03:41', '2026-08-27 13:03:41'),
('2', '1', '1', '1', '2500', '2026-08-27 13:03:41', '2026-08-27 13:03:41');

-- --------------------------------------------------------
-- Table structure for table `posts`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `posts`;
CREATE TABLE ``posts` `(`id` bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY AUTO_INCREMENT not null, `title` varchar(255) not null, `slug` varchar(255) not null, `excerpt` text, `content` text not null, `featured_image` varchar(255), `author` varchar(255) not null default 'Chrisnoman Atelier', `is_published` tinyint(1) not null default '1', `created_at` datetime, `updated_at` datetime);

INSERT INTO `posts` (`id`, `title`, `slug`, `excerpt`, `content`, `featured_image`, `author`, `is_published`, `created_at`, `updated_at`) VALUES
('1', 'The Art of Bridal Customization', 'art-of-bridal-customization', 'Discover the meticulous process behind creating the perfect wedding gown at Chrisnoman Atelier.', 'Full story about bridal customization...', '/assets/images/bridal.png', 'Chrisnoman Atelier', '1', '2026-08-27 10:41:30', '2026-08-27 10:41:30'),
('2', '5 Ways to Style African Prints for the Office', 'style-african-prints-office', 'Break the monotony of corporate wear with these elegant styling tips for Ankara and Kente.', 'Full styling guide for African prints...', '/assets/images/african.png', 'Chrisnoman Atelier', '1', '2026-08-27 10:41:30', '2026-08-27 10:41:30');

-- --------------------------------------------------------
-- Table structure for table `reviews`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `reviews`;
CREATE TABLE ``reviews` `(`id` bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY AUTO_INCREMENT not null, `collection_id` int not null, `customer_name` varchar(255) not null, `rating` int not null default '5', `comment` text not null, `is_approved` tinyint(1) not null default '1', `created_at` datetime, `updated_at` datetime, foreign key(`collection_id`) references `collections`(`id`) on delete cascade);

-- Table is empty

-- --------------------------------------------------------
-- Table structure for table `newsletter_subscribers`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `newsletter_subscribers`;
CREATE TABLE ``newsletter_subscribers` `(`id` bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY AUTO_INCREMENT not null, `email` varchar(255) not null, `is_active` tinyint(1) not null default '1', `created_at` datetime, `updated_at` datetime);

-- Table is empty

-- --------------------------------------------------------
-- Table structure for table `messages`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `messages`;
CREATE TABLE ``messages` `(`id` bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY AUTO_INCREMENT not null, `name` varchar(255) not null, `email` varchar(255) not null, `subject` varchar(255), `message` text not null, `is_read` tinyint(1) not null default '0', `created_at` datetime, `updated_at` datetime);

-- Table is empty

-- --------------------------------------------------------
-- Table structure for table `settings`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `settings`;
CREATE TABLE ``settings` `(`id` bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY AUTO_INCREMENT not null, `key` varchar(255) not null, `value` text, `created_at` datetime, `updated_at` datetime);

INSERT INTO `settings` (`id`, `key`, `value`, `created_at`, `updated_at`) VALUES
('1', 'designer_name', 'Christiana Naamenomah', '2026-08-27 14:11:50', '2026-08-27 14:11:50'),
('2', 'designer_bio', 'Christiana Naamenomah is the visionary founder and lead designer behind Chrisnoman Fashion House. Specializing exclusively in luxury ladies'' wear, she crafts structured corsetry, exquisite hand-beaded bridal gowns, and modern African gala dresses. With a keen eye for color and form, Christiana translates raw lace, silk, and vibrant Ankara prints into timeless silhouettes that celebrate female confidence and elegance.', '2026-08-27 14:11:50', '2026-08-27 14:11:50'),
('3', 'designer_image', '/assets/images/designer/designer_1.jpg', '2026-08-27 14:11:50', '2026-08-27 14:11:50');

SET FOREIGN_KEY_CHECKS=1;
