import { signIn, signOut, useSession } from "next-auth/client";
import styled from "styled-components";
import router, { useRouter } from 'next/router'
import { useState } from 'react';

const SignInContainer = styled.div`
  height: 80px;
  display: flex;
  justify-content: flex-end;
  padding: 0 10px 0 0;
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
  width: 175px;
  height: 175px;
  border: 1px solid black;
  position: absolute;
  top: 67px;
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
                    {/* <button onClick={signOutAndRedirect}>Sign Out</button> */}
                    { displaySettingsMenu ?
                      <SettingsMenu>
                        <div></div>
                      </SettingsMenu>
                    : ''}
                    <ProfileContainer>
                      {/* <p>{session.user.name}</p> */}
                      <ProfileImageContainer onClick={toggleSettingsMenu} style={{backgroundImage: `url(${session.user.image})`}}></ProfileImageContainer>
                    </ProfileContainer>
                </>
            )
        }
      </SignInContainer>
    )
  }
