import { useContext, useState } from "react";
import { IComment } from "../../types/comment.type";
import "./Comments.scss";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../helpers/apihelper";
import moment from "moment";

const Comments = ({ postId }: { postId: number }) => {
  const [desc, setDesc] = useState<string>("");
  const { currentUser } = useContext(AuthContext);

  // fetching comments
  const { isLoading, data, error } = useQuery(["comments"], async () => {
    const res = await apiRequest.get(`/comments?postId=${postId}`);
    return res.data;
  });

  const queryClient = useQueryClient();

  // Adding comments
  const mutation = useMutation(
    (newComment: { desc: string; postId: number }) => {
      return apiRequest.post("/comments/add-comment", newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    mutation.mutate({ desc, postId });
    setDesc("");
  };
  return (
    <div className="comments">
      <div className="write">
        <img
          src={
            currentUser.profilePic
              ? currentUser.profilePic
              : "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          alt="Profile photo"
        />
        <input
          type="text"
          placeholder="write a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>Comment</button>
      </div>
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((comment: IComment) => (
            <div className="comment" key={comment.id}>
              <img src={comment.profilePicture} alt="" />
              <div className="info">
                <span>{comment.name}</span>
                <p>{comment.desc}</p>
              </div>
              <span className="date">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
          ))}
    </div>
  );
};

export default Comments;
