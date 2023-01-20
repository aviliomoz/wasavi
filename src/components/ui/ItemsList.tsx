import { NavLink } from "react-router-dom";
import { useItems } from "../../hooks/useItems";

interface Props {
  type: "supplies" | "products";
}

export const ItemsList = ({ type }: Props) => {
  const { items, loading } = useItems(type);

  if (loading) return <span>Cargando...</span>;

  return (
    <div>
      {items.sort().map((item) => {
        return (
          <NavLink
            to={`/${type}/${item.id}`}
            key={item.id}
            className="group flex items-center cursor-pointer mb-2"
          >
            {({ isActive }) => {
              return (
                <>
                  <div
                    className={`h-2  rounded-sm group-hover:w-4 mr-2 transition-all ${
                      isActive ? "w-4 bg-emerald-500" : "w-2 bg-gray-300"
                    }`}
                  ></div>
                  <span className={`truncate ${isActive ? "font-medium" : ""}`}>
                    {item.name}
                  </span>
                </>
              );
            }}
          </NavLink>
        );
      })}
    </div>
  );
};
