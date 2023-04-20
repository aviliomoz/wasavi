"use client";

import { useEffect } from "react";

// Components
import { Board } from "@/src/components/Board";
import { SupplyForm } from "@/src/components/SupplyForm";
import { useStorage } from "@/src/hooks/useStorage";

// Stores
import { useActiveStore } from "@/src/stores/activeStore";
import { useSuppliesStore } from "@/src/stores/suppliesStore";

export default function HomePage() {
  const { supplies } = useSuppliesStore();
  const { supplies: activeSupply } = useActiveStore();
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
        elements={[]}
        creator={<></>}
        editor={<></>}
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
