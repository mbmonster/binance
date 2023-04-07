import { useEffect, useState } from 'react';
import Header from 'components/Headers/Header';
import { Button, Card, CardBody, Col, Container, Input, Row } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import { getAllTragop, addTragop } from 'features/tragopSlice';

import Trello from '../components/Trello.js';
import TrelloDetail from 'components/TrelloDetail.js';

function Installment() {
    const dispatch = useDispatch();
    const [showButton, setShowButton] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [title, setTitle] = useState('');
    const [traGop, setTraGop] = useState([]);
    const [showDetails, SetShowDetail] = useState(true);
    const [dataDetail, setDataDetail] = useState({});

    useEffect(() => {
        dispatch(getAllTragop()).then((data) => {
            if (data.meta.requestStatus === 'fulfilled') {
                setTraGop(data.payload);
            }
        });
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
                <Button
                    color="primary"
                    disabled={disabled}
                    onClick={() => {
                        dispatch(addTragop(title)).then((data) => {
                            if (data.meta.requestStatus === 'fulfilled') {
                                setTraGop([data.payload, ...traGop]);
                                setShowButton(false);
                                handleShowDetail(data.payload);
                            }
                        });
                    }}
                >
                    Thêm trả góp
                </Button>
                <IoClose size={30} onClick={() => setShowButton(false)} />
            </div>
        );
    };

    const handleShowDetail = (data) => {
        SetShowDetail(false);
        setDataDetail(data);
    };
    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Row>
                    <Col xl="12">
                        <Card style={{ height: '100vh' }}>
                            <CardBody>
                                <Row>
                                    <Col xl="4">
                                        <Card style={{ backgroundColor: '#ebecf0' }}>
                                            <span className="text-nowrap mt-3 mb-0 ml-3">Các khoản trả góp</span>
                                            <CardBody>
                                                {traGop.map((item, index) => (
                                                    <Trello key={index} data={item} showDetail={handleShowDetail} />
                                                ))}
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
                                    {!showDetails ? <TrelloDetail onHide={showDetails} data={dataDetail} /> : ''}
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Installment;
