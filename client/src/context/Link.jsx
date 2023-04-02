import { Link } from "react-router-dom";
import { scrollToTop } from "../components/Functions";

function Link2({children, to, target}) {
    scrollToTop(0, 0, "auto")
    return (
        <Link to={to}
        target={target}
            style={{ textDecoration: "none", color: "inherit", cursor: "default" }} >
            {children}
        </Link>
    )
}

export default Link2