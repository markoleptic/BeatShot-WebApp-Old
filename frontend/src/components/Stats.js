import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthProvider";

const Stats = () => {
const { auth } = useAuthContext();

  useEffect(() => {
    const displayStats = async () => {
    };
    displayStats();
  }, []);

  return (
    <>
      <ul className="nav-links-left">
        <li className="nav-item-left">
          <Link className="text-link" to={`/profile/${auth.username}/stats/NarrowSpreadMultiBeat`}>
            Narrow Spread Multi Beat
          </Link>
        </li>
        <li className="nav-item-left">
          <Link className="text-link" to={`/profile/${auth.username}/stats/WideSpreadMultiBeat`}>
          Wide Spread Multi Beat
          </Link>
        </li>
      </ul>
    </>
  );
};
export default Stats;
