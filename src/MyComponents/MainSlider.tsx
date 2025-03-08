"use client"

import { useEffect, useState } from "react"
import slider1 from "../assets/images/slider-image-1.jpeg"
import slider2 from "../assets/images/slider-image-2.jpeg"
import slider3 from "../assets/images/slider-image-3.jpeg"
import img1 from "../assets/images/grocery-banner.png"
import img2 from "../assets/images/grocery-banner-2.jpeg"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const productSlides = [
  {
    id: 1,
    image: slider1,
    alt: "fruits and vegetables",
  },
  {
    id: 2,
    image: slider2,
    alt: "chocolates and snacks",
  },
  {
    id: 3,
    image: slider3,
    alt: "coffee",
  },
]

export default function MainSlider() {
  const [current, setCurrent] = useState(0)
  const [api, setApi] = useState<any>()

  useEffect(() => {
    if (!api) return

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="flex-col md:flex md:flex-row container mt-8">
      {/* Left side - Product Slider */}
      <div className="  md:w-8/12">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {productSlides.map((slide) => (
              <CarouselItem key={slide.id} className="p-0 "> 
                <div className="relative w-full h-[400px] rounded-lg " >
                  <img src={slide.image || "/placeholder.svg"} alt={slide.alt} className="w-full h-full object-cover" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Slide indicators */}
          <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center gap-3">
            {productSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-all ${
                  current === index ? "w-6 bg-primary" : "w-2 bg-primary/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </Carousel>
      </div>

      {/* Right side - Static Images */}
      <div className="md:w-4/12 flex flex-col rounded-r-lg md:rounded-lg overflow-hidden ">
        <div className="h-[200px]  overflow-hidden rounded-none">
          <img src={img1 || "/placeholder.svg"} alt="Fresh Vegetables"   className="object-right-bottom w-full h-[200px] hover:scale-105 transition-transform duration-300 rounded-none" />
        </div>
        <div className="h-[200px] overflow-hidden rounded-none">
          <img src={img2 || "/placeholder.svg"} alt="Fresh Bread"   className="object-right-bottom w-full h-[200px] hover:scale-105 transition-transform duration-300 rounded-none " />
        </div>
      </div>
    </div>
  )
}

