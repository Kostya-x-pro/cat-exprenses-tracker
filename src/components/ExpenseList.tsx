import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { ListGroup, Card } from 'react-bootstrap';
import { RootState, AppDispatch } from "../store";
import { fetchExpenses, removeExpenseFromFirestore } from "../store/expensesSlice";
import deleteIcon from '../assets/icons/delete.png';

const ExpenseList: React.FC = () => {
    const expenses = useSelector((state: RootState) => state.expenses.expenses);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchExpenses());
    }, [dispatch]);

    const handleDelete = (id: string) => {
        dispatch(removeExpenseFromFirestore(id));
    };
    
    const totalSum = expenses.reduce((acc, expense) => acc + expense.amount, 0);

    return (
        <>
            <h2 className="total-sum">
                Общая сумма: {totalSum.toFixed(2)} BYN
            </h2>

            <TransitionGroup>
                {expenses.map((expense) => (
                    <CSSTransition key={expense.id} timeout={500} classNames="fade">
                        <ListGroup.Item className="mb-2">
                            <Card className="expense-card shadow-sm">
                                <Card.Body className="d-flex align-items-center justify-content-between">
                                    <div className="flex-grow-1 expense-info">
                                        <Card.Title className="card-title">{expense.category}</Card.Title>
                                        <Card.Text className="card-text">
                                            <strong>Сумма:</strong> {expense.amount} {expense.currency}
                                        </Card.Text>
                                        <Card.Text className="card-text">
                                            <strong>Дата:</strong> <u>{expense.date}</u>
                                        </Card.Text>
                                    </div>
                                    {expense.category && (
                                        <Card.Img 
                                            src={require(`../assets/images/${expense.category}.png`)} 
                                            alt={expense.category} 
                                            className="expense-image"
                                        />
                                    )}
                                </Card.Body>
                                <img 
                                    src={deleteIcon} 
                                    alt="Delete" 
                                    className="delete-icon" 
                                    onClick={() => handleDelete(expense.id.toString())}
                                />
                            </Card>
                        </ListGroup.Item>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </>
    )
}

export default ExpenseList;