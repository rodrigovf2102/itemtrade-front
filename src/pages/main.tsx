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
          <div>2. Para comprar, adicione créditos na seção de depósitos!</div>
          <div>3. Para vender, anuncie seu item na seção de Items!</div>
          <div>4. Para comprar, selecione um item na seção de Items e confirme compra!</div>
          <div>5. Quando um usuario comprar seu item, a negociação aparecerá na seção de vendas!</div>
          <div>6. Quando você comprar um item, a negociação aparecerá na seção de compras!</div>
          <div>7. Um chat de negociação será aberto para que vocês marquem a troca do item!</div>
          <div>8. O crédito do vendedor só será liberado após os dois confirmarem que a troca ocorreu!</div>
          <div>9. O crédito pode ser sacado para sua conta bancária na seção do perfil!</div>
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

