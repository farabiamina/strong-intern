import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {selectUsername} from "../redux/sessionSlice";
import Header from "../components/Header/Header";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";

const PrivateRoute = ({navigation}) => {
    const username = useSelector(selectUsername);
    const location = useLocation();
    if (username !== null) {
        if (navigation) {
            return (
                <div className="body-container">
                    <Header />
                    <Navigation />
                    <Outlet />
                    <Footer/>
                </div>
            )
        }
        else {
            return (
                <div className="body-container">
                    <Outlet />
                </div>
            )
        }
    } else {
        return <Navigate to="/welcome" state={{ from: location }} replace />;
    }
};

export default PrivateRoute;
