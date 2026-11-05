
"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

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
    img: "https://images.unsplash.com/photo-1544716278-ca5e3f4ebdbc?auto=format&fit=crop&w=2000&q=85",
  },
];

export default function HeroSlider() {
  return (
    <section>
      <Swiper
        modules={[Autoplay, Pagination]}
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        className="hero-swiper"
      >
        {slides.map((s) => (
          <SwiperSlide key={s.title}>
            <div
              className="hero-slide"
              style={{
                backgroundImage: `
                  linear-gradient(
                    90deg,
                    rgba(5,10,24,0.92) 0%,
                    rgba(5,10,24,0.72) 45%,
                    rgba(5,10,24,0.30) 100%
                  ),
                  url("${s.img}")
                `,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="container-x py-16">
                <h1 className="section-title hero-title !text-[clamp(2.4rem,6vw,4rem)]">
                  {s.title}
                </h1>

                <p className="hero-text">{s.text}</p>

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
