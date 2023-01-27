import TopBar from "../components/TopBar";
import styled from "styled-components";
import icon from "../assets/images/action.gif";

export default function MainPage() {
  return(
    <>
      <TopBar></TopBar>
      <Container>
        
        <Instrucoes>
          <Tittle>Site de compra e venda de items de jogos online!</Tittle>
          <Subtitle>Instruções:</Subtitle>
          <div>1. Termine seu cadastro para poder postar e comprar itens!</div>
          <div>2. Para comprar adicione creditos na seção de depósitos;</div>
          <div>3. Para vender anuncie seu item na seção de anuncios;</div>
          <div>4. Quando um usuario demonstrar interesse no seu item, um chat será aberto para voces marcarem a troca!</div>
          <div>5. É nescessario que o vendedor grave um video da tela na hora da transação;</div>
          <div>6. Para confirmar a transação é nescessario postar o video na seção de transações;</div>
          <div>7. Após verificação, o saldo será disponibilizado para saque.</div>
        </Instrucoes>
        <img alt="" src={icon}/>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    width: 600px;
  }
`;

const Instrucoes = styled.div`
  font-size: 20px;
  div{
    padding: 5px;
  }
`;

const Tittle = styled.div`
  font-size: 40px;
`;

const Subtitle = styled.div`
  font-size: 30px;
`;

