import postCardStyle from './PostCard.module.css';
import Button from '../Button/Button';

const PostCard = ({ title, content, image, category, tags }) => {

    const tagColors = {
        html: '#E4552E',
        css: '#1D81C0',
        js: '#FFB92C',
        php: '#556096'
    };

    return (
        <>
            <div className={postCardStyle.card}>
                <div className={postCardStyle.image}>
                    <img src={image ? image : "https://placehold.co/600x400"} alt={title} className={postCardStyle.img} />
                </div>
                <div className={postCardStyle.bottom}>
                    <h3>{title}</h3>
                    <p className={postCardStyle.paragraph}>{content}</p>
                    <div className={postCardStyle.dFlex}>
                        {/* Button card */}
                        <Button />

                        {/* Post Category */}
                        {category &&
                            <div>
                                <p><strong>{category}</strong></p>
                            </div>
                        }

                        {/* Post Tags */}
                        {tags.length > 0 ? (
                            <div>
                                <ul className={postCardStyle.tags}>
                                    {tags.map((tag, i) => (
                                        <li key={`tag${i}`} style={{ backgroundColor: tagColors[tag] }} className={postCardStyle.badge}>{tag}</li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p>Nessun tag</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default PostCard;
