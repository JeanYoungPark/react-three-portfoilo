import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { faBars, faCircleInfo, faEnvelope, faHouse, faListUl, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Header = () => {
    const navigate = useNavigate();
    const [isTablet, setIsTablet] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const handleOnClickMenu = () => {
        setIsActive(true);
    };

    const handleOnClickClose = () => {
        setIsActive(false);
    };

    const handleOnClickMenuList = (link: string) => {
        navigate(link);
        setIsActive(false);
    };

    useEffect(() => {
        const relativeMenuAction = () => {
            const windowWidth = window.innerWidth;
            setIsTablet(!(windowWidth > 1024));
        };

        relativeMenuAction();
        window.addEventListener("resize", relativeMenuAction);

        return () => {
            window.removeEventListener("resize", relativeMenuAction);
        };
    }, []);

    return (
        <>
            <div id='menu'>
                {!isTablet && (
                    <nav>
                        <NavLink to='/' className={({ isActive }) => (isActive ? "active" : "")}>
                            Home
                        </NavLink>
                        <NavLink to='/about'>About</NavLink>
                        <NavLink to='/Projects'>Projects</NavLink>
                        <NavLink to='/contact'>Contact</NavLink>
                    </nav>
                )}
                <div id='hamburger' onClick={handleOnClickMenu}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
            </div>
            <div id='menu-popup' className={`${isActive ? "active" : ""} `}>
                <div id='close' onClick={handleOnClickClose}>
                    <FontAwesomeIcon icon={faXmark} />
                </div>
                <ul>
                    <li style={{ zIndex: 4 }} onClick={() => handleOnClickMenuList("/")}>
                        <span>
                            <FontAwesomeIcon icon={faHouse} />
                        </span>{" "}
                        Home
                    </li>
                    <li style={{ zIndex: 3 }} onClick={() => handleOnClickMenuList("/about")}>
                        <span>
                            <FontAwesomeIcon icon={faCircleInfo} />
                        </span>{" "}
                        About
                    </li>
                    <li style={{ zIndex: 2 }} onClick={() => handleOnClickMenuList("/projects")}>
                        <span>
                            <FontAwesomeIcon icon={faListUl} />
                        </span>{" "}
                        Portfolio
                    </li>
                    <li style={{ zIndex: 1 }} onClick={() => handleOnClickMenuList("/contact")}>
                        <span>
                            <FontAwesomeIcon icon={faEnvelope} />
                        </span>{" "}
                        Contact
                    </li>
                </ul>
            </div>
        </>
    );
};
