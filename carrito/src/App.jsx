import Navegacion from "./componentes/navegacion.jsx";
import ListaProducto from "./paginas/listaproducto.jsx";
function App() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "50px",
        }}
      >
        <Navegacion />
        <ListaProducto />
      </div>
    </>
  );
}

export default App;
