import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryCarouselProps {
  images: string[];
  initialIndex: number;
}

const GalleryCarousel = ({ images, initialIndex }: GalleryCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div key={initialIndex}>
      <Dialog>
        <DialogTrigger asChild>
          <div>
            {initialIndex < 5 ? (
              <img
                src={images[initialIndex] || "/placeholder.svg"}
                alt={`Gallery image ${initialIndex + 1}`}
                className="rounded-lg object-cover w-full h-[200px] cursor-pointer"
              />
            ) : initialIndex === 5 ? (
              <div className="w-full h-[200px] overflow-hidden rounded-lg relative">
                <img
                  src={images[5] || "/placeholder.svg"}
                  alt={`Gallery image ${initialIndex + 1}`}
                  className="rounded-lg object-cover w-full h-[200px] cursor-pointer blur-sm"
                />
                <div className="w-full h-full absolute top-0 flex items-center justify-center bg-black/30">
                  <div className="bg-white font-semibold bg-clip-text text-transparent overflow-hidden drop-shadow-lg">
                    See More
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-[90vw] max-h-[80vh] p-0">
          <DialogTitle hidden></DialogTitle>
          <div className="relative  max-w-[90vw] max-h-[80vh] w-full h-full p-4">
            <img
              src={images[currentIndex] || "/placeholder.svg"}
              alt={`Gallery image ${currentIndex + 1}`}
              className="w-full h-full object-contain overflow-hidden z-50"
            />
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <DialogTrigger asChild>
              <button className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full">
                <X className="h-6 w-6" />
              </button>
            </DialogTrigger>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryCarousel;
