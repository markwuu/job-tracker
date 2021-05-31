import { signIn, signOut, useSession } from "next-auth/client";
import styled from "styled-components";

const SignInContainer = styled.div`
  /* border: 1px solid black; */
  height: 10vh;
  display: flex;
  justify-content: flex-end;
  padding: 0 10px 0 0;
`;

const ProfileContainer = styled.div`
  /* border: 1px solid black; */
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
  border-radius: 12px;
  background-position: center;
  background-size: contain;
  border: 2px solid #858A93;
`;

export default function NavigationTopBar() {
    const [session, loading] = useSession();

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
                    {/* <button onClick={signOut}>Sign Out</button> */}
                    <ProfileContainer>
                      <p>{session.user.name}</p>
                      <ProfileImageContainer style={{backgroundImage: `url(${session.user.image})`}}></ProfileImageContainer>
                    </ProfileContainer>
                </>
            )
        }
      </SignInContainer>
    )
  }
