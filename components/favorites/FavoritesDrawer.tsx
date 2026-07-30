"use client";

import { Heart, X } from "lucide-react";

interface FavoritesDrawerProps {
  setDrawer: (value: null) => void;
}

export function FavoritesDrawer({
  setDrawer,
}: FavoritesDrawerProps) {
  return (
    <>
      <div
        className="overlay"
        onClick={() => setDrawer(null)}
      />

      <aside className="drawer">

        <button
          className="close"
          onClick={() => setDrawer(null)}
        >
          <X />
        </button>


        <p>
          Сохранённое
        </p>

        <h2>
          Избранное
        </h2>


        <div className="favoriteCard">

          <b>
            FLY
          </b>

          <div>

            <strong>
              Принт Born to Fly
            </strong>

            <span>
              Доступно для 5 товаров
            </span>

            <em>
              690 ₽
            </em>

          </div>

        </div>


        <div className="favoriteCard">

          <b>
            H#
          </b>

          <div>

            <strong>
              Коллекция HOBBY#
            </strong>

            <span>
              5 дизайнов в одном стиле
            </span>

            <em>
              от 1 490 ₽
            </em>

          </div>

        </div>


        <button className="primary wide">
          Добавить всё в корзину
        </button>

      </aside>
    </>
  );
}