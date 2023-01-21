import styled from "styled-components";
import action from "../assets/images/action.gif";
import { Grid } from "react-loader-spinner";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserWithEmailAndToken, UserWithNoId } from "../protocols";
import useSignIn from "../hooks/api/useSignIn";

export default function Signin() {
  const [signin, setSignin] = useState<UserWithNoId>({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState<String[]>([]);
  const [corEntrar, setCorEntrar] = useState(1);
  const { signInLoading, signIn } = useSignIn();
  const navigate = useNavigate();

  function loginInfo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  async function userLogin() {
    setCorEntrar(0.4);
    try {
      const userWithEmailAndToken = await signIn(signin.email, signin.password);
      autorizado(userWithEmailAndToken);
    } catch (error) {
      unautorized(error);
    }
  }
  function unautorized(error: any) {
    setCorEntrar(1);
    if (error.message === "Network Error") return setErrorMessage(error.message);
    if (error.response?.data === "InvalidCredentials") return setErrorMessage(["User or Password is invalid"]);
    if (error.response?.data?.details) return setErrorMessage(error.response.data.details);
    setErrorMessage(["Unknown error, try again latter"]);
  }

  function autorizado(userWithEmailAndToken: UserWithEmailAndToken) {
    const tokenAuthorization = {
      headers: {
        Authorization: `Bearer ${userWithEmailAndToken.token}`,
      },
      email: userWithEmailAndToken.email,
    };
    setCorEntrar(1);
    navigate("/main");
  }

  return (
    <Container>
      <LeftContainer>
        <img src={action} alt="1" />
      </LeftContainer>
      <RightContainer>
        <Form onSubmit={loginInfo}>
          <FormTitle>Faça seu login:</FormTitle>
          <Input type="text" placeholder=" e-mail" onChange={(event) => setSignin({ ...signin, email: event.target.value })} disabled={signInLoading} required />
          <Input type="password" placeholder=" password" onChange={(event) => setSignin({ ...signin, password: event.target.value })} disabled={signInLoading} required />
          {typeof errorMessage !== "string" ? errorMessage.map((msg) => <ErrorMessage>{msg}</ErrorMessage>) : <ErrorMessage>{errorMessage}</ErrorMessage>}
          <Entrar disabled={signInLoading} cor={corEntrar} onClick={userLogin} type="submit">
            {signInLoading ? (
              <div>
                <Grid color="black" radius="10" height="90" width="90" />
              </div>
            ) : (
              "Entrar"
            )}
          </Entrar>
        </Form>
        <GoToSingUp onClick={() => { navigate("/signup"); }}>Primeira vez? Crie uma conta!</GoToSingUp>
      </RightContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const LeftContainer = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightContainer = styled.div`
  width: 30%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #111111;
  border-radius: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;
const Input = styled.input`
  margin-top: 10px;
  width: 80%;
  height: 65px;
  background-color: white;
  border-radius: 6px;
  font-size: 20px;
  font-weight: 700;
  font-family: "Oswald";
`;

type PropTypeColor = { cor: number };

const Entrar = styled.button.attrs((props: PropTypeColor) => ({
  opacity: props.cor,
}))<PropTypeColor>`
  width: 80%;
  height: 65px;
  border-radius: 6px;
  border: none;
  background-color: #cececedb;
  opacity: ${(props) => props.cor};
  font-size: 27px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  div {
    display: flex;
    align-items: center;
    height: 30px;
    overflow: hidden;
  }
`;

const ErrorMessage = styled.div`
  margin-top: 20px;
  color: red;
  font-size: 20px;
  margin-bottom: 10px;
`;
const GoToSingUp = styled.div`
  margin-top: 20px;
  font-size: 20px;
  text-decoration-line: underline;
  color: white;
  display: flex;
  justify-content: center;
`;

const FormTitle = styled.div`
  font-size: 30px;
  padding-bottom: 30px;
`;

export {
  Container,
  LeftContainer,
  RightContainer,
  Form,
  FormTitle,
  Input,
  ErrorMessage,
  GoToSingUp,
  Entrar
};
