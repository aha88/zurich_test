import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, selectUser } from '@/store/authuser';
import { Button, Card, CardBody, Col, Container, Row } from 'react-bootstrap'
import { useEffect } from 'react';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';


const Dasboard = ({ data }) => {
    const users = useSelector(selectUser);
    const { data: session, status } = useSession({ required: true });
    const dispatch = useDispatch();
    const [emailVisible, setEmailVisible] = useState({});

    const toggleEmail = (user) => {
        setEmailVisible((prevEmailVisible) => ({
            ...prevEmailVisible,
            [user]: !prevEmailVisible[user],
        }));
    };

    return (
        <Container>
            <Row className='bartop'>
                <Col md={1}>
                    <img src={users?.user?.image} height={40} />
                </Col>
                <Col md={10}>
                    <h2>Welcome {users?.user?.name} </h2>
                    <p>{users?.user?.email}</p>
                </Col>
            </Row>

            <Row className='containerBody text-center'>
                {data.data
                    .filter(user => user.last_name.startsWith('W') || user.first_name.startsWith('G'))
                    .map(user => (
                        <Col key={user.id} xs={7} sm={6} md={3} className='m-2'>
                            <Card className='shadow border-0'>
                                <CardBody>
                                    <Link href={`/profile/${user.id}`}>
                                        <p>
                                            Name: <strong>{user.first_name} {user.last_name}</strong>

                                        </p></Link>
                                    <p onClick={() => toggleEmail(user.id)}>
                                        Email: {emailVisible[user.id] ? user.email : '******'}
                                    </p>
                                    <Link href={`/profile/${user.id}`}>
                                        <img key={user.avatar} width={140} height={140} src={user.avatar} />
                                    </Link>
                                </CardBody>
                            </Card>
                        </Col>
                    ))
                }

            </Row>
        </Container>
    )

}

export default Dasboard;

export const getServerSideProps = async (res) => {

    const session = await getSession(res);

    if (!session) {
        return {
            redirect: {
                destination: '/'
            }
        }
    }


    const response = await axios.post(`${process.env.NEXT_APP_DASHBOARDAPP}api/dp`);
    const data = response.data;


    return {
        props: { session, data },
    }

}