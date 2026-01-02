# FitZone Gym - Fitness & Nutrition Platform

A comprehensive fitness and nutrition web application built with Next.js 14, TypeScript, and Tailwind CSS. Features include food nutrition information, fitness calculators, shopping cart with protein tracking, product comparison, and a fitness blog.

![FitZone Gym](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38bdf8?style=for-the-badge&logo=tailwind-css)

## 🚀 Features

### Core Features
- 🍎 **Food Categories**: Browse 10+ food categories with detailed nutritional information
- 🛒 **Shopping Cart**: Add products to cart and track total protein intake
- 📊 **Fitness Calculators**: BMI, Calories, Ideal Weight, and Protein calculators
- 🔄 **Product Comparison**: Compare up to 2 foods side-by-side
- 📝 **Blog**: Fitness and nutrition articles
- 📱 **Responsive Design**: Mobile-first, works on all devices
- 🔍 **SEO Optimized**: Complete metadata, sitemap, and social sharing tags

### User Experience
- ✅ One-click add to cart
- ✅ Real-time cart updates
- ✅ Visual protein tracking
- ✅ Intuitive navigation
- ✅ Fast page loads
- ✅ Clean, modern UI

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Features Overview](#features-overview)
- [Technology Stack](#technology-stack)
- [Development](#development)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Contributing](#contributing)

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
demo/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Homepage
│   ├── globals.css              # Global styles
│   ├── category/                # Dynamic category routes
│   │   └── [categoryName]/
│   │       ├── page.tsx         # Category listing
│   │       └── [foodSlug]/
│   │           └── page.tsx     # Product detail
│   ├── cart/                    # Shopping cart
│   │   ├── layout.tsx           # Cart metadata
│   │   └── page.tsx             # Cart page
│   ├── tools/                   # Fitness calculators
│   │   ├── page.tsx             # Tools hub
│   │   ├── bmi-calculator/
│   │   ├── calories-calculator/
│   │   ├── ideal-weight-calculator/
│   │   └── protein-requirement-calculator/
│   ├── nutrition/               # Nutrition pages
│   ├── blog/                    # Blog pages
│   ├── compare/                 # Product comparison
│   └── ...
├── components/                   # React components
│   ├── layout/                  # Layout components
│   │   ├── Navbar.tsx           # Navigation bar
│   │   ├── Footer.tsx           # Footer
│   │   └── CartDropdown.tsx    # Cart dropdown
│   ├── home/                    # Homepage sections
│   ├── food/                    # Product components
│   │   ├── CategoryDetailInfo.tsx
│   │   ├── AddToCartButton.tsx
│   │   └── FoodImageGallery.tsx
│   ├── calculators/             # Calculator components
│   ├── compare/                 # Comparison components
│   └── nutrition/               # Nutrition components
├── lib/                          # Utility functions
│   ├── categoryData.ts          # Food data
│   └── cartUtils.ts             # Cart management
├── public/                       # Static assets
│   └── categories/              # Category images
└── package.json
```

## 🎯 Features Overview

### 1. Food Categories & Products

- **10 Food Categories**: Foods, Fruits, Vegetables, Fast Food, Wafers & Snacks, Juices, Dairy Products, Bakery Items, Beverage Items, Dry Fruits & Nuts
- **100+ Food Items**: Each with detailed nutritional information
- **Product Details**: Calories, Protein, Carbs, Health Benefits, Nutrients

### 2. Shopping Cart System

- **Add to Cart**: One-click product addition
- **Cart Management**: View, remove, and clear cart items
- **Protein Tracking**: Automatic calculation of total protein from all cart items
- **Persistent Storage**: Cart saved in browser localStorage

### 3. Fitness Calculators

- **BMI Calculator**: Calculate Body Mass Index
- **Calories Calculator**: Estimate daily calorie needs (BMR/TDEE)
- **Ideal Weight Calculator**: Find healthy weight range
- **Protein Calculator**: Calculate daily protein requirements

### 4. Product Comparison

- **Side-by-Side Comparison**: Compare up to 2 products
- **Nutritional Metrics**: Compare calories, protein, carbs, and more
- **Visual Indicators**: Highlights winner for each metric

### 5. Blog

- **Fitness Articles**: Workout tips, nutrition advice
- **Categories**: Workouts, Nutrition, Tips
- **Detailed Posts**: Full article pages with metadata

## 🛠️ Technology Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React 18**: UI library

### Features
- **Static Site Generation**: Fast page loads
- **Image Optimization**: Next.js Image component
- **SEO**: Metadata API, sitemap, robots.txt
- **Responsive Design**: Mobile-first approach

### Development Tools
- **TypeScript**: Type checking
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixes

## 💻 Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Adding New Food Items

1. Open `lib/categoryData.ts`
2. Find the appropriate category in `categoryFoods`
3. Add a new food object:

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

### Adding New Categories

1. Open `lib/categoryData.ts`
2. Add to `categories` array
3. Add corresponding `categoryFoods` entry

### Component Development

Components are organized by feature:
- `components/layout/` - Layout components
- `components/home/` - Homepage sections
- `components/food/` - Product-related components
- `components/calculators/` - Calculator components

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Custom Server

```bash
# Build
npm run build

# Start
npm start

# Or with PM2
pm2 start npm --name "fitzone-gym" -- start
```

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 📚 Documentation

### Quick Start
- **[QUICK_START.md](./QUICK_START.md)**: Get started in 3 steps ⚡
- **[SIMPLE_WORKFLOW.md](./SIMPLE_WORKFLOW.md)**: Easy-to-understand workflow guide 📖

### Detailed Documentation

- **[PROJECT_WORKFLOW.md](./PROJECT_WORKFLOW.md)**: Complete technical workflow
  - Architecture overview
  - User flow diagrams
  - Feature workflows
  - Backend integration plan
  - Deployment guide

- **[PROJECT_REPORT.md](./PROJECT_REPORT.md)**: Project analysis report
  - UI/UX analysis
  - Performance metrics
  - User experience review
  - Recommendations

### Key Documentation Sections

1. **Workflow Documentation**: See `PROJECT_WORKFLOW.md`
   - User flows
   - Component architecture
   - Data flow
   - State management

2. **Project Report**: See `PROJECT_REPORT.md`
   - UI/UX analysis
   - Performance review
   - Quality assurance
   - Recommendations

## 🎨 Design System

### Colors
- **Primary**: `#9fcc2e` (Green)
- **Secondary**: `#8bb825` (Dark Green)
- **Text**: Gray scale (gray-900 to gray-50)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, 2xl to 6xl
- **Body**: Regular, sm to base

### Components
- **Cards**: White background, shadow, rounded corners
- **Buttons**: Primary (solid), Secondary (outline)
- **Forms**: Clean inputs with focus states

## 🔐 State Management

### Current Implementation
- **Component State**: React useState hooks
- **Persistent State**: Browser localStorage
- **Global Updates**: Custom events

### Cart State
- Stored in `localStorage['fitzone_cart']`
- Real-time updates via `cartUpdated` event
- Automatic protein calculation

## 📊 SEO Features

- ✅ Complete metadata for all pages
- ✅ Dynamic metadata for products
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ Sitemap generation
- ✅ Robots.txt configuration
- ✅ Canonical URLs

## 🔄 Backend Integration Plan

### Phase 1: API Development
- Product APIs
- Cart APIs
- User authentication

### Phase 2: Database
- PostgreSQL/MySQL
- User management
- Cart persistence

### Phase 3: Migration
- Keep localStorage for guests
- Sync to backend for authenticated users

See `PROJECT_WORKFLOW.md` for detailed backend integration plan.

## ✅ Quality Assurance

### Code Quality
- ✅ TypeScript strict mode
- ✅ Consistent code style
- ✅ Component reusability
- ✅ Error handling

### User Experience
- ✅ Intuitive navigation
- ✅ Fast page loads
- ✅ Mobile optimization
- ✅ Accessibility features

### Performance
- ✅ Image optimization
- ✅ Code splitting
- ✅ Static generation
- ✅ Fast load times

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is private and proprietary.

## 📞 Support

For issues or questions, please contact the development team.

## 🎯 Roadmap

### Completed ✅
- [x] Frontend UI/UX
- [x] Shopping cart system
- [x] Product comparison
- [x] Fitness calculators
- [x] SEO optimization
- [x] Responsive design

### Planned 🔄
- [ ] Backend API integration
- [ ] User authentication
- [ ] Database implementation
- [ ] Search functionality
- [ ] Product filters
- [ ] User reviews

## 📈 Project Status

**Current Version**: 1.0.0  
**Status**: Frontend Complete ✅  
**Backend**: Pending Integration  
**Deployment**: Ready for Staging

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**

For detailed workflow and implementation guides, see:
- [PROJECT_WORKFLOW.md](./PROJECT_WORKFLOW.md)
- [PROJECT_REPORT.md](./PROJECT_REPORT.md)
