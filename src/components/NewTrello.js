import { Fragment } from 'react';
import { Button, Card, CardBody, Col, Input, Row } from 'reactstrap';
import { IoClose } from 'react-icons/io5';

function NewTrello({ onHide }) {
    return (
        <div className="mt-3">
            <Input className="mb-3" type="textarea" placeholder="Nhập tiêu đề cho khoản trả góp..." />
            <Button color="primary">Thêm trả góp</Button>
            <IoClose size={30} />
        </div>
    );
}

export default NewTrello;
