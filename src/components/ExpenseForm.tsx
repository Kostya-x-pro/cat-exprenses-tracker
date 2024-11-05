import React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { Form, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { addExpenseToFirestore } from "../store/expensesSlice";

const validationSchema = Yup.object({
    category: Yup.string().required("Выберите категорию"),
    amount: Yup.number()
        .required("Введите сумму")
        .positive("Сумма должна быть положительным числом")
        .typeError("Сумма должна быть числом"),
    date: Yup.date().required("Выберите дату"),
    currency: Yup.string().required("Выберите валюту")
});

const ExpenseForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const formik = useFormik({
        initialValues: {
            category: '',
            amount: '',
            date: '',
            currency: 'BYN'
        },
        validationSchema, 
        onSubmit: (values) => {
            dispatch(addExpenseToFirestore({ 
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
                    isInvalid={!!formik.errors.category && formik.touched.category}
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
                <Form.Control.Feedback type="invalid">{formik.errors.category}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="amount" className="mt-3">
                <Form.Label>Сумма</Form.Label>
                <Form.Control
                    type="number"
                    name="amount"
                    onChange={formik.handleChange}
                    value={formik.values.amount}
                    placeholder="Введите сумму"
                    isInvalid={!!formik.errors.amount && formik.touched.amount}
                />
                <Form.Control.Feedback type="invalid">{formik.errors.amount}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="currency" className="mt-3">
                <Form.Label>Валюта</Form.Label>
                <Form.Control
                    as="select"
                    name="currency"
                    onChange={formik.handleChange}
                    value={formik.values.currency}
                    isInvalid={!!formik.errors.currency && formik.touched.currency}
                >
                    <option value="BYN">BYN (Бел. руб.)</option>
                    <option value="USD">USD (Доллары)</option>
                    <option value="EUR">EUR (Евро)</option>
                    <option value="RUB">RUB (Рос. руб.)</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">{formik.errors.currency}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="date" className="mt-3">
                <Form.Label>Дата</Form.Label>
                <Form.Control
                    type="date"
                    name="date"
                    onChange={formik.handleChange}
                    value={formik.values.date}
                    isInvalid={!!formik.errors.date && formik.touched.date}
                />
                <Form.Control.Feedback type="invalid">{formik.errors.date}</Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-4 w-100">
                Добавить расход
            </Button>
        </Form>
    );
}

export default ExpenseForm;
