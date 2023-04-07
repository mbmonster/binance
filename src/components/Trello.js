import { Button, Card, CardBody, CardHeader, CardTitle, Col, Badge, Row } from 'reactstrap';
import classnames from 'classnames/bind';
import { FaArrowAltCircleRight } from 'react-icons/fa';

import style from './Details.module.scss';

const cx = classnames.bind(style);
function Trello({ data, showDetail = () => {} }) {
    return (
        <Card
            className={cx('trello-content', 'mb-2')}
            onClick={() => {
                showDetail(data);
            }}
        >
            <CardBody style={{ padding: '1rem' }}>
                <Row className="align-items-center">
                    <Col xl="10">
                        <CardTitle className="text-uppercase font-weight-bold mb-3">{data.title}</CardTitle>
                        <div className="text-nowrap font-weight-bold mr-2">
                            Số tháng đã đóng
                            <Badge color="success" className="ml-3">
                                {' '}
                                {data.items.length}
                            </Badge>
                        </div>
                    </Col>
                    <Col xl="2">
                        <div>
                            <FaArrowAltCircleRight size={30} />
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

export default Trello;
