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
    quantity: Yup.number()
        .required("Введите количество")
        .positive("Количество должно быть положительным числом")
        .integer("Количество должно быть целым числом")
        .typeError("Количество должно быть числом"),
});

const ExpenseForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const formik = useFormik({
        initialValues: {
            category: '',
            amount: '',
            date: new Date().toISOString().split("T")[0],
            quantity: 1,
        },
        validationSchema, 
        onSubmit: (values) => {
            const date = new Date(values.date);
            const month = date.getMonth() + 1;

            dispatch(addExpenseToFirestore({ 
                amount: +values.amount * +values.quantity,
                category: values.category, 
                date: values.date,
                quantity: +values.quantity,
                month,
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

            <Form.Group controlId="amount">
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

            <Form.Group controlId="quantity">
                <Form.Label>Количество</Form.Label>
                <Form.Control
                    type="number"
                    name="quantity"
                    onChange={formik.handleChange}
                    value={formik.values.quantity}
                    placeholder="Введите количество"
                    isInvalid={!!formik.errors.quantity && formik.touched.quantity}
                />
                <Form.Control.Feedback type="invalid">{formik.errors.quantity}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="date">
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
