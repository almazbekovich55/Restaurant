import React from 'react';
import AboutUs from '../pages/aboutUs/AboutUs';
import Delicious from "../pages/delicious/Delicious";
import Menu from '../pages/menu/Menu';
import Seller from '../pages/seller/seller';
import Interior from '../pages/interior/Interior';
import Visit from '../pages/visit/Visit';


const Main = () => {
    return (
        <div>
            <Delicious />
            <AboutUs />
            <Seller />
            <Menu />
            <Interior />
            <Visit />
        </div>
    );
};

export default Main;