import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";
import styles from "./Header.module.scss";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    history.push("/sign-in");
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/articles" className={styles.logo}>
          <h5>Realworld Blog</h5>
        </Link>
        <nav>
          {currentUser ? (
            <ul className={styles.navList}>
              <li>
                <Link to="/new-article" className={styles.createBtn}>
                  Create article
                </Link>
              </li>
              <li className={styles.profile}>
                <Link
                  to={`/profile/${currentUser.username}`}
                  className={styles.profileLink}
                >
                  <span className={styles.username}>
                    {currentUser.username}
                  </span>
                  <img
                    src={
                      currentUser.image ||
                      "https://static.productionready.io/images/smiley-cyrus.jpg"
                    }
                    alt={currentUser.username}
                    className={styles.avatar}
                  />
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  Log Out
                </button>
              </li>
            </ul>
          ) : (
            <ul className={styles.navList}>
              <li>
                <Link to="/sign-in" className={styles.navLink}>
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/sign-up" className={styles.navLink_signUp}>
                  Sign Up
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
}
