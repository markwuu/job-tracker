import '../styles/globals.css'
import { Provider } from "next-auth/client";
import NavigationPanel from '../components/NavigationPanel';
// import { signIn, signOut, useSession } from "next-auth/client";
import NavigationTopBar from '../components/NavigationTopBar';

function MyApp({ Component, pageProps }) {
  // const [session, loading] = useSession();
  // console.log('session', session);

  return (
    <Provider session={pageProps.session}>
      <div style={{display: 'flex'}}>
        <NavigationPanel/>

        <div style={{display: 'flex', flexDirection: 'column'}}>
          <NavigationTopBar {...pageProps} />
          <div style={{border: '1px solid black', width: '80vw', height: '90vh'}}>
            <Component />
          </div>
        </div>

      </div>
    </Provider>
  );
}

export default MyApp
