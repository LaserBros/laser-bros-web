import React from "react";
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Sidebar from './layouts/Sidebar';
import {
    Container,
    Row,
    Col,
} from 'react-bootstrap';
const Layout = ({ children }) => {

    return (
        <>
            <Header />
                <div className='maincontent_div'>
                    <section className="resources-main">
                        <Container>
                            <Row>
                                <Col xl="auto" lg={3} className="width-258 mb-3">
                                    <Sidebar />
                                </Col>
                                <Col xl="auto" lg={9} className="w-calc-100-258 mb-3">
                                    {children}
                                </Col>
                            </Row>
                        </Container>
                    </section>
                </div>
            <Footer />
        </>
    )
}
export default Layout;