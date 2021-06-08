import styled from "styled-components";

const FormContainer = styled.div`
    border: 1px solid black;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
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
    height: 300px;
    width: 300px;
    background: white;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 0 50px;
    justify-content: center;

    label {
        padding: 0 0 10px 0;
    }

    input {
        margin: 0 0 25px 0;
        padding: 4px 0;

        &[type="submit"] {
            background-color: #352323;
            color: white;
            border: none;
            padding: 6px;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;

            &:hover {
                background: #000000;
            }
        }
    }

`;

export default function Form({CloseCreateProjectModal, PostCreateProject, formNameValue, onFormNameChange, formDescriptionValue, onFormDescriptionChange}) {

    return (
      <FormContainer>
        <Background/>
        <FormBox>
            <Modal>
                <label>
                Project Name:
                </label>
                <input type="text" name="name" value={formNameValue} onChange={onFormNameChange}/>
                <label>
                Project Description:
                </label>
                <input type="text" name="description" value={formDescriptionValue} onChange={onFormDescriptionChange}/>
                <input type="submit" value="Submit" onClick={PostCreateProject} />
                <button onClick={CloseCreateProjectModal}>close</button>
            </Modal>
        </FormBox>
      </FormContainer>
    )
}
