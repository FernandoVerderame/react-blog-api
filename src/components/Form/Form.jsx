// Importo lo style del Form, l'icona, la PostCard e lo useState
import { useState } from 'react';
import formStyle from './Form.module.css';
import { IoMdClose as Delete } from "react-icons/io";
import PostCard from '../Card/PostCard';

const Form = () => {

    const tagsList = ['html', 'css', 'js', 'php'];
    const categoriesList = ['Frontend', 'Backend', 'Database'];

    // Post di default
    const defaultPostData = {
        id: new Date().toISOString(),
        title: '',
        image: '',
        content: '',
        category: null,
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
    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length === 0) {
            setPosts(array => ([...array, postData]));
            setPostData(defaultPostData);
            setErrors({});
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
                                id="category"
                                name="category"
                                defaultValue={postData.category}
                                onChange={(e) => changePostData('category', e.target.value)}
                                className={formStyle.categorySelect}
                            >
                                <option value="">Seleziona una categoria</option>
                                {categoriesList.map((category, i) => (
                                    <option
                                        key={`category-${i}`}
                                        value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Input Tags */}
                        <div>
                            <h3>Tags</h3>
                            <ul>
                                {tagsList.map((name, i) => (
                                    <li key={`tag-${i}`}>
                                        <input
                                            type='checkbox'
                                            id={`tag-${i}`}
                                            name={`tag-${i}`}
                                            checked={postData.tags.includes(name)}
                                            onChange={() => {
                                                const curr = postData.tags;
                                                const newTags = curr.includes(name) ?
                                                    curr.filter(el => el !== name) :
                                                    [...curr, name];
                                                handleField('tags', newTags);
                                            }}
                                        />
                                        <label htmlFor={`tag-${i}`}>{name}</label>
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

            <h3>Lista dei nuovi Post</h3>
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
            }
        </>
    );
}

export default Form;