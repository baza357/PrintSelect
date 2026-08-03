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

  useEffect(() => {
    let mounted = true;

    async function loadCurrentUser() {
      const {
        data: { user: currentUser },
        error,
      } = await supabase.auth.getUser();

      if (!mounted) {
        return;
      }

      if (error) {
        setMessage(error.message);
      }

      setUser(currentUser);

      if (currentUser) {
        await loadProfile(currentUser.id);
      }

      if (mounted) {
        setLoading(false);
      }
    }

    loadCurrentUser();

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
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

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

  async function register() {
    const cleanEmail = email.trim();
    const cleanName = name.trim();
    const cleanPhone = phone.trim();

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
        emailRedirectTo:
          typeof window !== "undefined"
            ? window.location.origin
            : undefined,
      },
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage(
      "Письмо подтверждения отправлено. Откройте его и подтвердите регистрацию.",
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
  }

  const displayName =
    profile?.name?.trim() ||
    user?.user_metadata?.name ||
    "Пользователь PrintSelect";

  const displayEmail =
    profile?.email?.trim() || user?.email || "Email не указан";

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
              <b>
                {displayName
                  .slice(0, 2)
                  .toUpperCase()}
              </b>

              <div>
                <strong>{displayName}</strong>