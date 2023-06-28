import { useLocation } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

const SidebarHashLink = (props) => {
    const location = useLocation();
    let {path, hash, id, text, onScreen} = props;
    const getSidebarClassName = () => {
        if (onScreen) {
            return "hover-blue link active";
        }
        return `${location.pathname}${location.hash}` === path + hash ? "hover-blue link active" : "hover-blue link";
    }
    return (
        <HashLink
            to={path + hash}
            id={id}
            scroll={(el) => el.scrollIntoView()}
            className={getSidebarClassName()}
            >
            {text}
        </HashLink>
    );
}

export default SidebarHashLink;