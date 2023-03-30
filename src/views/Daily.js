import { useEffect, useState } from 'react';
import Header from 'components/Headers/Header.js';
import { Button, Card, CardBody, Col, Container, FormGroup, Input, Row } from 'reactstrap';
import classnames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import Datetime from 'react-datetime';
import CurrencyInput from 'react-currency-input-field';

import { addDaily } from '../features/dataSlice';
import Details from '../components/Details';

const cx = classnames.bind('');
function Daily() {
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('0');
    const [btnAdd, setBtnAdd] = useState(true);
    const [kind, setKind] = useState('');
    const [currentDate, setCurrentDate] = useState(new Date());
    const dispatch = useDispatch();
    const handleAdd = () => {
        dispatch(addDaily({ type, amount, kind, currentDate }));
    };
    useEffect(() => {
        if (
            type.length === 0 ||
            amount === '0' ||
            amount === '' ||
            kind === 'Chọn' ||
            kind === '' ||
            currentDate === ''
        ) {
            setBtnAdd(true);
        } else {
            setBtnAdd(false);
        }
    }, [type, amount, kind, currentDate]);

    const handleChangeDate = (e) => {
        setCurrentDate(e.toDate());
    };
    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Row>
                    <Col xl="6">
                        <Card className="shadow">
                            <CardBody>
                                <div>
                                    <Row>
                                        <Col md="12">
                                            <FormGroup>
                                                <h2 className="mb-0">Mô tả</h2>
                                                <Input
                                                    id="exampleFormControlInput1"
                                                    placeholder="Xăng xe..."
                                                    onChange={(e) => setType(e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="5">
                                            <FormGroup>
                                                <h2 className="mb-0">Thành tiền</h2>
                                                {/* <Input
                                                    id="exampleFormControlInput1"
                                                    type="number"
                                                    value={amount}
                                                    onChange={(e) => setAmount(e.target.value)}
                                                /> */}
                                                <CurrencyInput
                                                    placeholder="10.0000"
                                                    onValueChange={(value) => setAmount(value)}
                                                    className="form-control"
                                                    suffix=" đ"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="5">
                                            <h2 className="mb-0">Ngày</h2>
                                            <Datetime
                                                value={currentDate}
                                                dateFormat="DD/MM/YYYY"
                                                timeFormat={false}
                                                onChange={(e) => handleChangeDate(e)}
                                                closeOnSelect
                                            />
                                        </Col>
                                        <Col md="2">
                                            <h2 className="mb-0">Loại</h2>
                                            <select
                                                style={{
                                                    border: '1px solid rgba(22, 24, 35, 0.12)',
                                                    borderRadius: '4px',
                                                    padding: '9px 9px',
                                                    width: '100%',
                                                }}
                                                onChange={(e) => setKind(e.target.value)}
                                            >
                                                <option>Chọn</option>
                                                <option>Thu</option>
                                                <option>Chi</option>
                                            </select>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <Button
                                                disabled={btnAdd}
                                                block
                                                color="danger"
                                                type="button"
                                                onClick={() => handleAdd()}
                                            >
                                                Thêm mới
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="mb-5 mb-xl-0" xl="6">
                        <Details currentDate={currentDate}></Details>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Daily;
