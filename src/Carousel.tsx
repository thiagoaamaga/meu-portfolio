import React, {useEffect, useState} from "react";
import "./Carousel.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {useSwipeable} from "react-swipeable";

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
    const [showModal, setShowModal] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    useEffect(() =>
    {
        if (showModal)
        {
            document.body.classList.add("no-scroll");
        }
        else
        {
            document.body.classList.remove("no-scroll");
        }
    }, [showModal]);

    const handleImageClick = (index: number) =>
    {
        setSelectedImageIndex(index);
        setShowModal(true);
    };

    const handleCloseModal = () =>
    {
        setShowModal(false);
        setSelectedImageIndex(0);
    };

    const handleBackdropClick = (e: React.MouseEvent) =>
    {
        if (e.target === e.currentTarget)
        {
            handleCloseModal();
        }
    };

    const hasLeftSwipe = () => selectedImageIndex !== 0;
    const hasRightSwipe = () => selectedImageIndex !== imagens.length - 1;

    const handleSwipeLeft = () =>
    {
        setSelectedImageIndex((prevIndex) => (prevIndex - 1 + imagens.length) % imagens.length);
    };

    const handleSwipeRight = () =>
    {
        setSelectedImageIndex((prevIndex) => (prevIndex + 1) % imagens.length);
    };

    useEffect(() =>
    {
        const handleKeydown = (e: KeyboardEvent) =>
        {
            if (e.key === "ArrowLeft")
            {
                handleSwipeRight();
            }
            else if (e.key === "ArrowRight")
            {
                handleSwipeLeft();
            }
        };
        if (showModal)
        {
            document.addEventListener("keydown", handleKeydown);
        }
        return () =>
        {
            document.removeEventListener("keydown", handleKeydown);
        };
    }, [showModal]);

    const swipeHandlers = useSwipeable({
        onSwipedLeft: handleSwipeRight,
        onSwipedRight: handleSwipeLeft,
        trackMouse: true
    });

    return (
        <>
            <Carousel
                showDots={false}
                centerMode={true}
                responsive={responsive}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                className="carousel"
            >
                {imagens.map((imagem, imgIndex) => (
                    <img
                        key={imgIndex}
                        src={`${process.env.PUBLIC_URL}/${imagem}`}
                        alt={`Projeto ${imgIndex + 1} - Imagem ${imgIndex + 1}`}
                        onClick={() => handleImageClick(imgIndex)}
                        className="carousel-image"
                    />
                ))}
            </Carousel>

            {showModal && (
                <>
                    <div className="modal-backdrop fade show" onClick={handleCloseModal}></div>
                    <div className="modal fade show d-block" tabIndex={-1} role="dialog" onClick={handleBackdropClick}>
                        <div className="modal-dialog modal-dialog-centered modal-fullscreen" role="document">
                            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                <div className="modal-header">
                                    <div onClick={handleCloseModal}>
                                        <i className="bi bi-x-circle-fill h1 close"></i>
                                    </div>
                                </div>
                                <div className="modal-body" {...swipeHandlers}>
                                    <div onClick={handleSwipeLeft} className={!hasLeftSwipe() ? "hidden" : ""}>
                                        <i className="bi bi-arrow-left-circle-fill h1 left-arrow"></i>
                                    </div>
                                    <img src={`${process.env.PUBLIC_URL}/${imagens[selectedImageIndex]}`} alt="Selected"
                                         className="img-fluid modal-image"/>
                                    <div onClick={handleSwipeRight} className={!hasRightSwipe() ? "hidden" : ""}>
                                        <i className="bi bi-arrow-right-circle-fill h1 right-arrow"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ImageCarousel;