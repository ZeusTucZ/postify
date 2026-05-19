import { Link, useParams } from "react-router";
import useFetch from "../hooks/useFetch";

const PostDetail = () => {
    const { postId } = useParams();
    const urlPost = postId ? `http://localhost:8000/posts/${postId}` : null;
    const { data: post, loading, error } = useFetch(urlPost);

    if (loading) {
        return (
            <main className="min-h-screen bg-zinc-50 px-4 py-8 text-zinc-950">
                <p className="mx-auto max-w-2xl rounded-lg border border-zinc-200 bg-white p-5 text-zinc-500 shadow-sm">
                    Cargando post...
                </p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-zinc-50 px-4 py-8 text-zinc-950">
                <p className="mx-auto max-w-2xl rounded-lg border border-red-200 bg-red-50 p-5 text-red-700">
                    Error al cargar el post: {error}
                </p>
            </main>
        );
    }

    if (!post) {
        return (
            <main className="min-h-screen bg-zinc-50 px-4 py-8 text-zinc-950">
                <p className="mx-auto max-w-2xl rounded-lg border border-zinc-200 bg-white p-5 text-zinc-500 shadow-sm">
                    No se encontro el post.
                </p>
            </main>
        );
    }

    const likes = post.likes ?? [];
    const comments = post.comments ?? [];

    return (
        <main className="min-h-screen bg-zinc-50 px-4 py-6 text-zinc-950">
            <div className="mx-auto flex max-w-2xl flex-col gap-4">
                <Link className="w-fit text-sm font-medium text-zinc-600 hover:text-zinc-950" to={`/profile/${post.user_id}`}>
                    Volver al perfil
                </Link>

                <article className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center justify-between gap-3">
                        <h1 className="text-xl font-semibold">Post</h1>
                        <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-600">
                            {likes.length} likes
                        </span>
                    </div>
                    <p className="text-base leading-7 text-zinc-800">{post.description}</p>
                    <p className="mt-4 text-sm text-zinc-500">Creado: {new Date(post.created_at).toLocaleString()}</p>
                </article>

                <section className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
                    <h2 className="mb-3 text-lg font-semibold">Likes ({likes.length})</h2>
                    {likes.length === 0 ? (
                        <p className="text-sm text-zinc-500">Este post todavia no tiene likes.</p>
                    ) : (
                        <ul className="flex flex-col gap-2">
                            {likes.map((like) => (
                                <li className="rounded-lg bg-zinc-50 px-3 py-2 text-sm text-zinc-600" key={`${like.user_id}-${like.post_id}`}>
                                    Usuario: {like.user_id}
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

                <section className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
                    <h2 className="mb-3 text-lg font-semibold">Comentarios ({comments.length})</h2>
                    {comments.length === 0 ? (
                        <p className="text-sm text-zinc-500">Este post todavia no tiene comentarios.</p>
                    ) : (
                        <ul className="flex flex-col gap-3">
                            {comments.map((comment) => (
                                <li className="rounded-lg border border-zinc-100 bg-zinc-50 p-3" key={comment.id}>
                                    <p className="text-sm leading-6 text-zinc-800">{comment.content}</p>
                                    <small className="mt-2 block text-xs text-zinc-500">Usuario: {comment.user_id}</small>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </main>
    )
}

export default PostDetail;
