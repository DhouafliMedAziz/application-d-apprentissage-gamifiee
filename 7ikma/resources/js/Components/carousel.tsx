"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import {
ArrowLeft,
ArrowRight,X
} from "lucide-react";
import { cn } from "@/lib/utils";
import {  motion } from "motion/react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import Rate from "./rate";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}
interface ImageProps {
    height?:any,
    width?:any,
    src?:any,
    className?:any,
    alt?:any,
    fill?:any
}
type Card = {
  src: string;
  title: string;
  category: string;
  rate:number
  content: React.ReactNode;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384; // (md:w-96)
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full overflow-x-hidden">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-5 [scrollbar-width:none] md:py-10"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className={cn(
              "absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l",
            )}
          ></div>

          <div
            className={cn(
              "flex flex-row justify-start gap-4 pl-4",
              "mx-auto max-w-7xl", 
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                    once: true,
                  },
                }}
                key={"card" + index}
                className="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mr-10 flex justify-end gap-2">
          <button
            className="relative z-40 flex h-12 w-12 items-center justify-center rounded-xl bg-white disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            style={{border:"1px solid #151513"}}
          >
            <ArrowLeft className="h-6 w-6 text-[#131315]" />
          </button>
          <button
            className="relative z-40 flex h-12 w-12 items-center justify-center rounded-xl bg-white disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
            style={{border:"1px solid #151513"}}
          >
            <ArrowRight className="h-6 w-6 text-[#131315]" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose, currentIndex } = useContext(CarouselContext);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        style={{border:"1px solid #151513"}}
        className="relative  z-10 flex h-50 w-56 flex-col items-start p-8 pt-8 pr-8 justify-start overflow-hidden rounded-3xl bg-white md:h-[30rem] md:w-96 "
      >
      
        <BlurImage
          src={card.src}
          alt={card.title}
          fill
          className="absolute top-0  left-3 right-3  z-10 object-cover"
        />
          <div className="relative z-40">
         
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="mt-[90%] max-w-xs text-left  text-l  [text-wrap:balance] text-[#131315] md:text-3xl"
          >
            {card.title}
          </motion.p>
          <Rate absolute initialValue={card.rate
          } ></Rate>
          <button className="pixel-button px-4 py-2 mt-4  w-[20rem]  rounded-lg  flex !text-center !items-center " style={{opacity: 1, animation: "0.4s ease-out forwards scaleIn"}}>More Details </button>

        </div>
      </motion.button>
    </>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <img
      className={cn(
        "h-[65%] w-[22.5rem] transition duration-300 rounded-3xl",
        isLoading ? "blur-sm" : "blur-0",
        className,
      )}
      onLoad={() => setLoading(false)}
      src={src as string}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === "string" ? src : undefined}
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};
