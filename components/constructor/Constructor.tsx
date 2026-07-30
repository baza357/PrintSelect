"use client";

import Image from "next/image";
import {
  Upload,
  Shapes,
  Type,
  Minus,
  Plus,
  ShoppingBag,
} from "lucide-react";

interface ConstructorProps {
  product: string;
  setProduct: (value: string) => void;
  color: string;
  setColor: (value: string) => void;
  side: string;
  setSide: (value: string) => void;
  scale: number;
  setScale: (value: number) => void;
  setCart: (value: number) => void;
  cart: number;
}

export function Constructor({
  product,
  setProduct,
  color,
  setColor,
  side,
  setSide,
  scale,
  setScale,
  setCart,
  cart,
}: ConstructorProps) {
  const products = [
    "Оверсайз футболка",
    "Классическая футболка",
    "Худи",
    "Свитшот",
    "Шопер",
    "Кружка",
    "Чехол",
  ];

  const colors = [
    ["Чёрный", "#171419"],
    ["Белый", "#eee"],
    ["Графитовый", "#4b4a50"],
    ["Бежевый", "#d5c1a8"],
    ["Розовый", "#d38fa8"],
    ["Тёмно-синий", "#12203b"],
    ["Фиолетовый", "#6f2d91"],
  ];

  return (
    <section className="builder section" id="constructor">

      <p className="eyebrow">
        ОНЛАЙН-КОНСТРУКТОР
      </p>

      <h2>
        Собери вещь, которую хочется носить
      </h2>

      <p className="sectionIntro">
        Размести свой файл или выбери готовую основу.
        Макет сохраняется отдельно от избранного.
      </p>


      <div className="builderGrid">

        <aside className="tools">

          <div className="tabs">
            <button className="active">
              <Shapes />
              Товар
            </button>

            <button>
              <Upload />
              Фото
            </button>

            <button>
              <Type />
              Текст
            </button>
          </div>


          <h3>
            Выберите товар
          </h3>

          <div className="optionList">
            {products.map((item) => (
              <button
                key={item}
                className={
                  product === item
                    ? "selected"
                    : ""
                }
                onClick={() =>
                  setProduct(item)
                }
              >
                {item}
              </button>
            ))}
          </div>


          <h3>
            Цвет товара
          </h3>

          <div className="swatches">
            {colors.map(([name, value]) => (
              <button
                key={name}
                title={name}
                aria-label={name}
                className={
                  color === name
                    ? "picked"
                    : ""
                }
                style={{
                  background: value,
                }}
                onClick={() =>
                  setColor(name)
                }
              />
            ))}
          </div>


          <h3>
            Сторона печати
          </h3>

          <div className="segmented">

            <button
              className={
                side === "Спереди"
                  ? "selected"
                  : ""
              }
              onClick={() =>
                setSide("Спереди")
              }
            >
              Спереди
            </button>

            <button
              className={
                side === "Сзади"
                  ? "selected"
                  : ""
              }
              onClick={() =>
                setSide("Сзади")
              }
            >
              Сзади
            </button>

          </div>

        </aside>



        <div className="preview">

          <div className="previewLabel">
            {product} · {color} · {side}
          </div>


          <Image
            src="/assets/tshirts/tshirt-black-front.png"
            alt="Предпросмотр товара"
            width={700}
            height={700}
          />


          <div
            className="print"
            style={{
              transform:
                `translate(-50%,-50%) scale(${scale / 100})`,
            }}
          >
            <b>BORN</b>
            <span>TO</span>
            <b>FLY</b>
            <small>
              HOBBY# / FPV
            </small>
          </div>


          <div className="zoom">

            <button
              onClick={() =>
                setScale(
                  Math.max(60, scale - 10)
                )
              }
            >
              <Minus />
            </button>

            <b>
              {scale}%
            </b>

            <button
              onClick={() =>
                setScale(
                  Math.min(140, scale + 10)
                )
              }
            >
              <Plus />
            </button>

          </div>

        </div>



        <aside className="settings">

          <p>
            Настройка принта
          </p>


          <button className="upload">
            <Upload />
            Загрузить изображение
          </button>


          <button className="outline wide">
            Библиотека дизайнов
          </button>


          <div className="total">
            <span>
              Товар + печать
            </span>

            <strong>
              2 690 ₽
            </strong>

            <small>
              Точная стоимость подтвердится
              после проверки макета
            </small>
          </div>


          <button
            className="primary wide"
            onClick={() =>
              setCart(cart + 1)
            }
          >
            <ShoppingBag />
            Добавить в корзину
          </button>

        </aside>

      </div>

    </section>
  );
}