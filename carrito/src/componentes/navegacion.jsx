import "./navegacion.css";

export default function Navegacion({
  cantidadProductos,
  onMostrarProductos,
  onMostrarCarrito,
}) {
  return (
    <nav className="navegacion" aria-label="Navegación principal">
      <ul>
        <li>
          <button type="button" onClick={onMostrarProductos}>
            Productos
          </button>
        </li>
        <li>
          <button type="button" onClick={onMostrarCarrito}>
            Carrito
            <span className="navegacion_contador" aria-label={`${cantidadProductos} productos`}>
              {cantidadProductos}
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
