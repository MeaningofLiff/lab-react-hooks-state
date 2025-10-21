export default function Cart({ items = [] }) {
  // Ensure we always work with an array of numbers
  const safeItems = Array.isArray(items) ? items : [];

  const totalQty = safeItems.reduce((sum, i) => {
    const qty = Number(i?.qty ?? 0);
    return sum + (Number.isFinite(qty) ? qty : 0);
  }, 0);

  const totalPrice = safeItems.reduce((sum, i) => {
    const qty = Number(i?.qty ?? 0);
    const price = Number(i?.price ?? 0);
    const line = (Number.isFinite(qty) ? qty : 0) * (Number.isFinite(price) ? price : 0);
    return sum + line;
  }, 0);

  return (
    <div className="cart">
      <h2>Cart</h2>
      <p className="muted">
        {totalQty === 0 ? "Your cart is empty." : `${totalQty} item(s)`}
      </p>

      <ul className="cart__list">
        {safeItems.map((item) => {
          const qty = Number(item?.qty ?? 0);
          const price = Number(item?.price ?? 0);
          const lineTotal = qty * price;

          return (
          <li key={item.id ?? `row-${index}`} className="cart__row"> 
              <div>
                <strong>{item?.title ?? "Untitled item"}</strong>
                <div className="muted">x{qty}</div>
              </div>
              <div>${Number.isFinite(lineTotal) ? lineTotal.toFixed(2) : "0.00"}</div>
            </li>
          );
        })}
      </ul>

      <div className="cart__total">
        <span>Total</span>
        <strong>${Number.isFinite(totalPrice) ? totalPrice.toFixed(2) : "0.00"}</strong>
      </div>
    </div>
  );
} 