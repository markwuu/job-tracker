import styled from "styled-components";
import NavigationPanel from './NavigationPanel';
import NavigationTopBar from './NavigationTopBar';

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

export default function Layout({ children }) {
    console.log('children', children);

    return (
      <PageContainer>
        <NavigationPanel/>
        <NavTopPageContainer>
          <NavigationTopBar/>
          <NextPageContainer>
            {children}
          </NextPageContainer>
        </NavTopPageContainer>
      </PageContainer>
    )
}
