import "./listaproducto.css";
import productos from "../componentes/data/product.json";
import Producto from "../componentes/producto.jsx";
export default function ListaProducto() {
  return (
    <div className="listaproducto">
      <header className="listaproducto_encabezado">
        <h1>Nuestros productos</h1>
        <p>Encuentra lo que necesitas para tu hogar.</p>
      </header>
      {productos.map((producto) => (
        <Producto
          key={producto.id}
          nombre={producto.nombre}
          precio={producto.precio}
          imagen={producto.imagen}
          descripcion={producto.descripcion}
          stock={producto.stock}
        />
      ))}
    </div>
  );
}
