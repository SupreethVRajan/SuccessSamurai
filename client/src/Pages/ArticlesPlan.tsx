import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import styled from "styled-components";
import { Card } from "react-bootstrap";

const CardsContainer = styled.div`
    display: flex;
    height: 75vhl;
    align-items: center;
    justify-content: center;
`

const toIndianCurrency = (num: { toLocaleString: (arg0: string, arg1: { style: string; currency: string; }) => any; }) => {
    const curr = num.toLocaleString('en-IN', {
       style: 'currency',
       currency: 'INR'
    });
 return curr;
 };

const CardHeader = styled.div`
    height: 30rem;
    background-color: blue;
    display: flex;
    align-items: center;
    justify-content: center;
`

const PriceCircle = styled.div`
    border: 0.5rem solid white;
    width: 12.5rem;
    height: 12.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0.1rem 0.1rem 1rem rgba(19, 20, 19, 0.342);
`

const PriceText = styled.p`
  font-size: 2rem;
  color: white;
  text-shadow: 0.1rem 0.1rem 1rem rgba(19, 20, 19, 0.342);
`;

const ArticlesPlan = () => {
    
    const [prices, setPrices] = useState<any[]>([])
    useEffect(() => {
        fetchPrices();
    }, []) 
    
    const fetchPrices = async () => {
        const { data: response } = await axios.get("http://localhost:5000/subs/prices");
        console.log(response)
        setPrices(response.data)
    }

    const createSession = async (priceId: String) => {
        const { data: response } = await axios.post("http://localhost:5000/subs/session", {
            priceId,
        });

        console.log(response);

        window.location.href = response.url;
    }

    const backgroundColors: any = {
        Basic: "rgb(104, 219, 104)",
        Gold: "rgb(185, 42, 23, 0.835)",
        Platinum: "pink",
    };

    return <Container>
        <CardsContainer>
            {prices.map((price: any) => {
                return <Card style={{width: "18rem", height: "25rem", marginRight: "2rem"} }>
                    <CardHeader
                        style={{ backgroundColor: backgroundColors[price.nickname] }}
                    >
                        <PriceCircle>
                            <PriceText>{toIndianCurrency(price.unit_amount/100)}</PriceText>
                        </PriceCircle>
                    </CardHeader>
                    <Card.Body>
                        <Card.Title style={{ fontSize: "2rem" }}>{price.nickname}</Card.Title>
                        <Button
                            variant="primary"
                            className="mt-2"
                            onClick={() => createSession(price.id)}
                        >
                            Buy now
                        </Button>
                    </Card.Body>
                </Card>
            })}
        </CardsContainer>
    </Container>
}

export default ArticlesPlan;