import "./navegacion.css";
import logoCarrito from "./logocarrito.jsx";
export default function Navegacion() {
  return (
    <nav className="navegacion">
      <ul>
        <li>
          <a href="/">Inicio</a>
        </li>
        <li>
          <a href="/productos">Productos</a>
        </li>
        <li>
          <a href="/contacto">Contacto</a>
        </li>
      </ul>
      {/* carrito de compras */}
      <logoCarrito cantidadproductos={0} />
    </nav>
  );
}
