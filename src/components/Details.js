import { useEffect, memo } from 'react';
import classnames from 'classnames/bind';
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { BiTrash } from 'react-icons/bi';
import { compact } from 'lodash';

import { GiCoffeeCup, GiCakeSlice } from 'react-icons/gi';
import { BsFillFuelPumpDieselFill, BsPatchQuestion } from 'react-icons/bs';

import { getDaily, deleteDaily } from '../features/dataSlice';
import styles from './Details.module.scss';
import { Timer } from '../assets/svg';
import { vnd } from '../Helpers/Index';
const cx = classnames.bind(styles);

function Details({ currentDate }) {
    const { isLoading, dailys } = useSelector((state) => state.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDaily(currentDate));
    }, [currentDate]);

    const arr = compact(dailys.items);
    if (isLoading || arr.length === 0) {
        return (
            <Card className={cx('card-detail')} style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Timer />
            </Card>
        );
    }

    const handleDelete = (data) => {
        const obj = {
            ...data,
            currentDate,
        };
        dispatch(deleteDaily(obj));
    };
    return (
        <Card className={cx('shadow', 'card-detail')}>
            <CardBody>
                {dailys.items.map((it, index) => (
                    <Card
                        key={index}
                        className={cx('card-stats mb-4')}
                        style={{ backgroundColor: it.kind === 'Chi' ? '#ffe6c6' : '#cdf3b7', borderRadius: '1.375rem' }}
                    >
                        <CardBody>
                            <Row style={{ alignItems: 'center' }}>
                                <div className="col-auto">
                                    <GiCoffeeCup size={32} display={it.typeAmount == 'coffee' ? 'block' : 'none'} />
                                    <GiCakeSlice size={32} display={it.typeAmount == 'eat' ? 'block' : 'none'} />
                                    <BsFillFuelPumpDieselFill
                                        size={32}
                                        display={it.typeAmount == 'fuel' ? 'block' : 'none'}
                                    />
                                    <BsPatchQuestion size={32} display={it.typeAmount == 'other' ? 'block' : 'none'} />
                                </div>
                                <div className="col">
                                    <CardTitle tag="h1" className="mb-0">
                                        {it.type}
                                    </CardTitle>
                                    <span className="h2 font-weight-bold mb-0">{vnd.format(it.amount)}</span>
                                </div>
                                <Col className="col-auto">
                                    <div
                                        className={cx('icon icon-shape text-danger shadow ml-3', 'btn-delete')}
                                        onClick={() =>
                                            handleDelete({
                                                amount: it.amount,
                                                createDate: it.createDate,
                                                kind: it.kind,
                                                type: it.type,
                                                parentId: it.parentId,
                                                typeAmount: it.typeAmount,
                                            })
                                        }
                                    >
                                        <BiTrash />
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                ))}
            </CardBody>
        </Card>
    );
}

export default memo(Details);
