import styled from "styled-components";
import { Container } from "react-bootstrap";
import ModalComponent from "../Modal/Modal";

const HeroComponent = styled.header`
  padding: 3rem 1rem;
  height: 100vh;
  background-image: url("https://images.unsplash.com/photo-1683386478393-432ce81a8dd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEzfGJvOGpRS1RhRTBZfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60");
  background-size: cover;
  background-position: center;
`;

const HeaderContainer = styled.div`
  background-color: orange;
  padding: 3rem 2rem;
  color: white;
  opacity: 1.0;
  width: 32.5rem;
`;

const Heading = styled.h1`
  font-size: 5rem;
`;

const SubHeading = styled.h3`
  margin: 1rem 0;
  font-weight: 400;
`;

const Hero = () => {
  return (
    <HeroComponent>
      <Container>
        <HeaderContainer>
          <Heading>Feed your mind with the best</Heading>
          <SubHeading>
            Grow, learn, and become more successful by reading some of the top
            article by highly reputable individuals
          </SubHeading>
          <ModalComponent text="Signup" variant="primary" isSignupFlow={true} />
          <ModalComponent text="Login" variant="danger" isSignupFlow={false} />
        </HeaderContainer>
      </Container>
    </HeroComponent>
  );
};

export default Hero;