import { useQuery } from "@tanstack/react-query";
import { IPost } from "../../types/post.type";
import Post from "../post/Post";
import "./Posts.scss";
import { apiRequest } from "../../helpers/apihelper";

const Posts = ({ userId }: { userId: number }) => {
  const { isLoading, error, data } = useQuery(["posts"], async () => {
    const res = await apiRequest.get(`/posts?userId=${userId}`);
    console.log("res", res.data);

    return res.data;
  });

  return (
    <div className="posts">
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((post: IPost) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
