"use client";

import Image from "next/image";
import {
  ShoppingBag,
  X,
} from "lucide-react";

interface CartDrawerProps {
  cart: number;
  product: string;
  setDrawer: (value: null) => void;
}

export function CartDrawer({
  cart,
  product,
  setDrawer,
}: CartDrawerProps) {

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
          Ваш заказ
        </p>

        <h2>
          Корзина
        </h2>


        {cart ? (

          <>
            <div className="cartItem">

              <Image
                src="/assets/tshirts/tshirt-black-front.png"
                alt="Товар"
                width={92}
                height={92}
              />

              <div>

                <strong>
                  {product}
                </strong>

                <span>
                  Чёрная · FPV
                </span>

                <b>
                  2 690 ₽ × {cart}
                </b>

              </div>

            </div>


            <div className="drawerTotal">

              <span>
                Итого
              </span>

              <strong>
                {(2690 * cart).toLocaleString(
                  "ru-RU"
                )} ₽
              </strong>

            </div>


            <button className="primary wide">
              Оформить заказ
            </button>

          </>


        ) : (

          <div className="empty">

            <ShoppingBag />

            <strong>
              Корзина пока пуста
            </strong>

            <span>
              Создайте принт в конструкторе
              и добавьте товар.
            </span>

          </div>

        )}

      </aside>
    </>
  );
}