import React from "react";
import { Menu } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

const VerticalMenu = () => {
  const defaultKey = "My Activities";

  return (
    <div className="VerticalMenu">
      <Menu
        defaultSelectedKeys={[defaultKey]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        className="VerticalMenu__menu"
      >
        <Menu.Item
          key="Schedule"
          icon={<CalendarOutlined />}
          className="VerticalMenu__menu__menu-item"
          disabled
        >
          Schedule
        </Menu.Item>
      </Menu>
    </div>
  );
};

export { VerticalMenu as default };
