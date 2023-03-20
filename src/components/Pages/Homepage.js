import { useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
    Button,
    Card,
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
import { loginUser } from '../../features/userSlice';

const cx = classnames.bind(styles);

function Home() {
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    const { user } = useSelector((state) => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            navigate('/admin');
        }
    }, [user]);

    return (
        <div className={cx('homePage')}>
            <div className={cx('main')} style={{ alignItems: 'center', display: 'flex', width: '1033px' }}>
                <div>
                    <div className={cx('title')}>
                        <span style={{ fontSize: '34px', color: '#fd377e' }}>Bi</span>
                        <span style={{ fontSize: '34px', color: 'white' }}>nance</span>
                    </div>
                    <h1 className={cx('content')} style={{ color: 'white' }}>
                        Tập trung kiểm soát tài chính của bạn
                    </h1>
                    <p style={{ color: 'white', fontWeight: '400' }}>Nhanh chóng và an toàn</p>
                </div>
                <Col lg="5" md="7">
                    <Card className="bg-secondary shadow border-0">
                        <CardBody className="px-lg-5 py-lg-5">
                            <div className="text-center text-muted mb-4">
                                <small>Sign in with credentials</small>
                            </div>
                            <Form role="form">
                                <FormGroup className="mb-3">
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ni ni-email-83" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder="Email Or Username"
                                            type="email"
                                            autoComplete="new-email"
                                            onChange={(e) => SetEmail(e.target.value)}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ni ni-lock-circle-open" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder="Password"
                                            type="password"
                                            autoComplete="new-password"
                                            onChange={(e) => SetPassword(e.target.value)}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <div className="custom-control custom-control-alternative custom-checkbox">
                                    <input className="custom-control-input" id="customCheckLogin" type="checkbox" />
                                    <label className="custom-control-label" htmlFor="customCheckLogin">
                                        <span className="text-muted">Remember me</span>
                                    </label>
                                </div>
                                <div className="text-center">
                                    <Button
                                        className="my-4"
                                        color="primary"
                                        type="button"
                                        onClick={() => {
                                            dispatch(loginUser({ email, password }));
                                        }}
                                    >
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
