"use client";

import { useEffect } from "react";

// Components
import { Board } from "@/src/components/Board";
import { SupplyForm } from "@/src/components/SupplyForm";

// Stores
import { useActiveStore } from "@/src/stores/activeStore";
import { useSuppliesStore } from "@/src/stores/suppliesStore";

// Hoolk
import { useStorage } from "@/src/hooks/useStorage";
import { useSubproductsStore } from "@/src/stores/subproductsStore";
import { SubproductForm } from "@/src/components/SubproductsForm";

export default function HomePage() {
  const { supplies } = useSuppliesStore();
  const { subproducts } = useSubproductsStore();
  const { supplies: activeSupply, subproducts: activeSubproduct } =
    useActiveStore();
  const { loadData } = useStorage();

  useEffect(() => {
    loadData();
  }, []);

  return (
    <section className="grid grid-flow-col grid-cols-3 gap-4">
      <Board
        target="products"
        title="Productos"
        elements={[]}
        creator={<></>}
        editor={<></>}
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
