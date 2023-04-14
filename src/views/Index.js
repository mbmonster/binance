import { useEffect, useState } from 'react';
import classnames from 'classnames';
import Chart from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    NavItem,
    NavLink,
    Nav,
    Progress,
    Table,
    Container,
    Row,
    Col,
} from 'reactstrap';

import { chartOptions, parseOptions, chartExample2 } from 'variables/charts.js';
import { chartData } from 'variables/dataCharts.js';
import moment from 'moment';

import Header from 'components/Headers/Header.js';
import { useSelector } from 'react-redux';
import { find, flatMap, get, partition, remove, sumBy } from 'lodash';

const Index = (props) => {
    const { allWeek, isLoadingAll } = useSelector((state) => state.data);
    const [activeNav, setActiveNav] = useState(1);
    const [dataChart, setDataChart] = useState({
        labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'],
        datasets: [
            {
                label: 'Performance',
                data: [0, 0, 0, 0, 0, 0, 0],
            },
        ],
    });
    if (window.Chart) {
        parseOptions(Chart, chartOptions());
    }
    const toggleNavs = (e, index) => {
        e.preventDefault();
        setActiveNav(index);
    };
    useEffect(() => {
        const startOfWeek = moment().startOf('isoWeek');
        const endOfWeek = moment().endOf('isoWeek');

        let days = [];
        let day = startOfWeek;
        let arrData = [];
        while (day <= endOfWeek) {
            days.push(day.toDate());
            day = day.clone().add(1, 'd');
        }

        days.map((item) => {
            const finder = find(allWeek, { createDate: moment(item).format('YYYYMMDD') });
            if (finder !== undefined) {
                console.log(
                    remove(finder.items, function (currentObject) {
                        return currentObject.kind === 'Thu';
                    }),
                );
                return arrData.push(
                    sumBy(finder.items, function (o) {
                        return Number(o.amount);
                    }),
                );
            } else {
                arrData.push(0);
            }
            return true;
        });
        setDataChart({
            labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'],
            datasets: [
                {
                    label: 'Performance',
                    data: arrData,
                },
            ],
        });
    }, [isLoadingAll]);
    const data = {
        labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'],
        datasets: [
            {
                label: 'Performance',
                data: [0, 20, 10, 30, 15, 40, 20],
            },
        ],
    };
    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="mb-5 mb-xl-0" xl="8">
                        <Card className="bg-gradient-default shadow">
                            <CardHeader className="bg-transparent">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h6 className="text-uppercase text-light ls-1 mb-1">Tổng quan</h6>
                                        <h2 className="text-white mb-0">Số tiền đã chi</h2>
                                    </div>
                                    <div className="col">
                                        <Nav className="justify-content-end" pills>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames('py-2 px-3', {
                                                        active: activeNav === 2,
                                                    })}
                                                    data-toggle="tab"
                                                    href="#pablo"
                                                    onClick={(e) => toggleNavs(e, 2)}
                                                >
                                                    <span className="d-none d-md-block">Tuần</span>
                                                    <span className="d-md-none">W</span>
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </div>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                {/* Chart */}
                                <div className="chart">
                                    <Line
                                        data={dataChart}
                                        options={chartData.options}
                                        getDatasetAtEvent={(e) => console.log(e)}
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl="4">
                        <Card className="shadow">
                            <CardHeader className="bg-transparent">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h6 className="text-uppercase text-muted ls-1 mb-1">Tổng quan</h6>
                                        <h2 className="mb-0">Số tiền đã thu</h2>
                                    </div>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                {/* Chart */}
                                <div className="chart">
                                    <Bar data={chartExample2.data} options={chartExample2.options} />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col className="mb-5 mb-xl-0" xl="8">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h3 className="mb-0">Page visits</h3>
                                    </div>
                                    <div className="col text-right">
                                        <Button
                                            color="primary"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                            size="sm"
                                        >
                                            See all
                                        </Button>
                                    </div>
                                </Row>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Page name</th>
                                        <th scope="col">Visitors</th>
                                        <th scope="col">Unique users</th>
                                        <th scope="col">Bounce rate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">/argon/</th>
                                        <td>4,569</td>
                                        <td>340</td>
                                        <td>
                                            <i className="fas fa-arrow-up text-success mr-3" /> 46,53%
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">/argon/index.html</th>
                                        <td>3,985</td>
                                        <td>319</td>
                                        <td>
                                            <i className="fas fa-arrow-down text-warning mr-3" /> 46,53%
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">/argon/charts.html</th>
                                        <td>3,513</td>
                                        <td>294</td>
                                        <td>
                                            <i className="fas fa-arrow-down text-warning mr-3" /> 36,49%
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">/argon/tables.html</th>
                                        <td>2,050</td>
                                        <td>147</td>
                                        <td>
                                            <i className="fas fa-arrow-up text-success mr-3" /> 50,87%
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">/argon/profile.html</th>
                                        <td>1,795</td>
                                        <td>190</td>
                                        <td>
                                            <i className="fas fa-arrow-down text-danger mr-3" /> 46,53%
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                    <Col xl="4">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h3 className="mb-0">Social traffic</h3>
                                    </div>
                                    <div className="col text-right">
                                        <Button
                                            color="primary"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                            size="sm"
                                        >
                                            See all
                                        </Button>
                                    </div>
                                </Row>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Referral</th>
                                        <th scope="col">Visitors</th>
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Facebook</th>
                                        <td>1,480</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span className="mr-2">60%</span>
                                                <div>
                                                    <Progress max="100" value="60" barClassName="bg-gradient-danger" />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Facebook</th>
                                        <td>5,480</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span className="mr-2">70%</span>
                                                <div>
                                                    <Progress max="100" value="70" barClassName="bg-gradient-success" />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Google</th>
                                        <td>4,807</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span className="mr-2">80%</span>
                                                <div>
                                                    <Progress max="100" value="80" />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Instagram</th>
                                        <td>3,678</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span className="mr-2">75%</span>
                                                <div>
                                                    <Progress max="100" value="75" barClassName="bg-gradient-info" />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">twitter</th>
                                        <td>2,645</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span className="mr-2">30%</span>
                                                <div>
                                                    <Progress max="100" value="30" barClassName="bg-gradient-warning" />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Index;
