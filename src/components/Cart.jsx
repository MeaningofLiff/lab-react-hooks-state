export default function Cart({ items = [], title = "Cart" }) {
  const safeItems = Array.isArray(items) ? items : [];
  const totalQty = safeItems.reduce((s, i) => s + Number(i?.qty ?? 0), 0);
  const totalPrice = safeItems.reduce(
    (s, i) => s + Number(i?.qty ?? 0) * Number(i?.price ?? 0),
    0
  );

  return (
    <div className="cart">
      <h2>{title}</h2>
      <p className="muted">
        {totalQty === 0 ? "Your cart is empty." : `${totalQty} item(s)`}
      </p>

      <ul className="cart__list">
        {safeItems.map((item, idx) => {
          const qty = Number(item?.qty ?? 0);
          const price = Number(item?.price ?? 0);
          const line = qty * price;
          return (
            <li key={item.id ?? `row-${idx}`} className="cart__row">
              <div>
                <strong>{item?.title ?? item?.name ?? "Untitled item"}</strong>
                <div className="muted">x{qty}</div>
              </div>
              <div>${Number.isFinite(line) ? line.toFixed(2) : "0.00"}</div>
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