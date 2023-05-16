import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Card, Container, Button, ButtonGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import styled from "styled-components";

interface ArticleDS {
    _id: string,
    title: string,
    imageUrl: string,
    content: string
}
  
const ArticleCard = styled(Card)`
  max-width: 800px;
  margin: 0 auto;
  margin-top: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ArticleImage = styled(Card.Img)`
  object-fit: cover;
  height: 300px;
`;

const ArticleTitle = styled(Card.Title)`
  font-size: ${(props) => props['data-fontsize'] || '28px'};
  margin-bottom: 20px;
`;

const ArticleContent = styled(Card.Text)`
  font-size: ${(props) => props['data-fontsize'] || '18px'};
  line-height: 1.6;
`;

const FontSizeButton = styled(Button)`
  margin-right: 5px;
`;

const ArticleView = () => {

    const [fontSize, setFontSize] = useState(16);
    
    const increaseFontSize = () => {
        setFontSize(prevSize => prevSize + 1);
      };
    
      const decreaseFontSize = () => {
        setFontSize(prevSize => prevSize - 1);
      };

    const [articles, setArticles] = useState<ArticleDS[]>([]);

    const { articleid } = useParams();
    
    console.log(articleid)

    useEffect(() => {
        fetchArticles();
    }, [])
    const fetchArticles = async () => {
        const { data: response } = await axios.get("http://localhost:5000/articles");
        setArticles(response);        
    }

    return <Container>{articles.map(article => (
        article._id === articleid ? (<ArticleCard>
            <ArticleImage variant="top" src={article.imageUrl} alt={article.title} />
            <Card.Body>
              <ArticleTitle data-fontsize={`${fontSize}px`}>{article.title}</ArticleTitle>
              <ArticleContent data-fontsize={`${fontSize}px`}>{article.content}</ArticleContent>
              <ButtonGroup>
                <FontSizeButton onClick={() => increaseFontSize()}>
                  +
                </FontSizeButton>
                <FontSizeButton onClick={() => decreaseFontSize()}>
                  -
                </FontSizeButton>
              </ButtonGroup>
            </Card.Body>
          </ArticleCard>) : (<></>)
    ))}</Container>

}

export default ArticleView;