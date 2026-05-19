import { useParams } from "react-router";
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
                    <div key={post.id} className="h-[150px] w-[120px] bg-orange-800">{post.id}</div>
                ))}
            </div>
            <div className = "h-[50px] bg-blue-300" >
                <GoHome />
                <MdOutlineVideoStable />
                <IoIosSend />
                <CiSearch />
                <CiUser />
            </div>
            </div>
        </>
    )
}

export default Profile
