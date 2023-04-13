import { useEffect, useState } from 'react';
import { sumBy } from 'lodash';
import { Button, Card, CardBody, Col, FormGroup, Input, Modal, Progress, Row } from 'reactstrap';
import { BsFillHeartPulseFill } from 'react-icons/bs';
import {
    TbNumber0,
    TbNumber1,
    TbNumber2,
    TbNumber3,
    TbNumber4,
    TbNumber5,
    TbNumber6,
    TbNumber7,
    TbNumber8,
    TbNumber9,
} from 'react-icons/tb';
import classnames from 'classnames/bind';
import Datetime from 'react-datetime';
import CurrencyInput from 'react-currency-input-field';
import { useDispatch } from 'react-redux';

import styles from './Installment.module.scss';
import { vnd } from '../Helpers/Index';
import { addThangTragop } from '../features/tragopSlice';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';

const cx = classnames.bind(styles);
function Installment({ data, handleLoad = () => {} }) {
    const [showModal, setShowModal] = useState();
    const [currentYear, setCurrentYear] = useState(new Date());
    const [amount, setAmount] = useState('0');
    const [disabled, setDisabled] = useState(true);

    const dispatch = useDispatch();
    useEffect(() => {
        if (amount === '0' || amount === '') {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [amount]);
    const calAmount = () => {
        const percentAmount = Math.round((data.items.length / data.totalMonth) * 100);
        if (percentAmount > 0) {
            return (
                <div className="progress-wrapper" style={{ width: '80%' }}>
                    <div className="progress-info">
                        <div className="progress-label">
                            <span>{vnd.format(data.amountMonth)} / Tháng</span>
                        </div>
                        <div className="progress-percentage">
                            <span>{percentAmount}%</span>
                        </div>
                    </div>
                    <Progress max="100" value={percentAmount} color="info" />
                </div>
            );
        } else {
            return (
                <div className={cx('btn-add-amount')} onClick={() => setShowModal((state) => !state)}>
                    <span className="mr-2">Đóng tiền</span>
                    <span className="btn-inner--icon">
                        <i className="ni ni-curved-next" />
                    </span>
                </div>
            );
        }
    };

    const arr = [
        {
            icon: <TbNumber1 />,
            color: '#2196f3',
        },
        {
            icon: <TbNumber2 />,
            color: '#8b7e74',
        },
        {
            icon: <TbNumber3 />,
            color: '#10cc52',
        },
        {
            icon: <TbNumber4 />,
            color: '#596FFF',
        },
        {
            icon: <TbNumber5 />,
            color: '#ff8980',
        },
        {
            icon: <TbNumber6 />,
            color: '#acb7ff',
        },
        {
            icon: <TbNumber7 />,
            color: '#3eb489',
        },
        {
            icon: <TbNumber8 />,
            color: '#ff8980',
        },
        {
            icon: <TbNumber9 />,
            color: '#8b7e74',
        },
        {
            icon: (
                <Row style={{ marginRight: '0' }}>
                    <TbNumber1 />
                    <TbNumber0 />
                </Row>
            ),
            color: '#596fff ',
        },
        {
            icon: (
                <Row style={{ marginRight: '0' }}>
                    <TbNumber1 />
                    <TbNumber1 />
                </Row>
            ),
            color: '#eace77',
        },
        {
            icon: (
                <Row style={{ marginRight: '0' }}>
                    <TbNumber1 />
                    <TbNumber2 />
                </Row>
            ),
            color: '#2aa6b7',
        },
    ];
    const handleRenderElement = (data) => {
        const color = arr[data.month - 1].color;
        return (
            <VerticalTimelineElement
                key={data.month}
                contentStyle={{ background: color, color: '#fff' }}
                contentArrowStyle={{ borderRight: `7px solid  ${color}` }}
                iconStyle={{ background: color, color: '#fff' }}
                iconClassName={cx('icon-custom')}
                icon={arr[data.month - 1].icon}
            >
                <span>{vnd.format(data.amount)}</span>
            </VerticalTimelineElement>
        );
    };
    return (
        <>
            <Card className={cx('card-custom')} onClick={() => setShowModal(true)}>
                <CardBody>
                    <Row className="justify-content-center pb-4">
                        <div
                            className="icon-shape text-white rounded-circle shadow"
                            style={{ width: '7rem', height: '7rem', fontWeight: '700', backgroundColor: '#43aaa0' }}
                        >
                            <BsFillHeartPulseFill />
                        </div>
                    </Row>
                    <Row className="justify-content-center">
                        <h2 className="text-uppercase">{data.title}</h2>
                    </Row>
                    <Row className="justify-content-center pb-4">{calAmount()}</Row>
                    <Row>
                        <Col xl="6" style={{ borderRight: '1px solid #c4c9cf' }}>
                            <Row className="justify-content-center">
                                <span style={{ fontWeight: '700' }}>
                                    {data.items.length} / {data.totalMonth}
                                </span>
                            </Row>
                            <Row className="justify-content-center">
                                {' '}
                                <p className="text-muted">Tháng</p>
                            </Row>
                        </Col>
                        <Col xl="6">
                            <Row className="justify-content-center">
                                <span style={{ fontWeight: '700' }}>
                                    {vnd.format(sumBy(data.items, (item) => Number(item.amount)))}
                                </span>
                            </Row>
                            <Row className="justify-content-center">
                                <p className="text-muted">Tổng tiền</p>
                            </Row>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <Modal
                size="lg"
                className="modal-dialog-centered"
                isOpen={showModal}
                toggle={() => setShowModal((state) => !state)}
            >
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                        Đóng tiền trả góp
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
                <div className="modal-body" style={{ paddingTop: '0' }}>
                    <Row>
                        <Col xl="6">
                            <label className="form-control-label">Tháng/Năm</label>
                            <Datetime
                                value={currentYear}
                                dateFormat="MM/YYYY"
                                timeFormat={false}
                                closeOnSelect
                                initialViewMode="years"
                                onChange={(e) => setCurrentYear(e.toDate())}
                            />
                        </Col>
                        <Col xl="6">
                            <FormGroup>
                                <label className="form-control-label">Tiền cần đóng</label>
                                <CurrencyInput
                                    placeholder="1.000.000"
                                    className="form-control"
                                    suffix=" đ"
                                    onValueChange={(value) => setAmount(value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <VerticalTimeline lineColor={data.items.length > 0 ? '#525f7f' : '#fff'}>
                            {data.items.map((item) => handleRenderElement(item))}
                        </VerticalTimeline>
                    </Row>
                </div>
                <div className="modal-footer">
                    <Button
                        color="primary"
                        type="button"
                        disabled={disabled}
                        onClick={() => {
                            dispatch(addThangTragop({ currentYear, amount, data })).then((data) => {
                                if (data.meta.requestStatus === 'fulfilled') {
                                    handleLoad(data.payload);
                                    setDisabled(true);
                                }
                            });
                        }}
                    >
                        Thêm mới
                    </Button>
                </div>
            </Modal>
        </>
    );
}

export default Installment;
