import { Link } from "react-router-dom";

function Link2({children, to}) {
    return (
        <Link to={to}
            style={{ textDecoration: "none", color: "inherit", cursor: "default" }} >
            {children}
        </Link>
    )
}

export default Link2