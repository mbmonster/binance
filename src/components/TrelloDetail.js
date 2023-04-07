import { useState } from 'react';
import { Button, Card, CardBody, Col, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import Datetime from 'react-datetime';
import { BsFillCalendar2WeekFill } from 'react-icons/bs';

import { vnd } from '../Helpers/Index';

function TrelloDetail({ onHide, data }) {
    const [currentYear, setCurrentYear] = useState(new Date());
    return (
        <Col xl="3" hidden={onHide}>
            <Card style={{ backgroundColor: '#ebecf0', alignItems: 'center' }}>
                <Col xl="8">
                    <FormGroup style={{ margin: '1rem' }}>
                        <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <BsFillCalendar2WeekFill />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Datetime
                                value={currentYear}
                                dateFormat="YYYY"
                                timeFormat={false}
                                closeOnSelect
                                onChange={(e) => setCurrentYear(e.toDate())}
                            />
                        </InputGroup>
                    </FormGroup>
                </Col>
                <CardBody style={{ width: '100%' }}>
                    {data.items.map((item, index) => (
                        <Card className="mb-2" key={index}>
                            <CardBody style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
                                <Row style={{ alignItems: 'center' }}>
                                    <Col
                                        className="bg-success p-2 text-center"
                                        xl="4"
                                        style={{
                                            borderRadius: '5px',
                                            color: 'white',
                                            fontWeight: 600,
                                        }}
                                    >
                                        {item.month}
                                    </Col>
                                    <Col xl="8" style={{ fontWeight: 600 }}>
                                        {vnd.format(item.amount)}
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    ))}
                    <Button className="btn-icon btn-3 mt-3" color="secondary" type="button" block>
                        <span className="btn-inner--icon">
                            <i className="ni ni-fat-add" />
                        </span>
                        <span className="btn-inner--text">Thêm mới</span>
                    </Button>
                </CardBody>
            </Card>
        </Col>
    );
}

export default TrelloDetail;
