// Category food items data
export interface CategoryItem {
  id: number
  name: string
  image: string
  description: string
  slug: string
}

export interface FoodItem {
  name: string
  type?: 'Veg' | 'Non-veg'
  calories?: string
  carbs?: string
  protein?: string
  image?: string
}

export const categories: CategoryItem[] = [
  {
    id: 1,
    name: 'Foods',
    image: '/categories/foods1.png',
    description: 'Various Food Items',
    slug: 'foods'
  },
  {
    id: 2,
    name: 'Fruits',
    image: '/categories/fruits.jpg',
    description: 'Fresh Fruits',
    slug: 'fruits'
  },
  {
    id: 3,
    name: 'Vegetables',
    image: '/categories/Vegetables.png',
    description: 'Fresh Vegetables',
    slug: 'vegetables'
  },
  {
    id: 4,
    name: 'Fast Food',
    image: '/categories/FastFood.png',
    description: 'Quick Meals',
    slug: 'fast-food'
  },
  {
    id: 5,
    name: 'Wafers and Snacks',
    image: '/categories/WafersandSnacks.png',
    description: 'Chips & Snacks',
    slug: 'wafers-and-snacks'
  },
  {
    id: 6,
    name: 'Juices',
    image: '/categories/Juices.png',
    description: 'Fresh Juices',
    slug: 'juices'
  },
  {
    id: 7,
    name: 'Dairy Products',
    image: '/categories/DairyProducts.png',
    description: 'Milk & Dairy',
    slug: 'dairy-products'
  },
  {
    id: 8,
    name: 'Bakery Items',
    image: '/categories/BakeryItems.png',
    description: 'Bread & Pastries',
    slug: 'bakery-items'
  },
  {
    id: 9,
    name: 'Beverage Items',
    image: '/categories/BeverageItems.png',
    description: 'Drinks & Beverages',
    slug: 'beverage-items'
  },
  {
    id: 10,
    name: 'Dry Fruits and Nuts',
    image: '/categories/DryFruitsandNuts.png',
    description: 'Nuts & Dried Fruits',
    slug: 'dry-fruits-and-nuts'
  }
]

// Food items for each category
export const categoryFoods: Record<string, FoodItem[]> = {
  'foods': [
    { name: 'Rice' },
    { name: 'Wheat Roti' },
    { name: 'Dal (Lentils)' },
    { name: 'Paneer' },
    { name: 'Chicken' },
    { name: 'Eggs' },
    { name: 'Fish' },
    { name: 'Oats' },
    { name: 'Poha' },
    { name: 'Upma' },
    { name: 'Idli' },
    { name: 'Dosa' },
    { name: 'Khichdi' },
    { name: 'Sabzi (Mix Veg)' },
    { name: 'Curd' },
    { name: 'Paratha' },
    { name: 'Sprouts' },
    { name: 'Chole' },
    { name: 'Rajma' },
    { name: 'Pulao' }
  ],
  'fruits': [
    { name: 'Apple' },
    { name: 'Banana' },
    { name: 'Mango' },
    { name: 'Grapes' },
    { name: 'Orange' },
    { name: 'Watermelon' },
    { name: 'Papaya' },
    { name: 'Pineapple' },
    { name: 'Kiwi' },
    { name: 'Strawberry' },
    { name: 'Blueberry' },
    { name: 'Guava' },
    { name: 'Pomegranate' },
    { name: 'Pear' },
    { name: 'Coconut' },
    { name: 'Dates' },
    { name: 'Figs' },
    { name: 'Blackberry' },
    { name: 'Muskmelon' },
    { name: 'Lemon' }
  ],
  'vegetables': [
    { name: 'Potato' },
    { name: 'Tomato' },
    { name: 'Onion' },
    { name: 'Spinach' },
    { name: 'Broccoli' },
    { name: 'Cauliflower' },
    { name: 'Carrot' },
    { name: 'Beetroot' },
    { name: 'Cabbage' },
    { name: 'Peas' },
    { name: 'Capsicum' },
    { name: 'Pumpkin' },
    { name: 'Ladyfinger' },
    { name: 'Brinjal' },
    { name: 'Sweet Corn' },
    { name: 'Beans' },
    { name: 'Mushroom' },
    { name: 'Bottle Gourd' },
    { name: 'Bitter Gourd' },
    { name: 'Radish' }
  ],
  'fast-food': [
    { name: 'Pizza' },
    { name: 'Burger' },
    { name: 'Fries' },
    { name: 'Sandwich' },
    { name: 'Momos' },
    { name: 'Noodles' },
    { name: 'Pasta' },
    { name: 'Samosa' },
    { name: 'Vada Pav' },
    { name: 'Pav Bhaji' },
    { name: 'Dabeli' },
    { name: 'Shawarma' },
    { name: 'Frankies' },
    { name: 'Nachos' },
    { name: 'Popcorn' },
    { name: 'Spring Rolls' },
    { name: 'Fried Chicken' },
    { name: 'Kebab Rolls' },
    { name: 'Hot Dog' },
    { name: 'Tacos' }
  ],
  'wafers-and-snacks': [
    { name: 'Lays' },
    { name: 'Bingo' },
    { name: 'Kurkure' },
    { name: 'Chips' },
    { name: 'Nachos' },
    { name: 'Popcorn' },
    { name: 'Khakhra' },
    { name: 'Chivda' },
    { name: 'Bhujia' },
    { name: 'Mixture' },
    { name: 'Murmura' },
    { name: 'Sev' },
    { name: 'Salted Peanuts' },
    { name: 'Masala Peanuts' },
    { name: 'Makhana' },
    { name: 'Crackers' },
    { name: 'Salted Biscuits' },
    { name: 'Chocolate Wafer Rolls' },
    { name: 'Rice Cakes' },
    { name: 'Cornflakes Mix' }
  ],
  'juices': [
    { name: 'Orange juice' },
    { name: 'Apple juice' },
    { name: 'Mango juice' },
    { name: 'Pomegranate juice' },
    { name: 'Watermelon juice' },
    { name: 'Pineapple juice' },
    { name: 'Grape juice' },
    { name: 'Mixed fruit juice' },
    { name: 'Carrot juice' },
    { name: 'Beetroot juice' },
    { name: 'Celery juice' },
    { name: 'Sugarcane juice' },
    { name: 'Lemon juice' },
    { name: 'Coconut water' },
    { name: 'Lassi' },
    { name: 'Buttermilk' },
    { name: 'Amla juice' },
    { name: 'Aloe vera juice' },
    { name: 'Tomato juice' },
    { name: 'Muskmelon juice' }
  ],
  'dairy-products': [
    { name: 'Milk' },
    { name: 'Curd' },
    { name: 'Paneer' },
    { name: 'Cheese' },
    { name: 'Butter' },
    { name: 'Ghee' },
    { name: 'Buttermilk' },
    { name: 'Lassi' },
    { name: 'Yogurt' },
    { name: 'Cream' },
    { name: 'Ice Cream' },
    { name: 'Khoya' },
    { name: 'Whey' },
    { name: 'Milk Powder' },
    { name: 'Flavoured Milk' },
    { name: 'Rabdi' },
    { name: 'Shrikhand' },
    { name: 'Cheesecake' },
    { name: 'Milkshake' },
    { name: 'Kulfi' }
  ],
  'bakery-items': [
    { name: 'Bread' },
    { name: 'Bun' },
    { name: 'Cake' },
    { name: 'Muffins' },
    { name: 'Donuts' },
    { name: 'Khari' },
    { name: 'Pav' },
    { name: 'Toast' },
    { name: 'Cookies' },
    { name: 'Biscuits' },
    { name: 'Croissant' },
    { name: 'Rusk' },
    { name: 'Roll' },
    { name: 'Pastry' },
    { name: 'Brownie' },
    { name: 'Bagel' },
    { name: 'Cupcakes' },
    { name: 'Pie' },
    { name: 'Danish' },
    { name: 'Tart' }
  ],
  'beverage-items': [
    { name: 'Tea' },
    { name: 'Coffee' },
    { name: 'Cold Coffee' },
    { name: 'Green Tea' },
    { name: 'Black Coffee' },
    { name: 'Energy Drinks' },
    { name: 'Protein Shake' },
    { name: 'Soft Drinks' },
    { name: 'Soda' },
    { name: 'Coconut water' },
    { name: 'Malt Drinks' },
    { name: 'Badam Milk' },
    { name: 'Hot Chocolate' },
    { name: 'Boost' },
    { name: 'Bournvita' },
    { name: 'Fruit Smoothies' },
    { name: 'Milkshake' },
    { name: 'Jaljeera' },
    { name: 'Lemon Soda' },
    { name: 'Kombucha' }
  ],
  'dry-fruits-and-nuts': [
    { name: 'Almonds' },
    { name: 'Cashews' },
    { name: 'Raisins' },
    { name: 'Walnuts' },
    { name: 'Pistachios' },
    { name: 'Dates' },
    { name: 'Figs' },
    { name: 'Apricots' },
    { name: 'Peanuts' },
    { name: 'Hazelnuts' },
    { name: 'Pine nuts' },
    { name: 'Macadamia' },
    { name: 'Brazil nuts' },
    { name: 'Pecan nuts' },
    { name: 'Dry coconut' },
    { name: 'Anjeer' },
    { name: 'Chia seeds' },
    { name: 'Flax seeds' },
    { name: 'Sunflower seeds' },
    { name: 'Pumpkin seeds' }
  ]
}

// Helper function to get Unsplash image URL for food items
function getFoodImage(foodName: string, categorySlug: string): string {
  const imageMap: Record<string, string> = {
    // Foods
    'Rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80',
    'Wheat Roti': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
    'Dal (Lentils)': 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80',
    'Paneer': 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&q=80',
    'Chicken': 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&q=80',
    'Eggs': 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&q=80',
    'Fish': 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80',
    'Oats': 'https://images.unsplash.com/photo-1574781330855-d0db8cc4a88d?w=400&q=80',
    'Poha': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80',
    'Upma': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80',
    'Idli': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80',
    'Dosa': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80',
    'Khichdi': 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80',
    'Sabzi (Mix Veg)': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80',
    'Curd': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80',
    'Paratha': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
    'Sprouts': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80',
    'Chole': 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80',
    'Rajma': 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80',
    'Pulao': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80',
    
    // Fruits
    'Apple': 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&q=80',
    'Banana': 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&q=80',
    'Mango': 'https://images.unsplash.com/photo-1605027990121-c73661ea7c82?w=400&q=80',
    'Grapes': 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&q=80',
    'Orange': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80',
    'Watermelon': 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80',
    'Papaya': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80',
    'Pineapple': 'https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?w=400&q=80',
    'Kiwi': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80',
    'Strawberry': 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&q=80',
    'Blueberry': 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&q=80',
    'Guava': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80',
    'Pomegranate': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80',
    'Pear': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80',
    'Coconut': 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80',
    'Dates': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80',
    'Figs': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80',
    'Blackberry': 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&q=80',
    'Muskmelon': 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80',
    'Lemon': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80',
    
    // Vegetables
    'Potato': 'https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?w=400&q=80',
    'Tomato': 'https://images.unsplash.com/photo-1592841200221-8c0ac03d0a5a?w=400&q=80',
    'Onion': 'https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?w=400&q=80',
    'Spinach': 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80',
    'Broccoli': 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=400&q=80',
    'Cauliflower': 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=400&q=80',
    'Carrot': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80',
    'Beetroot': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80',
    'Cabbage': 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=400&q=80',
    'Peas': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80',
    'Capsicum': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80',
    'Pumpkin': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80',
    'Ladyfinger': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80',
    'Brinjal': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80',
    'Sweet Corn': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80',
    'Beans': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80',
    'Mushroom': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80',
    'Bottle Gourd': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80',
    'Bitter Gourd': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80',
    'Radish': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80',
    
    // Fast Food
    'Pizza': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
    'Burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
    'Fries': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80',
    'Sandwich': 'https://images.unsplash.com/photo-1553909489-cf47db38fb27?w=400&q=80',
    'Momos': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
    'Noodles': 'https://images.unsplash.com/photo-1551462147-85885a1743e6?w=400&q=80',
    'Pasta': 'https://images.unsplash.com/photo-1551462147-85885a1743e6?w=400&q=80',
    'Samosa': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
    'Vada Pav': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
    'Pav Bhaji': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
    'Dabeli': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
    'Shawarma': 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&q=80',
    'Frankies': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
    'Nachos': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80',
    'Popcorn': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80',
    'Spring Rolls': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
    'Fried Chicken': 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&q=80',
    'Kebab Rolls': 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&q=80',
    'Hot Dog': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
    'Tacos': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
    
    // Wafers and Snacks
    'Lays': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80',
    'Bingo': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80',
    'Kurkure': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80',
    'Chips': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80',
    'Nachos': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80',
    'Popcorn': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80',
    'Khakhra': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80',
    'Chivda': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80',
    'Bhujia': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80',
    'Mixture': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80',
    'Murmura': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80',
    'Sev': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80',
    'Salted Peanuts': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80',
    'Masala Peanuts': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80',
    'Makhana': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80',
    'Crackers': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80',
    'Salted Biscuits': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80',
    'Chocolate Wafer Rolls': 'https://images.unsplash.com/photo-1606312619070-d48b4bdc1b7e?w=400&q=80',
    'Rice Cakes': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80',
    'Cornflakes Mix': 'https://images.unsplash.com/photo-1574781330855-d0db8cc4a88d?w=400&q=80',
    
    // Juices
    'Orange juice': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80',
    'Apple juice': 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&q=80',
    'Mango juice': 'https://images.unsplash.com/photo-1605027990121-c73661ea7c82?w=400&q=80',
    'Pomegranate juice': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80',
    'Watermelon juice': 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80',
    'Pineapple juice': 'https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?w=400&q=80',
    'Grape juice': 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&q=80',
    'Mixed fruit juice': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80',
    'Carrot juice': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80',
    'Beetroot juice': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80',
    'Celery juice': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80',
    'Sugarcane juice': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80',
    'Lemon juice': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80',
    'Coconut water': 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80',
    'Lassi': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80',
    'Buttermilk': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80',
    'Amla juice': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80',
    'Aloe vera juice': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80',
    'Tomato juice': 'https://images.unsplash.com/photo-1592841200221-8c0ac03d0a5a?w=400&q=80',
    'Muskmelon juice': 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80',
    
    // Dairy Products
    'Milk': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80',
    'Curd': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80',
    'Paneer': 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&q=80',
    'Cheese': 'https://images.unsplash.com/photo-1618164436249-4473940d1f5f?w=400&q=80',
    'Butter': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80',
    'Ghee': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80',
    'Buttermilk': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80',
    'Lassi': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80',
    'Yogurt': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80',
    'Cream': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80',
    'Ice Cream': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80',
    'Khoya': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80',
    'Whey': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80',
    'Milk Powder': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80',
    'Flavoured Milk': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80',
    'Rabdi': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80',
    'Shrikhand': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80',
    'Cheesecake': 'https://images.unsplash.com/photo-1618164436249-4473940d1f5f?w=400&q=80',
    'Milkshake': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80',
    'Kulfi': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80',
    
    // Bakery Items
    'Bread': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
    'Bun': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
    'Cake': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80',
    'Muffins': 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&q=80',
    'Donuts': 'https://images.unsplash.com/photo-1551024506-0bccd028d483?w=400&q=80',
    'Khari': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
    'Pav': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
    'Toast': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
    'Cookies': 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&q=80',
    'Biscuits': 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&q=80',
    'Croissant': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
    'Rusk': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
    'Roll': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
    'Pastry': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80',
    'Brownie': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80',
    'Bagel': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
    'Cupcakes': 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&q=80',
    'Pie': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80',
    'Danish': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
    'Tart': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80',
    
    // Beverages
    'Tea': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80',
    'Coffee': 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&q=80',
    'Cold Coffee': 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&q=80',
    'Green Tea': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80',
    'Black Coffee': 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&q=80',
    'Energy Drinks': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80',
    'Protein Shake': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80',
    'Soft Drinks': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80',
    'Soda': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80',
    'Coconut water': 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80',
    'Malt Drinks': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80',
    'Badam Milk': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80',
    'Hot Chocolate': 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&q=80',
    'Boost': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80',
    'Bournvita': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80',
    'Fruit Smoothies': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80',
    'Milkshake': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80',
    'Jaljeera': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80',
    'Lemon Soda': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80',
    'Kombucha': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80',
    
    // Dry Fruits and Nuts
    'Almonds': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80',
    'Cashews': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80',
    'Raisins': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80',
    'Walnuts': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80',
    'Pistachios': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80',
    'Dates': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80',
    'Figs': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80',
    'Apricots': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80',
    'Peanuts': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80',
    'Hazelnuts': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80',
    'Pine nuts': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80',
    'Macadamia': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80',
    'Brazil nuts': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80',
    'Pecan nuts': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80',
    'Dry coconut': 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80',
    'Anjeer': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80',
    'Chia seeds': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80',
    'Flax seeds': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80',
    'Sunflower seeds': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80',
    'Pumpkin seeds': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80',
  }
  
  // Return mapped image or fallback to category image
  return imageMap[foodName] || `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80`
}

// Helper function to determine if food is Non-veg
function isNonVeg(foodName: string): boolean {
  const nonVegKeywords = ['chicken', 'fish', 'egg', 'meat', 'prawn', 'shrimp', 'mutton', 'beef', 'pork', 'turkey', 'duck', 'lamb', 'seafood', 'kebab', 'shawarma', 'frankies', 'hot dog', 'fried chicken']
  return nonVegKeywords.some(keyword => foodName.toLowerCase().includes(keyword))
}

// Helper function to get default nutritional values based on food name and category
function getDefaultNutrition(foodName: string, categorySlug: string): { calories: string; carbs: string; protein: string } {
  const name = foodName.toLowerCase()
  
  // Default values by category
  if (categorySlug === 'fruits') {
    return { calories: '60', carbs: '15g', protein: '0.5g' }
  }
  if (categorySlug === 'vegetables') {
    return { calories: '25', carbs: '5g', protein: '1g' }
  }
  if (categorySlug === 'fast-food') {
    return { calories: '250', carbs: '30g', protein: '10g' }
  }
  if (categorySlug === 'wafers-and-snacks') {
    return { calories: '150', carbs: '15g', protein: '2g' }
  }
  if (categorySlug === 'juices') {
    return { calories: '50', carbs: '12g', protein: '0.5g' }
  }
  if (categorySlug === 'dairy-products') {
    return { calories: '100', carbs: '5g', protein: '8g' }
  }
  if (categorySlug === 'bakery-items') {
    return { calories: '200', carbs: '35g', protein: '5g' }
  }
  if (categorySlug === 'beverage-items') {
    return { calories: '30', carbs: '8g', protein: '0g' }
  }
  if (categorySlug === 'dry-fruits-and-nuts') {
    return { calories: '300', carbs: '20g', protein: '10g' }
  }
  
  // Default for foods category
  if (isNonVeg(foodName)) {
    return { calories: '180', carbs: '5g', protein: '25g' }
  }
  return { calories: '130', carbs: '25g', protein: '5g' }
}

// Helper function to get category by slug
export function getCategoryBySlug(slug: string): CategoryItem | undefined {
  return categories.find(cat => cat.slug === slug)
}

// Helper function to get foods by category slug with nutritional data
export function getFoodsByCategorySlug(slug: string): FoodItem[] {
  const foods = categoryFoods[slug] || []
  return foods.map(food => {
    const nutrition = getDefaultNutrition(food.name, slug)
    return {
      ...food,
      type: isNonVeg(food.name) ? 'Non-veg' : 'Veg',
      calories: food.calories || nutrition.calories,
      carbs: food.carbs || nutrition.carbs,
      protein: food.protein || nutrition.protein,
      image: food.image || getFoodImage(food.name, slug)
    }
  })
}

