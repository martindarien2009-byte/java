import "./producto.css";
import { useState } from "react";
export default function Producto({
  nombre,
  precio,
  imagen,
  descripcion,
  stock,
  producto,
  onAgregar,
}) {
  const [cantidad, setCantidad] = useState(stock > 0 ? 1 : 0);
  const [mensajeCarrito, setMensajeCarrito] = useState("");

  const handleIncrement = (newcantidad) => {
    if (newcantidad >= 0 && newcantidad <= stock) {
      setCantidad(newcantidad);
    }
  };

  const handleAgregarAlCarrito = () => {
    const agregado = onAgregar(producto, cantidad);
    setMensajeCarrito(
      agregado
        ? "Producto agregado al carrito."
        : "No hay más stock disponible para este producto.",
    );
  };

  return (
    <div className={"producto" + (stock <= 0 ? " sin-stock" : "")}>
      <img
        className="producto_imagen"
        src={imagen}
        alt={nombre.replaceAll("-", " ")}
      />
      <h3>{nombre.replaceAll("-", " ")}</h3>
      <p className="producto_precio">${precio.toFixed(2)}</p>
      <p className="producto_descripcion">{descripcion}</p>
      <div className="cantidad">
        <button
          type="button"
          aria-label={`Aumentar cantidad de ${nombre}`}
          disabled={cantidad >= stock}
          onClick={() => handleIncrement(cantidad + 1)}
        >
          +
        </button>
        <span>{cantidad}</span>
        <button
          type="button"
          aria-label={`Disminuir cantidad de ${nombre}`}
          disabled={cantidad <= 0}
          onClick={() => handleIncrement(cantidad - 1)}
        >
          -
        </button>
      </div>
      <p className="producto_stock">
        {stock > 0 ? `Stock disponible: ${stock}` : "Sin stock"}
      </p>
      <button
        className="producto_agregar"
        type="button"
        disabled={cantidad <= 0 || stock <= 0}
        onClick={handleAgregarAlCarrito}
      >
        Agregar al carrito
      </button>
      <p className="producto_mensaje" aria-live="polite">
        {mensajeCarrito}
      </p>
    </div>
  );
}
