import TopBar from "../components/TopBar";
import styled from "styled-components";
import useGames from "../hooks/api/useGames";
import { GameWithoutId, ObjectWithName } from "../protocols";
import { Form, Input } from "./login";
import { useContext, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import usePostGame from "../hooks/api/usePostGames";
import UserContext from "../contexts/UserContext";
import { Grid } from "react-loader-spinner";

export default function GamePage() {
  const { games, gamesLoading, getGames } = useGames();
  const [ gameName, setGameName] = useState<ObjectWithName>({ name: "" });
  const [ postNewGame, setPostNewGame] = useState<GameWithoutId>({ name: "", gameUrl: "" });
  const [ modalStatus, setModalStatus ] = useState("none");
  const [ postGameErrorMessage, setPostGameErrorMessage] = useState<String[]>([]);
  const navigate = useNavigate();
  const { postGame, postGameLoading } = usePostGame();
  const { userData } = useContext(UserContext);

  async function getGamesInChange() {
    await getGames(gameName.name);
  }

  async function inputOnChange(event : any) {
    gameName.name = event.target.value;
    setGameName({ ...gameName, name: event.target.value });
  }

  async function postGameForm() {
    try {
      await postGame(postNewGame, userData.token);
    } catch (err) {
      errorMessages(err);
    }
  }

  function errorMessages(err : any) {
    if(err.message==="Network Error") setPostGameErrorMessage(["Erro de rede"]);
    if(err.response.data?.name==="InvalidDataError") setPostGameErrorMessage(["Informações Inválidas"]);
    if(err.response.data?.detail==="GameAlreadyExist") setPostGameErrorMessage(["Jogo já existe"]);
    if(err.response.data ==="UserWithoutEnrollment") setPostGameErrorMessage(["Finalize seu cadastro para continuar"]);
  }

  async function goToServers(gameId:number) {
    navigate(`/servers/${gameId}`);
  }

  function postForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return(
    <>
      <TopBar></TopBar>
      <Container>
        <FormContainer>
          <Form onChange={getGamesInChange}>
            <Input type="text" placeholder=" Procure um jogo aqui..." onChange={inputOnChange}/>
          </Form>
        </FormContainer>
        <GamesContainer>
          {games ? games.map(game => (
            <GameContainer onClick={() => {goToServers(game.id);}}>
              <GameImage><img alt={""} src={game.gameUrl}/></GameImage>
              <div>{game.name}</div>
            </GameContainer>)) : ""}
        </GamesContainer>
        <GameContainer onClick={() => {setModalStatus("flex");}}>
          <IoMdAddCircleOutline size={"180px"}></IoMdAddCircleOutline>
          <div>Adicione um Game</div>
        </GameContainer>
        <Modal display={modalStatus}>
          <FormContainer>
            <Form onSubmit={postForm}>
              <FormInfo>
                <div>Adicione as informações do game:</div>
                <AiOutlineCloseCircle onClick={() => {setModalStatus("none");}} size={"35px"}></AiOutlineCloseCircle>
              </FormInfo>
              <Input type="text" placeholder=" Digite o nome do jogo aqui..." onChange={(e) => {setPostNewGame({ ...postNewGame, name: e.target.value });}}/>
              <Input type="text" placeholder=" Digite o link da imagem aqui..." onChange={(e) => {setPostNewGame({ ...postNewGame, gameUrl: e.target.value });}}/>
              <Entrar disabled={postGameLoading} onClick={postGameForm} type="submit">
                {postGameLoading ? <Grid color="black" radius="10"></Grid> : "Adicionar jogo"}
              </Entrar>
              {typeof postGameErrorMessage !== "string" ? postGameErrorMessage.map((msg) => 
                <ErrorMessage>{msg}</ErrorMessage>) 
                : 
                <ErrorMessage>{postGameErrorMessage}</ErrorMessage>}
            </Form>
          </FormContainer>
        </Modal>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  justify-content: start;
  align-items: flex-start;
`;

const GameImage = styled.div`
  width: 100%;
  height: 50%;
  margin-bottom: 25px;
  img{
    width: 80%;
    object-fit: cover;
    overflow: hidden;
  }
`;

const FormInfo = styled.div`
  display: flex;
  font-size: 22px;
  width: 80%;
  justify-content: space-between;
  align-items: center;
`;

type DisplayModal = { display:string };

const Entrar = styled.button`
  width: 80%;
  height: 65px;
  border-radius: 6px;
  border: none;
  background-color: #cececedb;
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
  height: 400px;
  background:  linear-gradient(#333333,#000000,#333333);
  border-radius: 10px;
`;

const GamesContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const FormContainer = styled.div`
  min-width: 100%;
  height: 100px;
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

const GameContainer = styled.div`
  width  :250px ;
  height: 280px;
  background-color: gray;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  object-fit: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: gray;
  background: linear-gradient(#333333,#000000,#333333);
  :hover{
    background: linear-gradient(#000000,#333333,#000000);
  }
  div{
    font-size: 30px;
    text-align: center;
  }
`;

const ErrorMessage = styled.div`
  margin-top: 20px;
  color: red;
  font-size: 25px;
  margin-bottom: 10px;
`;

