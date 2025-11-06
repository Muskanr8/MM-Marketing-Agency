export default function ProductCard({ product }) {
  return (
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
      <h3>{product?.name || "Product Name"}</h3>
      <p>{product?.price ? `₹${product.price}` : "Price unavailable"}</p>
    </div>
  );
}
