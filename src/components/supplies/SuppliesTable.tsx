import { Link } from "react-router-dom";
import { getCurrencySymbol } from "../../functions/getCurrencySymbol";
import { getFullUM } from "../../functions/getfullUM";
import { useLocalData } from "../../hooks/useLocalData";
import { useSupplies } from "../../hooks/useSupplies";

export const SuppliesTable = () => {
  const { supplies, loading } = useSupplies();
  const { restaurant } = useLocalData();

  if (loading || !supplies || !restaurant) return <p>Cargando...</p>;

  return (
    <div className="table p-4 w-full bg-white rounded-sm border">
      <div className="table-header-group">
        <div className="table-row">
          <div className="table-cell font-semibold pb-4 pl-2 border-b">
            Nombre
          </div>
          <div className="table-cell font-semibold pb-4 pl-2 border-b">
            Categoría
          </div>
          <div className="table-cell font-semibold pb-4 pl-2 border-b">
            U.M.
          </div>
          <div className="table-cell font-semibold pb-4 pl-2 border-b">
            Precio
          </div>
          <div className="table-cell font-semibold pb-4 pl-2 border-b">
            Merma
          </div>
          <div className="table-cell font-semibold pb-4 pl-2 border-b">
            Impuestos
          </div>
          <div className="table-cell font-semibold pb-4 pl-2 border-b">
            Precio final
          </div>
          <div className="table-cell font-semibold pb-4 pl-2 border-b">
            Estado
          </div>
        </div>
      </div>
      <div className="table-row-group">
        {supplies.map((supply) => {
          return (
            <Link
              to={`/supplies/${supply.id}`}
              key={supply.id}
              className="table-row hover:bg-gray-50"
            >
              <div className="table-cell p-2 border-b max-w-xs truncate">
                {supply.name}
              </div>
              <div className="table-cell p-2 border-b">
                {supply.categories.name}
              </div>
              <div className="table-cell p-2 border-b">
                {getFullUM(supply.um)}
              </div>
              <div className="table-cell p-2 border-b">
                {getCurrencySymbol(restaurant.currency)}
                {supply.price.toFixed(2)}
              </div>
              <div className="table-cell p-2 border-b">{supply.waste}%</div>
              <div className="table-cell p-2 border-b">
                {supply.taxes_included ? `${restaurant.buy_taxes}%` : "-"}
              </div>
              <div className="table-cell p-2 border-b">
                {getCurrencySymbol(restaurant?.currency)}
                {supply.taxes_included
                  ? (
                      supply.price /
                      (1 - supply.waste / 100) /
                      (1 + restaurant.buy_taxes / 100)
                    ).toFixed(2)
                  : (supply.price / (1 - supply.waste / 100)).toFixed(2)}
              </div>
              <div className="table-cell p-2 border-b">
                {supply.status ? (
                  <p className="text-emerald-500">Activo</p>
                ) : (
                  <p className="text-rose-500">Inactivo</p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
