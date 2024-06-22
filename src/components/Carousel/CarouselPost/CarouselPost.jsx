// Importo lo style del carosello
import postCarouselStyle from './CarouselPost.module.css';

const CarouselPost = ({ title, image, isActive }) => {
    return (
        isActive && (
            <div>
                <figure>
                    <img src={image} alt={title} className={postCarouselStyle.img} />
                </figure>
                <div className='card-content'>
                    <h3 className={postCarouselStyle.title}>{title}</h3>
                </div>
            </div>
        )
    );
}

export default CarouselPost;