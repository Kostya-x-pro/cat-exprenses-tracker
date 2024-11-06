import React from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { Container, Row, Col } from 'react-bootstrap';
import './App.css'

const App: React.FC = () => {
  return (
    <Container className="mt-5">
      <h1 className="text-center">Затраты на питомцев</h1>
      <Row className="justify-content-center mt-4">
        <Col xs={12} md={6}>
          <ExpenseForm />
        </Col>
        <Col xs={12} md={6} className="mt-4 mt-md-0">
          <ExpenseList />
        </Col>
      </Row>

    </Container>
  );
}

export default App;
