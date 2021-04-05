import React from "react";
import { Avatar, PageHeader } from "antd";

const Header = () => {
  return (
    <div className="Header">
      <PageHeader
        ghost={false}
        title="PROJECT"
        extra={[
          <Avatar
            key="1"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            size={40}
          />,
        ]}
      ></PageHeader>
      <div className="Header__ant-page-header-heading-center">
        <p>Header here</p>
      </div>
    </div>
  );
};

export { Header as default };
