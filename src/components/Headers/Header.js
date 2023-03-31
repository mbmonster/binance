import { useEffect, useState, useMemo } from 'react';
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';
import { useSelector } from 'react-redux';
import { BsCalendar2Date, BsCalendar2Month, BsCalendar2Week } from 'react-icons/bs';
import { flatMap, get, partition, sumBy } from 'lodash';

import { vnd } from '../../Helpers/Index';
import { Loading } from '../../assets/svg';
import { isBreakStatement } from 'typescript';

const Header = () => {
    const { allMonth, allWeek, allDailys, isLoadingAll } = useSelector((state) => state.data);

    const totalAmount = ({ time, kind }) => {
        if (!isLoadingAll) {
            let arrData;
            switch (time) {
                case 'date':
                    arrData = allDailys.items;
                    break;
                case 'week':
                    arrData = flatMap(allWeek, (obj) => get(obj, 'items', []));

                    break;
                case 'month':
                    arrData = flatMap(allMonth, (obj) => get(obj, 'items', []));
                    break;
                default:
                    break;
            }
            const data = partition(arrData, function (item) {
                return item.kind === 'Thu';
            });

            return sumBy(data[kind], function (o) {
                return Number(o.amount);
            });
        }
    };

    return (
        <>
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
                <Container fluid>
                    <div className="header-body">
                        {/* Card stats */}
                        <Row>
                            <Col lg="6" xl="4">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardBody>
                                        <Row>
                                            <CardTitle tag="h4" className="text-uppercase mb-3">
                                                trong ngày
                                            </CardTitle>
                                        </Row>

                                        <Row>
                                            <div className="col">
                                                <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                                                    Tổng chi
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">
                                                    {isLoadingAll ? (
                                                        <Loading height={20} />
                                                    ) : (
                                                        vnd.format(totalAmount({ time: 'date', kind: 1 }))
                                                    )}
                                                </span>
                                            </div>
                                            <div className="col">
                                                <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                                                    Tổng thu
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">
                                                    {isLoadingAll ? (
                                                        <Loading height={20} />
                                                    ) : (
                                                        vnd.format(totalAmount({ time: 'date', kind: 0 }))
                                                    )}
                                                </span>
                                            </div>
                                            <Col className="col-auto">
                                                <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                                    <BsCalendar2Date />
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="6" xl="4">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardBody>
                                        <Row>
                                            <CardTitle tag="h4" className="text-uppercase mb-3">
                                                trong tuần
                                            </CardTitle>
                                        </Row>

                                        <Row>
                                            <div className="col">
                                                <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                                                    Tổng chi
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">
                                                    {isLoadingAll ? (
                                                        <Loading height={20} />
                                                    ) : (
                                                        vnd.format(totalAmount({ time: 'week', kind: 1 }))
                                                    )}
                                                </span>
                                            </div>
                                            <div className="col">
                                                <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                                                    Tổng thu
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">
                                                    {isLoadingAll ? (
                                                        <Loading height={20} />
                                                    ) : (
                                                        vnd.format(totalAmount({ time: 'week', kind: 0 }))
                                                    )}
                                                </span>
                                            </div>
                                            <Col className="col-auto">
                                                <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                                    <BsCalendar2Week />
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="6" xl="4">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardBody>
                                        <Row>
                                            <CardTitle tag="h4" className="text-uppercase mb-3">
                                                trong tháng
                                            </CardTitle>
                                        </Row>

                                        <Row>
                                            <div className="col">
                                                <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                                                    Tổng chi
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">
                                                    {isLoadingAll ? (
                                                        <Loading height={20} />
                                                    ) : (
                                                        vnd.format(totalAmount({ time: 'month', kind: 1 }))
                                                    )}
                                                </span>
                                            </div>
                                            <div className="col">
                                                <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                                                    Tổng thu
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">
                                                    {isLoadingAll ? (
                                                        <Loading height={20} />
                                                    ) : (
                                                        vnd.format(totalAmount({ time: 'month', kind: 0 }))
                                                    )}
                                                </span>
                                            </div>
                                            <Col className="col-auto">
                                                <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                                    <BsCalendar2Month />
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </>
    );
};

export default Header;
