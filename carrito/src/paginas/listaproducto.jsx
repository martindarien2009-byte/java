import "./listaproducto.css";
import Producto from "../componentes/producto.jsx";
import { useEffect, useMemo, useState } from "react";
import Filtro from "../componentes/filtro.jsx";

const categorias = ["beuty", "fragances", "furniture", "groseries"];
const ordenes = {
  nombre: (a, b) => a.title.localeCompare(b.title),
  precio: (a, b) => a.price - b.price,
  stock: (a, b) => a.stock - b.stock,
};

export default function ListaProducto() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ordenarPor, setOrdenarPor] = useState("nombre");
  const [filtroCategoria, setFiltroCategoria] = useState("");

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

  const productosVisibles = useMemo(() => {
    const productosFiltrados = filtroCategoria
      ? productos.filter((producto) => producto.category === filtroCategoria)
      : productos;
    const comparador = ordenes[ordenarPor];
    return [...productosFiltrados].sort(comparador);
  }, [productos, ordenarPor, filtroCategoria]);

  return (
    <div className="listaproducto">
      <Filtro
        ordenarPor={ordenarPor}
        setOrdenarPor={setOrdenarPor}
        filtroCategoria={filtroCategoria}
        setFiltroCategoria={setFiltroCategoria}
        categorias={categorias}
        ordenes={ordenes}
      />
      <div className="productos-grid">
        {loading && <p>Cargando productos...</p>}
        {error && <p>Error: {error.message}</p>}
        <header className="listaproducto_encabezado">
          <h1>Nuestros productos</h1>
          <p>Encuentra lo que necesitas para tu hogar.</p>
        </header>
        {!loading &&
          !error &&
          (productosVisibles.length > 0 ? (
            productosVisibles.map((producto) => (
              <Producto
                key={producto.id}
                nombre={producto.title}
                precio={producto.price}
                imagen={producto.thumbnail}
                descripcion={producto.description}
                stock={producto.stock}
                categoria={producto.category}
              />
            ))
          ) : (
            <p>No hay productos en esta categoría.</p>
          ))}
      </div>
    </div>
  );
}
