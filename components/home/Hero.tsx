"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";

interface HeroProps {
  scroll: (id: string) => void;
}

export function Hero({ scroll }: HeroProps) {
  return (
    <section
      className="hero"
      aria-label="Твой принт. Твоя вещь. Наше исполнение."
    >
      <div className="heroCopy">
        <p className="eyebrow">
          ПРИНТ, КОТОРЫЙ СТАНОВИТСЯ ВЕЩЬЮ
        </p>

        <h1>
          Твой принт.
          <br />
          Твоя вещь.
          <br />
          Наше <span>исполнение.</span>
        </h1>

        <p className="lead">
          Загрузи изображение, настрой товар под себя —
          мы проверим макет, согласуем детали и доставим
          заказ по России.
        </p>

        <div className="cta">
          <button
            className="primary"
            onClick={() => scroll("constructor")}
          >
            <Sparkles />
            Создать свой дизайн
          </button>

          <button
            className="outline"
            onClick={() => scroll("collections")}
          >
            Выбрать готовый принт
          </button>
        </div>

        <button
          className="textButton"
          onClick={() => scroll("wholesale")}
        >
          Заказать оптом
        </button>

        <div className="trust">
          <span>● Проверка макета</span>
          <span>● Согласование заказа</span>
          <span>● Доставка по России</span>
        </div>
      </div>

      <div className="heroVisual">
        <Image
          src="/assets/hero-all-categories.png"
          alt="Одежда и аксессуары с авторскими принтами"
          fill
          priority
          sizes="(max-width: 800px) 100vw, 50vw"
        />

        <div className="price">
          от <strong>1 490 ₽</strong>
          <small>за готовую вещь</small>
        </div>
      </div>
    </section>
  );
}