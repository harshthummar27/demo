# FitZone Gym - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install
```bash
npm install
```

### Step 2: Run
```bash
npm run dev
```

### Step 3: Open
Go to: http://localhost:3000

**That's it!** 🎉

---

## 📖 What This Project Does

### Main Features

1. **Browse Products** → See food items with nutrition info
2. **Add to Cart** → Click "+" button on any product
3. **View Cart** → Click cart icon, see total protein
4. **Compare Products** → Add 2 products to compare
5. **Use Calculators** → BMI, Calories, Weight, Protein

---

## 🗺️ Simple Map

```
Homepage (/)
    ↓
Categories Page (/categories)
    ↓
Category Page (/category/fruits)
    ↓
Product Page (/category/fruits/apple)
    ↓
[Add to Cart] → Cart Page (/cart)
```

---

## 🎯 Common Tasks

### Add a Product
1. Open `lib/categoryData.ts`
2. Add to category array
3. Done!

### Change Colors
1. Open `tailwind.config.js`
2. Change color values
3. Done!

### Deploy
1. Push to GitHub
2. Connect to Vercel
3. Click Deploy
4. Done!

---

## 📁 Key Files

- `app/page.tsx` - Homepage
- `app/cart/page.tsx` - Cart page
- `lib/categoryData.ts` - Product data
- `lib/cartUtils.ts` - Cart functions
- `components/layout/Navbar.tsx` - Navigation

---

## ✅ Quick Checklist

- [ ] Project runs (`npm run dev`)
- [ ] Can browse products
- [ ] Can add to cart
- [ ] Cart shows items
- [ ] Calculators work
- [ ] Mobile looks good

---

## 🆘 Quick Help

**Cart not working?**  
→ Check browser console for errors

**Page not loading?**  
→ Restart dev server

**Styles broken?**  
→ Run `npm install` again

**Need more help?**  
→ Read `SIMPLE_WORKFLOW.md`

---

**Keep it simple. Build. Test. Deploy.**

