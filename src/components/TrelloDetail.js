import { useState } from 'react';
import { Button, Card, CardBody, Col, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import Datetime from 'react-datetime';
import { BsFillCalendar2WeekFill } from 'react-icons/bs';

import { vnd } from '../Helpers/Index';

function TrelloDetail({ data }) {
    return (
        <Col xl="12">
            <Row style={{ alignItems: 'center' }}>
                {/* <Col
                    className="bg-success p-2 text-center"
                    xl="4"
                    style={{
                        borderRadius: '5px',
                        color: 'white',
                        fontWeight: 600,
                    }}
                >
                    {data.month}
                </Col> */}
                <Col xl="8" style={{ fontWeight: 600 }}>
                    {vnd.format(data.amount)}
                </Col>
            </Row>
        </Col>
    );
}

export default TrelloDetail;
