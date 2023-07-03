import image_TargetSpawningSystem_teaser from "../../images/TargetSpawningSystem-teaser.png";
import { Link, useNavigate } from "react-router-dom";
import SEO from "../SEO";

const BlogPostsMain = () => {
  let navigate = useNavigate();

  const handleClick = async (event, path) => {
    navigate(path);
  };

  return (
    <>
      <SEO title={"Developer Blog | BeatShot"} type={"website"} description={"the rhythm-based aim-trainer"} />
      <div className="flex-container-column">
        <div className="hero-container">
          <div className="hero">
            <h1>BeatShot Developer Blog</h1>
          </div>
        </div>
        <div className="flex-container-row padding-1rem flex-wrap">
          <div
            className="card-container gap-1rem padding-1rem"
            onClick={(event) => handleClick(event, `/devblog/target-spawning-system`)}
          >
            <div className="card">
              <p className="sub-heading">
                Article
                <time dateTime="2023-07-02">July 2, 2023 </time>
              </p>
              <img src={image_TargetSpawningSystem_teaser} alt="image_TargetSpawningSystem_teaser" />
              <div className="card-label">
                <Link className="link" to="/devblog/target-spawning-system">
                  A look into BeatShot's target spawning system
                </Link>
              </div>
              <p className="card-sub-label">
                How are spawn locations decided for targets? How are targets managed? This article goes into detail
                about how this is accomplished in Unreal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPostsMain;
