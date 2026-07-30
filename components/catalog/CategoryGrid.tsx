"use client";

import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/catalog";

interface CategoryGridProps {
  setProduct: (product: string) => void;
  scroll: (id: string) => void;
}

export function CategoryGrid({
  setProduct,
  scroll,
}: CategoryGridProps) {
  return (
    <section className="catalog section" id="catalog">
      <div className="sectionHead">
        <div>
          <p className="eyebrow">
            КАТАЛОГ
          </p>

          <h2>
            Выбери основу
            <br />
            для своего дизайна
          </h2>
        </div>

        <button className="outline">
          Смотреть все категории <ArrowRight />
        </button>
      </div>

      <div className="categoryGrid">
        {categories.map(([name, price, type], i) => (
          <button
            className={`cat cat${i}`}
            key={type}
            onClick={() => {
              setProduct(
                name.replace("футболки", "футболка")
              );
              scroll("constructor");
            }}
          >
            <div className="mockShape">
              {type === "mug" ? "◯" : "✦"}
            </div>

            <strong>{name}</strong>

            <span>{price}</span>
          </button>
        ))}
      </div>
    </section>
  );
}