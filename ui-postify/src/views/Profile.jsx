import { Link, useParams } from "react-router";
import useFetch from "../hooks/useFetch";
import { GoHome } from "react-icons/go";
import { MdOutlineVideoStable } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { CiSearch, CiUser } from "react-icons/ci";

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

const Profile = () => {
    const { userId } = useParams();
    const urlPosts = userId ? `${API_BASE}/users/${userId}/posts` : null;
    const urlUser = userId ? `${API_BASE}/users/${userId}` : null;

    const { data: postsData, loading: postsLoading } = useFetch(urlPosts);
    const { data: user, loading: userLoading } = useFetch(urlUser);
    const posts = Array.isArray(postsData) ? postsData : [];
    const displayName = getFullName(user);
    const username = user?.username ?? "usuario";
    const postLabel = posts.length === 1 ? "post" : "posts";
    const iconButtonClass =
        "flex h-11 w-11 items-center justify-center rounded-full text-zinc-500 transition duration-200 hover:bg-zinc-100 hover:text-zinc-950";
    const activeIconButtonClass =
        "flex h-11 w-11 items-center justify-center rounded-full bg-zinc-950 text-white shadow-lg shadow-zinc-950/15 transition duration-200 hover:bg-zinc-800";
    const iconClass = "h-6 w-6";

    return (
        <main className="min-h-screen bg-[#f6f6f4] text-zinc-950">
            <div className="mx-auto flex min-h-screen w-full max-w-[560px] flex-col border-x border-zinc-200 bg-white">
                <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/95 px-4 py-3 backdrop-blur">
                    <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                            <h1 className="truncate text-xl font-semibold tracking-tight">
                                {username}
                            </h1>
                            <p className="text-xs text-zinc-500">{displayName}</p>
                        </div>
                        <Link className="rounded-md border border-zinc-200 px-4 py-2 text-sm font-semibold hover:bg-zinc-50" to="/home">
                            Inicio
                        </Link>
                    </div>
                </header>

                <section className="px-4 py-6">
                    <div className="flex items-center gap-6">
                        <div className="rounded-full bg-gradient-to-tr from-yellow-400 via-rose-500 to-fuchsia-600 p-[3px]">
                            <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-zinc-950 text-3xl font-semibold text-white">
                                {getInitials(user)}
                            </div>
                        </div>

                        <div className="grid flex-1 grid-cols-3 gap-2 text-center">
                            <div>
                                <p className="text-lg font-semibold">{posts.length}</p>
                                <p className="text-xs text-zinc-500">{postLabel}</p>
                            </div>
                            <div>
                                <p className="text-lg font-semibold">0</p>
                                <p className="text-xs text-zinc-500">seguidores</p>
                            </div>
                            <div>
                                <p className="text-lg font-semibold">0</p>
                                <p className="text-xs text-zinc-500">seguidos</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5">
                        <p className="font-semibold">{displayName}</p>
                        <p className="mt-1 text-sm text-zinc-600">{user?.email ?? "Perfil de Postify"}</p>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-2">
                        <button className="rounded-md bg-zinc-100 px-4 py-2 text-sm font-semibold hover:bg-zinc-200" type="button">
                            Editar perfil
                        </button>
                        <button className="rounded-md bg-zinc-100 px-4 py-2 text-sm font-semibold hover:bg-zinc-200" type="button">
                            Compartir perfil
                        </button>
                    </div>
                </section>

                <section className="border-t border-zinc-200">
                    <div className="grid grid-cols-3 text-center text-xs font-semibold uppercase tracking-wide text-zinc-500">
                        <button className="border-t border-zinc-950 py-3 text-zinc-950" type="button">Posts</button>
                        <button className="py-3" type="button">Reels</button>
                        <button className="py-3" type="button">Tags</button>
                    </div>

                    {(postsLoading || userLoading) && (
                        <div className="grid grid-cols-3 gap-1 p-1">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div className="aspect-square animate-pulse bg-zinc-200" key={item} />
                            ))}
                        </div>
                    )}

                    {!postsLoading && posts.length > 0 ? (
                        <div className="grid grid-cols-3 gap-1 p-1">
                            {posts.map((post) => {
                                const imageUrl = post.images?.[0]?.url;

                                return (
                                    <Link
                                        className="group relative aspect-square overflow-hidden bg-zinc-200 outline-none"
                                        key={post.id}
                                        to={`/posts/${post.id}`}
                                    >
                                        {imageUrl ? (
                                            <img className="h-full w-full object-cover transition duration-300 group-hover:scale-105" src={imageUrl} alt={post.description || "Post"} />
                                        ) : (
                                            <div className="flex h-full w-full items-end bg-gradient-to-br from-zinc-900 via-rose-700 to-orange-500 p-3">
                                                <p className="line-clamp-4 text-xs font-semibold leading-5 text-white">
                                                    {post.description || "Post"}
                                                </p>
                                            </div>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    ) : null}

                    {!postsLoading && posts.length === 0 && (
                        <div className="flex min-h-[260px] flex-col items-center justify-center px-8 text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-zinc-300 text-2xl font-semibold">
                                {getInitials(user)}
                            </div>
                            <p className="mt-4 text-sm font-semibold">No hay posts todavia.</p>
                            <p className="mt-1 text-sm leading-6 text-zinc-500">
                                Las publicaciones reales de este usuario apareceran aqui.
                            </p>
                        </div>
                    )}
                </section>

                <nav className="sticky bottom-0 mt-auto flex h-16 flex-row items-center justify-around border-t border-zinc-200 bg-white/95 px-5 backdrop-blur">
                    <Link className={activeIconButtonClass} to="/home">
                        <GoHome className={iconClass} />
                    </Link>
                    <button className={iconButtonClass} type="button">
                        <MdOutlineVideoStable className={iconClass} />
                    </button>
                    <button className={iconButtonClass} type="button">
                        <IoIosSend className={iconClass} />
                    </button>
                    <button className={iconButtonClass} type="button">
                        <CiSearch className={iconClass} />
                    </button>
                    <button className={iconButtonClass} type="button">
                        <CiUser className={iconClass} />
                    </button>
                </nav>
            </div>
        </main>
    );
};

export default Profile;
