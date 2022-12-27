interface Props {
  productID?: string;
}

export const RecipeBox = ({ productID }: Props) => {
  if (false) return <p>La receta esta vacia</p>;

  return (
    <div className="w-full flex flex-col items-end">
      <div className="w-full border p-2 rounded-md mb-4 mt-2">
        <table className="w-full text-center">
          <thead>
            <tr>
              <th>Ingrediente</th>
              <th>Tipo</th>
              <th>U.M.</th>
              <th>Cantidad</th>
              <th>Costo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Producto 1</td>
              <td>Producto</td>
              <td>Und.</td>
              <td>0.200</td>
              <td>S/. 4.20</td>
            </tr>
            <tr>
              <td>Producto 1</td>
              <td>Producto</td>
              <td>Und.</td>
              <td>0.200</td>
              <td>S/. 4.20</td>
            </tr>
            <tr>
              <td>Producto 1</td>
              <td>Producto</td>
              <td>Und.</td>
              <td>0.200</td>
              <td>S/. 4.20</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <p>
          <span>Costo de producción: </span>
          <strong>S/. 12.60</strong>
        </p>
      </div>
    </div>
  );
};
