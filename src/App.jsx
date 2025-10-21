import { useMemo, useState } from "react";
import DarkModeToggle from "./components/DarkModeToggle.jsx";
import ProductList from "./components/ProductList.jsx";
import Cart from "./components/Cart.jsx";

// You can replace this with a fetch later:
const ALL_PRODUCTS = [
  { id: 1, title: "Blue Hoodie", price: 49.99, category: "Apparel" },
  { id: 2, title: "Wireless Mouse", price: 24.99, category: "Electronics" },
  { id: 3, title: "Notebook", price: 5.99, category: "Office" },
  { id: 4, title: "Headphones", price: 89.0, category: "Electronics" },
  { id: 5, title: "Black T-Shirt", price: 14.99, category: "Apparel" },
];

const CATEGORIES = ["All", "Apparel", "Electronics", "Office"];

export default function App() {
  // Step 2: Dark mode state
  const [darkMode, setDarkMode] = useState(false);

  // Step 3: Cart state
  const [cart, setCart] = useState([]); // array of {id, title, price, qty}

  // Step 4: Category filter state
  const [category, setCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    if (category === "All") return ALL_PRODUCTS;
    return ALL_PRODUCTS.filter(p => p.category === category);
  }, [category]);

  const handleToggleDarkMode = () => setDarkMode(prev => !prev);

  const handleAddToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const appClass = darkMode ? "app dark" : "app";

  return (
    <div className={appClass}>
      <header className="app-header">
        <h1>Product Dashboard</h1>

        {/* Dark Mode Toggle (Step 2) */}
        <DarkModeToggle darkMode={darkMode} onToggle={handleToggleDarkMode} />

        {/* Category Filter (Step 4) */}
        <label className="category-filter">
          <span>Category:</span>
          <select value={category} onChange={handleChangeCategory}>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>
      </header>

      <main className="app-main">
        {/* Product list respects the selected category */}
        <ProductList
          products={filteredProducts}
          onAddToCart={handleAddToCart}
        />

        {/* Cart sidebar */}
        <aside className="app-cart">
          <Cart items={cart} />
        </aside>
      </main>
    </div>
  );
} 