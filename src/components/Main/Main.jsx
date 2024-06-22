// Importo lo style del main, l'array dei posts, la Post Card ed il Form
import PostCard from '../Card/PostCard';
import mainStyle from './Main.module.css';
import posts from '../../data/posts.js';
import Carousel from '../Carousel/Carousel.jsx';
import Form from '../Form/Form.jsx';

const Main = ({ selectedTag }) => {

    const filteredPosts = selectedTag
        ? posts.filter(p => p.tags.includes(selectedTag))
        : posts;

    return (
        <>
            <main className={mainStyle.mainSec}>

                <Form />

                <Carousel />

                {/* Genero in modo dinamico i Posts */}
                {filteredPosts.map(p => (
                    p.published === true &&
                    <PostCard key={p.id}
                        title={p.title}
                        image={p.image}
                        tags={p.tags}
                        content={p.content}
                    />
                ))}
            </main>
        </>
    );
}

export default Main;