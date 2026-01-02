# FitZone Gym - Project Workflow Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture & Technology Stack](#architecture--technology-stack)
3. [User Flow Diagrams](#user-flow-diagrams)
4. [Feature Workflows](#feature-workflows)
5. [Component Architecture](#component-architecture)
6. [Data Flow](#data-flow)
7. [State Management](#state-management)
8. [Routing Structure](#routing-structure)
9. [Backend Integration Plan](#backend-integration-plan)
10. [Deployment Workflow](#deployment-workflow)

---

## 🎯 Project Overview

**FitZone Gym** is a comprehensive fitness and nutrition platform built with Next.js 14, TypeScript, and Tailwind CSS. The platform provides:

- **Nutrition Information**: Browse food categories with detailed nutritional data
- **Fitness Calculators**: BMI, Calories, Ideal Weight, and Protein calculators
- **Shopping Cart**: Track protein intake from selected products
- **Product Comparison**: Compare up to 2 foods side-by-side
- **Blog**: Fitness and nutrition articles
- **Responsive Design**: Mobile-first, user-friendly interface

---

## 🏗️ Architecture & Technology Stack

### Frontend Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks + localStorage
- **Image Optimization**: Next.js Image Component
- **SEO**: Next.js Metadata API

### Project Structure
```
demo/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout with metadata
│   ├── category/          # Dynamic category routes
│   ├── cart/              # Shopping cart
│   ├── tools/             # Fitness calculators
│   ├── nutrition/         # Nutrition pages
│   ├── blog/              # Blog pages
│   └── ...
├── components/            # React components
│   ├── layout/            # Navbar, Footer
│   ├── home/              # Home page sections
│   ├── food/              # Product components
│   ├── calculators/       # Calculator components
│   └── ...
├── lib/                   # Utility functions
│   ├── categoryData.ts    # Food data
│   └── cartUtils.ts       # Cart management
└── public/                # Static assets
```

---

## 🔄 User Flow Diagrams

### 1. Homepage Flow
```
User Lands on Homepage
    ↓
Views Hero Section
    ↓
Scrolls through Categories
    ↓
Views Food Items (Foods, Fruits, Vegetables)
    ↓
Clicks on Category → Category Page
    ↓
Clicks on Food Item → Product Detail Page
    ↓
[Add to Cart] or [Add to Compare]
```

### 2. Shopping Cart Flow
```
User on Product Page
    ↓
Clicks "Add to Cart" (Plus Button)
    ↓
Item Added to localStorage
    ↓
Cart Icon Updates (Count + Total Protein)
    ↓
User Clicks Cart Icon
    ↓
Navigates to Cart Page
    ↓
Views All Cart Items
    ↓
Sees Total Protein from All Items
    ↓
[Remove Item] or [Clear Cart] or [Continue Shopping]
```

### 3. Product Comparison Flow
```
User on Product Page
    ↓
Clicks "Add to Compare"
    ↓
Item Added to Compare (Max 2 items)
    ↓
User Adds Second Item
    ↓
Navigates to Compare Page
    ↓
Views Side-by-Side Comparison
    ↓
[Remove Item] or [Add More Items]
```

### 4. Calculator Flow
```
User Navigates to Tools Page
    ↓
Selects Calculator (BMI, Calories, etc.)
    ↓
Enters Required Information
    ↓
Clicks Calculate
    ↓
Views Results with Recommendations
    ↓
[Calculate Again] or [Share Results]
```

---

## ⚙️ Feature Workflows

### A. Shopping Cart System

#### Workflow Steps:
1. **Add to Cart**
   - User clicks plus button on product
   - `addToCart()` function called
   - Item stored in localStorage with key `fitzone_cart`
   - Custom event `cartUpdated` dispatched
   - UI updates: Button shows checkmark, cart count increases

2. **Cart State Management**
   - Cart data stored in browser localStorage
   - Real-time updates via event listeners
   - Components listen to `cartUpdated` event
   - Navbar shows cart count and total protein

3. **Cart Page Display**
   - Reads all items from localStorage
   - Displays each item with image, name, nutrition info
   - Calculates and displays total protein
   - Provides remove and clear cart functionality

#### Technical Implementation:
```typescript
// Cart Utilities (lib/cartUtils.ts)
- getCartItems(): CartItem[]
- addToCart(item: CartItem): void
- removeFromCart(itemId: string): void
- clearCart(): void
- getCartItemCount(): number
- getTotalProtein(): number
- isItemInCart(itemId: string): boolean
```

### B. Product Comparison System

#### Workflow Steps:
1. **Add to Compare**
   - User clicks "Add to Compare" button
   - Item stored in localStorage with key `compareFoods`
   - Maximum 2 items allowed
   - If 2 items exist, second item is replaced

2. **Compare Page**
   - Reads items from localStorage or URL params
   - Fetches product data for each item
   - Displays side-by-side comparison table
   - Highlights winner for each metric

### C. Navigation System

#### Workflow Steps:
1. **Navbar**
   - Fixed position at top
   - Search bar (desktop)
   - Navigation links (Calculate, Nutrition)
   - Cart icon with count badge
   - Responsive mobile menu

2. **Breadcrumbs**
   - Product pages show breadcrumb navigation
   - Format: Home / Categories / Category Name / Product Name

### D. SEO & Metadata System

#### Workflow Steps:
1. **Page Metadata**
   - Each page exports metadata object
   - Includes title, description, keywords
   - Open Graph tags for social sharing
   - Twitter Card tags
   - Canonical URLs

2. **Dynamic Metadata**
   - Product pages: Generated from product data
   - Category pages: Generated from category data
   - Blog posts: Generated from post data

---

## 🧩 Component Architecture

### Layout Components
- **Navbar**: Global navigation with cart integration
- **Footer**: Site links and information
- **CartDropdown**: Quick cart preview (optional)

### Home Page Components
- **Hero**: Main banner with CTA
- **Categories**: Category grid
- **Foods/Fruits/Vegetables**: Food item displays
- **HighProteinFood**: Featured protein foods
- **CalculatorsSection**: Calculator previews
- **BlogPreview**: Latest blog posts
- **DietPlanForm**: Lead generation form

### Product Components
- **CategoryDetailInfo**: Product information display
- **FoodImageGallery**: Product image carousel
- **AddToCartButton**: Reusable cart button
- **AddToCompareButton**: Comparison button

### Calculator Components
- **BMICalculator**: BMI calculation
- **CaloriesEstimateCalculator**: BMR/TDEE calculation
- **IdealWeightCalculator**: Ideal weight range
- **ProteinRequirementCalculator**: Protein needs

---

## 📊 Data Flow

### 1. Product Data Flow
```
Static Data (lib/categoryData.ts)
    ↓
Category/Food Pages
    ↓
Product Components
    ↓
User Interaction (Add to Cart/Compare)
    ↓
localStorage
    ↓
Cart/Compare Pages
```

### 2. Cart Data Flow
```
User Action (Add to Cart)
    ↓
cartUtils.addToCart()
    ↓
localStorage.setItem('fitzone_cart')
    ↓
window.dispatchEvent('cartUpdated')
    ↓
Components Listen & Update
    - Navbar (count, protein)
    - Cart Page (items list)
    - Product Page (button state)
```

### 3. Comparison Data Flow
```
User Action (Add to Compare)
    ↓
localStorage.setItem('compareFoods')
    ↓
Navigate to /compare
    ↓
Read from localStorage or URL params
    ↓
Fetch product data
    ↓
Display comparison table
```

---

## 🔐 State Management

### Current Implementation
- **Client State**: React useState hooks
- **Persistent State**: Browser localStorage
- **Global Updates**: Custom events (`cartUpdated`)

### State Storage Locations
1. **Cart State**: `localStorage['fitzone_cart']`
2. **Compare State**: `localStorage['compareFoods']`
3. **Component State**: React useState (UI states)

### State Update Pattern
```typescript
// 1. Update localStorage
localStorage.setItem(key, JSON.stringify(data))

// 2. Dispatch event
window.dispatchEvent(new CustomEvent('cartUpdated'))

// 3. Components listen
useEffect(() => {
  const handleUpdate = () => { /* update state */ }
  window.addEventListener('cartUpdated', handleUpdate)
  return () => window.removeEventListener('cartUpdated', handleUpdate)
}, [])
```

---

## 🗺️ Routing Structure

### Static Routes
- `/` - Homepage
- `/about` - About page
- `/contact` - Contact page
- `/services` - Services page
- `/categories` - All categories
- `/nutrition` - Nutrition hub
- `/nutrition/high-protein-foods` - High protein foods
- `/tools` - Tools hub
- `/tools/bmi-calculator` - BMI calculator
- `/tools/calories-calculator` - Calories calculator
- `/tools/ideal-weight-calculator` - Ideal weight calculator
- `/tools/protein-requirement-calculator` - Protein calculator
- `/blog` - Blog listing
- `/blog/[slug]` - Blog post
- `/compare` - Product comparison
- `/cart` - Shopping cart
- `/privacy-policy` - Privacy policy

### Dynamic Routes
- `/category/[categoryName]` - Category page
- `/category/[categoryName]/[foodSlug]` - Product detail page

---

## 🔌 Backend Integration Plan

### Phase 1: API Endpoints (To Be Implemented)

#### Product APIs
```
GET /api/categories
  - Returns all categories
  - Response: CategoryItem[]

GET /api/categories/:slug
  - Returns category with foods
  - Response: CategoryItem with FoodItem[]

GET /api/foods/:categorySlug/:foodSlug
  - Returns single food item
  - Response: FoodItem
```

#### Cart APIs
```
POST /api/cart
  - Add item to cart
  - Body: CartItem
  - Response: { success: boolean, cart: CartItem[] }

GET /api/cart
  - Get user's cart
  - Response: CartItem[]

DELETE /api/cart/:itemId
  - Remove item from cart
  - Response: { success: boolean }

DELETE /api/cart
  - Clear entire cart
  - Response: { success: boolean }
```

#### User APIs
```
POST /api/auth/register
  - Register new user
  - Body: { email, password, name }

POST /api/auth/login
  - Login user
  - Body: { email, password }
  - Response: { token, user }

GET /api/user/profile
  - Get user profile
  - Headers: Authorization: Bearer <token>
```

### Phase 2: Database Schema (Suggested)

#### Categories Table
```sql
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  image VARCHAR(500),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Foods Table
```sql
CREATE TABLE foods (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category_id INT,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  type ENUM('Veg', 'Non-veg'),
  calories VARCHAR(50),
  protein VARCHAR(50),
  carbs VARCHAR(50),
  image VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id),
  UNIQUE KEY unique_food (category_id, slug)
);
```

#### Cart Table
```sql
CREATE TABLE cart_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  food_id INT,
  quantity INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (food_id) REFERENCES foods(id)
);
```

#### Users Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Phase 3: Migration Strategy

1. **Keep localStorage for Guest Users**
   - Continue using localStorage for non-authenticated users
   - Sync to backend when user logs in

2. **Backend for Authenticated Users**
   - Store cart in database for logged-in users
   - Sync localStorage cart to backend on login

3. **Gradual Migration**
   - Implement backend APIs
   - Add authentication
   - Migrate cart data on login
   - Keep localStorage as fallback

---

## 🚀 Deployment Workflow

### Pre-Deployment Checklist

#### 1. Environment Variables
```env
NEXT_PUBLIC_SITE_URL=https://fitzone-gym.com
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://fitzone-gym.com
```

#### 2. Build Optimization
```bash
# Build for production
npm run build

# Check build output
npm run start

# Verify all pages generate correctly
```

#### 3. SEO Verification
- [ ] All pages have metadata
- [ ] Sitemap generated (`/sitemap.xml`)
- [ ] Robots.txt configured (`/robots.txt`)
- [ ] Open Graph images added
- [ ] Canonical URLs set

#### 4. Performance Optimization
- [ ] Images optimized (Next.js Image)
- [ ] Code splitting verified
- [ ] Bundle size analyzed
- [ ] Lighthouse score > 90

### Deployment Steps

#### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

#### Option 2: Custom Server
```bash
# Build
npm run build

# Start production server
npm start

# Or use PM2
pm2 start npm --name "fitzone-gym" -- start
```

### Post-Deployment

1. **Verify Functionality**
   - Test all pages load correctly
   - Test cart functionality
   - Test calculators
   - Test navigation

2. **Monitor**
   - Set up error tracking (Sentry)
   - Monitor performance (Vercel Analytics)
   - Track user behavior (Google Analytics)

3. **SEO Submission**
   - Submit sitemap to Google Search Console
   - Submit to Bing Webmaster Tools
   - Verify meta tags with social media debuggers

---

## 📝 Development Workflow

### Daily Development Process

1. **Feature Development**
   ```
   Create Feature Branch
   ↓
   Implement Feature
   ↓
   Test Locally
   ↓
   Commit Changes
   ↓
   Push to Repository
   ↓
   Create Pull Request
   ↓
   Code Review
   ↓
   Merge to Main
   ```

2. **Component Development**
   ```
   Create Component File
   ↓
   Implement UI
   ↓
   Add TypeScript Types
   ↓
   Add Props Interface
   ↓
   Test Component
   ↓
   Integrate into Page
   ```

3. **Data Management**
   ```
   Update categoryData.ts
   ↓
   Test Data Loading
   ↓
   Verify Display
   ↓
   Update Metadata
   ```

---

## 🔄 Update Workflow

### Adding New Food Item
1. Open `lib/categoryData.ts`
2. Find appropriate category in `categoryFoods`
3. Add new food object:
   ```typescript
   { 
     name: 'Food Name',
     type: 'Veg' | 'Non-veg',
     calories: '100',
     protein: '10g',
     carbs: '20g',
     image: '/path/to/image.jpg'
   }
   ```
4. Food automatically appears on category page
5. Product detail page auto-generates

### Adding New Category
1. Open `lib/categoryData.ts`
2. Add to `categories` array
3. Add `categoryFoods` entry with foods
4. Category appears in navigation

### Adding New Calculator
1. Create component in `components/calculators/`
2. Create page in `app/tools/[calculator-name]/`
3. Add to tools list in `app/tools/page.tsx`
4. Add metadata

---

## 🎨 UI/UX Guidelines

### Design System
- **Primary Color**: `#9fcc2e` (Green)
- **Secondary Color**: `#8bb825` (Dark Green)
- **Text**: Gray scale (gray-900, gray-600, etc.)
- **Spacing**: Tailwind spacing scale
- **Typography**: Inter font family

### Component Patterns
- **Cards**: White background, shadow, rounded corners
- **Buttons**: Primary (green), Secondary (outline)
- **Forms**: Clean inputs with focus states
- **Navigation**: Fixed navbar, breadcrumbs on detail pages

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

---

## ✅ Testing Checklist

### Functionality Tests
- [ ] All pages load without errors
- [ ] Navigation works on all pages
- [ ] Cart add/remove functionality
- [ ] Product comparison works
- [ ] Calculators produce correct results
- [ ] Search functionality (if implemented)
- [ ] Forms submit correctly

### Browser Tests
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

### Performance Tests
- [ ] Page load time < 3 seconds
- [ ] Images load efficiently
- [ ] No console errors
- [ ] Lighthouse score > 90

---

## 📚 Documentation Maintenance

### Keeping Documentation Updated
1. Update workflow when adding features
2. Document API changes
3. Update component architecture
4. Maintain deployment checklist

### Version Control
- Keep documentation in repository
- Update with each major feature
- Review quarterly for accuracy

---

## 🎯 Future Enhancements

### Planned Features
1. **User Authentication**
   - Login/Register
   - User profiles
   - Saved carts

2. **Backend Integration**
   - API endpoints
   - Database storage
   - User management

3. **Advanced Features**
   - Search functionality
   - Filters and sorting
   - Product reviews
   - Wishlist
   - Order history

4. **Analytics**
   - User tracking
   - Popular products
   - Conversion tracking

---

## 📞 Support & Maintenance

### Common Issues & Solutions

**Issue**: Cart not persisting
- **Solution**: Check localStorage is enabled, verify cartUtils functions

**Issue**: Images not loading
- **Solution**: Verify image paths in public folder, check Next.js Image component

**Issue**: Metadata not showing
- **Solution**: Verify metadata export, check page is server component

**Issue**: Build errors
- **Solution**: Check TypeScript errors, verify all imports, check Next.js version

---

**Last Updated**: 2024
**Version**: 1.0.0
**Maintained By**: Development Team

