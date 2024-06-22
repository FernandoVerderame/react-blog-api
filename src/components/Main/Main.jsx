// Importo lo style del main, l'array dei posts, la Post Card ed il Form
import mainStyle from './Main.module.css';
import Carousel from '../Carousel/Carousel.jsx';
import Form from '../Form/Form.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_BASE_API_URL;
import PostsList from '../PostsList/PostsList.jsx';

const Main = () => {

    // const filteredPosts = selectedTag
    //     ? posts.filter(p => p.tags.includes(selectedTag))
    //     : posts;

    const [showCreateForm, setShowCreateForm] = useState(false);

    const [posts, setPosts] = useState(null);

    const fetchPosts = async (page = 1) => {
        setPosts(null);
        const url = `${apiUrl}/posts?page=${page}&limit=10`;
        const { data: posts } = await axios.get(url);
        setPosts(posts);
    }

    const [tags, setTags] = useState([]);
    const fetchTags = async () => {
        const url = `${apiUrl}/tags`;
        const { data: array } = await axios.get(url);
        setTags(array);
    }

    const [categories, setCategories] = useState([]);
    const fetchCategoies = async () => {
        const url = `${apiUrl}/categories`;
        const { data: array } = await axios.get(url);
        setCategories(array);
    }

    useEffect(() => {
        fetchPosts();
        fetchTags();
        fetchCategoies();
    }, []);

    return (
        <>
            <main className={mainStyle.mainSec}>

                <Form
                    tags={tags}
                    categories={categories}
                    onCreate={() => {
                        setShowCreateForm(false);
                        fetchPosts(1);
                    }}
                />

                <Carousel />

                {/* Genero in modo dinamico i Posts
                {posts?.map(p => (
                    p.published === true &&
                    <PostCard key={p.id}
                        title={p.title}
                        image={p.image}
                        tags={p.tags}
                        content={p.content}
                    />
                ))} */}

                <PostsList
                    posts={posts}
                    onPageChange={fetchPosts}
                />

            </main>
        </>
    );
}

export default Main;