"use client";

import { Heart, Search, UserRound, ShoppingBag } from "lucide-react";

type Drawer = "cart" | "favorites" | "profile" | null;

interface HeaderProps {
  cart: number;
  setDrawer: (drawer: Drawer) => void;
  scroll: (id: string) => void;
}

export function Header({ cart, setDrawer, scroll }: HeaderProps) {
  return (
    <header className="header">
      <a className="brand" href="#">
        <b>пс</b>
        <span>ПринтСелект</span>
      </a>

      <nav>
        <button onClick={() => scroll("catalog")}>
          Каталог⌄
        </button>

        <button onClick={() => scroll("constructor")}>
          Создать принт
        </button>

        <button onClick={() => scroll("collections")}>
          Готовые дизайны
        </button>

        <button onClick={() => scroll("wholesale")}>
          Оптовые партии
        </button>

        <button onClick={() => scroll("hobby")}>
          HOBBY# <i>NEW</i>
        </button>

        <button onClick={() => scroll("how")}>
          Как заказать
        </button>
      </nav>

      <div className="actions">

        <button aria-label="Поиск">
          <Search />
        </button>

        <button
          aria-label="Избранное"
          onClick={() => setDrawer("favorites")}
        >
          <Heart />
        </button>

        <button
          aria-label="Профиль"
          onClick={() => setDrawer("profile")}
        >
          <UserRound />
        </button>

        <button
          aria-label={`Корзина, товаров: ${cart}`}
          onClick={() => setDrawer("cart")}
        >
          <ShoppingBag />
          <em>{cart}</em>
        </button>

      </div>
    </header>
  );
}