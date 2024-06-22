import { useEffect, useState } from "react";
import postsListStyle from './PostsList.module.css';
import PostCard from "../Card/PostCard";

const PostsList = ({ posts, onPageChange }) => {

    const [currPage, setCurrPage] = useState(1);

    useEffect(() => {
        onPageChange(currPage);
    }, [currPage]);

    return (
        <>
            {posts !== null &&
                <div className={postsListStyle.paginator}>
                    <span>Pagina corrente: {currPage}</span>
                    <button
                        style={{ visibility: currPage - 1 > 0 ? 'visible' : 'hidden' }}
                        onClick={() => setCurrPage(curr => curr - 1)} className={postsListStyle.btn}>-</button>
                    <button
                        style={{ visibility: currPage + 1 <= posts.totalPages ? 'visible' : 'hidden' }}
                        onClick={() => setCurrPage(curr => curr + 1)} className={postsListStyle.btn}>+</button>
                </div>
            }

            <div className={postsListStyle.posts}>
                {posts === null && 'Caricando i Posts...'}
                {posts?.data?.length === 0 && 'Nessun Post trovato.'}
                {posts?.data?.length > 0 &&
                    posts.data.map(p => (
                        p.published === true &&
                        <PostCard key={p.id}
                            title={p.title}
                            image={p.image}
                            tags={p.tags}
                            content={p.content}
                            category={p.category?.name}
                        />
                    ))
                }
            </div>
        </>
    );
}

export default PostsList;