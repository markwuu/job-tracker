import styled from "styled-components";
import NavigationPanel from './NavigationPanel';
import NavigationTopBar from './NavigationTopBar';

const PageContainer = styled.div`
  display: flex;
`;

const NavTopPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  background-color: #e0e0e0;
`;

const NextPageContainer = styled.div`
  /* border: 1px solid black; */
  /* height: 90vh; */
`;

export default function Layout({ page, children }) {

    return (
      <PageContainer>
        <NavigationPanel page={page}/>
        <NavTopPageContainer>
          <NavigationTopBar/>
          <NextPageContainer>
            {children}
          </NextPageContainer>
        </NavTopPageContainer>
      </PageContainer>
    )
}
