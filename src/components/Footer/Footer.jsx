import React from 'react';
import "./Footer.css";
import {DownOutlined, FacebookOutlined, GlobalOutlined, LinkedinOutlined, TwitterOutlined} from "@ant-design/icons";

const Footer = () => {
    return (
        <footer>
            <div>
                <button>
                    <GlobalOutlined className="icon" />
                    <p>English</p>
                    <DownOutlined className="icon" />
                </button>
                <div className="links">
                    <h3>Navigation</h3>
                    <p>Home</p>
                    <p>FAQ</p>
                    <p>Investor Relations</p>
                    <p>Jobs</p>
                    <p>About us</p>
                    <p>Help centre</p>
                </div>
                <div className="links">
                    <h3>Legal</h3>
                    <p>Privacy Policy</p>
                    <p>Terms of Service</p>
                    <p>Cookie Preferences</p>
                    <p>Corporate information</p>
                </div>
                <div className="links">
                    <h3>Talk to us</h3>
                    <p>amina540346@gmail.com</p>
                    <p>87013166524</p>
                </div>
                <div className="links">
                    <h3>Follow us</h3>
                    <FacebookOutlined className="icon" />
                    <LinkedinOutlined className="icon" />
                    <TwitterOutlined className="icon" />
                </div>
            </div>
            <p>Made by Farabi Amina</p>
        </footer>
    );
};

export default Footer;