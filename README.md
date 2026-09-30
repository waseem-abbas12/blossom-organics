# Blossom Organics - Pure Botanical E-Commerce Store & Full Admin Panel

A high-performance, elegant e-commerce web platform for **Blossom Organics** (inspired by and deeply matched with the luxury aesthetics, structure, and features of **Golden Girl Cosmetics**). Built with React, Vite, Tailwind CSS, Lucide Icons, and React Router.

---

## 🌟 Key Features

### 🌸 1. Storefront (100% Golden Girl Cosmetics Aesthetic)
- **Top Announcement Marquee**: Rotating promotion bar with WhatsApp helpline, free delivery threshold notification, and PKR currency.
- **Header & Navigation**:
  - Luxury branding for Blossom Organics.
  - Live predictive instant search modal with keyboard shortcut (`⌘K` / `Ctrl+K`).
  - Wishlist counter and interactive modal.
  - **Slide-out Cart Drawer**:
    - Animated Free Shipping progress bar (*"Add Rs. 650 more to get FREE Delivery!"*).
    - Quantity adjustments and order notes.
    - Direct checkout integration.
  - Mega Navigation Bar: *Home, Shop All, Skin Care, Hair Care, Facial Kits, Bundles, Baby Care, Epilatory Wax, Nail Care, Under Rs.1500, Salon Packs, Salon Accessories*.
- **Homepage Sections**:
  - High-resolution luxury Hero Slider with smooth autoplay and responsive CTA buttons.
  - "Shop by Concern" circular cards (*Acne, Dandruff, Dry Skin, Hair Fall, Dark Spots, Hands & Feet*).
  - Best Sellers grid with filter tabs (*All, Facial Kits, Skin Care, Hair Care*).
  - Special Glow Care Deals promotional hero banner.
  - Curated Categories showcase.
  - Customer Love & Reviews carousel (Judge.me style authentic reviews with verified buyer badges + modal to post new customer reviews).
  - Frequently Asked Questions (FAQ) accordion.
  - Instagram UGC grid.
  - Comprehensive Footer with Pakistan Cash on Delivery (COD) payment badges, WhatsApp support link, and newsletter discount voucher generator.

### 🛍️ 2. Product Catalog & Details
- Filter by Category, Skin Concern, In-Stock toggle, and Price Range Slider.
- Quick View Modal for instant preview without leaving the catalog.
- Dedicated Product Detail Page (`/product/:id`) with image gallery, size tags, quantity stepper, Add to Cart, Buy Now, and expandable tabs for *Description, Ritual Steps, and Ingredients*.

### 📦 3. Pakistan Cash on Delivery & Order Checkout
- Full address form with Pakistan cities list (*Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, etc.*).
- Payment methods: **Cash on Delivery (COD)**, Direct Bank Transfer, EasyPaisa / JazzCash.
- Real-time subtotal, free delivery threshold calculation (Free over Rs. 2,500), and coupon discount support (`BLOSSOM10`).
- Order confirmation with instant Order ID generation (`ORD-XXXXX`).

### 🚚 4. Live Order Tracking (`/track-order`)
- Customers can enter their Order ID or Phone Number to view their parcel's status:
  - *Order Placed -> Processing & Packed -> Dispatched & Shipped -> Delivered*.

---

## 🛠️ Complete Admin Panel (`/admin`)

Access the admin portal at:
👉 **`/admin`** or **`/admin/login`**
- **Default Email**: `admin@blossom.com`
- **Default Password**: `admin123`
- *(Includes a 1-click "Fill Demo Credentials" button for instant login)*

### Admin Capabilities:
1. **Dashboard Overview (`/admin/dashboard`)**:
   - Real-time KPI metrics: Total Sales in PKR, Total Orders, Active Products count, Pending Orders alert.
   - Recent orders table with inline status updater.
2. **Product Catalog Management (`/admin/products`)**:
   - Add new products with Title, Category, Concern, Selling Price, Original Price, Stock, Image URL, Badges, and Descriptions.
   - Edit existing products.
   - Delete products.
   - 1-Click "Restore Default Catalog" button to instantly restore all 18+ benchmark cosmetic items.
3. **Orders & Invoices (`/admin/orders`)**:
   - Filter orders by status (*All, Pending, Processing, Shipped, Delivered*).
   - Order detail modal with printable customer packing slip and receipt.
   - Status changer dropdown (updates customer tracking in real time).
4. **Banners & Announcement Manager (`/admin/banners`)**:
   - Edit the top scrolling announcement message, background color, and visibility toggle.
   - Add, edit, or remove homepage hero banner slides (images, headlines, CTA buttons, links).
5. **Store Settings (`/admin/settings`)**:
   - Update Store Name, Helpline phone, WhatsApp order number, support email, standard delivery charges, and free delivery minimum order amount.

---

## 🚀 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# App runs at: http://localhost:3000
```

---

## 🌐 Deploying to Netlify (Ready in 2 Minutes)

This project has been pre-configured with `netlify.toml` and `public/_redirects` for 100% clean Netlify single-page application routing.

### Method A: Drag & Drop (Instant Netlify Drop)
1. Run the production build command:
   ```bash
   npm run build
   ```
2. Log in to [app.netlify.com](https://app.netlify.com).
3. Go to the **Sites** tab and drag the **`dist`** folder directly into the browser.
4. Your website is instantly live with SSL and custom domain support!

### Method B: Git Repository (Continuous Deployment)
1. Push this directory to your GitHub / GitLab repository.
2. In Netlify, click **"Add new site" -> "Import an existing project"**.
3. Select your repository.
4. Set the build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **Deploy**. Any future commits will automatically build and deploy!
