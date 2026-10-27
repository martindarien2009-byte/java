import "./logocarrito.css";
export default function logoCarrito({ cantidadproductos }) {
  return (
    <nav className="logoCarrito">
      <div className="carrito_logo">
        <span className="navegacion_carrito">{cantidadproductos}</span>
      </div>
    </nav>
  );
}
