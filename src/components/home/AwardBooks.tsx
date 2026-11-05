
"use client";
import { useEffect, useState } from "react";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  X,
} from "lucide-react";
import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";

type AwardBook = {
  id: number;
  title: string;
  author: string;
  award: string;
  year: string;
  isbn: string;
  description: string;
};


const awardBooks: AwardBook[] = [
  {
    id: 1,
    title: "The Goldfinch",
    author: "Donna Tartt",
    award: "Pulitzer Prize for Fiction",
    year: "2014",
    isbn: "9780316055437",
    description:
      "A remarkable coming-of-age story about loss, art, memory, and the unexpected turns of life. Through the journey of a young boy, the novel explores grief, identity, beauty, and the lasting influence of a single moment.",
  },
  {
    id: 2,
    title: "The Road",
    author: "Cormac McCarthy",
    award: "Pulitzer Prize for Fiction",
    year: "2007",
    isbn: "9780307387899",
    description:
      "A haunting journey through a devastated world, exploring love, survival, and the bond between a father and son. In a landscape stripped of civilization, their relationship becomes a powerful symbol of hope and humanity.",
  },
  {
    id: 3,
    title: "The Overstory",
    author: "Richard Powers",
    award: "Pulitzer Prize for Fiction",
    year: "2019",
    isbn: "9780393356687",
    description:
      "An ambitious novel connecting the lives of people with the extraordinary world of trees and nature. Through multiple intertwined stories, it examines humanity's relationship with the natural world and the importance of protecting it.",
  },
  {
    id: 4,
    title: "The Night Watchman",
    author: "Louise Erdrich",
    award: "Pulitzer Prize for Fiction",
    year: "2021",
    isbn: "9780062671189",
    description:
      "Inspired by the life of the author's grandfather, this powerful story follows a community's fight against legislation threatening its identity, land, and future. A moving exploration of resistance, family, and cultural heritage.",
  },
  {
    id: 5,
    title: "The Remains of the Day",
    author: "Kazuo Ishiguro",
    award: "The Booker Prize",
    year: "1989",
    isbn: "9780571258246",
    description:
      "A deeply moving novel about memory, loyalty, regret, and the things left unsaid. Through an English butler reflecting on his past, the story explores duty, emotional restraint, and the cost of a life devoted entirely to service.",
  },
  {
    id: 6,
    title: "The God of Small Things",
    author: "Arundhati Roy",
    award: "The Booker Prize",
    year: "1997",
    isbn: "9780812979657",
    description:
      "A beautifully written family story set in Kerala, India. Through childhood memories and family tragedy, the novel explores forbidden love, social boundaries, inequality, and the lasting consequences of the smallest moments.",
  },
  {
    id: 7,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    award: "Pulitzer Prize for Fiction",
    year: "1961",
    isbn: "9780061120084",
    description:
      "Told through the eyes of a young girl in the American South, this timeless novel examines racial injustice, moral courage, compassion, and childhood innocence. Its central characters challenge readers to understand fairness and humanity.",
  },
  {
    id: 8,
    title: "The Old Man and the Sea",
    author: "Ernest Hemingway",
    award: "Pulitzer Prize for Fiction",
    year: "1953",
    isbn: "9780684801223",
    description:
      "An aging Cuban fisherman struggles against a giant marlin far out at sea. This concise but powerful story explores perseverance, dignity, isolation, and the human spirit's determination in the face of overwhelming challenges.",
  },
  {
    id: 9,
    title: "Beloved",
    author: "Toni Morrison",
    award: "Pulitzer Prize for Fiction",
    year: "1988",
    isbn: "9781400033416",
    description:
      "A profound and emotionally powerful novel about the lasting trauma of slavery. Through memory, family, motherhood, and the supernatural, Morrison explores the painful relationship between personal history and collective memory.",
  },
  {
    id: 10,
    title: "The Brief Wondrous Life of Oscar Wao",
    author: "Junot Díaz",
    award: "Pulitzer Prize for Fiction",
    year: "2008",
    isbn: "9781594489587",
    description:
      "The story follows Oscar, a young Dominican American who dreams of love, romance, and becoming a writer. Blending humor, history, family struggles, and cultural identity, the novel examines generations of dreams and inherited trauma.",
  },
  {
    id: 11,
    title: "A Visit from the Goon Squad",
    author: "Jennifer Egan",
    award: "Pulitzer Prize for Fiction",
    year: "2011",
    isbn: "9780307477477",
    description:
      "An inventive collection of interconnected stories about music, ambition, aging, and the passage of time. Its unusual structure connects the lives of different characters across decades, revealing how relationships and technology shape modern life.",
  },
  {
    id: 12,
    title: "The Sympathizer",
    author: "Viet Thanh Nguyen",
    award: "Pulitzer Prize for Fiction",
    year: "2016",
    isbn: "9780802124944",
    description:
      "A gripping literary thriller about a double agent navigating the aftermath of the Vietnam War. The novel explores divided identity, political loyalty, exile, and the complicated experience of living between two worlds.",
  },
  {
    id: 13,
    title: "The Nickel Boys",
    author: "Colson Whitehead",
    award: "Pulitzer Prize for Fiction",
    year: "2020",
    isbn: "9780345804341",
    description:
      "Inspired by real events, this moving novel follows two boys at a brutal reform school in Florida. It examines institutional injustice, friendship, survival, and the devastating consequences of racism.",
  },
  {
    id: 14,
    title: "Demon Copperhead",
    author: "Barbara Kingsolver",
    award: "Pulitzer Prize for Fiction",
    year: "2023",
    isbn: "9780063251922",
    description:
      "A modern reimagining of a classic coming-of-age story set in the Appalachian mountains. It follows a young boy confronting poverty, addiction, foster care, and social inequality while searching for belonging and a better future.",
  },
  {
    id: 15,
    title: "The English Patient",
    author: "Michael Ondaatje",
    award: "The Booker Prize",
    year: "1992",
    isbn: "9780679736041",
    description:
      "Set near the end of World War II, this lyrical novel brings together four damaged lives in an abandoned Italian villa. It explores love, identity, war, memory, and the fragile connections that survive extraordinary suffering.",
  },
  {
    id: 16,
    title: "Life of Pi",
    author: "Yann Martel",
    award: "The Booker Prize",
    year: "2002",
    isbn: "9780156027328",
    description:
      "After a shipwreck, a young Indian boy finds himself stranded on a lifeboat with a Bengal tiger. This extraordinary adventure explores faith, storytelling, survival, imagination, and the mysteries of human belief.",
  },
  {
    id: 17,
    title: "The White Tiger",
    author: "Aravind Adiga",
    award: "The Booker Prize",
    year: "2008",
    isbn: "9781416562603",
    description:
      "Through a series of letters, an ambitious man from rural India describes his journey from poverty to wealth. The novel offers a sharp examination of class divisions, corruption, ambition, and modern Indian society.",
  },
  {
    id: 18,
    title: "The Sense of an Ending",
    author: "Julian Barnes",
    award: "The Booker Prize",
    year: "2011",
    isbn: "9780307947727",
    description:
      "A reflective novel about memory, responsibility, and the unreliability of personal history. When an unexpected inheritance brings the past back into focus, a retired man begins questioning everything he thought he remembered.",
  },
  {
    id: 19,
    title: "The Luminaries",
    author: "Eleanor Catton",
    award: "The Booker Prize",
    year: "2013",
    isbn: "9780316074312",
    description:
      "Set during the nineteenth-century New Zealand gold rush, this intricate mystery follows a group of strangers connected by a series of strange events. It combines suspense, astrology, secrets, and complex human relationships.",
  },
  {
    id: 20,
    title: "The Sellout",
    author: "Paul Beatty",
    award: "The Booker Prize",
    year: "2016",
    isbn: "9780812976525",
    description:
      "A provocative and satirical novel that challenges assumptions about race, identity, and American society. Through sharp humor and an unconventional narrative, it examines discrimination, history, and the contradictions of modern culture.",
  },
  {
    id: 21,
    title: "Shuggie Bain",
    author: "Douglas Stuart",
    award: "The Booker Prize",
    year: "2020",
    isbn: "9780802148506",
    description:
      "Set in working-class Glasgow during the 1980s, this deeply emotional novel follows a young boy growing up with a mother struggling with addiction. It explores family loyalty, poverty, childhood, and unconditional love.",
  },
  {
    id: 22,
    title: "The Seven Moons of Maali Almeida",
    author: "Shehan Karunatilaka",
    award: "The Booker Prize",
    year: "2022",
    isbn: "9781644450862",
    description:
      "A photographer finds himself in an afterlife where he has a limited time to uncover the truth about his death. Blending dark humor, mystery, and political history, the novel explores memory, violence, and the consequences of war.",
  },
  {
    id: 23,
    title: "The Vegetarian",
    author: "Han Kang",
    award: "International Booker Prize",
    year: "2016",
    isbn: "9781101906118",
    description:
      "A woman's decision to stop eating meat becomes the beginning of a dramatic transformation that unsettles her family and society. This unsettling novel explores autonomy, identity, repression, and the limits of social expectations.",
  },
  {
    id: 24,
    title: "Flights",
    author: "Olga Tokarczuk",
    award: "International Booker Prize",
    year: "2018",
    isbn: "9781910695823",
    description:
      "A fascinating collection of interconnected reflections and stories about travel, movement, the human body, and mortality. Through fragmented narratives, the novel examines the desire to explore and the strange experience of belonging nowhere.",
  },
];



function Book3D({
  book,
  large = false,
}: {
  book: AwardBook;
  large?: boolean;
}) {
  const [coverUrl, setCoverUrl] = useState(
    `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg?default=false`
  );
  const [coverFailed, setCoverFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    setCoverUrl(
      `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg?default=false`
    );
    setCoverFailed(false);

    const loadAlternativeCover = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=isbn:${encodeURIComponent(book.isbn)}`
        );

        if (!response.ok) {
          throw new Error("Google Books request failed");
        }

        const data = await response.json();

        const image =
          data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail ||
          data.items?.[0]?.volumeInfo?.imageLinks?.smallThumbnail;

        if (!cancelled && image) {
          setCoverUrl(image.replace(/^http:/, "https:"));
          setCoverFailed(false);
        } else if (!cancelled) {
          setCoverFailed(true);
        }
      } catch {
        if (!cancelled) {
          setCoverFailed(true);
        }
      }
    };

    return () => {
      cancelled = true;
    };
  }, [book.isbn]);

  const handleCoverError = () => {
    if (coverUrl.includes("covers.openlibrary.org")) {
      setCoverUrl(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${encodeURIComponent(book.isbn)}`
      );
    } else {
      setCoverFailed(true);
    }
  };

  const [googleTried, setGoogleTried] = useState(false);

  const handleImageError = async () => {
    if (!googleTried) {
      setGoogleTried(true);

      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=isbn:${encodeURIComponent(book.isbn)}`
        );

        const data = await response.json();

        const image =
          data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail ||
          data.items?.[0]?.volumeInfo?.imageLinks?.smallThumbnail;

        if (image) {
          setCoverUrl(image.replace(/^http:/, "https:"));
          return;
        }
      } catch {
        // Use the designed fallback below.
      }
    }

    setCoverFailed(true);
  };

  return (
    <div
      className={`book-3d-scene relative mx-auto ${
        large ? "w-[230px] sm:w-[280px]" : "w-[190px] sm:w-[220px]"
      }`}
    >
      <motion.div
        className="book-3d relative aspect-[2/3] w-full"
        whileHover={
          large
            ? undefined
            : {
                rotateY: -13,
                rotateX: 4,
                y: -12,
                scale: 1.04,
              }
        }
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
      >
        <div className="book-spine absolute inset-y-0 left-0 z-10 w-[13px] bg-[#17120D]/70" />

        <div className="absolute inset-0 overflow-hidden bg-[#702C3B] shadow-2xl">
          {!coverFailed ? (
            <Image
              src={coverUrl}
              alt={`Cover of ${book.title}`}
              fill
              unoptimized
              sizes="300px"
              onError={handleImageError}
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-between border-[7px] border-[#C49A45] bg-[#702C3B] px-4 py-7 text-center">
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#E4C98C]">
                BookNook Classics
              </span>

              <div>
                <div className="mx-auto mb-4 h-px w-12 bg-[#C49A45]" />
                <h3 className="font-[var(--font-playfair)] text-2xl font-semibold leading-tight text-[#F8F1E5]">
                  {book.title}
                </h3>
                <p className="mt-3 text-xs text-[#E4C98C]">
                  {book.author}
                </p>
              </div>

              <span className="text-[9px] uppercase tracking-[0.2em] text-[#E4C98C]">
                {book.year}
              </span>
            </div>
          )}
        </div>

        <div className="book-pages absolute -right-[5px] top-[3px] h-[98%] w-[7px] bg-[#F8F1E5] shadow-md" />

        <div className="book-cover-shine pointer-events-none absolute inset-0 z-20" />
      </motion.div>

      {!large && (
        <div className="book-shadow mx-auto mt-5 h-5 w-[75%] rounded-[50%] bg-[#17120D]/25 blur-md" />
      )}
    </div>
  );
}


export default function AwardBooks() {
  const [selectedBook, setSelectedBook] = useState<AwardBook | null>(null);

  return (
    <section className="relative overflow-hidden bg-[#F8F1E5] py-24 md:py-32">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full border border-[#C49A45]/20" />
      <div className="pointer-events-none absolute -left-24 top-36 h-[280px] w-[280px] rounded-full border border-[#C49A45]/20" />

      <div className="container-custom relative z-10">
        {/* Heading */}
        <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <Award size={17} className="text-[#9A7950]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#9A7950]">
                Recognised. Remembered. Remarkable.
              </span>
            </div>

            <h2 className="font-[var(--font-playfair)] text-4xl font-medium leading-tight tracking-tight text-[#17120D] md:text-6xl">
              Stories that earned
              <span className="block italic text-[#702C3B]">
                their place in history.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-8 text-[#81796E]">
              Discover celebrated works recognised by some of the world's
              most respected literary awards. Each book has a story worth
              exploring.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              aria-label="Previous award-winning book"
              className="award-prev flex h-12 w-12 items-center justify-center border border-[#C49A45] text-[#702C3B] transition-all hover:bg-[#702C3B] hover:text-[#F8F1E5]"
            >
              <ArrowLeft size={19} />
            </button>
            <button
              aria-label="Next award-winning book"
              className="award-next flex h-12 w-12 items-center justify-center border border-[#C49A45] text-[#702C3B] transition-all hover:bg-[#702C3B] hover:text-[#F8F1E5]"
            >
              <ArrowRight size={19} />
            </button>
          </div>
        </div>

        {/* 3D Carousel */}
        <div className="award-carousel-wrap relative py-8">
          <Swiper
            modules={[Autoplay, EffectCoverflow, Navigation]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            loop
            speed={850}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              prevEl: ".award-prev",
              nextEl: ".award-next",
            }}
            coverflowEffect={{
              rotate: 9,
              stretch: 0,
              depth: 180,
              modifier: 1.4,
              slideShadows: false,
            }}
            className="award-books-swiper !overflow-visible"
          >
            {awardBooks.map((book) => (
              <SwiperSlide
                key={book.id}
                className="!w-[230px] sm:!w-[260px]"
              >
                <motion.button
                  type="button"
                  onClick={() => setSelectedBook(book)}
                  whileTap={{ scale: 0.96 }}
                  className="group flex w-full flex-col items-center text-center outline-none"
                  aria-label={`View ${book.title} in detail`}
                >
                  <Book3D book={book} />

                  <div className="mt-5 max-w-[220px]">
                    <span className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#9A7950]">
                      <Award size={12} />
                      {book.award}
                    </span>

                    <h3 className="mt-3 font-[var(--font-playfair)] text-2xl font-semibold text-[#17120D] transition-colors group-hover:text-[#702C3B]">
                      {book.title}
                    </h3>

                    <p className="mt-1 text-xs text-[#81796E]">
                      {book.author}
                    </p>

                    <span className="mt-3 inline-block border-b border-[#C49A45] pb-1 text-[10px] uppercase tracking-[0.16em] text-[#702C3B]">
                      Explore the book
                    </span>
                  </div>
                </motion.button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#E6DED1] pt-7 text-center sm:flex-row sm:text-left">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#81796E]">
            A collection of literary award winners
          </p>
          <p className="text-xs text-[#9A7950]">
            Select a book to experience the details
          </p>
        </div>
      </div>

      {/* 3D Book Detail Modal */}
      <AnimatePresence>
        {selectedBook && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#17120D]/90 px-4 py-10 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBook(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedBook.title} details`}
              initial={{
                opacity: 0,
                scale: 0.72,
                rotateX: 12,
                y: 50,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateX: 0,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.82,
                y: 30,
              }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 20,
              }}
              onClick={(event) => event.stopPropagation()}
              className="relative my-auto w-full max-w-4xl border border-[#C49A45]/40 bg-[#F8F1E5] p-7 shadow-2xl sm:p-12"
            >
              <button
                onClick={() => setSelectedBook(null)}
                aria-label="Close book details"
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center border border-[#E6DED1] text-[#702C3B] transition-colors hover:bg-[#702C3B] hover:text-[#F8F1E5]"
              >
                <X size={19} />
              </button>

              <div className="grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr]">
                <motion.div
                  initial={{ opacity: 0, rotateY: -25, x: -30 }}
                  animate={{ opacity: 1, rotateY: 0, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                  className="py-5"
                  style={{ perspective: 1200 }}
                >
                  <Book3D book={selectedBook} large />
                  <p className="mt-8 text-center text-[10px] uppercase tracking-[0.25em] text-[#9A7950]">
                    A closer look
                  </p>
                </motion.div>

                <div className="pt-4 md:pt-0">
                  <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9A7950]">
                    <Award size={15} />
                    Award winner · {selectedBook.year}
                  </span>

                  <h3 className="mt-5 font-[var(--font-playfair)] text-4xl font-medium leading-tight text-[#17120D] sm:text-5xl">
                    {selectedBook.title}
                  </h3>

                  <p className="mt-3 text-sm text-[#702C3B]">
                    By {selectedBook.author}
                  </p>

                  <div className="my-7 h-px w-20 bg-[#C49A45]" />

                  <p className="text-sm leading-8 text-[#655D53]">
                    {selectedBook.description}
                  </p>

                  <div className="mt-8 border border-[#E6DED1] bg-[#FFFDF9] p-5">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#9A7950]">
                      Literary recognition
                    </span>
                    <p className="mt-2 font-[var(--font-playfair)] text-xl text-[#17120D]">
                      {selectedBook.award}
                    </p>
                    <p className="mt-1 text-xs text-[#81796E]">
                      Winner · {selectedBook.year}
                    </p>
                  </div>

                  <p className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-[#81796E]">
                    <BookOpen size={14} />
                    Discover more remarkable stories
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
