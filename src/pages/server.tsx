import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopBar from "../components/TopBar";
import useServers from "../hooks/api/useServers";
import { ObjectWithName, ServerNoIdName } from "../protocols";
import { Container, FormContainer, Form, Input, GameContainer, GamesContainer,
  GameImage, Modal, FormPostGame, FormInfo, InputPostGame, Entrar, ErrorMessage } from "./games";
import { IoMdAddCircleOutline } from "react-icons/io";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Grid } from "react-loader-spinner";
import UserContext from "../contexts/UserContext";
import usePostServer from "../hooks/api/usePostServer";

export default function ServerPage() {
  const [ serverName, setServerName] = useState<ObjectWithName>({ name: "" });
  const [ postNewServer, setPostNewServer] = useState<ServerNoIdName>({ name: "", gameName: "" });
  const { gameId } = useParams();
  const { servers, getServers, serversLoading } = useServers();
  const [ modalStatus, setModalStatus ] = useState("none");
  const { userData } = useContext(UserContext);
  const [ postServerErrorMessage, setPostServerErrorMessage] = useState<String[]>([]);
  const { postServerLoading, postServer } = usePostServer();
  const navigate = useNavigate();

  useEffect(() => {
    async function refreshServers() {
      await getServers(Number(gameId), "");
    }
    refreshServers();
  }, [gameId]);

  async function inputOnChange(event : any) {
    serverName.name = event.target.value;
    setServerName({ ...serverName, name: event.target.value });
    await getServers(Number(gameId), serverName.name);
  }

  function postForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  async function postServerForm() {
    try {
      await postServer(postNewServer, userData.token);
      setModalStatus("none");
      await getServers(Number(gameId), serverName.name);
    } catch (err) {
      errorMessages(err);
    }
  }

  function errorMessages(err : any) {
    if(err.message==="Network Error") setPostServerErrorMessage(["Erro de rede"]);
    if(err.response?.data==="GameNameDoesntExist") setPostServerErrorMessage(["Jogo não cadastrado"]);
    if(err.response?.data==="ServerAlreadyExist") setPostServerErrorMessage(["Server já existe"]);
    if(err.response?.data ==="UserWithoutEnrollment") setPostServerErrorMessage(["Finalize seu cadastro para continuar"]);
    if(err.response?.data?.details) setPostServerErrorMessage(err.response?.data?.details);
    if(err.response.statusText ==="Unauthorized") setPostServerErrorMessage(["Seu Login expirou, refaça o login"]);
  }

  async function goToItems(serverId:number) {
    navigate(`/items/${serverId}`);
  }
  
  return (
    <>
      <TopBar></TopBar>
      <Container>
        <FormContainer>
          <Form>
            <Input readOnly={serversLoading} type="text" placeholder=" Procure um server aqui..." onChange={inputOnChange}/>
          </Form>
        </FormContainer>
        <GamesContainer>
          {servers ? servers.map(server => (
            <GameContainer onClick={() => {goToItems(server.id);}}>
              <div>{server.Game.name}</div>
              <GameImage><img alt={""} src={server.Game.gameUrl}/></GameImage>
              <div>{server.name}</div>
            </GameContainer>)) : ""}
        </GamesContainer>
        <GameContainer onClick={() => {setModalStatus("flex");}}>
          <IoMdAddCircleOutline size={"180px"}></IoMdAddCircleOutline>
          <div>Adicione um Server</div>
        </GameContainer>
        <Modal display={modalStatus}>
          <FormContainer>
            <FormPostGame onSubmit={postForm}>
              <FormInfo>
                <div>Adicione as informações do server:</div>
                <AiOutlineCloseCircle onClick={() => {setModalStatus("none");}} size={"35px"}></AiOutlineCloseCircle>
              </FormInfo>
              <InputPostGame type="text" placeholder=" Digite o nome do server aqui..." 
                onChange={(e) => {setPostNewServer({ ...postNewServer, name: e.target.value });}}/>
              <InputPostGame type="text" placeholder=" Digite o nome do jogo aqui..." 
                onChange={(e) => {setPostNewServer({ ...postNewServer, gameName: e.target.value });}}/>
              <Entrar disabled={postServerLoading} onClick={postServerForm} type="submit">
                {postServerLoading ? <Grid color="white" width="100px" height="200px" radius="8"></Grid> : "Adicionar Server"}
              </Entrar>
              {typeof postServerErrorMessage !== "string" ? postServerErrorMessage.map((msg) => 
                <ErrorMessage>{msg}</ErrorMessage>) 
                : 
                <ErrorMessage>{postServerErrorMessage}</ErrorMessage>}
            </FormPostGame>
          </FormContainer>
        </Modal>
      </Container>
    </>
  );
}

