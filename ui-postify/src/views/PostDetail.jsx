import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import useFetch from "../hooks/useFetch";
import {
    IoArrowBack,
    IoBookmarkOutline,
    IoChatbubbleOutline,
    IoHeartOutline,
    IoPaperPlaneOutline
} from "react-icons/io5";

const API_BASE = "http://localhost:8000";

const getFullName = (user) => {
    if (!user) return "Usuario";
    return `${user.name ?? ""} ${user.lastname ?? ""}`.trim() || user.username || "Usuario";
};

const getInitials = (user) => getFullName(user)
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const PostDetail = () => {
    const { postId } = useParams();
    const urlPost = postId ? `${API_BASE}/posts/${postId}` : null;
    const { data: post, loading, error } = useFetch(urlPost);
    const [users, setUsers] = useState({});

    const comments = useMemo(() => post?.comments ?? [], [post]);
    const likes = post?.likes ?? [];
    const author = post ? users[post.user_id] : null;
    const imageUrl = post?.images?.[0]?.url;

    useEffect(() => {
        if (!post) return;

        const ids = [post.user_id, ...comments.map((comment) => comment.user_id)]
            .filter(Boolean)
            .filter((userId, index, list) => list.indexOf(userId) === index)
            .filter((userId) => !users[userId]);

        if (ids.length === 0) return;

        Promise.all(
            ids.map(async (userId) => {
                const res = await fetch(`${API_BASE}/users/${userId}`);
                if (!res.ok) return null;
                return res.json();
            })
        ).then((results) => {
            setUsers((current) => {
                const next = { ...current };
                results.filter(Boolean).forEach((user) => {
                    next[user.id] = user;
                });
                return next;
            });
        });
    }, [post, comments, users]);

    if (loading) {
        return (
            <main className="min-h-screen bg-[#f6f6f4] text-zinc-950">
                <div className="mx-auto min-h-screen w-full max-w-[560px] border-x border-zinc-200 bg-white px-4 py-5">
                    <div className="animate-pulse">
                        <div className="mb-4 h-10 w-32 rounded bg-zinc-200" />
                        <div className="aspect-square bg-zinc-200" />
                        <div className="mt-4 h-5 w-48 rounded bg-zinc-200" />
                    </div>
                </div>
            </main>
        );
    }

    if (error || !post) {
        return (
            <main className="min-h-screen bg-[#f6f6f4] text-zinc-950">
                <div className="mx-auto flex min-h-screen w-full max-w-[560px] items-center justify-center border-x border-zinc-200 bg-white px-6">
                    <div className="text-center">
                        <p className="text-sm font-semibold">No se pudo cargar el post.</p>
                        {error ? <p className="mt-1 text-xs text-red-500">{error}</p> : null}
                        <Link className="mt-4 inline-block rounded-md bg-zinc-950 px-4 py-2 text-sm font-semibold text-white" to="/home">
                            Volver al inicio
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#f6f6f4] text-zinc-950">
            <div className="mx-auto min-h-screen w-full max-w-[560px] border-x border-zinc-200 bg-white">
                <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/95 px-4 py-3 backdrop-blur">
                    <div className="flex items-center gap-4">
                        <Link
                            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-zinc-100"
                            to="/home"
                        >
                            <IoArrowBack className="h-6 w-6" />
                        </Link>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Publicacion</p>
                            <h1 className="text-lg font-semibold">{author?.username ?? "usuario"}</h1>
                        </div>
                    </div>
                </header>

                <article>
                    <div className="flex items-center gap-3 px-4 py-3">
                        <Link className="rounded-full bg-gradient-to-tr from-yellow-400 via-rose-500 to-fuchsia-600 p-[2px]" to={`/profile/${post.user_id}`}>
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-zinc-950 text-xs font-semibold text-white">
                                {getInitials(author)}
                            </span>
                        </Link>
                        <div className="min-w-0">
                            <Link className="block truncate text-sm font-semibold" to={`/profile/${post.user_id}`}>
                                {author?.username ?? "usuario"}
                            </Link>
                            <p className="truncate text-xs text-zinc-500">{getFullName(author)}</p>
                        </div>
                    </div>

                    {imageUrl ? (
                        <img className="aspect-square w-full bg-zinc-100 object-cover" src={imageUrl} alt={post.description || "Post"} />
                    ) : (
                        <div className="flex aspect-square w-full items-end bg-gradient-to-br from-zinc-900 via-rose-700 to-orange-500 p-6">
                            <p className="line-clamp-7 text-3xl font-semibold leading-tight text-white">
                                {post.description}
                            </p>
                        </div>
                    )}

                    <div className="px-4 py-3">
                        <div className="mb-3 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <IoHeartOutline className="h-7 w-7" />
                                <IoChatbubbleOutline className="h-7 w-7" />
                                <IoPaperPlaneOutline className="h-7 w-7" />
                            </div>
                            <IoBookmarkOutline className="h-7 w-7" />
                        </div>

                        <p className="text-sm font-semibold">{likes.length} Me gusta</p>
                        <p className="mt-2 text-sm leading-6">
                            <Link className="font-semibold" to={`/profile/${post.user_id}`}>
                                {author?.username ?? "usuario"}
                            </Link>{" "}
                            {post.description}
                        </p>
                        <p className="mt-2 text-xs uppercase tracking-wide text-zinc-400">
                            {new Date(post.created_at).toLocaleString("es-MX")}
                        </p>
                    </div>
                </article>

                <section className="border-t border-zinc-200 px-4 py-4">
                    <h2 className="mb-4 text-sm font-semibold">{comments.length} comentarios</h2>
                    {comments.length === 0 ? (
                        <p className="py-8 text-center text-sm text-zinc-500">
                            Este post todavia no tiene comentarios.
                        </p>
                    ) : (
                        <ul className="space-y-4">
                            {comments.map((comment) => {
                                const user = users[comment.user_id];

                                return (
                                    <li className="flex gap-3" key={comment.id}>
                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-xs font-semibold text-white">
                                            {getInitials(user)}
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm leading-6">
                                                <span className="font-semibold">{user?.username ?? "usuario"}</span>{" "}
                                                {comment.content}
                                            </p>
                                            <p className="text-xs text-zinc-400">{getFullName(user)}</p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </section>
            </div>
        </main>
    );
};

export default PostDetail;
