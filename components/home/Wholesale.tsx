"use client";

import { ArrowRight } from "lucide-react";

export function Wholesale() {
  const tiers = [
    [
      "20–49",
      "Пробная партия",
      "Проверим спрос без большого тиража",
    ],
    [
      "50–99",
      "Малый опт",
      "Для команд, студий и небольших событий",
    ],
    [
      "100–299",
      "Оптовая партия",
      "Согласуем образец и график производства",
    ],
    [
      "300+",
      "Спецусловия",
      "Разделим поставку и подберём производство",
    ],
  ];

  return (
    <section className="wholesale" id="wholesale">
      <div>
        <p className="eyebrow lime">
          ДЛЯ КОМАНД, БРЕНДОВ И МЕРОПРИЯТИЙ
        </p>

        <h2>
          Большая партия —
          <br />
          отдельный расчёт
        </h2>

        <p>
          От 20 единиц одного или нескольких товаров.
          Подберём способ печати, производителя,
          проверим макеты и согласуем образец
          перед запуском партии.
        </p>

        <ul>
          <li>Размерный ряд и разные цвета</li>
          <li>Один или несколько макетов</li>
          <li>Доставка одной или несколькими партиями</li>
        </ul>

        <button className="limeButton">
          Рассчитать оптовую партию
          <ArrowRight />
        </button>
      </div>

      <div className="tiers">
        {tiers.map((tier) => (
          <article key={tier[0]}>
            <strong>
              {tier[0]}
              <small> шт.</small>
            </strong>

            <div>
              <b>{tier[1]}</b>
              <span>{tier[2]}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}