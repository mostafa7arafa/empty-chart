"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice, getTimeRemaining } from "@/lib/utils";

interface CountdownDealProps {
  product: {
    id: string;
    name: string;
    slug: string;
    image: string;
    originalPrice: number;
    dealPrice: number;
    brand: string;
  };
  endDate: string;
  stock: number;
  sold: number;
}

export function CountdownDeal({ product, endDate, stock, sold }: CountdownDealProps) {
  const [time, setTime] = useState(getTimeRemaining(new Date(endDate)));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTimeRemaining(new Date(endDate)));
    }, 1000);
    return () => clearInterval(timer);
  }, [endDate]);

  if (time.total <= 0) return null;

  const progress = stock > 0 ? (sold / (stock + sold)) * 100 : 100;
  const discount = Math.round(((product.originalPrice - product.dealPrice) / product.originalPrice) * 100);

  return (
    <Link href={`/products/${product.slug}`} className="bg-white rounded-2xl overflow-hidden group hover:shadow-xl transition-all">
      <div className="relative aspect-square">
        <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform" sizes="(max-width: 640px) 100vw, 25vw" />
        <span className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
          -{discount}%
        </span>
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500">{product.brand}</p>
        <h3 className="font-medium text-sm text-navy-900 mt-1 line-clamp-2">{product.name}</h3>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="font-bold text-lg text-red-600">{formatPrice(product.dealPrice)}</span>
          <span className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
        </div>
        {/* Countdown */}
        <div className="flex gap-1 mt-3">
          {[
            { val: time.days, label: "D" },
            { val: time.hours, label: "H" },
            { val: time.minutes, label: "M" },
            { val: time.seconds, label: "S" },
          ].map((t) => (
            <div key={t.label} className="flex-1 bg-navy-900 text-white rounded-lg py-1 text-center">
              <span className="text-sm font-bold">{String(t.val).padStart(2, "0")}</span>
              <span className="text-[8px] block text-gray-400">{t.label}</span>
            </div>
          ))}
        </div>
        {/* Stock bar */}
        <div className="mt-2">
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-red-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-[10px] text-gray-500 mt-1">{sold} sold / {stock} left</p>
        </div>
      </div>
    </Link>
  );
}
