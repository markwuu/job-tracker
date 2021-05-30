import styled from "styled-components";
import Link from 'next/link';

const NavigationContainer = styled.div`
  border: 1px solid black;
  width: 20vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Panel = styled.div`
  border: 1px solid black;
  height: 10vh;
`;

const SettingsPanel = styled.div`
  border: 1px solid black;
  height: 10vh;
  margin-top: auto;
`;

export default function NavigationPanel() {
  return (
    <NavigationContainer>
        <Panel>Job Tracker</Panel>
        <Panel>
          <Link href="/">
            <a>Dashboard</a>
          </Link>
        </Panel>
        <Panel>
          <Link href="/algorithm">
            <a>Algorithms</a>
          </Link>
        </Panel>
        <Panel>
          <Link href="/job">
            <a>Jobs</a>
          </Link>
        </Panel>
        <Panel>
          <Link href="/project">
            <a>Projects</a>
          </Link>
        </Panel>
        <SettingsPanel>
          <Link href="/settings">
            <a>Settings</a>
          </Link>
        </SettingsPanel>
    </NavigationContainer>
  )
}
