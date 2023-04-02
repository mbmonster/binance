import { useEffect, useState } from 'react';
import Header from 'components/Headers/Header';
import { Button, Card, CardBody, Col, Container, Input, Row } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import { getAllTragop } from 'features/tragopSlice';

import Trello from '../components/Trello.js';
import NewTrello from '../components/NewTrello.js';

function Installment() {
    const dispatch = useDispatch();
    const [showButton, setShowButton] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [title, setTitle] = useState('');

    useEffect(() => {
        dispatch(getAllTragop());
    }, []);

    useEffect(() => {
        if (title === '') {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [title]);

    const renderAdd = () => {
        return (
            <div className="mt-3">
                <Input
                    className="mb-3"
                    type="textarea"
                    placeholder="Nhập tiêu đề cho khoản trả góp..."
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Button color="primary" disabled={disabled}>
                    Thêm trả góp
                </Button>
                <IoClose size={30} onClick={() => setShowButton(false)} />
            </div>
        );
    };
    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Row>
                    <Col xl="12">
                        <Card style={{ height: '100vh' }}>
                            <CardBody>
                                <Col xl="4">
                                    <Card style={{ backgroundColor: '#ebecf0' }}>
                                        <span className="text-nowrap mt-3 mb-0 ml-3">Các khoản trả góp</span>
                                        <CardBody>
                                            <Trello />
                                            {showButton ? renderAdd() : <></>}
                                            <Button
                                                className="btn-icon btn-3 mt-3"
                                                color="secondary"
                                                type="button"
                                                block
                                                onClick={() => setShowButton(true)}
                                                hidden={showButton}
                                            >
                                                <span className="btn-inner--icon">
                                                    <i className="ni ni-fat-add" />
                                                </span>
                                                <span className="btn-inner--text">Thêm mới</span>
                                            </Button>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Installment;
