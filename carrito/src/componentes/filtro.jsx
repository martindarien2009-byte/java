import "./filtro.css";
import { useEffect, useMemo, useState } from "react";

const ordenes = {
  nombre: (a, b) => a.title.localeCompare(b.title),
  precio: (a, b) => a.price - b.price,
  stock: (a, b) => a.stock - b.stock,
};

export default function Filtro({ productos, setProductosFiltrados }) {
  const [ordenarPor, setOrdenarPor] = useState("nombre");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroPrecioMinimo, setFiltroPrecioMinimo] = useState("");
  const [filtroPrecioMaximo, setFiltroPrecioMaximo] = useState("");
  const [filtroStock, setFiltroStock] = useState("");
  const categorias = useMemo(
    () =>
      [...new Set(productos.map((producto) => producto.category))].sort(
        (a, b) => a.localeCompare(b),
      ),
    [productos],
  );

  const handleFiltroPrecioMinimoChange = (event) => {
    setFiltroPrecioMinimo(event.target.value);
  };

  const handleFiltroPrecioMaximoChange = (event) => {
    setFiltroPrecioMaximo(event.target.value);
  };

  const handleFiltroStockChange = (event) => {
    setFiltroStock(event.target.value);
  };

  const handleOrdenarPorChange = (event) => {
    setOrdenarPor(event.target.value);
  };

  const handleFiltroCategoriaChange = (event) => {
    setFiltroCategoria(event.target.value);
  };

  const productosVisibles = useMemo(() => {
    const productosFiltrados = filtroCategoria
      ? productos.filter((producto) => producto.category === filtroCategoria)
      : productos;
    const comparador = ordenes[ordenarPor] ?? ordenes.nombre;
    const precioMinimo =
      filtroPrecioMinimo === "" ? null : Number(filtroPrecioMinimo);
    const precioMaximo =
      filtroPrecioMaximo === "" ? null : Number(filtroPrecioMaximo);

    return productosFiltrados
      .filter((producto) => {
        if (precioMinimo !== null && Number.isFinite(precioMinimo) &&
            producto.price < precioMinimo) {
          return false;
        }
        if (precioMaximo !== null && Number.isFinite(precioMaximo) &&
            producto.price > precioMaximo) {
          return false;
        }
        if (filtroStock === "0" && producto.stock > 0) return false;
        if (filtroStock === "1" && producto.stock <= 0) return false;
        return true;
      })
      .sort(comparador);
  }, [
    productos,
    ordenarPor,
    filtroCategoria,
    filtroPrecioMinimo,
    filtroPrecioMaximo,
    filtroStock,
  ]);

  useEffect(() => {
    setProductosFiltrados(productosVisibles);
  }, [productosVisibles, setProductosFiltrados]);

  return (
    <div className="filtro-orden">
      <label htmlFor="ordenar">Ordenar por:</label>
      <select id="ordenar" value={ordenarPor} onChange={handleOrdenarPorChange}>
        {Array.from(Object.keys(ordenes)).map((orden) => (
          <option key={orden} value={orden}>
            {orden === "nombre"
              ? "Nombre"
              : orden === "precio"
                ? "Precio"
                : "Stock"}
          </option>
        ))}
      </select>
      <div className="filtro">
        {/* filtro por categoria */}
        <label htmlFor="filtro-categoria">Filtrar por categoría:</label>
        <select
          id="filtro-categoria"
          value={filtroCategoria}
          onChange={handleFiltroCategoriaChange}
        >
          <option value="">Todas las categorías</option>
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria === "beauty"
                ? "Belleza y maquillaje"
                : categoria.charAt(0).toUpperCase() +
                  categoria.slice(1).replaceAll("-", " ")}
            </option>
          ))}
        </select>
        {/* filtro por precio */}
        <label htmlFor="filtro-precio-minimo">Precio mínimo:</label>
        <input
          type="number"
          id="filtro-precio-minimo"
          min="0"
          placeholder="Precio mínimo"
          value={filtroPrecioMinimo}
          onChange={handleFiltroPrecioMinimoChange}
        />
        <label htmlFor="filtro-precio-maximo">Precio máximo:</label>
        <input
          type="number"
          id="filtro-precio-maximo"
          min="0"
          placeholder="Precio máximo"
          value={filtroPrecioMaximo}
          onChange={handleFiltroPrecioMaximoChange}
        />
      </div>
      <div className="filtro">
        {/* filtro por stock */}
        <label htmlFor="filtro-stock">Filtrar por stock:</label>
        <select
          id="filtro-stock"
          value={filtroStock}
          onChange={handleFiltroStockChange}
        >
          <option value="">Todos los stocks</option>
          <option value="0">Sin stock</option>
          <option value="1">Con stock</option>
        </select>
      </div>
    </div>
  );
}
