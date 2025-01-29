import { FC } from "react";
import { Navbar } from "../../components/Navbar";
import { Container } from "react-bootstrap";
import { RegisterForm } from "../../components/RegisterForm";

export const RegisterPage: FC = () => {
    return (
        <>
            <Navbar />
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <RegisterForm />
            </Container>
        </>
    );
};