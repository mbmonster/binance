import { useEffect, memo } from 'react';
import classnames from 'classnames/bind';
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { BiArchiveIn, BiArchiveOut, BiTrash } from 'react-icons/bi';

import { getDaily, deleteDaily, getAllDailys } from '../features/dataSlice';
import styles from './Details.module.scss';
import { Timer } from '../assets/svg';
import { vnd } from '../Helpers/Index';
import { compact } from 'lodash';
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
        <>
            <Card className={cx('shadow', 'card-detail')}>
                <CardBody>
                    {dailys.items.map((it, index) => (
                        <Card key={index} className={cx('card-stats mb-4')}>
                            <CardBody>
                                <Row style={{ alignItems: 'center' }}>
                                    <div className="col">
                                        <CardTitle tag="h1" className="mb-0">
                                            {it.type}
                                        </CardTitle>
                                        <span className="h2 font-weight-bold mb-0">{vnd.format(it.amount)}</span>
                                    </div>
                                    <Col className="col-auto">
                                        {it.kind === 'Chi' ? (
                                            <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                                <BiArchiveOut />
                                            </div>
                                        ) : (
                                            <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                                                <BiArchiveIn />
                                            </div>
                                        )}
                                        <div
                                            className={cx(
                                                'icon icon-shape bg-danger text-white rounded-circle shadow ml-3',
                                                'btn-delete',
                                            )}
                                            onClick={() =>
                                                handleDelete({
                                                    amount: it.amount,
                                                    createDate: it.createDate,
                                                    kind: it.kind,
                                                    type: it.type,
                                                    parentId: it.parentId,
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
        </>
    );
}

export default memo(Details);
