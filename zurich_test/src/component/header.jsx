import logo from '@/assets/logo.svg';
import Image from 'next/image';
import { Button } from 'react-bootstrap';
import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/');
    }

  }, [])

  return <nav className="navbar sticky-bottom bg-body-tertiary">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">
        <Image src={logo} height={30} alt='logo' />
      </a>

      {session ?
        <Button variant="outline-secondary" onClick={() => signOut()}>Sign-out</Button>
        : ''}
    </div>
  </nav>
}