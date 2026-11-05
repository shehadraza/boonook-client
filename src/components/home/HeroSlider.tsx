
"use client";

import Link from "next/link";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    title: "Share the books on your shelf",
    text: "Add the books you have finished. Let other readers enjoy them too.",
    img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=2000&q=85",
  },
  {
    title: "Borrow a book for a few days",
    text: "Pick any book from the library and keep it with you for 14 days.",
    img: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=2000&q=85",
  },
  {
    title: "Return it when you are done",
    text: "See everything you borrowed in one place and give it back with one click.",
    img: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=2000&q=85",
  },
];

export default function HeroSlider() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="hero-section">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        loop
        speed={1000}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
          waitForTransition: true,
        }}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          swiper.autoplay.start();
        }}
        onInit={(swiper) => {
          swiper.autoplay.start();
        }}
        className="hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div className="hero-slide">
              <img
                src={slide.img}
                alt={slide.title}
                className="hero-background"
                loading="eager"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />

              <div className="hero-overlay" />

              <div className="container-x hero-content">
                <h1 className="section-title hero-title !text-[clamp(2.4rem,6vw,4rem)]">
                  {slide.title}
                </h1>

                <p className="hero-text">{slide.text}</p>

                <Link href="/books" className="btn btn-primary mt-8">
                  Browse Books
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
