import { Link, useParams } from "react-router";
import useFetch from "../hooks/useFetch";
import { GoHome } from "react-icons/go";
import { MdOutlineVideoStable } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";

const Profile = () => {
    const {userId}  = useParams();
    const urlPosts = `http://localhost:8000/users/${userId}/posts`

    const { data } = useFetch(urlPosts);
    const iconButtonClass = "flex h-10 w-10 items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950";
    const iconClass = "h-6 w-6";

    console.log(data)

    return (
        <> 
            <div className="flex flex-col">
            <div className = "h-[80px]  bg-amber-500 flex gap-4">
                <div>David</div>
                <div>Followers</div>
                <div>Post</div>
            </div>
            <div className="h-[260px] flex bg-red-300">
                {data?.map((post) =>(
                    <Link key={post.id} to={`/posts/${post.id}`}>
                        <div className="h-[150px] w-[120px] bg-orange-800">{post.id}</div>
                    </Link>
                ))}
            </div>
            <div className = "h-[64px] border-t border-zinc-200 bg-white flex flex-row items-center justify-around shadow-sm" >
                <button className={`${iconButtonClass} bg-zinc-100 text-zinc-950`} type="button">
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
            </div>
            </div>
        </>
    )
}

export default Profile
