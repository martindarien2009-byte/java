export default function Filtro({
  ordenarPor,
  setOrdenarPor,
  filtroCategoria,
  setFiltroCategoria,
  categorias,
  ordenes,
}) {
  const handleOrdenarPorChange = (event) => {
    setOrdenarPor(event.target.value);
  };

  const handleFiltroCategoriaChange = (event) => {
    setFiltroCategoria(event.target.value);
  };

  return (
    <div className="filtro-orden">
      <label htmlFor="ordenar-por">Ordenar por:</label>
      <select
        id="ordenar-por"
        value={ordenarPor}
        onChange={handleOrdenarPorChange}
      >
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
              : categoria === "fragrances"
                ? "Fragancias"
                : categoria.replaceAll("-", " ")}
          </option>
        ))}
      </select>
    </div>
  );
}
