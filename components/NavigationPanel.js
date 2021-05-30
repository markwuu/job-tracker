import styled from "styled-components";

const NavigationContainer = styled.div`
  border: 1px solid black;
  width: 20vw;
  height: 100vh;
`;

const Button = styled.button`
  color: grey;
`;

export default function NavigationPanel() {
  return (
    <NavigationContainer>
      <Button>Hi</Button>
        <div>Job Tracker</div>
        <div>Dashboard</div>
        <div>Algorithms</div>
        <div>Jobs</div>
        <div>Projects</div>
        <div>Settings</div>
    </NavigationContainer>
  )
}
