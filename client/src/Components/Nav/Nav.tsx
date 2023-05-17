import {Button, Navbar, NavItem, NavLink} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import { UserContext } from "../../Context";
import styled from "styled-components";
import axios from "axios";

const LeftNavContainer = styled.div`
    margin-left: auto;
`

interface ArticleDS {
    _id: string,
    title: string,
    imageUrl: string,
    content: string
}


const Nav = () => {
    const [state, setState] = useContext(UserContext);
    const [articles, setArticles] = useState<ArticleDS[]>([]);

    const fetchArticles = async () => {
        const { data: response } = await axios.get("http://localhost:5000/articles");
      setArticles(response);
    }

    const navigate = useNavigate();

    const handleLogout = () => {
        setState({
            data: null,
            loading: false,
            error: null
        })
        localStorage.removeItem("token");
        navigate("/");
    }

    const handleHome = () => {
        fetchArticles();
        articles.length ? navigate("/articles") : navigate("/");
    }
    return <Navbar>
        <NavItem>
            <Button onClick={handleHome} variant="secondary">Home</Button>
        </NavItem>

        {state.data && (
            <LeftNavContainer>
                <NavItem>
                    <Button onClick={handleLogout} variant="danger">Logout</Button>
                </NavItem>
            </LeftNavContainer>
        )}  
    </Navbar>
}

export default Nav;