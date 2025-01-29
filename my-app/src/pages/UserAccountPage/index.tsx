import { FC } from "react";
import { Navbar } from "../../components/Navbar";
import Container from "react-bootstrap/esm/Container";
import { UserAccountForm } from "../../components/UserAccountForm";

export const UserAccountPage: FC = () => {
    return (
        <>
            <Navbar />
            <Container className="d-flex justify-content-center" style={{ minHeight: '100vh' }}>
                <UserAccountForm />
            </Container> 
        </>
    );
}