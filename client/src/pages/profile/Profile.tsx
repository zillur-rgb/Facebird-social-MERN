import "./Profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../helpers/apihelper";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Profile = () => {
  const userId = Number(useLocation().pathname.split("/")[2]);
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["user"], async () => {
    const res = await apiRequest.get(`/users/${userId}`);
    return res.data;
  });

  const {
    isLoading: rIsLoading,
    error: rError,
    data: rData,
  } = useQuery(["relationships"], async () => {
    const res = await apiRequest.get(`/relationships?followedUserId=${userId}`);
    return res.data;
  });

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following: boolean) => {
      if (following)
        return apiRequest.delete(`/relationships?userId=${userId}`);
      return apiRequest.post("/relationships", { userId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["relationships"]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(rData.includes(currentUser.id));
  };
  return (
    <div className="profile">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "error"
      ) : (
        <>
          <div className="images">
            <img
              src={
                data.coverPic ||
                "https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }
              alt=""
              className="cover"
            />
            <img
              src={
                data.profilePic ||
                "https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
              }
              alt=""
              className="profilePic"
            />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
                <a href="http://facebook.com">
                  <FacebookTwoToneIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <InstagramIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <TwitterIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <LinkedInIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <PinterestIcon fontSize="large" />
                </a>
              </div>
              <div className="center">
                <span>{data?.name}</span>
                <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    <span>{data.city}</span>
                  </div>
                  <div className="item">
                    <LanguageIcon />
                    <span>{data.website}</span>
                  </div>
                </div>
                {rIsLoading ? (
                  "Loading..."
                ) : rError ? (
                  "Error"
                ) : userId === currentUser.id ? (
                  <button>Update</button>
                ) : (
                  <button onClick={handleFollow}>
                    {rData.includes(currentUser.id) ? "Following" : "Follow"}
                  </button>
                )}
              </div>
              <div className="right">
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
            </div>
            <Posts userId={userId} />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
