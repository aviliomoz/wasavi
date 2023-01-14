import { useForm } from "../../hooks/useForm";

export const SupplyCreator = () => {
  const { formData, handleInputChange } = useForm({
    name: "",
    category: "",
    um: "",
    price: 0,
    waste: 0,
    taxes_included: true,
  });

  return (
    <form className="flex flex-col space-y-3">
      <label className="flex items-center">
        <span>Nombre:</span>
        <input
          type={"text"}
          className="form-input ml-4 focus:ring-0 rounded-md border-gray-200 w-8/12 h-8"
        />
      </label>
      <label className="flex items-center">
        <span>Categoría:</span>
        <select className="form-input ml-4 focus:ring-0 rounded-md border-gray-200 w-52 h-8" />
      </label>
      <label className="flex items-center">
        <span>Unidad de medida:</span>
        <select className="form-input ml-4 focus:ring-0 rounded-md border-gray-200 w-52 h-8" />
      </label>
      <label className="flex items-center">
        <span>Precio de compra:</span>
        <span className="ml-4">S/.</span>
        <input
          type={"number"}
          className="form-input ml-2 focus:ring-0 rounded-md border-gray-200 w-24 h-8"
        />
      </label>
      <label className="flex items-center">
        <span>Merma:</span>
        <input
          type={"number"}
          className="form-input ml-4 focus:ring-0 rounded-md border-gray-200 w-24 h-8"
        />
        <span className="ml-2">%</span>
      </label>
      <label className="flex items-center">
        <span>Afecto a impuestos:</span>
        <select className="form-input ml-4 focus:ring-0 rounded-md border-gray-200 w-20 h-10">
          <option>Sí</option>
          <option>No</option>
        </select>
      </label>
    </form>
  );
};
