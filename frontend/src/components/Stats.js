import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Stats = () => {
  const { id } = useParams();
  const displayStats = async () => {
  };
  return (
    <>
      <ul className="nav-links-left">
        <li className="nav-item-left">
          <Link className="text-link" to={`/profile/${id}/stats/NarrowSpreadMultiBeat`}>
            Narrow Spread Multi Beat
          </Link>
        </li>
        <li className="nav-item-left">
          <Link className="text-link" to={`/profile/${id}/stats/WideSpreadMultiBeat`}>
          Wide Spread Multi Beat
          </Link>
        </li>
      </ul>
    </>
  );
};
export default Stats;
