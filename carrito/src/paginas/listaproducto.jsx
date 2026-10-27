import "./listaproducto.css";
import productos from "../componentes/data/product.json";
import Producto from "../componentes/producto.jsx";
export default function ListaProducto() {
  return (
    <div className="listaproducto">
      {productos.map((producto) => (
        <Producto
          key={producto.id}
          nombre={producto.nombre}
          precio={producto.precio}
          imagen={producto.imagen}
        />
      ))}
    </div>
  );
}
