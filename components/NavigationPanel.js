import styled from "styled-components";
import Link from 'next/link';

const NavigationContainer = styled.div`
  /* border: 1px solid black; */
  min-width: 225px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #F8F8FA;
`;

const Panel = styled.div`
  /* border: 1px solid black; */
  height: 10vh;
  display: flex;
`;

const SettingsPanel = styled.div`
  /* border: 1px solid black; */
  height: 10vh;
  margin-top: auto;
  display: flex;
`;

const LogoPanel = styled.div`
  /* border: 1px solid red; */
`;

const InnerPanel = styled.div`
  /* border: 1px solid red; */
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

export default function NavigationPanel() {
  return (
    <NavigationContainer>
        <Panel>
          <LogoPanel>Job Tracker</LogoPanel>
        </Panel>
        <Panel>
          <InnerPanel>
            <Link href="/">
              <a>Dashboard</a>
            </Link>
          </InnerPanel>
        </Panel>
        <Panel>
          <InnerPanel>
            <Link href="/algorithms">
              <a>Algorithms</a>
            </Link>
          </InnerPanel>
        </Panel>
        <Panel>
          <InnerPanel>
            <Link href="/jobs">
              <a>Jobs</a>
            </Link>
          </InnerPanel>
        </Panel>
        <Panel>
          <InnerPanel>
            <Link href="/projects">
              <a>Projects</a>
            </Link>
          </InnerPanel>
        </Panel>
        <SettingsPanel>
          <InnerPanel>
            <Link href="/settings">
              <a>Settings</a>
            </Link>
          </InnerPanel>
        </SettingsPanel>
    </NavigationContainer>
  )
}
