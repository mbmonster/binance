import { Container, Row } from 'reactstrap';
import styles from './Pictures.module.scss';

import classnames from 'classnames/bind';
import Sidebar from 'components/Sidebar/Sidebar';
import routes from 'routes.js';
import { googleDriveConfigs } from '../configs/drive';
import { useEffect, useState } from 'react';
import { sampleSize } from 'lodash';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
const cx = classnames.bind(styles);

const Pictures = () => {
    const [images, setImages] = useState([]);
    const getImage = () => {
        const lst = sampleSize(googleDriveConfigs, 10);
        const lstHandle = lst.map((x) => {
            const fileIdMatch = x.match(/\/d\/([a-zA-Z0-9_-]+)\//);
            return fileIdMatch[1];
        });
        setImages(lstHandle);
    };

    useEffect(() => {
        getImage();
        console.log(images);
    }, []);
    return (
        <>
            <Sidebar
                // {...props}
                routes={routes}
                logo={{
                    innerLink: '/admin/index',
                    imgSrc: require('../assets/img/brand/argon-react.png'),
                    imgAlt: '...',
                }}
            />
            <Container className="main-content" fluid style={{ height: 'calc(100vh - 120px)' }}>
                <Row>
                    <div className="w-75">
                        <Swiper spaceBetween={20} slidesPerView={3} centeredSlides={true}>
                            {images.map((id) => (
                                <SwiperSlide key={id}>
                                    <img
                                        width={890}
                                        height={442}
                                        alt={id}
                                        src={`https://drive.google.com/uc?export=view&id=1dDdGn6RjN9VzpV4Tj7Dk8QPXb1p-T3tK`}
                                    ></img>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default Pictures;
