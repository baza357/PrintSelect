"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import {
  FolderOpen,
  Heart,
  LogOut,
  PackageCheck,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";

interface ProfileDrawerProps {
  setDrawer: (value: null) => void;
}

interface Profile {
  id: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  created_at: string | null;
}

type AuthMode = "login" | "register";

export function ProfileDrawer({
  setDrawer,
}: ProfileDrawerProps) {
  const [mode, setMode] = useState<AuthMode>("login");

  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadProfile(userId: string) {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, name, phone, email, created_at")
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      setProfile(null);
      setMessage(`Не удалось загрузить профиль: ${error.message}`);
      return;
    }

    setProfile(data);
  }

  useEffect(() => {
    let active = true;

    async function loadCurrentUser() {
      const {
        data: { user: currentUser },
        error,
      } = await supabase.auth.getUser();

      if (!active) {
        return;
      }

      if (error) {
        setMessage(error.message);
      }

      setUser(currentUser);

      if (currentUser) {
        await loadProfile(currentUser.id);
      }

      if (active) {
        setLoading(false);
      }
    }

    void loadCurrentUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;

      setUser(currentUser);
      setMessage("");

      if (currentUser) {
        void loadProfile(currentUser.id);
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  async function register() {
    const cleanName = name.trim();
    const cleanPhone = phone.trim();
    const cleanEmail = email.trim();

    if (!cleanName) {
      setMessage("Введите имя.");
      return;
    }

    if (!cleanEmail) {
      setMessage("Введите email.");
      return;
    }

    if (password.length < 8) {
      setMessage("Пароль должен содержать минимум 8 символов.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        data: {
          name: cleanName,
          phone: cleanPhone,
        },
        emailRedirectTo: window.location.origin,
      },
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage(
      "Письмо подтверждения отправлено. Откройте почту и подтвердите регистрацию.",
    );
  }

  async function login() {
    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      setMessage("Введите email и пароль.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Вход выполнен.");
  }

  async function logout() {
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signOut();

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setUser(null);
    setProfile(null);
    setEmail("");
    setPassword("");
  }

  const displayName =
    profile?.name?.trim() ||
    user?.user_metadata?.name ||
    "Пользователь PrintSelect";

  const displayEmail =
    profile?.email?.trim() ||
    user?.email ||
    "Email не указан";

  const displayPhone =
    profile?.phone?.trim() ||
    user?.user_metadata?.phone ||
    "Телефон не указан";

  return (
    <>
      <div
        className="overlay"
        onClick={() => setDrawer(null)}
      />

      <aside className="drawer">
        <button
          className="close"
          type="button"
          aria-label="Закрыть личный кабинет"
          onClick={() => setDrawer(null)}
        >
          <X />
        </button>

        <p>Ваше пространство</p>

        <h2>Личный кабинет</h2>

        {loading && !user ? (
          <div className="empty">
            <UserRound />

            <strong>Загружаем аккаунт</strong>

            <span>Подождите несколько секунд.</span>
          </div>
        ) : user ? (
          <>
            <div className="favoriteCard">
              <b>{displayName.slice(0, 2).toUpperCase()}</b>

              <div>
                <strong>{displayName}</strong>

                <span>{displayEmail}</span>

                <em>{displayPhone}</em>
              </div>
            </div>

            <div className="optionList">
              <button type="button">
                <FolderOpen />
                <span>Мои проекты</span>
              </button>

              <button type="button">
                <ShoppingBag />
                <span>Корзина</span>
              </button>

              <button type="button">
                <Heart />
                <span>Избранное</span>
              </button>

              <button type="button">
                <PackageCheck />
                <span>Мои заказы</span>
              </button>
            </div>

            {message && (
              <p role="status">
                {message}
              </p>
            )}

            <button
              className="outline wide"
              type="button"
              disabled={loading}
              onClick={() => void logout()}
            >
              <LogOut />

              <span>
                {loading
                  ? "Выходим..."
                  : "Выйти из аккаунта"}
              </span>
            </button>
          </>
        ) : (
          <>
            <h3>
              {mode === "login"
                ? "Вход в аккаунт"
                : "Создайте аккаунт"}
            </h3>

            <span>
              Сохраняйте проекты, следите за заказами и
              продолжайте редактирование с любого устройства.
            </span>

            <form
              onSubmit={(event) => {
                event.preventDefault();

                if (mode === "login") {
                  void login();
                } else {
                  void register();
                }
              }}
            >
              {mode === "register" && (
                <>
                  <label>
                    Имя

                    <input
                      value={name}
                      onChange={(event) =>
                        setName(event.target.value)
                      }
                      placeholder="Как к вам обращаться"
                      autoComplete="name"
                      required
                    />
                  </label>

                  <label>
                    Телефон

                    <input
                      value={phone}
                      onChange={(event) =>
                        setPhone(event.target.value)
                      }
                      placeholder="+7 (___) ___-__-__"
                      autoComplete="tel"
                    />
                  </label>
                </>
              )}

              <label>
                Email

                <input
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  type="email"
                  placeholder="name@example.ru"
                  autoComplete="email"
                  required
                />
              </label>

              <label>
                Пароль

                <input
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  type="password"
                  placeholder="Минимум 8 символов"
                  autoComplete={
                    mode === "login"
                      ? "current-password"
                      : "new-password"
                  }
                  minLength={8}
                  required
                />
              </label>

              <button
                className="primary wide"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Подождите..."
                  : mode === "login"
                    ? "Войти"
                    : "Создать аккаунт"}
              </button>
            </form>

            <button
              className="textButton"
              type="button"
              onClick={() => {
                setMode(
                  mode === "login"
                    ? "register"
                    : "login",
                );

                setMessage("");
              }}
            >
              {mode === "login"
                ? "Нет аккаунта? Зарегистрироваться"
                : "Уже есть аккаунт? Войти"}
            </button>

            {message && (
              <p role="status">
                {message}
              </p>
            )}
          </>
        )}
      </aside>
    </>
  );
}