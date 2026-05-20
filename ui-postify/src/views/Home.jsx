import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import useFetch from "../hooks/useFetch";
import {
    IoAdd,
    IoBookmarkOutline,
    IoChatbubbleOutline,
    IoHeartOutline,
    IoPaperPlaneOutline,
    IoSearchOutline
} from "react-icons/io5";

const API_BASE = "http://localhost:8000";

const getFullName = (user) => {
    if (!user) return "Usuario";
    return `${user.name ?? ""} ${user.lastname ?? ""}`.trim() || user.username || "Usuario";
};

const getInitials = (user) => {
    const fullName = getFullName(user);
    return fullName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
};

const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("es-MX", {
        day: "numeric",
        month: "short"
    });
};

const Home = () => {
    const { data, loading, error } = useFetch(`${API_BASE}/posts`);
    const posts = useMemo(() => Array.isArray(data) ? data : [], [data]);
    const [users, setUsers] = useState({});

    useEffect(() => {
        const userIds = [...new Set(posts.map((post) => post.user_id).filter(Boolean))]
            .filter((userId) => !users[userId]);

        if (userIds.length === 0) return;

        Promise.all(
            userIds.map(async (userId) => {
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
    }, [posts, users]);

    const storyUsers = [...new Map(posts.map((post) => [post.user_id, users[post.user_id]])).values()]
        .filter(Boolean);

    return (
        <main className="min-h-screen bg-[#f6f6f4] text-zinc-950">
            <div className="mx-auto min-h-screen w-full max-w-[560px] border-x border-zinc-200 bg-white">
                <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/95 px-4 py-3 backdrop-blur">
                    <div className="flex items-center justify-between">
                        <Link className="text-2xl font-semibold tracking-tight" to="/home">
                            Postify
                        </Link>
                        <div className="flex items-center gap-1">
                            <button className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-800 hover:bg-zinc-100" type="button">
                                <IoSearchOutline className="h-6 w-6" />
                            </button>
                            <button className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-800 hover:bg-zinc-100" type="button">
                                <IoPaperPlaneOutline className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </header>

                <section className="border-b border-zinc-200 px-4 py-4">
                    <div className="flex gap-4 overflow-x-auto pb-1">
                        <div className="w-18 shrink-0 text-center">
                            <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50">
                                <IoAdd className="h-7 w-7 text-zinc-800" />
                            </div>
                            <p className="mt-2 truncate text-xs font-medium text-zinc-600">Tu historia</p>
                        </div>
                        {storyUsers.map((user) => (
                            <Link className="w-18 shrink-0 text-center" key={user.id} to={`/profile/${user.id}`}>
                                <div className="mx-auto rounded-full bg-gradient-to-tr from-yellow-400 via-rose-500 to-fuchsia-600 p-[2px]">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white bg-zinc-950 text-sm font-semibold text-white">
                                        {getInitials(user)}
                                    </div>
                                </div>
                                <p className="mt-2 truncate text-xs font-medium text-zinc-700">
                                    {user.username}
                                </p>
                            </Link>
                        ))}
                    </div>
                </section>

                {loading && (
                    <div className="space-y-4 px-4 py-5">
                        {[1, 2].map((item) => (
                            <div className="animate-pulse border-b border-zinc-200 pb-5" key={item}>
                                <div className="mb-3 flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-zinc-200" />
                                    <div className="h-4 w-36 rounded bg-zinc-200" />
                                </div>
                                <div className="aspect-square rounded-sm bg-zinc-200" />
                            </div>
                        ))}
                    </div>
                )}

                {error && (
                    <div className="px-4 py-8 text-center">
                        <p className="text-sm font-semibold text-red-700">No se pudieron cargar los posts.</p>
                        <p className="mt-1 text-xs text-red-500">{error}</p>
                    </div>
                )}

                {!loading && !error && posts.length === 0 && (
                    <div className="px-8 py-16 text-center">
                        <p className="text-base font-semibold">Todavia no hay publicaciones.</p>
                        <p className="mt-2 text-sm leading-6 text-zinc-500">
                            Cuando existan posts en la base de datos apareceran aqui.
                        </p>
                    </div>
                )}

                <section>
                    {posts.map((post) => {
                        const user = users[post.user_id];
                        const imageUrl = post.images?.[0]?.url;
                        const likes = post.likes_count ?? post.likes?.length ?? 0;
                        const comments = post.comments_count ?? post.comments?.length ?? 0;

                        return (
                            <article className="border-b border-zinc-200 bg-white" key={post.id}>
                                <div className="flex items-center gap-3 px-4 py-3">
                                    <Link className="rounded-full bg-gradient-to-tr from-yellow-400 via-rose-500 to-fuchsia-600 p-[2px]" to={`/profile/${post.user_id}`}>
                                        <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-zinc-950 text-xs font-semibold text-white">
                                            {getInitials(user)}
                                        </span>
                                    </Link>
                                    <div className="min-w-0 flex-1">
                                        <Link className="block truncate text-sm font-semibold" to={`/profile/${post.user_id}`}>
                                            {user?.username ?? "usuario"}
                                        </Link>
                                        <p className="truncate text-xs text-zinc-500">{getFullName(user)}</p>
                                    </div>
                                    <span className="text-xs text-zinc-400">{formatDate(post.created_at)}</span>
                                </div>

                                <Link className="block bg-zinc-100" to={`/posts/${post.id}`}>
                                    {imageUrl ? (
                                        <img className="aspect-square w-full object-cover" src={imageUrl} alt={post.description || "Post"} />
                                    ) : (
                                        <div className="flex aspect-square w-full items-end bg-gradient-to-br from-zinc-900 via-rose-700 to-orange-500 p-6">
                                            <p className="line-clamp-6 text-3xl font-semibold leading-tight text-white">
                                                {post.description || "Postify"}
                                            </p>
                                        </div>
                                    )}
                                </Link>

                                <div className="px-4 py-3">
                                    <div className="mb-2 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <IoHeartOutline className="h-7 w-7" />
                                            <IoChatbubbleOutline className="h-7 w-7" />
                                            <IoPaperPlaneOutline className="h-7 w-7" />
                                        </div>
                                        <IoBookmarkOutline className="h-7 w-7" />
                                    </div>
                                    <p className="text-sm font-semibold">{likes} Me gusta</p>
                                    <p className="mt-1 text-sm leading-6">
                                        <Link className="font-semibold" to={`/profile/${post.user_id}`}>
                                            {user?.username ?? "usuario"}
                                        </Link>{" "}
                                        {post.description}
                                    </p>
                                    <Link className="mt-1 block text-sm text-zinc-500" to={`/posts/${post.id}`}>
                                        Ver {comments} comentarios
                                    </Link>
                                </div>
                            </article>
                        );
                    })}
                </section>
            </div>
        </main>
    );
};

export default Home;
