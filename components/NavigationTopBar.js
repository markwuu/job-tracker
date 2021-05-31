import { signIn, signOut, useSession } from "next-auth/client";
import styled from "styled-components";

const SignInContainer = styled.div`
  /* border: 1px solid black; */
  height: 10vh;
`;

export default function NavigationTopBar() {
    const [session, loading] = useSession();
    console.log('session', session);

    return (
      <SignInContainer>
        {
            !session && (
                <>
                    Not signed in <br/>
                    <button onClick={signIn}>Sign In</button>
                </>
            )}
        {
            session && (
                <>
                    Signed in as {session.user.email} <br/>
                    <div>You can now access our super secret pages</div>
                    <button onClick={signOut}>Sign Out</button>
                </>
            )
        }
      </SignInContainer>
    )
  }
