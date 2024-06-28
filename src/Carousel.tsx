import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Carousel.css";

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 2
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 2
    },
    tablet: {
        breakpoint: { max: 1024, min: 0 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1.5
    }
};

interface ImageCarouselProps {
    imagens: string[];
}

const ImageCarousel = ({ imagens }: ImageCarouselProps) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedImage("");
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            handleCloseModal();
        }
    };

    return (
        <>
            <Carousel
                showDots={false}
                centerMode={true}
                responsive={responsive}
                autoPlay={true}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                infinite={true}
                autoPlaySpeed={5000}
                className="carousel"
            >
                {imagens.map((imagem, imgIndex) => (
                    <img
                        key={imgIndex}
                        src={`${process.env.PUBLIC_URL}/${imagem}`}
                        alt={`Projeto ${imgIndex + 1} - Imagem ${imgIndex + 1}`}
                        onClick={() => handleImageClick(`${process.env.PUBLIC_URL}/${imagem}`)}
                        className="carousel-image"
                    />
                ))}
            </Carousel>

            {showModal && (
                <div className="modal fade show d-block" tabIndex={-1} role="dialog" onClick={handleBackdropClick}>
                    <div className="modal-dialog modal-dialog-centered modal-lg-custom" role="document">
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <button type="button" className="close" onClick={handleCloseModal}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <img src={selectedImage} alt="Selected" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModal && <div className="modal-backdrop fade show"></div>}
        </>
    );
};

export default ImageCarousel;