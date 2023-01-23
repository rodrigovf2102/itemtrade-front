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

export default function ItemPage() {
  const [ serverName, setServerName] = useState<ObjectWithName>({ name: "" });
  const [ postNewServer, setPostNewServer] = useState<ServerNoIdName>({ name: "", gameName: "" });
  const { serverId } = useParams();
  const { servers, getServers } = useServers();
  const [ modalStatus, setModalStatus ] = useState("none");
  const { userData } = useContext(UserContext);
  const [ postServerErrorMessage, setPostServerErrorMessage] = useState<String[]>([]);
  const { postServerLoading, postServer } = usePostServer();
  const navigate = useNavigate();

  useEffect(() => {
    async function refreshServers() {
      await getServers(Number(serverId), "");
    }
    refreshServers();
  }, []);

  return(
    <>
      <TopBar></TopBar>
      {serverId}
    </>
  );
}
