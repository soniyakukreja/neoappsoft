import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="Site-footer footer themecolor">
      <div className="row">
        <div className="col-3">
          <Link to="/admin">Admin</Link>
          <br />
          <Link to="/hoc"> Class HOC</Link>
          <br />
          <Link to="/functional-hoc"> functional HOC</Link>
          <br />
          <Link to="/context-hoc"> Context AND HOC</Link>
        </div>
        <div className="col-3">
          <Link to="/class_context_Api"> class Context Api</Link>
          <br />
          <Link to="/module-test"> using CSS Module </Link>
          <br />
          <Link to="/reducer-hook">Reducer hook</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
