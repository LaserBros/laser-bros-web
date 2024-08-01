import React from "react";
import Header from './layouts/Header2';

const Layout = ({ children }) => {

    return (
        <>
                    <Header/>
                    <div className='maincontent_div'>
                        {children}
                    </div>
        </>
    )
}
export default Layout;