import { useEffect, useState } from 'react';
import Header from 'components/Headers/Header';
import { Button, Card, CardBody, Col, Container, FormGroup, Input, Modal, Row } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { getAllTragop, addTragop } from 'features/tragopSlice';
import classnames from 'classnames/bind';

import Trello from '../components/Trello.js';
import TrelloDetail from 'components/TrelloDetail.js';
import InstallmentNew from './InstallmentNew';
import styles from './Installment.module.scss';
import CurrencyInput from 'react-currency-input-field';

const cx = classnames.bind(styles);
function Installment() {
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(true);
    const [title, setTitle] = useState('');
    const [traGop, setTraGop] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [month, setMonth] = useState('0');
    const [amount, setAmount] = useState('0');

    useEffect(() => {
        dispatch(getAllTragop()).then((data) => {
            if (data.meta.requestStatus === 'fulfilled') {
                setTraGop(data.payload);
            }
        });
    }, []);

    useEffect(() => {
        if (title === '' || amount === '0' || amount === '' || month === '0' || month === '') {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [title, month, amount]);

    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Button color="danger" className="mb-3" onClick={() => setShowModal((state) => !state)}>
                    <span className="btn-inner--icon">
                        <i className="ni ni-bag-17" />
                    </span>
                    <span>Thêm trả góp</span>
                </Button>
                <Row>
                    {traGop.map((item, index) => (
                        <Col xl="3" className="pb-4" key={index}>
                            <InstallmentNew data={item} />
                        </Col>
                    ))}
                </Row>
                <Modal
                    className="modal-dialog-centered"
                    isOpen={showModal}
                    toggle={() => setShowModal((state) => !state)}
                >
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            Thêm mới khoản trả góp
                        </h5>
                        <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => setShowModal((state) => !state)}
                        >
                            <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <FormGroup>
                            <label className="form-control-label">Tiêu đề</label>
                            <Input
                                className="mb-3"
                                placeholder="VD: Máy tính"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormGroup>
                        <Row>
                            <Col xl="6">
                                <FormGroup>
                                    <label className="form-control-label">Số tháng cần đóng</label>
                                    <Input type="number" className="mb-3" onChange={(e) => setMonth(e.target.value)} />
                                </FormGroup>
                            </Col>
                            <Col xl="6">
                                <FormGroup>
                                    <label className="form-control-label">Số tiền cần đóng mỗi tháng</label>
                                    <CurrencyInput
                                        placeholder="1.000.000"
                                        className="form-control"
                                        suffix=" đ"
                                        onValueChange={(value) => setAmount(value)}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </div>
                    <div className="modal-footer">
                        <Button
                            color="primary"
                            type="button"
                            disabled={disabled}
                            onClick={() => {
                                dispatch(addTragop({ title, amount, month })).then((data) => {
                                    if (data.meta.requestStatus === 'fulfilled') {
                                        setTraGop([data.payload, ...traGop]);
                                    }
                                });
                                setShowModal(false);
                            }}
                        >
                            Thêm mới
                        </Button>
                    </div>
                </Modal>
            </Container>
        </>
    );
}

export default Installment;
