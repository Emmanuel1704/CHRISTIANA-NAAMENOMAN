# 👑 Chrisnoman Fashion House - Shared Hosting Deployment Guide

Welcome! This package is pre-configured specifically for **cPanel / hPanel Shared Hosting** environments. 

By following this guide, your website files will be completely secure (preventing anyone from browsing your code or `.env` configuration keys) and your database will be imported easily using **phpMyAdmin**.

---

## 📦 Folder Structure

Inside your `Chrisnoman-production-website` directory, you will see:
1. **`core/`**: Contains the main Laravel engine, routes, and logic. This goes **outside** your public web directory for security.
2. **`public_html/`**: Contains the browser-accessible files (CSS, JS, images). This goes **inside** your public web directory.
3. **`database_backup.sql`**: The database file containing Christiana Naamenoman's biography, portfolio images, and settings. You will import this into **phpMyAdmin**.

---

## 🚀 Step-by-Step Installation

### Step 1: Zip the Folders
To upload these folders quickly to your host:
1. Right-click the **`core`** folder and select **Compress to ZIP file** (name it `core.zip`).
2. Right-click the **`public_html`** folder and select **Compress to ZIP file** (name it `public_html.zip`).

---

### Step 2: Upload Files via File Manager
1. Log in to your hosting control panel (**cPanel** or **hPanel**).
2. Open the **File Manager**.
3. Navigate to your user home directory (this is the folder one level **above** `public_html`, usually looks like `/home/yourusername/`).
4. Upload `core.zip` here and extract it. This will create a folder named `core`.
5. Now, go inside the **`public_html`** directory on your hosting account.
6. Upload `public_html.zip` here and extract it so that its files (`index.php`, `assets`, `images`, `.htaccess`) are placed directly in your server's `public_html`.

---

### Step 3: Setup the Database
1. In cPanel/hPanel, search for **MySQL Database Wizard**.
2. Create a new database (e.g., `chrisnoman_db`).
3. Create a new database user (e.g., `chrisnoman_user`) and a secure password.
4. **Important**: Associate the user with the database and check **ALL PRIVILEGES**. Note down the database name, user, and password.

---

### Step 4: Import the Database Backup
1. In your hosting dashboard, open **phpMyAdmin**.
2. Select your newly created database in the left sidebar.
3. Click the **Import** tab at the top.
4. Click **Choose File** and select the **`database_backup.sql`** file from this folder.
5. Scroll down and click **Import** (or **Go**). Your tables and settings are now loaded!

---

### Step 5: Configure the Environment Variables
1. Go back to your hosting **File Manager**.
2. Navigate into the **`core`** folder you uploaded in Step 2.
3. Right-click the **`.env`** file and click **Edit**.
4. Configure the following database parameters using the details from Step 3:
   ```env
   APP_URL=https://yourdomain.com      # Change to your actual website URL

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database_name      # Change to your cPanel database name
   DB_USERNAME=your_database_user      # Change to your cPanel database username
   DB_PASSWORD=your_database_password  # Change to your database password
   ```
5. Save the file.

---

### Step 6: Create the Storage Symlink
Since custom designs and settings images are uploaded through the Atelier Admin portal, you must link the core storage directory to the public folder.
1. Open your browser and visit: `https://yourdomain.com/symlink.php`
2. You will see a success message: *"Storage link has been created successfully."*
3. **Security Note**: Delete the `symlink.php` file from your hosting `public_html` folder after running it.

---

### 🎉 Your website is now live!
Visit `https://yourdomain.com` to explore your new interactive high-fashion studio!
