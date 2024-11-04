import React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addExpense } from "../store/expensesSlice";
import { Form, Button } from 'react-bootstrap';

const ExpenseForm: React.FC = () => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            category: '',
            amount: '',
            date: '',
            currency: 'BYN'
        },
        onSubmit: (values) => {
            dispatch(addExpense({ 
                id: Date.now(), 
                amount: +values.amount, 
                category: values.category, 
                date: values.date, 
                currency: values.currency
            }));
            formik.resetForm();
        }
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="category">
                <Form.Label>Категория</Form.Label>
                <Form.Control
                    as="select"
                    name="category"
                    onChange={formik.handleChange}
                    value={formik.values.category}
                >
                    <option value="">Выберите категорию</option>
                    <option value="Сухой корм">Сухой корм</option>
                    <option value="Влажный корм">Влажный корм</option>
                    <option value="Лакомства">Лакомства</option>
                    <option value="Игрушки">Игрушки</option>
                    <option value="Наполнитель">Наполнитель</option>
                    <option value="Лекарства">Лекарства</option>
                    <option value="Прочее">Прочее</option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="amount" className="mt-3">
                <Form.Label>Сумма</Form.Label>
                <Form.Control
                    type="number"
                    name="amount"
                    onChange={formik.handleChange}
                    value={formik.values.amount}
                    placeholder="Введите сумму"
                />
            </Form.Group>

            <Form.Group controlId="currency" className="mt-3">
                <Form.Label>Валюта</Form.Label>
                <Form.Control
                    as="select"
                    name="currency"
                    onChange={formik.handleChange}
                    value={formik.values.currency}
                >
                    <option value="BYN">BYN (Бел. руб.)</option>
                    <option value="USD">USD (Доллары)</option>
                    <option value="EUR">EUR (Евро)</option>
                    <option value="RUB">RUB (Рос. руб.)</option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="date" className="mt-3">
                <Form.Label>Дата</Form.Label>
                <Form.Control
                    type="date"
                    name="date"
                    onChange={formik.handleChange}
                    value={formik.values.date}
                />
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-4 w-100">
                Добавить расход
            </Button>
        </Form>
    );
}

export default ExpenseForm;
