import Posts from "../../components/posts/Posts";
import SharePost from "../../components/share-post/SharePost";
import Stories from "../../components/stories/Stories";
import "./home.scss";
const Home = () => {
  return (
    <div className="home">
      <Stories />
      <SharePost />
      <Posts />
    </div>
  );
};
export default Home;
