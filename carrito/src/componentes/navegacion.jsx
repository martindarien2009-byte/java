import "./navegacion.css";
import LogoCarrito from "./logocarrito.jsx";
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
      <LogoCarrito cantidadproductos={0} />
    </nav>
  );
}
