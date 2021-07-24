import { signIn, signOut, useSession } from "next-auth/client";
import styled from "styled-components";
import { useRouter } from 'next/router'
import { useState } from 'react';

const SignInContainer = styled.div`
  height: 80px;
  display: flex;
  justify-content: flex-end;
  padding: 0 25px 0 0;
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  p {
    font-size: 13px;
    padding-right: 10px;
    font-weight: 500;
  }
`;

const ProfileImageContainer = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 25px;
  background-position: center;
  background-size: contain;
  border: 2px solid #858A93;
`;

const SettingsMenu = styled.div`
  width: 150px;
  border: 1px solid #cad1dc;
  position: absolute;
  top: 67px;
  background-color: white;
  border-radius: 5px;
  font-size: 12px;

  div {
    padding: 15px 10px;
  }

  a {
    color: black;
  }

  #top-bar {
    border-bottom: 1px solid #cad1dc;

    span {
      font-weight: 600;
    }

    &:hover {
      background: #2976bb;
      cursor: pointer;
      color: white;
      border-radius: 5px 5px 0px 0px;
    }
  }

  #mid-bar {
    border-bottom: 1px solid #cad1dc;

    &:hover {
      background: #2976bb;
      cursor: pointer;
      color: white;
    }
  }

  #bottom-bar {
    &:hover {
      background: #2976bb;
      cursor: pointer;
      color: white;
      border-radius: 0px 0px 5px 5px;
    }
  }
`;

export default function NavigationTopBar() {
    const [session, loading] = useSession();
    const router = useRouter();
    const [displaySettingsMenu, setDisplaySettingsMenu] = useState(false);

    const signOutAndRedirect = () => {
      signOut();
      router.push('/');
    }

    const toggleSettingsMenu = () => {
      setDisplaySettingsMenu(!displaySettingsMenu);
    }

    const redirectToSettings = () => {
      router.push('/settings');
    }

    return (
      <SignInContainer>
        {
            !session && (
                <>
                    <button onClick={signIn}>Sign In</button>
                </>
            )}
        {
            session && (
                <>
                    { displaySettingsMenu ?
                      <SettingsMenu>
                        <div id="top-bar">Signed in as <span>{session.user.name}</span></div>
                        <div id="mid-bar" onClick={redirectToSettings}>Settings</div>
                        <div id="bottom-bar" onClick={signOutAndRedirect}>Logout</div>
                      </SettingsMenu>
                    : ''}
                    <ProfileContainer>
                      <ProfileImageContainer onClick={toggleSettingsMenu} style={{backgroundImage: `url(${session.user.image})`}}></ProfileImageContainer>
                    </ProfileContainer>
                </>
            )
        }
      </SignInContainer>
    )
  }
