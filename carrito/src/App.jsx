import { useState } from "react";
import Navegacion from "./componentes/navegacion.jsx";
import ListaProducto from "./paginas/listaproducto.jsx";
import Compras from "./paginas/compras.jsx";

function App() {
  const [carrito, setCarrito] = useState([]);
  const [pagina, setPagina] = useState("productos");
  const cantidadProductos = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0,
  );

  const agregarAlCarrito = (producto, cantidad) => {
    if (!Number.isInteger(cantidad) || cantidad <= 0) return false;

    const productoEnCarrito = carrito.find((item) => item.id === producto.id);
    const cantidadDisponible =
      producto.stock - (productoEnCarrito?.cantidad ?? 0);

    if (cantidadDisponible <= 0) return false;

    const cantidadAgregar = Math.min(cantidad, cantidadDisponible);
    setCarrito((actual) => {
      const existente = actual.find((item) => item.id === producto.id);
      if (existente) {
        return actual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidadAgregar }
            : item,
        );
      }

      return [...actual, { ...producto, cantidad: cantidadAgregar }];
    });

    return true;
  };

  return (
    <div className="app">
      <Navegacion
        cantidadProductos={cantidadProductos}
        onMostrarProductos={() => setPagina("productos")}
        onMostrarCarrito={() => setPagina("carrito")}
      />
      <main className="contenido">
        <section hidden={pagina !== "productos"}>
          <ListaProducto onAgregarAlCarrito={agregarAlCarrito} />
        </section>
        <section hidden={pagina !== "carrito"}>
          <Compras productos={carrito} />
        </section>
      </main>
    </div>
  );
}

export default App;
