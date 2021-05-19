import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="Site-footer footer themecolor">
            <div className="col-4">
                <Link to="/admin" > <a className="title text-light text-left">Admin</a></Link>
                <br />
                <Link to="/hoc" > <a className="title text-light text-left">Class HOC</a></Link>
                <br />
                <Link to="/functional-hoc" > <a className="title text-light text-left">functional HOC</a></Link>
                <br />
                <Link to="/context-hoc" > <a className="title text-light text-left">Context AND HOC</a></Link>
                <Link to="/class_context_Api" > <a className="title text-light text-left">class Context Api</a></Link>
            </div>
        </footer>
    )
}

export default Footer