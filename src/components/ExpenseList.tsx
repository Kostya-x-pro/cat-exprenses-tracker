import React from "react";
import { useSelector } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { ListGroup, Card } from 'react-bootstrap';
import { RootState } from "../store";

const ExpenseList: React.FC = () => {
    const expenses = useSelector((state: RootState) => state.expenses.expenses);

    return (
        <TransitionGroup>
            {expenses.map((expense) => (
                <CSSTransition key={expense.id} timeout={500} classNames="fade">
                    <ListGroup.Item className="mb-2">
                        <Card>
                            <Card.Body>
                                <Card.Title>{expense.category}</Card.Title>
                                <Card.Text>
                                    <strong>Сумма:</strong> {expense.amount} {expense.currency}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Дата:</strong> <u>{expense.date}</u>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </ListGroup.Item>
                </CSSTransition>
            ))}
        </TransitionGroup>
    )
}

export default ExpenseList;