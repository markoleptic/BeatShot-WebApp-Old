//import { useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const SidebarHashLink = (props) => {
  //const location = useLocation();
  const semiBold = " fw-semibold";
  const activeClassName = "hover-blue link active";
  const inactiveClassName = "hover-blue link";

  const { path, hash, text, onScreen, topLevel = false } = props;

  const getSidebarClassName = () => {
    if (onScreen === true) {
      return topLevel ? activeClassName + semiBold : activeClassName;
    }
    return topLevel ? inactiveClassName + semiBold : inactiveClassName;
  };

  return (
    <HashLink to={path + hash} scroll={(el) => el.scrollIntoView()} className={getSidebarClassName()}>
      {text}
    </HashLink>
  );
};

export default SidebarHashLink;
