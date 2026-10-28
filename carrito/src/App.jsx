import Navegacion from "./componentes/navegacion.jsx";
import ListaProducto from "./paginas/listaproducto.jsx";

function App() {
  return (
    <div className="app">
      <Navegacion />
      <main className="contenido">
        <ListaProducto />
      </main>
    </div>
  );
}

export default App;
