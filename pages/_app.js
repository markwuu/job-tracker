import '../styles/globals.css'
import { Provider } from "next-auth/client";
import NavigationPanel from '../components/NavigationPanel';
import NavigationTopBar from '../components/NavigationTopBar';
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
`;

const NavTopPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  height: 100vh;
  width: 100vw;
`;

const NextPageContainer = styled.div`
  border: 1px solid black;
  height: 90vh;
`;

function MyApp({ Component, pageProps }) {

  return (
    <Provider session={pageProps.session}>
      <PageContainer>
        <NavigationPanel/>
        <NavTopPageContainer>
          <NavigationTopBar {...pageProps}/>
          <NextPageContainer>
            <Component />
          </NextPageContainer>
        </NavTopPageContainer>
      </PageContainer>
    </Provider>
  );
}

export default MyApp
