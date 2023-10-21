import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import logo from "@/assets/javadock-icon.png";
import {LanguageSelector} from "@/shared/components/LanguageSelector.jsx";
import {useAuthDispatch, useAuthState} from "@/shared/state/context.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faUsers,
    faRightToBracket,
    faFileSignature,
    faIdCardClip,
    faRightFromBracket
} from "@fortawesome/free-solid-svg-icons"

export function NavBar() {
    const {t} = useTranslation();
    const authState = useAuthState();
    const dispatch = useAuthDispatch();

    const onClickLogout = () => {
        dispatch({type: "logout-success"})
    }

    return (
        <nav className="navbar navbar-expand-lg p-0">
            <div className="container-fluid" style={{backgroundColor: "#F8F6F4"}}>
                <Link className="navbar-brand" to="/">
                    <img src={logo} width={80}/>
                </Link>
                <ul className="navbar-nav mb-1 px-2 ms-auto">
                    <li className="navbar-nav-item text-center mt-2 mx-3">
                        <Link className="nav-link" to="users">
                            <div><FontAwesomeIcon icon={faUsers} size="lg"/></div>
                            <span>{t("users")}</span>
                        </Link>
                    </li>
                </ul>
                {authState.id === 0 &&
                    <>
                        <ul className="navbar-nav mb-1 px-2 ms-auto">
                            <li className="navbar-nav-item text-center mt-2 mx-3">
                                <Link className="nav-link" to="login">
                                    <div><FontAwesomeIcon icon={faRightToBracket} size="lg"/></div>
                                    <span>{t("login")}</span>
                                </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav mb-1 px-2 ms-auto">
                            <li className="navbar-nav-item text-center mt-2 mx-3">
                                <Link className="nav-link" to="register">
                                    <div><FontAwesomeIcon icon={faFileSignature} size="lg"/></div>
                                    <span>{t("register")}</span>
                                </Link>
                            </li>
                        </ul>
                    </>
                }
                {authState.id > 0 &&
                    <>
                        <ul className="navbar-nav mb-1 px-2 ms-auto">
                            <li className="navbar-nav-item text-center mt-2">
                                <Link className="nav-link">
                                    <div><FontAwesomeIcon icon={faRightFromBracket} size="lg"/></div>
                                    <span className="nav-link p-0" role="button"
                                          onClick={onClickLogout}>{t("logout")}</span>
                                </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav mb-1 px-2 ms-auto">
                            <li className="navbar-nav-item text-center mt-2 mx-3">
                                <Link className="nav-link" to={`/user/${authState.id}`}>
                                    <div><FontAwesomeIcon icon={faIdCardClip} size="lg"/></div>
                                    <span>{t("myProfile")}</span>
                                </Link>
                            </li>
                        </ul>
                    </>
                }
                <ul className="navbar-nav">
                    <li className="navbar-nav-item mb-2">
                        <LanguageSelector/>
                    </li>
                </ul>
            </div>
        </nav>
    )
}