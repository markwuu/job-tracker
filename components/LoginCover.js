import { signIn, signOut, useSession } from "next-auth/client";
import styled from "styled-components";

const Cover = styled.div`
    display: flex;
`;

const LeftPanel = styled.div`
    background-image: url('../keyboard.jpg');
    width: 50vw;
    height: 100vh;
    background-size: cover;

    @media (max-width: 600px) {
        width: 100vw;
        position: absolute;
    }
`;

const TransparentCover = styled.div`
    width: 50vw;
    height: 100vh;
    position: absolute;
    background-color: black;
    opacity: 0.3;

    @media (max-width: 600px) {
        width: 100vw;
    }
`;

const RightPanel = styled.div`
    width: 50vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f5f3ff;
    text-align: center;
    border-radius: 13px;

    div {
        padding: 10px;
        font-size: 40px;
        letter-spacing: 3px;
        font-weight: 200;
        text-transform: uppercase;

        @media (max-width: 600px) {
            font-size: 25px;
            font-weight: 400;
        }
    }

    p {
        padding: 0 10px;

        @media (max-width: 600px) {
            font-size: 16px;
        }
    }

    button {
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

        @media (max-width: 600px) {
            width: auto;
        }
    }

    @media (max-width: 600px) {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: auto;
        min-height: 100px;
        margin: 130px 50px;
        opacity: 0.90;
        box-shadow: 0px 0px 25px 15px #000;
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
