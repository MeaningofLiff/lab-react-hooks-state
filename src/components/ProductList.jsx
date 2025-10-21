import ProductCard from "./ProductCard.jsx";

export default function ProductList({ products, onAddToCart }) {
  if (!products?.length) {
    return <p className="muted">No products in this category.</p>;
  }

  return (
    <section className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={() => onAddToCart(product)}
        />
      ))}
    </section>
  );
} 