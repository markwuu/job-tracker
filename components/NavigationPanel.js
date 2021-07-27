import styled from "styled-components";
import Link from 'next/link';

const NavigationContainer = styled.div`
  min-width: 225px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  position: fixed;

  @media (max-width: 600px) {
    min-width: 0px;
  }
`;

const Panel = styled.div`
  height: 80px;
  display: flex;
  margin: 3.5px auto;

  .logo-title {
    font-size: 21px;
    margin: 40px 0 0 0;
    text-transform: uppercase;

    @media (max-width: 600px) {
      display: none;
    }
  }
`;

const LogoPanel = styled.div`
  margin: auto;
  padding: 15px;
  min-width: 175px;
  text-align: center;

  .logo {
    background-image: url("../logo.png");
    width: 45px;
    height: 45px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    border: 2px solid #cad1dc;
    border-radius: 5px;

    @media (min-width: 600px) {
      display: none;
    }
  }

  .dashboard-logo {
    background-image: url("../dashboard-icon.png");
  }

  .algorithm-logo {
    background-image: url("../algorithm-icon.png");
  }

  .job-logo {
    background-image: url("../job-icon.png");
  }

  .project-logo {
    background-image: url("../project-icon.png");
  }

  .setting-logo {
    background-image: url("../setting-icon.png");
  }

  @media (max-width: 600px) {
    min-width: 65px;
  }

  @media (min-width: 600px) {
    display: none;
  }
`;

const InnerPanelActive = styled.div`
  background: #2976bb;
  color: #FFFFFF;
  margin: auto;
  padding: 10px;
  min-width: 175px;
  text-align: center;
  border-radius: 3.5px;
  font-size: 12px;
  letter-spacing: 0.2px;
  text-transform: uppercase;

  @media (max-width: 600px) {
    min-width: 0px;
    padding: 0px;
    border-radius: 0px;

    .panel-word {
      display: none;
    }
  }

`;

const InnerPanelInactive = styled.div`
  background: #5BB1FF;
  box-shadow: 0 3px 0px 0px;
  color: #7291c3;
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

  a {
    color: white;
  }

  @media (max-width: 600px) {
    min-width: 0px;
    background: none;
    box-shadow: none;
    padding: 0;
    /* display: none; */
    /* border: 1px solid black; */

    .panel-word {
      display: none;
    }

    &:hover {
      background: #d8e9f9;
      cursor: pointer;
      padding: 0;
      border-radius: 0px;
    }
  }
`;

const SettingsPanel = styled.div`
  margin-top: auto;
  display: flex;

  @media (min-width: 600px) {
    height: 10vh;
  }
`;

export default function NavigationPanel({page}) {

  return (
    <NavigationContainer>
        <Panel>
          <span class="logo-title">Job Tracker</span>
          <LogoPanel>
            <div class="logo"></div>
          </LogoPanel>
        </Panel>
        <Panel>
          { page !== 'home' ? (
            <Link href="/">
              <InnerPanelInactive>
                <a class="panel-word">Dashboard</a>
                <LogoPanel>
                  <div class="logo dashboard-logo"></div>
                </LogoPanel>
              </InnerPanelInactive>
            </Link>
          ) : (
            <Link href="/">
              <InnerPanelActive>
                <a class="panel-word">Dashboard</a>
                <LogoPanel>
                  <div class="logo dashboard-logo"></div>
                </LogoPanel>
              </InnerPanelActive>
            </Link>
          ) }
        </Panel>
        <Panel>
          { page !== 'algorithms' ? (
            <Link href="/algorithms">
              <InnerPanelInactive>
                <a class="panel-word">Algorithms</a>
                <LogoPanel>
                  <div class="logo algorithm-logo"></div>
                </LogoPanel>
              </InnerPanelInactive>
            </Link>
          ) : (
            <Link href="/algorithms">
              <InnerPanelActive>
                <a class="panel-word">Algorithms</a>
                <LogoPanel>
                  <div class="logo algorithm-logo"></div>
                </LogoPanel>
              </InnerPanelActive>
            </Link>
          ) }
        </Panel>
        <Panel>
          { page !== 'jobs' ? (
            <Link href="/jobs">
              <InnerPanelInactive>
                <a class="panel-word">Jobs</a>
                <LogoPanel>
                  <div class="logo job-logo"></div>
                </LogoPanel>
              </InnerPanelInactive>
            </Link>
          ) : (
            <Link href="/jobs">
              <InnerPanelActive>
                <a class="panel-word">Jobs</a>
                <LogoPanel>
                  <div class="logo job-logo"></div>
                </LogoPanel>
              </InnerPanelActive>
            </Link>
          ) }
        </Panel>
        <Panel>
          { page !== 'projects' ? (
            <Link href="/projects">
              <InnerPanelInactive>
                <a class="panel-word">Projects</a>
                <LogoPanel>
                  <div class="logo project-logo"></div>
                </LogoPanel>
              </InnerPanelInactive>
            </Link>
          ) : (
            <Link href="/projects">
              <InnerPanelActive>
                <a class="panel-word">Projects</a>
                <LogoPanel>
                  <div class="logo project-logo"></div>
                </LogoPanel>
              </InnerPanelActive>
            </Link>
          ) }
        </Panel>
        <SettingsPanel>
          { page !== 'settings' ? (
            <Link href="/settings">
              <InnerPanelInactive>
                <a class="panel-word">Setting</a>
                <LogoPanel>
                  <div class="logo setting-logo"></div>
                </LogoPanel>
              </InnerPanelInactive>
            </Link>
          ) : (
            <Link href="/settings">
              <InnerPanelActive>
                <a class="panel-word">Settings</a>
                <LogoPanel>
                  <div class="logo setting-logo"></div>
                </LogoPanel>
              </InnerPanelActive>
            </Link>
          ) }
        </SettingsPanel>
    </NavigationContainer>
  )
}
