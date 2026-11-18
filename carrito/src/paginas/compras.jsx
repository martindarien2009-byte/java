import "./compras.css";

export default function Compras({ productos }) {
  const total = productos.reduce(
    (acumulado, producto) => acumulado + producto.price * producto.cantidad,
    0,
  );

  return (
    <div className="compras">
      <h1>Compras</h1>
      {productos.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <ul className="compras_lista">
            {productos.map((producto) => (
              <li className="compras_producto" key={producto.id}>
                <img src={producto.thumbnail} alt="" />
                <div>
                  <h2>{producto.title}</h2>
                  <p>
                    {producto.cantidad} × ${producto.price.toFixed(2)}
                  </p>
                </div>
                <strong>
                  ${(producto.price * producto.cantidad).toFixed(2)}
                </strong>
              </li>
            ))}
          </ul>
          <p className="compras_total">Total: ${total.toFixed(2)}</p>
        </>
      )}
    </div>
  );
}
