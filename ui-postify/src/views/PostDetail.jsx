import { Link, useParams } from "react-router";
import useFetch from "../hooks/useFetch";
import { IoArrowBack, IoChatbubbleOutline, IoHeartOutline } from "react-icons/io5";

const PostDetail = () => {
    const { postId } = useParams();
    const urlPost = postId ? `http://localhost:8000/posts/${postId}` : null;
    const { data: post, loading, error } = useFetch(urlPost);

    if (loading) {
        return (
            <main className="min-h-screen bg-[#f4f4f2] text-zinc-950">
                <div className="mx-auto flex min-h-screen w-full max-w-[480px] items-center justify-center border-x border-zinc-200/80 bg-white px-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
                    <div className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-center shadow-sm">
                        <div className="mx-auto h-12 w-12 animate-pulse rounded-full bg-gradient-to-br from-fuchsia-500 via-rose-500 to-amber-400" />
                        <p className="mt-4 text-sm font-medium text-zinc-500">
                            Cargando post...
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-[#f4f4f2] text-zinc-950">
                <div className="mx-auto flex min-h-screen w-full max-w-[480px] items-center justify-center border-x border-zinc-200/80 bg-white px-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
                    <div className="w-full rounded-2xl border border-red-200 bg-red-50 p-6 text-center shadow-sm">
                        <p className="text-sm font-semibold text-red-700">
                            Error al cargar el post
                        </p>
                        <p className="mt-2 text-xs text-red-600">{error}</p>
                    </div>
                </div>
            </main>
        );
    }

    if (!post) {
        return (
            <main className="min-h-screen bg-[#f4f4f2] text-zinc-950">
                <div className="mx-auto flex min-h-screen w-full max-w-[480px] items-center justify-center border-x border-zinc-200/80 bg-white px-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
                    <div className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-center shadow-sm">
                        <p className="text-sm font-medium text-zinc-500">
                            No se encontro el post.
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    const likes = post.likes ?? [];
    const comments = post.comments ?? [];
    const createdAt = new Date(post.created_at).toLocaleString();

    return (
        <main className="min-h-screen bg-[#f4f4f2] text-zinc-950">
            <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col border-x border-zinc-200/80 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
                <header className="sticky top-0 z-20 border-b border-zinc-200/80 bg-white/90 px-5 py-4 backdrop-blur-xl">
                    <div className="flex items-center justify-between gap-4">
                        <Link
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 text-zinc-700 transition duration-200 hover:bg-zinc-100 hover:text-zinc-950"
                            to={`/profile/${post.user_id}`}
                        >
                            <IoArrowBack className="h-5 w-5" />
                        </Link>
                        <div className="min-w-0 flex-1 text-center">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                                Post
                            </p>
                            <h1 className="mt-1 truncate text-lg font-semibold tracking-tight text-zinc-950">
                                Detalle
                            </h1>
                        </div>
                        <div className="h-11 w-11" />
                    </div>
                </header>

                <article className="px-5 py-5">
                    <div className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.10)]">
                        <div className="flex items-center gap-3 border-b border-zinc-100 px-4 py-4">
                            <div className="rounded-full bg-gradient-to-br from-fuchsia-500 via-rose-500 to-amber-400 p-[2px]">
                                <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-zinc-950 text-sm font-semibold text-white">
                                    P
                                </div>
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold text-zinc-950">
                                    Publicacion
                                </p>
                                <p className="truncate text-xs text-zinc-500">
                                    Usuario {post.user_id}
                                </p>
                            </div>
                        </div>

                        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-pink-500 via-rose-500 to-orange-400">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.42),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(24,24,27,0.58),transparent_52%)]" />
                            <div className="relative flex h-full items-end p-6">
                                <p className="max-h-full overflow-hidden text-2xl font-semibold leading-tight tracking-tight text-white drop-shadow-lg">
                                    {post.description}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4 px-4 py-4">
                            <div className="flex items-center gap-3">
                                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 text-rose-600">
                                    <IoHeartOutline className="h-5 w-5" />
                                </span>
                                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-700">
                                    <IoChatbubbleOutline className="h-5 w-5" />
                                </span>
                            </div>

                            <div className="flex gap-2">
                                <span className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white">
                                    {likes.length} likes
                                </span>
                                <span className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-700">
                                    {comments.length} comentarios
                                </span>
                            </div>

                            <p className="text-sm leading-6 text-zinc-800">
                                {post.description}
                            </p>
                            <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-400">
                                Creado: {createdAt}
                            </p>
                        </div>
                    </div>
                </article>

                <section className="border-t border-zinc-200 bg-zinc-50/70 px-5 py-5">
                    <div className="mb-4 flex items-center justify-between gap-3">
                        <h2 className="text-base font-semibold text-zinc-950">
                            Likes
                        </h2>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-zinc-500 shadow-sm">
                            {likes.length}
                        </span>
                    </div>
                    {likes.length === 0 ? (
                        <p className="rounded-2xl border border-dashed border-zinc-200 bg-white px-4 py-5 text-center text-sm text-zinc-500">
                            Este post todavia no tiene likes.
                        </p>
                    ) : (
                        <ul className="flex flex-col gap-2">
                            {likes.map((like) => (
                                <li
                                    className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 shadow-sm"
                                    key={`${like.user_id}-${like.post_id}`}
                                >
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-600">
                                        <IoHeartOutline className="h-5 w-5" />
                                    </span>
                                    <span className="min-w-0 break-all text-sm text-zinc-600">
                                        Usuario: {like.user_id}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

                <section className="border-t border-zinc-200 bg-white px-5 py-5">
                    <div className="mb-4 flex items-center justify-between gap-3">
                        <h2 className="text-base font-semibold text-zinc-950">
                            Comentarios
                        </h2>
                        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-500">
                            {comments.length}
                        </span>
                    </div>
                    {comments.length === 0 ? (
                        <p className="rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 px-4 py-5 text-center text-sm text-zinc-500">
                            Este post todavia no tiene comentarios.
                        </p>
                    ) : (
                        <ul className="flex flex-col gap-3">
                            {comments.map((comment) => (
                                <li
                                    className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
                                    key={comment.id}
                                >
                                    <div className="mb-3 flex items-center gap-3">
                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-xs font-semibold text-white">
                                            U
                                        </span>
                                        <small className="min-w-0 break-all text-xs font-medium text-zinc-500">
                                            Usuario: {comment.user_id}
                                        </small>
                                    </div>
                                    <p className="text-sm leading-6 text-zinc-800">
                                        {comment.content}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </main>
    );
};

export default PostDetail;
