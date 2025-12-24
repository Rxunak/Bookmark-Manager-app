import React, { useState } from "react";
import "../ProfileCard/profileCard.scss";
import profileImage from "../../assets/Images/image-avatar.webp";
import theme from "../../assets/Images/icon-theme.svg";
import lightTheme from "../../assets/Images/icon-light-theme.svg";
import darkTheme from "../../assets/Images/icon-dark-theme.svg";
import logout from "../../assets/Images/icon-logout.svg";

function ProfileCard({ menuRef }) {
  const [isThemeActive, setIsThemeActive] = useState(1);
  return (
    <div className="profileCardMain" ref={menuRef}>
      <div className="profileC">
        <img src={profileImage} alt="" className="profileCardImage" />
        <div className="profileInfoCard">
          <span className="profileName">Emily Carter</span>
          <span className="profileEmail">emily101@gmail.com</span>
        </div>
      </div>
      <div className="theme">
        <div className="themeTextContainer">
          <img src={theme} alt="" className="themeImage" />
          <span className="themeText">Theme</span>
        </div>

        <div>
          <label className="cardswitch">
            <input type="checkbox" />
            <span className="cardslider">
              <div
                className={`${
                  isThemeActive === 1
                    ? "iconContainerBackground"
                    : "iconContainer"
                }`}
              >
                <img
                  src={lightTheme}
                  alt=""
                  className="themeIcon"
                  onClick={() => setIsThemeActive(1)}
                />
              </div>

              <div
                className={`${
                  isThemeActive === 2
                    ? "iconContainerBackground"
                    : "iconContainer"
                }`}
              >
                <img
                  src={darkTheme}
                  alt=""
                  className="themeIcon"
                  onClick={() => setIsThemeActive(2)}
                />
              </div>
            </span>
          </label>
        </div>
      </div>
      <div className="logout">
        <img src={logout} alt="" className="logoutIcon" />
        <span className="logoutText">Logout</span>
      </div>
    </div>
  );
}

export default ProfileCard;
