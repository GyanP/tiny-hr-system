import { Container, Nav as BootstrapNav, Navbar } from "react-bootstrap";
import { HAMBURGER_IMG } from "../../assets";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLoginStateAction } from "../../redux/action/loginAction";
import styles from "./header.module.css";

const Header = ({ handleToggle }: { handleToggle: any }) => {
  const { isLoggedIn } = useSelector((state: any) => state.login);
  const dispatch: any = useDispatch();
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    dispatch(setLoginStateAction(false));
    navigate("/");
  }

  return (
    <div>
      <Navbar
        className={`shadow-sm bg-white ${styles.navbarStyles}`}
        bg="light"
        variant="light"
      >
        <Container fluid>
          <BootstrapNav className="flex w-100 justify-content-start">
            <BootstrapNav.Item>
              <img
                onClick={handleToggle}
                role={"button"}
                src={HAMBURGER_IMG}
                alt="menu"
                className={styles.logoImg}
              />
            </BootstrapNav.Item>
          </BootstrapNav>

          <div
            className={`d-flex w-25 flex-row justify-content-end align-items-center`}
          >
            {isLoggedIn ? <span onClick={handleLogout} className={styles.logoutBtn} >Logout</span> : <Link to={"/login"} > Login</Link>}
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export { Header };