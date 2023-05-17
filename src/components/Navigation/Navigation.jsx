import React from 'react';
import "./Navigation.css";
import {DownloadOutlined, MenuOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";

const Navigation = () => {
    return (
        <nav>
            {/*<div className="inner">*/}
                <UserOutlined className="icon" />
                <MenuOutlined className="icon" />
                <DownloadOutlined className="icon" />
                <SettingOutlined className="icon" />
            {/*</div>*/}
        </nav>
    );
};

export default Navigation;