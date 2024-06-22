// Importo lo useState, i bottoni del carosello ed i thumbnails
import carousel from '../../data/carousel.js';
import CarouselPost from '../Carousel/CarouselPost/CarouselPost.jsx';
import { useState, useEffect } from 'react';
import {
    FaArrowAltCircleLeft as Prev,
    FaArrowAltCircleRight as Next
} from "react-icons/fa";
import CarouselThumbnails from '../Carousel/CarouselThumbnails/CarouselThumbnails.jsx';
import carouselStyle from './Carousel.module.css'

const Carousel = () => {

    const [activePost, setActivePost] = useState(0);

    const postsCarousel = carousel;

    const prevClick = () => {
        setActivePost(currentIndex =>
            currentIndex === 0 ? postsCarousel.length - 1 : currentIndex - 1
        );
    }

    const nextClick = () => {
        setActivePost(currentIndex =>
            currentIndex === postsCarousel.length - 1 ? 0 : currentIndex + 1
        );
    }

    // Autoplay
    useEffect(() => {
        const interval = setInterval(() => {
            nextClick();
        }, 2000);

        return () => clearInterval(interval);
    }, [activePost]);

    return (
        <>
            {/* Carosello dei Posts */}
            <div className={carouselStyle.carousel}>

                {/* Prev Button */}
                <button className={carouselStyle.btn}>
                    <Prev
                        onClick={prevClick}
                    />
                </button>

                {/* Post del carosello */}
                {postsCarousel.map((pc, i) => (
                    <CarouselPost
                        key={pc.id}
                        title={pc.title}
                        image={pc.image}
                        isActive={activePost === i}
                    />
                ))}

                {/* Next Button */}
                <button className={carouselStyle.btn}>
                    <Next
                        onClick={nextClick}
                    />
                </button>
            </div>

            {/* Thumbnails dei Posts */}
            <div className={carouselStyle.thumbnails}>
                {postsCarousel.map((pc, i) => (
                    <CarouselThumbnails
                        key={pc.id}
                        image={pc.image}
                        isActive={activePost === i}
                        onThumbnailClick={() => setActivePost(i)}
                    />
                ))}
            </div>
        </>
    );
}

export default Carousel;