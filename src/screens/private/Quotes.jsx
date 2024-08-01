import React from "react";
import {
    Container,
    Image
} from 'react-bootstrap';
import { Icon } from '@iconify/react';
import file1 from "../../assets/img/file1.jpg"
import { Link } from 'react-router-dom';
export default function Quotes() {
    return (
        <React.Fragment>
            <section className="myaccount ptb-50">
                <Container>
                   <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap">
                      <h2 className="quotes-head">Quotes</h2>
                      <Link to="/quotes/quotes-detail" className="btn btn-primary d-inline-flex align-items-center  justify-content-center min-width-159">Add New Quote</Link>
                    </div>
                    <div className="quotes-list flex-column flex-md-row">
                        <div className="quotes-img"><Image src={file1} className="img-fluid" alt="" /></div>
                        <div className="quotes-content text-center text-md-start mt-3 mt-md-0 ps-0 ps-md-4">
                            <div className="d-flex align-items-center justify-content-center  justify-content-md-between mb-3 flex-wrap">
                                <h2 className="mb-0">Quote 24-05-1576</h2>
                                <span className="quotes-date">
                                    May 27 2024
                                </span>
                            </div>
                            <p>Parts <span>1</span></p>
                            <Link to="/quotes/quotes-detail" className="btn btn-outline-primary min-width-159 d-inline-flex align-items-center justify-content-center">
                                <Icon icon="tabler:edit" />  Edit Quote
                            </Link>
                        </div>
                    </div>
                    <div className="quotes-list  flex-column flex-md-row">
                        <div className="quotes-img"><Image src={file1} className="img-fluid" alt="" /></div>
                        <div className="quotes-content text-center text-md-start mt-3 mt-md-0 ps-0 ps-md-4">
                            <div className="d-flex align-items-center justify-content-center  justify-content-md-between mb-3 flex-wrap">
                                <h2 className="mb-0">Quote 24-05-1576</h2>
                                <span className="quotes-date">
                                    May 27 2024
                                </span>
                            </div>
                            <p>Parts <span>1</span></p>
                            <Link to="/quotes/quotes-detail" className="btn btn-outline-primary min-width-159 d-inline-flex align-items-center justify-content-center">
                                <Icon icon="tabler:edit" />  Edit Quote
                            </Link>
                        </div>
                    </div>
                    <div className="quotes-list  flex-column flex-md-row">
                        <div className="quotes-img"><Image src={file1} className="img-fluid" alt="" /></div>
                        <div className="quotes-content text-center text-md-start mt-3 mt-md-0 ps-0 ps-md-4">
                            <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap">
                                <h2 className="mb-0">Quote 24-05-1576</h2>
                                <span className="quotes-date">
                                    May 27 2024
                                </span>
                            </div>
                            <p>Parts <span>1</span></p>
                            <Link to="/quotes/quotes-detail" className="btn btn-outline-primary min-width-159 d-inline-flex align-items-center justify-content-center flex-wrap">
                                <Icon icon="tabler:edit" />  Edit Quote
                            </Link>
                        </div>
                    </div>
                    <div className="quotes-list  flex-column flex-md-row">
                        <div className="quotes-img"><Image src={file1} className="img-fluid" alt="" /></div>
                        <div className="quotes-content text-center text-md-start mt-3 mt-md-0 ps-0 ps-md-4">
                            <div className="d-flex align-items-center justify-content-center  justify-content-md-between mb-3 flex-wrap">
                                <h2 className="mb-0">Quote 24-05-1576</h2>
                                <span className="quotes-date">
                                    May 27 2024
                                </span>
                            </div>
                            <p>Parts <span>1</span></p>
                            <Link to="/quotes/quotes-detail" className="btn btn-outline-primary min-width-159 d-inline-flex align-items-center justify-content-center">
                                <Icon icon="tabler:edit" />  Edit Quote
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>
        </React.Fragment>
    )
}