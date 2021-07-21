import { signIn, signOut, useSession } from "next-auth/client";
import styled from "styled-components";

const Cover = styled.div`
    width: 100vw;
    display: flex;
`;

const LeftPanel = styled.div`
    background-image: url('../keyboard.jpg');
    width: 50vw;
    height: 100vh;
    background-size: cover;
`;

const TransparentCover = styled.div`
    width: 50vw;
    height: 100vh;
    position: absolute;
    background-color: black;
    opacity: 0.3;
`;

const RightPanel = styled.div`
    width: 50vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f5f3ff;

    div {
        width: 350px;
        /* margin-bottom: 25px; */
        text-align: center;
        font-size: 50px;
        letter-spacing: 3px;
        font-weight: 200;
        /* border: 1px solid black; */
        text-transform: uppercase;
    }

    p {
        /* border: 1px solid black; */
    }

    button {
        border: 1px solid black;
        width: 200px;
        margin-top: 25px;
        background-color: #807dff;
        color: white;
        padding: 10px;
        min-width: 100px;
        text-align: center;
        border-radius: 3.5px;
        font-size: 12px;
        letter-spacing: 0.2px;
        border: none;
        text-transform: uppercase;
        cursor: pointer;
        height: 35px;

        &:hover {
            background: #6460f3;
        }
    }
`;

export default function LoginCover({signIn}) {
    const [session, loading] = useSession();

    return (
      <Cover>
        <LeftPanel/>
        <TransparentCover/>
        <RightPanel>
            <div>Job Tracker</div>
            <p>for software engineers</p>
            <button onClick={signIn}>sign in</button>
        </RightPanel>
      </Cover>
    )
  }
