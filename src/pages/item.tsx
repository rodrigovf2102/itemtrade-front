import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopBar from "../components/TopBar";
import { ItemNoIdNoEnrollIdNoGameIdNoServerIdServerName, ObjectWithName } from "../protocols";
import { Container, FormContainer, Form, Input, 
  FormPostGame, FormInfo, InputPostGame, Entrar, ErrorMessage, DisplayModal } from "./games";
import { IoMdAddCircleOutline } from "react-icons/io";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Grid } from "react-loader-spinner";
import UserContext from "../contexts/UserContext";
import useItems from "../hooks/api/useItems";
import styled from "styled-components";
import usePostItem from "../hooks/api/usePostItem";

export default function ItemPage() {
  const { items, getItems } = useItems();
  const { postItemLoading, postItem } = usePostItem();
  const { userData } = useContext(UserContext);
  const [ itemName, setItemName] = useState<ObjectWithName>({ name: "" });
  const { serverId } = useParams();
  const navigate = useNavigate();
  const [ postItemErrorMessage, setPostItemErrorMessage] = useState<String[]>([]);
  const [ modalStatus, setModalStatus ] = useState("none");
  const [ postNewItem, setPostNewItem] = useState<ItemNoIdNoEnrollIdNoGameIdNoServerIdServerName>
  ({ name: "", price: 0, amount: 0, itemUrl: "", gameName: "", serverName: "", itemType: "" });
  const itemCategories = ["Selecione um tipo...", "Dinheiro", "Equipamento", "Recurso", "Utilizavel", "Raros", "Outros"];

  useEffect(() => {
    async function refreshItems() {
      await getItems(Number(serverId), "Todos", "");
    }
    refreshItems();
  }, [serverId]);

  function navigateItem(itemId:number) {
    navigate(`/item/${itemId}`);
  }

  async function inputOnChange(event : any) {
    itemName.name = event.target.value;
    setItemName({ ...itemName, name: event.target.value });
    await getItems(Number(serverId), "Todos", itemName.name);
  }

  async function postItemForm() {
    try {
      await postItem(postNewItem, userData.token);
      setModalStatus("none");
      await getItems(Number(serverId), "Todos", "");
    } catch (err) {
      console.log(err);
      errorMessages(err);
    }
  }

  function errorMessages(err : any) {
    if(err.message==="Network Error") setPostItemErrorMessage(["Erro de rede"]);
    if(err.response.data?.name==="InvalidDataError") setPostItemErrorMessage(["Informações Inválidas"]);
    if(err.response.data?.detail==="ItemAlreadyExist") setPostItemErrorMessage(["Jogo já existe"]);
    if(err.response.data ==="UserWithoutEnrollment") setPostItemErrorMessage(["Finalize seu cadastro para continuar"]);
    if(err.response.statusText ==="Unauthorized") setPostItemErrorMessage(["Seu Login expirou, refaça o login"]);
    if(err.response.data ==="ServerNotFound") setPostItemErrorMessage(["Servidor não encontrado"]);
  }

  function postForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return(
    <>
      <TopBar></TopBar>
      <Container>
        <FormContainer>
          <Form>
            <Input type="text" placeholder=" Procure um item aqui..." onChange={inputOnChange}/>
          </Form>
        </FormContainer>
        <GamesContainer>
          {items ? items.map(item => (
            <GameContainer>
              <div>{item.name}</div>
              <GameImage><img alt={""} src={item.itemUrl}/></GameImage>
              <div>R${(item.price/100).toFixed(2)}</div>
              <div>Quantidade: {item.amount}</div>
              <div>Vendedor: {item.Enrollment.name}</div>
              <Button onClick={() => {navigateItem(item.id);}}>Clique para ver mais</Button>
            </GameContainer>)) : ""}
          <GameContainer  onClick={() => {setModalStatus("flex");}}>
            <IoMdAddCircleOutline size={"180px"}></IoMdAddCircleOutline>
            <div>Adicione um jogo</div>
          </GameContainer>
        </GamesContainer>
        <Modal display={modalStatus}>
          <FormContainer>
            <FormPostGame onSubmit={postForm}>
              <FormInfo>
                <div>Adicione as informações do jogo:</div>
                <AiOutlineCloseCircle onClick={() => {setModalStatus("none");}} size={"35px"}></AiOutlineCloseCircle>
              </FormInfo>
              <InputPostGame type="text" placeholder=" Digite o nome do item aqui..." onChange={(e) => {setPostNewItem({ ...postNewItem, name: e.target.value });}}/>
              <InputPostGame type="text" placeholder=" Digite o link da imagem aqui..." onChange={(e) => {setPostNewItem({ ...postNewItem, itemUrl: e.target.value });}}/>
              <InputPostGame type="text" placeholder=" Digite o nome do jogo aqui..." onChange={(e) => {setPostNewItem({ ...postNewItem, gameName: e.target.value });}}/>
              <InputPostGame type="text" placeholder=" Digite o preço do item(s) aqui..." onChange={(e) => {setPostNewItem({ ...postNewItem, price: Number(e.target.value)*100 });}}/>
              <InputPostGame type="text" placeholder=" Digite a quantidade de item..." onChange={(e) => {setPostNewItem({ ...postNewItem, amount: Number(e.target.value) });}}/>
              <InputPostGame type="text" placeholder=" Digite o nome do server que o item se encontra..." onChange={(e) => {setPostNewItem({ ...postNewItem, serverName: e.target.value });}}/>
              <SelectPostGame placeholder=" Selecione o tipo do item..." onChange={(e) => {setPostNewItem({ ...postNewItem, itemType: e.target.value });}}>
                {itemCategories.map((categorie) => (<option value={categorie}>{categorie}</option>))}
              </SelectPostGame>
              <Entrar disabled={postItemLoading} onClick={postItemForm} type="submit">
                {postItemLoading ? <Grid color="black" radius="10"></Grid> : "Adicionar jogo"}
              </Entrar>
              {typeof postItemErrorMessage !== "string" ? postItemErrorMessage.map((msg) => 
                <ErrorMessage>{msg}</ErrorMessage>) 
                : 
                <ErrorMessage>{postItemErrorMessage}</ErrorMessage>}
            </FormPostGame>
          </FormContainer>
        </Modal>
      </Container>
    </>
  );
}

const GameContainer = styled.div`
  width:350px ;
  height: 450px;
  background-color: gray;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  object-fit: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: gray;
  overflow: scroll;
  background: linear-gradient(#333333,#000000,#333333);
  :hover{
    background: linear-gradient(#000000,#333333,#000000);
  }
  div{
    font-size: 20px;
    text-align: center;
    line-height: 35px;
  }
`;

const GamesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const GameImage = styled.div`
  width: 90%;
  overflow: hidden;
  height: 45%;
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
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

const SelectPostGame = styled.select`
  margin-top: 10px;
  width: 80%;
  height: 65px;
  background-color: white;
  border-radius: 6px;
  font-size: 20px;
  font-weight: 700; 
`;

const Modal = styled.div.attrs((props: DisplayModal) => ({
  display: props.display
}))`
  padding-top: 40px;
  display: ${props => props.display};
  align-items: flex-start;
  justify-content: center;
  left: 35%;
  height: 100px;
  position: absolute;
  width: 600px;
  height: 750px;
  background:  linear-gradient(#333333,#000000,#333333);
  border-radius: 10px;
`;

