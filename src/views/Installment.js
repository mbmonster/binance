import Header from 'components/Headers/Header';
import { Button, Card, CardBody, Col, Container, Row } from 'reactstrap';

import Trello from '../components/Trello.js';

function Installment() {
    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Row>
                    <Col xl="12">
                        <Card style={{ height: '100vh' }}>
                            <CardBody>
                                <Col xl="4">
                                    <Card style={{ backgroundColor: '#ebecf0' }}>
                                        <span class="text-nowrap mt-3 mb-0 ml-3">Các khoản trả góp</span>
                                        <CardBody>
                                            <Trello />
                                            <Button
                                                className="btn-icon btn-3 mt-3"
                                                color="secondary"
                                                type="button"
                                                block
                                            >
                                                <span className="btn-inner--icon">
                                                    <i className="ni ni-fat-add" />
                                                </span>
                                                <span className="btn-inner--text">Thêm mới</span>
                                            </Button>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Installment;
