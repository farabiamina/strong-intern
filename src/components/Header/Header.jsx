import React from 'react';
import "./Header.css";
import {BellOutlined, GiftOutlined, SearchOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header>
            <div className="flex">
                <div className="left">
                    <div className="logo">
                        Dramatic
                    </div>
                    <div className="links">
                        <Link to="/main" className="link">Home</Link>
                        <Link to="/movies" className="link">Movies</Link>
                        <Link to="/tvShows" className="link">TV Show</Link>
                        <a className="link" href="">New</a>
                    </div>
                </div>
                <div className="right">
                    <div className="search">
                        <input placeholder="search" type="text"/>
                        <SearchOutlined className="search-icon"/>
                    </div>
                    <div className="user-icons">
                        <GiftOutlined className="icon" />
                        <BellOutlined className="icon" />
                        <UserOutlined className="icon large"/>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;