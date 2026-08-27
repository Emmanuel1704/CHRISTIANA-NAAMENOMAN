# Chrisnoman Fashion House - Digital Platform

A premium, elegant, and mobile-friendly digital platform for Chrisnoman Fashion, specializing in luxury ladies' wear, bespoke bridal collections, and contemporary African prints.

## 🚀 Core Features

### 💎 Brand Experience
- **Luxury UI/UX**: Modern design using Gold, Black, and Nude tones with Playfair Display typography.
- **Dynamic Gallery**: Categorized fashion portfolio with high-resolution lightbox previews.
- **Editorial Journal**: A dedicated blog system for fashion storytelling and styling guides.

### 🛍️ Commercial Engine
- **eCommerce Shop**: Integrated shopping cart with local storage persistence.
- **Seamless Checkout**: Streamlined order placement for ready-to-wear collections.
- **Appointment Booking**: Professional scheduling system with WhatsApp integration for custom tailoring.

### 🛠️ Administrative Control
- **Centralized Dashboard**: Real-time business metrics and quick action controls.
- **Content Management**: Full CRUD for Collections, Blog Posts, and Testimonials.
- **Order Fulfillment**: Track and manage customer purchases and appointments.

## 💻 Tech Stack
- **Backend**: Laravel 11 (PHP 8.2+)
- **Frontend**: React + TypeScript (via Inertia.js)
- **Styling**: Tailwind CSS + Framer Motion
- **Database**: MySQL

## 🛠️ Local Setup

1. **Clone & Install Dependencies**
   ```bash
   composer install
   npm install
   ```

2. **Database Setup**
   - Create a database named `fashion` in XAMPP/MySQL.
   - Configure `.env` with your DB credentials.

3. **Initialize Application**
   ```bash
   php artisan key:generate
   php artisan migrate:fresh --seed
   php artisan storage:link
   ```

4. **Run Development Servers**
   ```bash
   php artisan serve
   npm run dev
   ```

## 🔑 Default Credentials
- **Admin Email**: `Christiananaamenoman@gmail.com`
- **Password**: `Christiana@242526`

## 📈 SEO & Optimization
- Dynamic meta tags and social sharing attributes via the `SEO` component.
- Automatically generated XML sitemap at `/sitemap.xml`.
- Optimized image handling and lazy loading.

---
© 2026 Chrisnoman Fashion. Built with Elegance in every stitch.
