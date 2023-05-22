import { ReactNode } from "react";
import SideNav from "@trendmicro/react-sidenav";
import { MENU_ICON1, MENU_ICON2 } from "../../assets";
import styles from "./sidebar.module.css";
import { NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = ({
    expanded,
    children,
}: {
    expanded: boolean;
    children: ReactNode;
}) => {

    const { isLoggedIn } = useSelector((state: any) => state.login);
    return (
        <>
            <div className="d-flex">
                <SideNav
                    className="h-100  bg-white reportsidenav"
                    defaultExpanded={false}
                    style={{ display: expanded ? "block" : "none", position: "relative" }}
                    onSelect={(selected: any) => {
                        // Add your code here
                    }}
                >
                    <SideNav.Nav className="mt-4 pt-3 bg-white" defaultSelected="home">
                        <NavLink as={Link} to="/" eventKey="home">
                            <img
                                src={MENU_ICON1}
                                alt="MENU_ICON1"
                            />
                        </NavLink>
                        {isLoggedIn && <NavLink as={Link} to="/list" className="mt-3" eventKey="home">
                            <img
                                src={MENU_ICON2}
                                alt="MENU_ICON2"
                            />
                        </NavLink>}

                    </SideNav.Nav>
                </SideNav>
                <main className={styles.pagewrapper}>{children}</main>
            </div>
        </>
    );
};


export { Sidebar };