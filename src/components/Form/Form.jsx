// Importo lo style del Form, l'icona, la PostCard e lo useState
import { useState } from 'react';
import formStyle from './Form.module.css';
import { IoMdClose as Delete } from "react-icons/io";
import PostCard from '../Card/PostCard';
import axios from "axios";
const apiUrl = import.meta.env.VITE_BASE_API_URL;

const Form = ({ tags, categories, onCreate }) => {

    // Post di default
    const defaultPostData = {
        id: new Date().toISOString(),
        title: '',
        image: '',
        content: '',
        categoryId: '',
        tags: [],
        published: false
    }

    // useState dei nuovi Posts
    const [posts, setPosts] = useState([]);

    // useState del singolo nuovo Post
    const [postData, setPostData] = useState(defaultPostData);

    // useState per i messaggi di errore
    const [errors, setErrors] = useState({});

    // Funzione per gestire la validazione del form
    const validateForm = () => {
        const errors = {};

        if (!postData.title.trim()) {
            errors.title = 'Il titolo è richiesto';
        }

        // Aggiungi altre validazioni per gli altri campi se necessario


        return errors;
    }

    // Campo dei Tags
    const handleField = (name, value) => {

        setPostData(curr => ({
            ...curr,
            [name]: value
        }))
    }

    // Submit del Form
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length === 0) {
            const tagIds = tags.filter(tag => postData.tags.includes(tag.name)).map(tag => tag.id);
            try {
                const res = await axios.post(`${apiUrl}/posts`, {
                    ...postData,
                    tags: tagIds
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (res.status < 400) {
                    onCreate();
                    setPostData(defaultPostData);
                    setErrors({});
                } else {
                    console.error("Errore nella creazione del post:", res.data); // Log dell'errore specifico dal server
                    // Gestisci l'errore in base alla risposta dal server
                    // Esempio: Mostra un messaggio all'utente o esegui azioni appropriate
                }
            } catch (error) {
                console.error("Errore durante la creazione del post:", error);
                // Gestisci l'errore in modo generale, ad esempio mostrando un messaggio generico di errore
            }
        } else {
            setErrors(validationErrors);
        }
    }


    // Rimozione di un Post
    const removePost = (indexToDelete) => {
        setPosts(array => array.filter((_, i) => i !== indexToDelete));
    }

    // Update del Post
    const changePostData = (key, newValue) => {
        setPostData(data => ({ ...data, [key]: newValue }));
    }

    return (
        <>
            {/* Form Card */}
            <div className={formStyle.cardForm}>

                {/* Card Title */}
                <div className={formStyle.cardTitle}>
                    <h3>Creo un nuovo Post</h3>
                </div>

                {/* Card Body */}
                <div className={formStyle.cardBody}>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>

                        {/* Input Title */}
                        <div className={formStyle.cardInput}>
                            <label htmlFor="title">Titolo</label>
                            <input
                                type="text"
                                id='title'
                                name='title'
                                value={postData.title}
                                onChange={(e) => changePostData('title', e.target.value)}
                                className={errors.title && formStyle.inputError}
                            />
                            {errors.title && <p className={formStyle.errorMessage}>{errors.title}</p>}
                        </div>

                        {/* Input Image */}
                        <div className={formStyle.cardInput}>
                            <label htmlFor="image">URL Immagine</label>
                            <input
                                type="url"
                                id='image'
                                name='image'
                                value={postData.image}
                                onChange={(e) => changePostData('image', e.target.value)}
                            />
                        </div>

                        {/* Input Content */}
                        <div className={formStyle.cardInput}>
                            <label htmlFor="content">Content</label>
                            <textarea
                                id='content'
                                name='content'
                                rows='5'
                                value={postData.content}
                                onChange={(e) => changePostData('content', e.target.value)}
                            />
                        </div>

                        {/* Input Category */}
                        <div>
                            <h3>Categoria</h3>
                            <select
                                id="categoryId"
                                name="categoryId"
                                defaultValue={postData.categoryId}
                                onChange={(e) => changePostData('categoryId', e.target.value)}
                                className={formStyle.categorySelect}
                            >
                                <option value="">Seleziona una categoria</option>
                                {categories.map(c => (
                                    <option
                                        key={`categoryId${c.id}`}
                                        value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Input Tags */}
                        <div>
                            <h3>Tags</h3>
                            <ul>
                                {tags.map((tag) => (
                                    <li key={tag.id}>
                                        <input
                                            type='checkbox'
                                            id={tag.id}
                                            name={tag.id}
                                            checked={postData.tags.includes(tag.id)}
                                            onChange={() => {
                                                const curr = postData.tags;
                                                const newTags = curr.includes(tag.id) ?
                                                    curr.filter(el => el !== tag.id) :
                                                    [...curr, tag.id];
                                                handleField('tags', newTags);
                                            }}
                                        />
                                        <label htmlFor={tag.id}>{tag.name}</label>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Input Published */}
                        <div className={formStyle.published}>
                            <label htmlFor="published">Pubblicato</label>
                            <input
                                id='published'
                                name='published'
                                type='checkbox'
                                checked={postData['published']}
                                onChange={(e) => handleField('published', e.target.checked)}
                            />
                        </div>

                        <div className={formStyle.cardBtn}>
                            <button>Crea</button>
                        </div>
                    </form>
                </div>
            </div >

            {/* <h3>Lista dei nuovi Post</h3>
            {
                posts.map(({ id, title, image, content, category, tags, published }, i) => (
                    published === true &&
                    <div key={id} className={formStyle.postCard}>
                        <PostCard
                            title={title}
                            image={image}
                            content={content}
                            category={category}
                            tags={tags}
                        />
                        <button className={formStyle.deleteBtn} onClick={() => removePost(i)}>
                            <Delete />
                        </button>
                    </div>
                ))
            } */}
        </>
    );
}

export default Form;