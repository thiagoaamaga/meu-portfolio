import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Carousel.css";

const responsive = {
    superLargeDesktop: {
        breakpoint: {max: 4000, min: 3000},
        items: 2
    },
    desktop: {
        breakpoint: {max: 3000, min: 1024},
        items: 2
    },
    tablet: {
        breakpoint: {max: 1024, min: 0},
        items: 2
    },
    mobile: {
        breakpoint: {max: 464, min: 0},
        items: 1.5
    }
};

interface ImageCarouselProps
{
    imagens: string[];
}

const ImageCarousel = ({imagens}: ImageCarouselProps) =>
{
    return (
        <Carousel showDots={false}
                  centerMode={true}
                  responsive={responsive}
                  autoPlay={true}
                  removeArrowOnDeviceType={["tablet", "mobile"]}
                  infinite={true}
                  autoPlaySpeed={5000}
                  className="carousel">
            {imagens.map((imagem, imgIndex) => (
                <img key={imgIndex} src={`${process.env.PUBLIC_URL}/${imagem}`}
                     alt={`Projeto ${imgIndex + 1} - Imagem ${imgIndex + 1}`}/>
            ))}
        </Carousel>
    );
};

export default ImageCarousel;