import "./listaproducto.css";
import Producto from "../componentes/producto.jsx";
import { useEffect, useState } from "react";
import Filtro from "../componentes/filtro.jsx";

export default function ListaProducto({ onAgregarAlCarrito }) {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productosVisibles = productosFiltrados ?? productos;

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://dummyjson.com/products", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            `No se pudieron cargar los productos (${res.status})`,
          );
        }
        return res.json();
      })
      .then((json) => {
        if (!Array.isArray(json.products)) {
          throw new Error(
            "La respuesta de productos no tiene el formato esperado",
          );
        }
        setProductos(json.products);
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        console.error("Error al obtener los productos:", error);
        setError(error);
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <div className="listaproducto">
      <Filtro
        productos={productos}
        setProductosFiltrados={setProductosFiltrados}
      />
      <div className="productos-grid">
        {loading && <p>Cargando productos...</p>}
        {error && <p>Error: {error.message}</p>}
        <header className="listaproducto_encabezado">
          <h1 id="productos">Nuestros productos</h1>
          <p>Encuentra lo que necesitas para tu hogar.</p>
        </header>
        {!loading &&
          !error &&
          (productosVisibles.length > 0 ? (
            productosVisibles.map((producto) => (
              <Producto
                key={producto.id}
                producto={producto}
                nombre={producto.title}
                precio={producto.price}
                imagen={producto.thumbnail}
                descripcion={producto.description}
                stock={producto.stock}
                onAgregar={onAgregarAlCarrito}
              />
            ))
          ) : (
            <p>No hay productos en esta categoría.</p>
          ))}
      </div>
    </div>
  );
}
