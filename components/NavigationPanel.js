import styled from "styled-components";
import Link from 'next/link';

const NavigationContainer = styled.div`
  min-width: 225px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #F8F8FA;
  box-shadow: inset 0px 0px 10px #d1bbbb;
`;

const Panel = styled.div`
  height: 10vh;
  display: flex;
`;

const LogoPanel = styled.div`
  margin: auto;
  padding: 10px;
  min-width: 175px;
  text-align: center;
  font-size: 21px;
  text-transform: uppercase;
`;

const InnerPanelActive = styled.div`
  background: #2D48C5;
  color: #B3C1FF;
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
  background: #EAEEF9;
  box-shadow: 2.5px 3px;
  color: #858A93;
  margin: auto;
  padding: 10px;
  min-width: 175px;
  text-align: center;
  border-radius: 3.5px;
  font-size: 12px;
  letter-spacing: 0.2px;
  text-transform: uppercase;
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
            <InnerPanelInactive>
              <Link href="/">
                <a>Dashboard</a>
              </Link>
            </InnerPanelInactive>
          ) : (
            <InnerPanelActive>
              <Link href="/">
                <a>Dashboard</a>
              </Link>
            </InnerPanelActive>
          ) }
        </Panel>
        <Panel>
          { page !== 'algorithms' ? (
            <InnerPanelInactive>
              <Link href="/algorithms">
                <a>Algorithms</a>
              </Link>
            </InnerPanelInactive>
          ) : (
            <InnerPanelActive>
              <Link href="/algorithms">
                <a>Algorithms</a>
              </Link>
            </InnerPanelActive>
          ) }
        </Panel>
        <Panel>
          { page !== 'jobs' ? (
            <InnerPanelInactive>
              <Link href="/jobs">
                <a>Jobs</a>
              </Link>
            </InnerPanelInactive>
          ) : (
            <InnerPanelActive>
              <Link href="/jobs">
                <a>Jobs</a>
              </Link>
            </InnerPanelActive>
          ) }
        </Panel>
        <Panel>
          { page !== 'projects' ? (
            <InnerPanelInactive>
              <Link href="/projects">
                <a>Projects</a>
              </Link>
            </InnerPanelInactive>
          ) : (
            <InnerPanelActive>
              <Link href="/projects">
                <a>Projects</a>
              </Link>
            </InnerPanelActive>
          ) }
        </Panel>
        <SettingsPanel>
          { page !== 'settings' ? (
            <InnerPanelInactive>
              <Link href="/settings">
                <a>settings</a>
              </Link>
            </InnerPanelInactive>
          ) : (
            <InnerPanelActive>
              <Link href="/settings">
                <a>settings</a>
              </Link>
            </InnerPanelActive>
          ) }
        </SettingsPanel>
    </NavigationContainer>
  )
}
