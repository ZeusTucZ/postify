import { Link, useParams } from "react-router";
import useFetch from "../hooks/useFetch";
import { GoHome } from "react-icons/go";
import { MdOutlineVideoStable } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";

const Profile = () => {
    const { userId } = useParams();
    const urlPosts = `http://localhost:8000/users/${userId}/posts`;

    const { data } = useFetch(urlPosts);
    const posts = Array.isArray(data) ? data : [];
    const displayName = "David";
    const postLabel = posts.length === 1 ? "Post" : "Posts";
    const tileStyles = [
        "bg-gradient-to-br from-pink-500 via-rose-500 to-orange-400",
        "bg-gradient-to-br from-sky-500 via-indigo-500 to-violet-500",
        "bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500",
        "bg-gradient-to-br from-amber-400 via-orange-500 to-red-500",
        "bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-600",
        "bg-gradient-to-br from-lime-500 via-emerald-500 to-slate-800",
    ];
    const iconButtonClass =
        "flex h-11 w-11 items-center justify-center rounded-full text-zinc-500 transition duration-200 hover:bg-zinc-100 hover:text-zinc-950";
    const activeIconButtonClass =
        "flex h-11 w-11 items-center justify-center rounded-full bg-zinc-950 text-white shadow-lg shadow-zinc-950/15 transition duration-200 hover:bg-zinc-800";
    const iconClass = "h-6 w-6";

    return (
        <main className="min-h-screen bg-[#f4f4f2] text-zinc-950">
            <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col border-x border-zinc-200/80 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
                <header className="sticky top-0 z-20 border-b border-zinc-200/80 bg-white/90 px-5 py-4 backdrop-blur-xl">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                                Profile
                            </p>
                            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950">
                                {displayName}
                            </h1>
                        </div>
                        <div className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-500">
                            @{displayName.toLowerCase()}
                        </div>
                    </div>
                </header>

                <section className="px-5 pb-6 pt-6">
                    <div className="flex items-center gap-5">
                        <div className="rounded-full bg-gradient-to-br from-fuchsia-500 via-rose-500 to-amber-400 p-[3px] shadow-xl shadow-rose-500/20">
                            <div className="flex h-24 w-24 items-center justify-center rounded-full border-[5px] border-white bg-zinc-950 text-4xl font-semibold text-white">
                                {displayName.charAt(0)}
                            </div>
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-2xl font-semibold tracking-tight">
                                {displayName}
                            </p>
                            <p className="mt-1 truncate text-sm text-zinc-500">
                                Momentos, ideas y vida diaria
                            </p>

                            <div className="mt-4 flex flex-wrap gap-2">
                                <span className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-700">
                                    Followers
                                </span>
                                <span className="rounded-full border border-zinc-900 bg-zinc-950 px-4 py-2 text-sm font-medium text-white">
                                    {posts.length} {postLabel}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="border-t border-zinc-200 bg-zinc-50/70 px-1 py-1">
                    {posts.length > 0 ? (
                        <div className="grid grid-cols-3 gap-1">
                            {posts.map((post, index) => (
                                <Link
                                    className="group relative aspect-square overflow-hidden bg-zinc-200 outline-none"
                                    key={post.id}
                                    to={`/posts/${post.id}`}
                                >
                                    <div className={`absolute inset-0 ${tileStyles[index % tileStyles.length]}`} />
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.38),transparent_42%),linear-gradient(to_top,rgba(0,0,0,0.62),transparent_58%)] transition duration-300 group-hover:bg-black/20" />
                                    <div className="relative flex h-full flex-col justify-between p-3 text-white">
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md">
                                            {index + 1}
                                        </span>
                                        <p className="line-clamp-3 text-xs font-medium leading-5 drop-shadow">
                                            {post.description || "Post"}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="flex min-h-[300px] flex-col items-center justify-center px-8 text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-zinc-200 bg-white text-2xl font-semibold text-zinc-900 shadow-sm">
                                {displayName.charAt(0)}
                            </div>
                            <p className="mt-4 text-sm font-medium text-zinc-950">
                                No hay posts todavia.
                            </p>
                            <p className="mt-1 text-sm leading-6 text-zinc-500">
                                Vuelve mas tarde para ver nuevas publicaciones.
                            </p>
                        </div>
                    )}
                </section>

                <nav className="sticky bottom-0 mt-auto flex h-16 flex-row items-center justify-around border-t border-zinc-200/90 bg-white/95 px-5 shadow-[0_-16px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                    <button className={activeIconButtonClass} type="button">
                        <GoHome className={iconClass} />
                    </button>
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
