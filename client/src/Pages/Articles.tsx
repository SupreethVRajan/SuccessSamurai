import { Container } from "react-bootstrap"
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface ArticleDS {
    _id: string,
    title: string,
    imageUrl: string,
    content: string
}

const CardsContainer = styled.div`
  padding: 4rem 2rem;
  display: flex;
  flex-wrap: wrap;
`;

const Card = styled.div`
  height: 30rem;
  width: 30%;
  box-shadow: 0.1rem 0.1rem 1rem rgba(0, 0, 0, 0.2);
  padding: 2rem 0.75rem;
  border-radius: 2rem;
  margin-right: 2rem;
  margin-bottom: 20px;
`;

const Image = styled.img`
  width: 100%;
  height: 50%;
  border-radius: 2rem;
`;

const Header = styled.h2`
  margin-top: 1rem;
  font-size: 1.5rem;
`;

const NoArticlesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20rem 0;
  flex-direction: column;
  & a {
    font-size: 2rem;
    text-decoration: none;
  }
`;

const ErrorHeader = styled.h2`
  font-size: 3rem;
`;

const Content = styled.p`
  overflow: hidden;
   display: -webkit-box;
   -webkit-line-clamp: 5; /* number of lines to show */
           line-clamp: 5; 
   -webkit-box-orient: vertical;
`;

const Article = () => {

    const [articles, setArticles] = useState<ArticleDS[]>([]);

    useEffect(() => {
        fetchArticles();
    }, [])
    const fetchArticles = async () => {
        const { data: response } = await axios.get("http://localhost:5000/articles");
      setArticles(response);
    }
    return <Container>{articles.length ? (
        <CardsContainer>
            {articles.map(article => ( 
                <Card key={article._id}>
                <Image src={article.imageUrl} />
                <Header><Link to={"/articleview/" + article._id}>{article.title}</Link></Header>
                    <Content>{article.content}</Content>
                </Card>
            ))}
        </CardsContainer>
    ) :
        (
            <NoArticlesContainer>
                <ErrorHeader>You don't have access yet!!</ErrorHeader>
                <Link to="/articleplans">Buy a plan</Link>
            </NoArticlesContainer>
        )}</Container>;
}

export default Article;