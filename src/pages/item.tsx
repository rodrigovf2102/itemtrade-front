import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import TopBar from "../components/TopBar";
import useItems from "../hooks/api/useItems";

export default function ItemPage() {
  const { itemId } = useParams();
  const { items, getItems } = useItems();

  useEffect(() => {
    async function LoadItems() {
      await getItems(0, "Todos", "", itemId as string);
    }
    LoadItems();
  }, []);

  return (
    <>
      <TopBar></TopBar>
      <Container>
        
        {items ? <ItemContainer>
          <ItemInfo>
            <Title>Informações sobre o Item:</Title>
            <Info>{items[0].name}</Info>
            <Info>Jogo: {items[0].Game.name}</Info>
            <Info>Servidor: {items[0].Server.name}</Info>
            <ImageContainer><img alt="" src={items[0].itemUrl}/></ImageContainer>
            <Info>Preço: R${(items[0].price/100).toFixed(2)}</Info>
            <Info>Quantidade: {items[0].amount}</Info>
            <Button>Comprar Item</Button>
          </ItemInfo>
          <SellerInfo>
            <Title>Informações sobre o vendedor:</Title>
            <Info>Nome: {items[0].Enrollment.name}</Info>
            <ImageContainer><img alt="" src={items[0].Enrollment.enrollmentUrl}/></ImageContainer>
            <Button>Ver perfil</Button>
          </SellerInfo>
        </ItemContainer>
          : 
          <div>Carregando...</div>}
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

const ItemContainer = styled.div`
  width: 50%;
  height: 80%;
  background: linear-gradient(45deg,#333333,#111111,#333333);
  border-radius: 10px;
  display: flex;
`;

const ItemInfo = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50px;
  border-radius: 15px;
  background: linear-gradient(#555555,#000000,#555555);
  box-shadow: 15px 15px 15px 0 rgba(0, 0, 0, 0.5);
`;

const SellerInfo = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50px;
  border-radius: 15px;
  background: linear-gradient(#555555,#000000,#555555);
  box-shadow: 15px 15px 15px 0 rgba(0, 0, 0, 0.5);
`;

const ImageContainer = styled.div`
  width: 300px;
  height: 300px;
  overflow: hidden;
  border-radius: 10px;
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Button = styled.div`
  width: 250px;
  height: 60px;
  font-size: 25px;
  background: linear-gradient(#555555,#000000,#555555);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin: 20px;
  border-radius: 15px;
  cursor: pointer;
  :hover{
    background: linear-gradient(#000000,#333333,#000000);
  }
  :active{
    background: linear-gradient(#000000,#666666,#000000);
  }
`;

const Title = styled.div`
  font-size: 25px;
  padding:15px;
`;

const Info = styled.div`
  font-size: 20px;
  padding: 10px;
`;

