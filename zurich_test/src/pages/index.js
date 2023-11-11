import React from 'react';
import Head from 'next/head'
import Image from 'next/image'
import { Button, Card, CardBody, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { addUser } from '@/store/authuser';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react';

export default function Home() {
  const { data: session, status } = useSession();

  const router = useRouter();
  const dispatch = useDispatch();



  useEffect(() => {
    if (status === "authenticated") {
      dispatch(addUser(session));
      router.push('./dashboard/dashboard');
    }
  }, [session])

  return (
    <Container >
      <Row>
        <Col className='fullscreen' md={{ span: 3, offset: 1 }}>

          <Card className='shadow boxcenter showdow  text-center'>
            <CardBody>
              <Row>
                <Col>
                  <h2 className='fs-2 fw-bold'>Auth login</h2>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button variant="primary" onClick={() => signIn('google')}>Sign-in</Button>
                </Col>
              </Row>
            </CardBody>
          </Card>


        </Col>
      </Row >

    </Container >
  )
}
