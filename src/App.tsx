import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import Login from "./components/Login";
import LogoutButton from "./components/LogoutButton";
import ProtectedRoute from "./Routes/ProtectedRote"
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import './App.css';

const App: React.FC = () => {
  return (
    <Router basename="/cat-exprenses-tracker">
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Container className="mt-5">
                <h1 className="text-center">Затраты на питомцев</h1>
                <LogoutButton />
                <Row className="justify-content-center mt-4">
                  <Col xs={12} md={6}>
                    <ExpenseForm />
                  </Col>
                  <Col xs={12} md={6} className="mt-4 mt-md-0">
                    <ExpenseList />
                  </Col>
                </Row>
              </Container>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
