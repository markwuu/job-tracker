import { signIn, signOut, useSession } from "next-auth/client";

export default function NavigationTopBar() {
    const [session, loading] = useSession();
    console.log('session', session);

    return (
      <div style={{border: '1px solid black', width: '80vw', height: '10vh'}}>
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
      </div>
    )
  }
