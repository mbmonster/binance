import { useEffect } from 'react';
import classnames from 'classnames/bind';

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Col,
} from 'reactstrap';
import styles from './homepage.module.scss';

const cx = classnames.bind(styles);

function Home() {
    return (
        <div className={cx('homePage')}>
            <div style={{ alignItems: 'center', display: 'flex', width: '1033px' }}>
                <div className={cx('content')}>
                    <div>
                        <span style={{ fontSize: '34px', color: '#fd377e' }}>Bi</span>
                        <span style={{ fontSize: '34px', color: 'white' }}>nance</span>
                    </div>
                    <h1 style={{ color: 'white' }}>Tập trung kiểm soát tài chính của bạnaaaa</h1>
                    <p style={{ color: 'white' }}>Nhanh chóng và an toàn</p>
                </div>
                <Col lg="5" md="7">
                    <Card className="bg-secondary shadow border-0">
                        <CardHeader className="bg-transparent pb-5">
                            <div className="text-muted text-center mt-2 mb-3">
                                <small>Sign in with</small>
                            </div>
                            <div className="btn-wrapper text-center">
                                <Button
                                    className="btn-neutral btn-icon"
                                    color="default"
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <span className="btn-inner--icon">
                                        <img
                                            alt="..."
                                            src={require('../../assets/img/icons/common/github.svg').default}
                                        />
                                    </span>
                                    <span className="btn-inner--text">Github</span>
                                </Button>
                                <Button
                                    className="btn-neutral btn-icon"
                                    color="default"
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <span className="btn-inner--icon">
                                        <img
                                            alt="..."
                                            src={require('../../assets/img/icons/common/google.svg').default}
                                        />
                                    </span>
                                    <span className="btn-inner--text">Google</span>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardBody className="px-lg-5 py-lg-5">
                            <div className="text-center text-muted mb-4">
                                <small>Or sign in with credentials</small>
                            </div>
                            <Form role="form">
                                <FormGroup className="mb-3">
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ni ni-email-83" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="Email Or Username" type="email" autoComplete="new-email" />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ni ni-lock-circle-open" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="Password" type="password" autoComplete="new-password" />
                                    </InputGroup>
                                </FormGroup>
                                <div className="custom-control custom-control-alternative custom-checkbox">
                                    <input className="custom-control-input" id="customCheckLogin" type="checkbox" />
                                    <label className="custom-control-label" htmlFor="customCheckLogin">
                                        <span className="text-muted">Remember me</span>
                                    </label>
                                </div>
                                <div className="text-center">
                                    <Button className="my-4" color="primary" type="button">
                                        Sign in
                                    </Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </div>
        </div>
    );
}

export default Home;
