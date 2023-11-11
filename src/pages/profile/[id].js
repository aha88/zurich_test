import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/authuser';
import { Button, Card, CardBody, Col, Container, Row } from 'react-bootstrap'
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useState } from 'react';


const Dasboard = ({ userOne }) => {
    const users = useSelector(selectUser);
    const router = useRouter();
    const [showEmail, setShowEmail] = useState(false);
    const toggleEmail = () => setShowEmail(!showEmail);

    return (
        <Container className='bbcontainer'>
            <Row className='bartop'>
                <Col md={1}>
                    <img src={users?.user?.image} height={40} />
                </Col>
                <Col md={10}>
                    <h2>Welcome {users?.user?.name} </h2>
                    <p>{users?.user?.email}</p>
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col>
                    <Button className='btn btn-secondary' onClick={() => router.back()}>
                        Click here to go back
                    </Button>
                </Col>
            </Row>
            <Row className='containerBody'>
                <Col key={userOne.id}>
                    <img key={userOne.avatar} width={140} height={140} src={userOne.avatar} />

                    <div className='text-left'>
                        <h1>
                            <strong>{userOne.first_name} {userOne.last_name}</strong>
                        </h1>
                        <p>
                            Email:    <span onClick={toggleEmail}>
                                {showEmail ? userOne.email : '**********'}
                            </span>
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Dasboard;

export const getServerSideProps = async ({ res, params }) => {

    const session = await getSession(res);

    if (!session) {
        return {
            redirect: {
                destination: '/'
            }
        }
    }
    const id = params.id
    const response = await axios.post(`${process.env.NEXT_APP_DASHBOARDAPP}api/profile`, { "id": id });
    const data = response.data;

    return {
        props: { userOne: data.data },
    }

}