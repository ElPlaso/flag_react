import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { HashLink as Link } from "react-router-hash-link";

export default function NavBar(props) {
  const { active } = props;
  return (
    <Navbar variant="dark" bg="dark">
      <Container>
        <Navbar.Brand className="welcome-header">
          <Link className="text-decoration-none text-light" to="/#play">
            FlagReact.
          </Link>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Link
              className={
                active === "home"
                  ? "text-light nav-link"
                  : "text-secondary nav-link"
              }
              to="/"
            >
              Play
            </Link>
            <Link
              className={
                active === "community"
                  ? "text-light nav-link"
                  : "text-secondary nav-link"
              }
              to="/community"
            >
              Community
            </Link>
            <Link
              className={
                active === "profile"
                  ? "text-light nav-link"
                  : "text-secondary nav-link"
              }
              to="/profile"
            >
              Profile
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
