"use client";

import { X } from "lucide-react";

interface ProfileDrawerProps {
  setDrawer: (value: null) => void;
}

export function ProfileDrawer({
  setDrawer,
}: ProfileDrawerProps) {
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
          Ваше пространство
        </p>

        <h2>
          Личный кабинет
        </h2>


        <h3>
          Создайте аккаунт
        </h3>


        <span>
          Сохраняйте проекты и следите за статусом
          каждого заказа.
        </span>


        <form
          onSubmit={(e) => e.preventDefault()}
        >

          <label>
            Имя

            <input
              placeholder="Как к вам обращаться"
            />
          </label>


          <label>
            Телефон

            <input
              placeholder="+7 (___) ___-__-__"
            />
          </label>


          <label>
            Email

            <input
              type="email"
              placeholder="name@example.ru"
            />
          </label>


          <label>
            Пароль

            <input
              type="password"
              placeholder="Минимум 8 символов"
            />
          </label>


          <button
            className="primary wide"
            type="submit"
          >
            Создать личный кабинет
          </button>

        </form>

      </aside>
    </>
  );
}