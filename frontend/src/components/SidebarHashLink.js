//import { useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const SidebarHashLink = (props) => {
    
  //const location = useLocation();

  const activeClassName = "hover-blue link active";
  const inactiveClassName = "hover-blue link";

  let { path, hash, id, text, onScreen } = props;
  let { previous, current} = onScreen;

  const getSidebarClassName = () => {
    if (previous !== null) {
        if (current.isIntersecting && !previous.isIntersecting) {
                return activeClassName;
            }
        }
    else {
        if (current.isIntersecting) {
            return activeClassName;
        }
    }

    return inactiveClassName;
    /* return `${location.pathname}${location.hash}` === path + hash
      ? "activeClassName"
      : "inactiveClassName; */
  };

  return (
    <HashLink
      to={path + hash}
      id={id}
      scroll={(el) => el.scrollIntoView()}
      className={getSidebarClassName()}>
      {text}
    </HashLink>
  );
};

export default SidebarHashLink;
