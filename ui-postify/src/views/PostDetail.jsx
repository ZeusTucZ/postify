import { Link, useParams } from "react-router";
import useFetch from "../hooks/useFetch";

const PostDetail = () => {
    const { postId } = useParams();
    const urlPost = postId ? `http://localhost:8000/posts/${postId}` : null;
    const { data: post, loading, error } = useFetch(urlPost);

    if (loading) {
        return <p>Cargando post...</p>;
    }

    if (error) {
        return <p>Error al cargar el post: {error}</p>;
    }

    if (!post) {
        return <p>No se encontro el post.</p>;
    }

    const likes = post.likes ?? [];
    const comments = post.comments ?? [];

    return (
        <main>
            <Link to={`/profile/${post.user_id}`}>Volver al perfil</Link>

            <article>
                <h1>Post</h1>
                <p>{post.description}</p>
                <p>Creado: {new Date(post.created_at).toLocaleString()}</p>
            </article>

            <section>
                <h2>Likes ({likes.length})</h2>
                {likes.length === 0 ? (
                    <p>Este post todavia no tiene likes.</p>
                ) : (
                    <ul>
                        {likes.map((like) => (
                            <li key={`${like.user_id}-${like.post_id}`}>
                                Usuario: {like.user_id}
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section>
                <h2>Comentarios ({comments.length})</h2>
                {comments.length === 0 ? (
                    <p>Este post todavia no tiene comentarios.</p>
                ) : (
                    <ul>
                        {comments.map((comment) => (
                            <li key={comment.id}>
                                <p>{comment.content}</p>
                                <small>Usuario: {comment.user_id}</small>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    )
}

export default PostDetail;
