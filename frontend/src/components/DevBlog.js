import { Routes, Route } from "react-router-dom";
import BlogPostsMain from "./BlogPosts/BlogPostsMain";
import TargetSpawningSystem from "./BlogPosts/TargetSpawningSystem";
import SEO from "./SEO";

const DevBlog = () => {
  return (
    <>
      <SEO title={"Developer Blog | BeatShot"} type={"website"} description={"the rhythm-based aim-trainer"} />
      <Routes>
        <Route path={`/`} element={<BlogPostsMain />}></Route>
        <Route path={`/target-spawning-system`} element={<TargetSpawningSystem />} />
      </Routes>
    </>
  );
};

export default DevBlog;
