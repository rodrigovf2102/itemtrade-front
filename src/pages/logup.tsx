import action from "../assets/images/action.gif";
import { Grid } from "react-loader-spinner";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/userApi";
import styled from "styled-components";
import { UserWithEmailAndToken, UserWithNoId, UserWithNoIdSignUp } from "../protocols";
import {
  Container,
  LeftContainer,
  Form,
  FormTitle,
  Input,
  ErrorMessage,
  Entrar,
  GoToSingUp,
} from "./login";

export default function Signup() {
  const [signup, setSignup] = useState<UserWithNoIdSignUp>({ email: "", password: "", confirmPassword: "" });
  const [disableForm, setDisableForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState<String[]>([]);
  const [corEntrar, setCorEntrar] = useState(1);
  const navigate = useNavigate();

  function loginInfo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  async function userLogup() {
    setCorEntrar(0.8);
    setDisableForm(true);
    try {
      if(signup.password !== signup.confirmPassword) {
        throw EqualPasswordsError();
      }
      const signUpAxios : UserWithNoId = { email: signup.email, password: signup.password }; 
      const userWithEmailAndToken = await signUp(signUpAxios);
      autorizado(userWithEmailAndToken);
    } catch (error) {
      unautorized(error);
    }
  }

  function EqualPasswordsError() {
    return {
      name: "Error",
      message: "As senhas não são iguais",
    };
  }

  function unautorized(error: any) {
    if (error.message === "Network Error") setErrorMessage(error.message);
    if (error.response?.data === "DuplicatedEmail") setErrorMessage(["Email já cadastrado"]);
    if (error.response?.data?.details) setErrorMessage(error.response.data.details);
    if (error.message === "As senhas não são iguais" ) setErrorMessage(error.message);

    setCorEntrar(1);
    setDisableForm(false);
  }

  function autorizado(userWithEmailAndToken: UserWithEmailAndToken) {
    const tokenAuthorization = {
      headers: {
        Authorization: `Bearer ${userWithEmailAndToken.token}`,
      },
      email: userWithEmailAndToken.email,
    };
    console.log(tokenAuthorization);
    setDisableForm(false);
    setCorEntrar(1);
    navigate("/signin");
  }

  return (
    <Container>
      <LeftContainer>
        <img src={action} alt="1" />
      </LeftContainer>
      <RightContainer>
        <Form onSubmit={loginInfo}>
          <FormTitle>Faça seu cadastro:</FormTitle>
          <Input
            type="text"
            placeholder=" e-mail"
            onChange={(event) => setSignup({ ...signup, email: event.target.value })}
            disabled={disableForm}
            required
          />
          <Input
            type="password"
            placeholder=" password"
            onChange={(event) => setSignup({ ...signup, password: event.target.value })}
            disabled={disableForm}
            required
          />
          <Input
            type="password"
            placeholder=" confirm password"
            onChange={(event) => setSignup({ ...signup, confirmPassword: event.target.value })}
            disabled={disableForm}
            required
          />
          {typeof errorMessage !== "string" ? (
            errorMessage.map((msg) => <ErrorMessage>{msg}</ErrorMessage>)
          ) : (
            <ErrorMessage>{errorMessage}</ErrorMessage>
          )}
          <Entrar disabled={disableForm} cor={corEntrar} onClick={userLogup} type="submit">
            {disableForm ? (
              <div>
                <Grid color="black" radius="10" height="90" width="90" />
              </div>
            ) : (
              "Cadastrar"
            )}
          </Entrar>
        </Form>
        <GoToSingUp
          onClick={() => {
            navigate("/signin");
          }}
        >
          Já tem uma conta? Vá para o login!
        </GoToSingUp>
      </RightContainer>
    </Container>
  );
}

const RightContainer = styled.div`
  width: 30%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #111111;
  border-radius: 20px;
`;
