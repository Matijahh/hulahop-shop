import React, { useState } from "react";
import { get, map } from "lodash";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import cx from "classnames";

import { SidebarContainer } from "./styled";
import { SidebarTabList } from "./mock";

import Logo from "../../../assets/images/logo.png";
import { Link, useLocation } from "react-router-dom";
import { handlePublicRedirection } from "../../../utils/commonFunctions";
import { ROUTE_MAIN } from "../../../routes/routes";

const Sidebar = (props) => {
  const location = useLocation();
  const PageName = get(location, "pathname") && get(location, "pathname");
  const [toggle, setToggle] = useState(false);

  const handleSidebarToggle = () => {
    setToggle(!toggle);
  };

  const handleLogout = () => {
    localStorage.clear();
    handlePublicRedirection();
  };
  return (
    <SidebarContainer>
      <div className="menu-icon">
        {toggle ? (
          <CloseOutlinedIcon onClick={() => handleSidebarToggle()} />
        ) : (
          <MenuOutlinedIcon onClick={() => handleSidebarToggle()} />
        )}
      </div>
      <div className={cx("sidebar-container", toggle && "show-sidebar")}>
        <Link to={ROUTE_MAIN} target="_blank">
          <div className="logo-cover">
            <img src={Logo} />
          </div>
        </Link>
        <div className="tab-list">
          {map(SidebarTabList, (item, i) => (
            <Link
              to={item.path || "#"}
              key={`tab-item-${i}`}
              onClick={item.path === "#" && handleLogout}
            >
              <div
                className={`tab-item ${
                  PageName.includes(item.path || "#") && "active"
                }`}
              >
                {item.icon}
                <div className="title">{get(item, "name")}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
