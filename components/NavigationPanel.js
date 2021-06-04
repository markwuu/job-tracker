import styled from "styled-components";
import Link from 'next/link';

const NavigationContainer = styled.div`
  /* border: 1px solid black; */
  min-width: 225px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
`;

const Panel = styled.div`
  /* border: 1px solid black; */
  height: 80px;
  display: flex;
`;

const LogoPanel = styled.div`
  /* border: 1px solid black; */
  margin: auto;
  padding: 10px;
  min-width: 175px;
  text-align: center;
  font-size: 21px;
  text-transform: uppercase;
`;

const InnerPanelActive = styled.div`
  background: #5BB1FF;
  color: #FFFFFF;
  margin: auto;
  padding: 10px;
  min-width: 175px;
  text-align: center;
  border-radius: 3.5px;
  font-size: 12px;
  letter-spacing: 0.2px;
  text-transform: uppercase;
`;

const InnerPanelInactive = styled.div`
  background: #5BB1FF;
  box-shadow: 0 3px 0px 0px;
  color: #cad1dc;
  margin: auto;
  padding: 10px;
  min-width: 175px;
  text-align: center;
  border-radius: 3.5px;
  font-size: 12px;
  letter-spacing: 0.2px;
  text-transform: uppercase;

  &:hover {
    background: #52a9f7;
    cursor: pointer;
  }
`;

const SettingsPanel = styled.div`
  height: 10vh;
  margin-top: auto;
  display: flex;
`;

export default function NavigationPanel({page}) {

  return (
    <NavigationContainer>
        <Panel>
          <LogoPanel>Job Tracker</LogoPanel>
        </Panel>
        <Panel>
          { page !== 'home' ? (
            <Link href="/">
              <InnerPanelInactive>
                  <a>Dashboard</a>
              </InnerPanelInactive>
            </Link>
          ) : (
            <Link href="/">
              <InnerPanelActive>
                <a>Dashboard</a>
              </InnerPanelActive>
            </Link>
          ) }
        </Panel>
        <Panel>
          { page !== 'algorithms' ? (
            <Link href="/algorithms">
              <InnerPanelInactive>
                  <a>Algorithms</a>
              </InnerPanelInactive>
            </Link>
          ) : (
            <Link href="/algorithms">
              <InnerPanelActive>
                  <a>Algorithms</a>
              </InnerPanelActive>
            </Link>
          ) }
        </Panel>
        <Panel>
          { page !== 'jobs' ? (
            <Link href="/jobs">
              <InnerPanelInactive>
                  <a>Jobs</a>
              </InnerPanelInactive>
            </Link>
          ) : (
            <Link href="/jobs">
              <InnerPanelActive>
                  <a>Jobs</a>
              </InnerPanelActive>
            </Link>
          ) }
        </Panel>
        <Panel>
          { page !== 'projects' ? (
            <Link href="/projects">
              <InnerPanelInactive>
                <a>Projects</a>
              </InnerPanelInactive>
            </Link>
          ) : (
            <Link href="/projects">
              <InnerPanelActive>
                <a>Projects</a>
              </InnerPanelActive>
            </Link>
          ) }
        </Panel>
        <SettingsPanel>
          { page !== 'settings' ? (
            <Link href="/settings">
              <InnerPanelInactive>
                <a>settings</a>
              </InnerPanelInactive>
            </Link>
          ) : (
            <Link href="/settings">
              <InnerPanelActive>
                <a>settings</a>
              </InnerPanelActive>
            </Link>
          ) }
        </SettingsPanel>
    </NavigationContainer>
  )
}
