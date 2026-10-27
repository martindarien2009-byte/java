import "./producto.css";
export default function Producto({ nombre, precio, imagen }) {
  return (
    <div className="producto">
      <img src={imagen} alt={nombre} />
      <h3>{nombre}</h3>
      <p>${precio.toFixed(2)}</p>
    </div>
  );
}
