import { Routes, Route } from "react-router-dom";
import BlogPostsMain from "./BlogPosts/BlogPostsMain";
import TargetSpawningSystem from "./BlogPosts/TargetSpawningSystem";
const DevBlog = () => {
  return (
    <Routes>
      <Route path={`/`} element={<BlogPostsMain />}></Route>
      <Route path={`/target-spawning-system`} element={<TargetSpawningSystem />} />
    </Routes>
  );
};

export default DevBlog;
