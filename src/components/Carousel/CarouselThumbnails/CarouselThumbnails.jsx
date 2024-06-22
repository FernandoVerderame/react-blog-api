// Importo lo style dei thumbnails
import carouselThumbnailsStyle from './CarouselThumbnails.module.css';

const CarouselThumbnails = ({ image, isActive, onThumbnailClick }) => {
    return (
        <>
            <figure onClick={onThumbnailClick}>
                <img src={image} alt='thumbnail-image' className={`${carouselThumbnailsStyle.img} ${isActive ? carouselThumbnailsStyle.active : ''}`} />
            </figure>
        </>
    );
}

export default CarouselThumbnails;