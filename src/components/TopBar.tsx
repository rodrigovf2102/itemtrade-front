import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { MdOutlineExitToApp } from "react-icons/md";

export default function TopBar() {
  const { userData, setUserData, deleteUserData } = useContext(UserContext);
  const navigate = useNavigate();

  function logout() {
    setUserData({});
    deleteUserData();
    navigate("/signin");
  }

  return(
    <Container>
      <Itens>
        <Button>{userData.email}<MdOutlineExitToApp onClick={logout} size={"25px"}></MdOutlineExitToApp></Button>
        <Button onClick={() => (navigate("/games"))}>Games</Button>
        <Button onClick={() => (navigate("/servers/0"))}>Servers</Button>
        <Button onClick={() => (navigate("/items/0"))}>Itens</Button>
        <Button onClick={() => (navigate(`/profile/${userData.id}`))}>Profile</Button>
      </Itens>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100px;
  background: linear-gradient(#555555,#000000,#555555);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Itens = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-left: 40px;
  padding-right: 40px;
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
