import "./logocarrito.css";
export default function logoCarrito({ cantidadproductos }) {
  return (
    <div className="logoCarrito" aria-label={`${cantidadproductos} productos en el carrito`}>
      <div className="carrito_logo">
        <span className="navegacion_carrito">{cantidadproductos}</span>
      </div>
    </div>
  );
}
