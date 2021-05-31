import '../styles/globals.css'
import { Provider } from "next-auth/client";
import NavigationPanel from '../components/NavigationPanel';
import NavigationTopBar from '../components/NavigationTopBar';
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
`;

const NavTopPageContainer = styled.div`
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const NextPageContainer = styled.div`
  /* border: 1px solid black; */
  height: 90vh;
`;

function MyApp({ Component, pageProps }) {
console.log('🚀 => pageProps', pageProps);
console.log('🚀 => Component', Component);

  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp
