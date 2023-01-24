import { useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import TopBar from "../components/TopBar";
import useEnrollment from "../hooks/api/useEnrollment";
import usePostEnrollment from "../hooks/api/usePostEnrollment";
import { EnrollmentPost } from "../protocols";
import { FormPostGame, FormInfo, InputPostGame, Entrar  } from "./games";
import PaymentCreditCardPage from "../components/creditCardForm";

export default function ProfilePage() {
  const { userId } = useParams();
  const { enrollment } = useEnrollment();
  const { postEnrollment, postEnrollmentLoading } = usePostEnrollment();
  const [ postEnrollErrorMsg, setPostEnrollErrorMsg ] = useState([""]);
  const [ postPaymentErrorMsg, setPostPaymentErrorMsg ] = useState([""]);
  const [ colorMsg, setColorMsg ] = useState("red");
  const [ postNewEnroll, setPostNewEnroll ] = useState<EnrollmentPost>({ name: "", CPF: "", enrollmentUrl: "" });
  const [ displayAddCredit, setDisplayAddCredit ] = useState("flex");
  const [ displayBalance, setDisplayBalance ] = useState("none");

  function postEnrollForm(event : any) {
    event.preventDefault();
  }

  async function postEnroll() {
    try {
      await postEnrollment(postNewEnroll, "");
      setPostEnrollErrorMsg(["Cadastro alterado com sucesso!"]);
      setColorMsg("green");
    } catch (err) {
      console.log(err);
      setColorMsg("red");
      if(err.response?.data?.details) setPostEnrollErrorMsg(err.response.data.details);
      if(err.response.data==="InvalidCPF") setPostEnrollErrorMsg(["CPF inválido!"]);
      if(err.response.statusText ==="Unauthorized") setPostEnrollErrorMsg(["Seu Login expirou, refaça o login"]);  
    }
  }

  function displayChanges() {
    if(displayAddCredit==="flex") setDisplayAddCredit("none");
    if(displayAddCredit==="none") setDisplayAddCredit("flex");
    if(displayBalance==="none")setDisplayBalance("flex");
    if(displayBalance==="flex")setDisplayBalance("none");
  }

  useEffect(() => {
    if(enrollment)setPostNewEnroll({ ...postNewEnroll, name: enrollment.name,
      CPF: enrollment.CPF, enrollmentUrl: enrollment.enrollmentUrl });
  }, [enrollment]);

  return (
    <>
      <TopBar></TopBar>
      <Container>
        <EnrollmentContainer>
          <FormPostEnroll onSubmit={postEnrollForm}>
            <FormInfo>
              <div>Adicione as informações do cadastro:</div>
            </FormInfo>
            <InputPostGame value={postNewEnroll?.name} type="text" placeholder=" Digite o seu nome aqui..." onChange={(e) => {setPostNewEnroll({ ...postNewEnroll, name: e.target.value });}}/>
            <InputPostGame value={postNewEnroll?.CPF} type="text" placeholder=" Digite o seu CPF aqui..." onChange={(e) => {setPostNewEnroll({ ...postNewEnroll, CPF: e.target.value });}}/>
            <InputPostGame value={postNewEnroll?.enrollmentUrl} type="text" placeholder=" Digite a URL da imagem aqui..." onChange={(e) => {setPostNewEnroll({ ...postNewEnroll, enrollmentUrl: e.target.value });}}/>
            <Entrar disabled={postEnrollmentLoading} onClick={postEnroll} type="submit">
              {postEnrollmentLoading ? <Grid color="black" radius="10"></Grid> : "Alterar cadastro"}
            </Entrar>
            {postEnrollErrorMsg.map((msg) => <ErrorMessage color={colorMsg}>{msg}</ErrorMessage>) }
          </FormPostEnroll>
          <EnrollPayment display={displayAddCredit}>
            <div>Imagem de perfil:</div>
            <ImgContainer><img alt="" src={enrollment?.enrollmentUrl}/></ImgContainer>
            <div>Balanço: R${(enrollment?.balance*100).toFixed(2)}</div>
            <Button onClick={displayChanges}>Adicionar crédito</Button>
            <Button onClick={displayChanges}>Retirar crédito</Button>
          </EnrollPayment>
          <EnrollPayment display={displayBalance}>
            <PaymentCreditCardPage />
            <Button onClick={displayChanges}>Finalizar Pagamento</Button>    
            {postPaymentErrorMsg.map((msg) => <ErrorMessage color={colorMsg}>{msg}</ErrorMessage>) }    
          </EnrollPayment>
        </EnrollmentContainer>
      </Container>
      
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EnrollmentContainer = styled.div`
  width: 80% ;
  height: 80%;
  background-color: gray;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  object-fit: cover;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: gray;
  background: linear-gradient(#222222,#000000,#222222);
`;

const FormPostEnroll = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: center;
  justify-content: center;
  height: 90%;
  margin: 50px;
  border-radius: 15px;
  background: linear-gradient(#000000,#444444,#000000);
  box-shadow: 15px 15px 15px 0 rgba(0, 0, 0, 0.5);
`;

const ImgContainer = styled.div`
  width: 60%;
  img{
    width: 100%;
    object-fit: cover;
    border-radius: 50px;
  }
`;

const Button = styled.div`
  min-width: 100px;
  height: 50px;
  background: linear-gradient(#555555,#000000,#555555);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 15px;
  cursor: pointer;
  :hover{
    background: linear-gradient(#000000,#333333,#000000);
  }
  :active{
    background: linear-gradient(#000000,#666666,#000000);
  }
`;

export type ColorMsg = { color:string };

const ErrorMessage = styled.div.attrs((props: ColorMsg) => ({
  color: props.color
}))`
  margin-top: 20px;
  color: ${props => props.color};
  font-size: 25px;
  margin-bottom: 10px;
`;

export type Display = { display:string}

const EnrollPayment = styled.div.attrs((props: Display) => ({
  display: props.display
}))`
  width: 50%;
  height: 90%;
  display: ${props => props.display};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px;
  border-radius: 15px;
  background: linear-gradient(#000000,#444444,#000000);
  box-shadow: 15px 15px 15px 0 rgba(0, 0, 0, 0.5);
`;
