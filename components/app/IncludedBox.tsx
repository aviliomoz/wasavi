interface Props {
  supplyID?: string;
}

export const IncludedBox = ({ supplyID }: Props) => {
  if (false)
    return <p>Este insumo no esta siendo utilizado en ninguna receta</p>;

  return (
    <div className="w-full flex flex-col items-end">
      <div className="w-full border p-2 rounded-md mb-4 mt-2">
        <table className="w-full text-center">
          <thead>
            <tr>
              <th>Producto</th>
              <th>U.M.</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Producto 1</td>
              <td>Kg.</td>
              <td>0.200</td>
            </tr>
            <tr>
              <td>Producto 1</td>
              <td>Kg.</td>
              <td>0.200</td>
            </tr>
            <tr>
              <td>Producto 1</td>
              <td>Kg.</td>
              <td>0.200</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
