"use client";

import { useEffect } from "react";

// Components
import { Board } from "@/src/components/Board";
import { SupplyForm } from "@/src/components/SupplyForm";
import { SubproductForm } from "@/src/components/SubproductForm";

// Stores
import { useActiveStore } from "@/src/stores/activeStore";
import { useSuppliesStore } from "@/src/stores/suppliesStore";
import { useSubproductsStore } from "@/src/stores/subproductsStore";

// Hooks
import { useStorage } from "@/src/hooks/useStorage";
import { useProductsStore } from "@/src/stores/productsStore";
import { ProductForm } from "@/src/components/ProductForm";

export default function HomePage() {
  const { supplies } = useSuppliesStore();
  const { subproducts } = useSubproductsStore();
  const { products } = useProductsStore();
  const {
    supplies: activeSupply,
    subproducts: activeSubproduct,
    products: activeProduct,
  } = useActiveStore();
  const { loadData } = useStorage();

  useEffect(() => {
    loadData();
  }, []);

  return (
    <section className="grid grid-flow-col grid-cols-3 gap-4">
      <Board
        target="products"
        title="Productos"
        elements={products}
        creator={<ProductForm />}
        editor={<ProductForm product={activeProduct} />}
      />
      <Board
        target="subproducts"
        title="Sub productos"
        elements={subproducts}
        creator={<SubproductForm />}
        editor={<SubproductForm subproduct={activeSubproduct} />}
      />
      <Board
        target="supplies"
        title="Insumos"
        elements={supplies}
        creator={<SupplyForm />}
        editor={<SupplyForm supply={activeSupply} />}
      />
    </section>
  );
}
