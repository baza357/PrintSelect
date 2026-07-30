"use client";

import { useState } from "react";

import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";
import { Wholesale } from "@/components/home/Wholesale";
import { CategoryGrid } from "@/components/catalog/CategoryGrid";
import { Constructor } from "@/components/constructor/Constructor";

import { CartDrawer } from "@/components/cart/CartDrawer";
import { ProfileDrawer } from "@/components/account/ProfileDrawer";
import { FavoritesDrawer } from "@/components/favorites/FavoritesDrawer";


type Drawer =
  | "cart"
  | "favorites"
  | "profile"
  | null;


const scroll = (id: string) => {
  document
    .getElementById(id)
    ?.scrollIntoView({
      behavior: "smooth",
    });
};


export function Storefront() {

  const [drawer, setDrawer] =
    useState<Drawer>(null);


  const [cart, setCart] =
    useState(0);


  const [product, setProduct] =
    useState(
      "Оверсайз футболка"
    );


  const [color, setColor] =
    useState(
      "Чёрный"
    );


  const [side, setSide] =
    useState(
      "Спереди"
    );


  const [scale, setScale] =
    useState(100);



  return (
    <main>

      <Header
        cart={cart}
        setDrawer={setDrawer}
        scroll={scroll}
      />


      <Hero
        scroll={scroll}
      />


      <Wholesale />


      <CategoryGrid
        setProduct={setProduct}
        scroll={scroll}
      />


      <Constructor
        product={product}
        setProduct={setProduct}

        color={color}
        setColor={setColor}

        side={side}
        setSide={setSide}

        scale={scale}
        setScale={setScale}

        cart={cart}
        setCart={setCart}
      />



      {drawer === "cart" && (
        <CartDrawer
          cart={cart}
          product={product}
          setDrawer={setDrawer}
        />
      )}


      {drawer === "profile" && (
        <ProfileDrawer
          setDrawer={setDrawer}
        />
      )}


      {drawer === "favorites" && (
        <FavoritesDrawer
          setDrawer={setDrawer}
        />
      )}


    </main>
  );
}