import styled from "styled-components";

const FormContainer = styled.div`
    border: 1px solid black;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    /* background: black;
    opacity: 0.45; */
`;

const Background = styled.div`
    background: black;
    opacity: 0.45;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;

const FormBox = styled.div`
    border: 1px solid black;
    position: absolute;
    z-index: 5;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
`;

const Modal = styled.div`
    margin: auto;
    /* border: 1px solid black; */
    height: 400px;
    width: 400px;
    background: white;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 60px 40px 0 40px;
`;

export default function Form() {

    const submitForm = () => {

    }

    return (
      <FormContainer>
        <Background/>
        <FormBox>
            <Modal>
                <label>
                Project Name:
                </label>
                <input type="text" name="name" />
                <label>
                Project Description:
                </label>
                <input type="text" name="name" />
                <input type="submit" value="Submit" onClick={submitForm} />
            </Modal>
        </FormBox>
      </FormContainer>
    )
}
