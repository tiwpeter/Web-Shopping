"use client";

import { useState, useEffect } from "react";
import Toneimgmain from "./component/layout/tone-imgmain/page";
import Salepage from "./component/salePage/page";
import Categories from "./component/Category/page";
import Product from "./component/ProductAll/Add-more";

export default function Home() {
  return (
    <div>
      <Toneimgmain />

      <Categories />
    </div>
  );
}
