import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.scss'
import '@/styles/mystyle.scss'
import { SessionProvider } from 'next-auth/react';
import { Footer } from '@/component/footer';
import { Header } from '@/component/header';
import { Provider } from 'react-redux'
import store from '@/store/store'


export default function App({ Component, pageProps: { session, ...pageProps }, }) {
  return <SessionProvider session={session}>
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  </SessionProvider>

}
