import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { ListGroup, Card, Form } from 'react-bootstrap';
import { RootState, AppDispatch } from "../store";
import { subscribeToExpenses, removeExpenseFromFirestore } from "../store/expensesSlice";
import deleteIcon from '../assets/icons/delete.png';

const ExpenseList: React.FC = () => {
    const expenses = useSelector((state: RootState) => state.expenses.expenses);
    const dispatch = useDispatch<AppDispatch>();
    
    const [selectedMonth, setSelectedMonth] = useState<number>(0);

    useEffect(() => {
        const unsubscribe = subscribeToExpenses(dispatch);
        return () => unsubscribe();
    }, [dispatch]);

    const handleDelete = (id: string) => {
        dispatch(removeExpenseFromFirestore(id));
    };
    
    const filteredExpenses = selectedMonth ? expenses.filter(expense => expense.month === selectedMonth) : expenses;
    
    const totalSum = filteredExpenses.reduce((acc, expense) => acc + expense.amount, 0);

    const title = selectedMonth 
        ? `Cумма за ${new Date(0, selectedMonth - 1).toLocaleString('default', { month: 'long' })}:`
        : 'Cумма за все время:';

    return (
        <>
            <Form.Group controlId="monthFilter">
                <Form.Label>Показать за период</Form.Label>
                <Form.Control
                    as="select"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(Number(e.target.value))}
                >
                    <option value={0}>Все месяцы</option>
                    {[...Array(12)].map((_, index) => (
                        <option key={index} value={index + 1}>
                            {new Date(0, index).toLocaleString('default', { month: 'long' })}
                        </option>
                    ))}
                </Form.Control>
                <h2 className="total-sum mt-2">
                    {title} 
                    <br/>
                    {totalSum.toFixed(2)} BYN
                </h2>
            </Form.Group>

            <TransitionGroup>
                {filteredExpenses.map((expense) => (
                    <CSSTransition key={expense.id} timeout={500} classNames="fade">
                        <ListGroup.Item className="mb-2">
                            <Card className="expense-card shadow-sm">
                                <Card.Body className="d-flex align-items-center justify-content-between">
                                    <div className="flex-grow-1 expense-info">
                                        <Card.Title className="card-title">{expense.category}</Card.Title>
                                        <Card.Text className="card-text">
                                            <strong>Сумма:</strong> {expense.amount} BYN
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
    );
}

export default ExpenseList;
