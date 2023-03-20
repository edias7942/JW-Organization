import { Link } from "react-router-dom";

function Link2({children, to, target}) {
    return (
        <Link to={to}
        target={target}
            style={{ textDecoration: "none", color: "inherit", cursor: "default" }} >
            {children}
        </Link>
    )
}

export default Link2