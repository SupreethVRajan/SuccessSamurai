import {Modal, Button, InputGroup, FormControl} from "react-bootstrap";
import axios from "axios";
import {useState, useContext} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import { UserContext } from "../../Context";

interface ModalProps {
    text: string,
    variant: "primary" | "secondary" | "danger",
    isSignupFlow: boolean
}

const ErrorMessage = styled.p`
    color: red
`

const ModalComponent = ({text, variant, isSignupFlow}: ModalProps) => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errmsg, setErrmsg] = useState("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();

    const [state, setState] = useContext(UserContext);

    const handleClick = async () => {
        let response;
        if (isSignupFlow) {
            const {data: signupData} = await axios.post("http://localhost:5000/auth/signup", {
                email,
                password
            });
            response = signupData;
        }
        else {
            const {data: loginData} = await axios.post("http://localhost:5000/auth/login", {
                email,
                password
            });
            response = loginData;
        }
        
        if(response.errors.length) {
            return setErrmsg(response.errors[0].msg);
        }

        setState({
            data: {
                id: response.data.user.id,
                email: response.data.user.email,
                stripeCustomerId: response.data.user.stripeCustomerId
            },
            loading: false,
            error: null,
        })

        console.log(state);

        localStorage.setItem("token", response.data.token);
        axios.defaults.headers.common["authorization"] =  `Bearer ${response.data.token}`;
        navigate("/articles");
    }

    return (
        <>
        
        <Button 
        onClick={handleShow}
        variant={variant}
        size="lg"
        style={{marginRight: "1rem", padding: "0.75rem 3rem"}}
        >
            {text}
        </Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>{text}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Email</InputGroup.Text>
                    <FormControl type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Password</InputGroup.Text>
                    <FormControl type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </InputGroup>
                {errmsg && <ErrorMessage>{errmsg}</ErrorMessage>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant={variant} onClick={handleClick}>{text}</Button>
            </Modal.Footer>
        </Modal>
        
        </>
    )
}

export default ModalComponent;