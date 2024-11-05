import { AppDispatch } from ".";
import { createSlice, PayloadAction, createAsyncThunk  } from "@reduxjs/toolkit";
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";

interface Expense {
  id: string;
  category: string;
  amount: number;
  date: string;
  currency: string;
}

interface ExpensesState {
  expenses: Expense[];
}

const initialState: ExpensesState = {
  expenses: [],
}

export const subscribeToExpenses = (dispatch: AppDispatch) => {
  return onSnapshot(collection(db, "expenses"), (snapshot) => {
    const expenses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Expense));
    dispatch(setExpenses(expenses));
  });
};

export const setExpenses = (expenses: Expense[]) => ({
  type: 'expenses/setExpenses',
  payload: expenses
});

export const addExpenseToFirestore = createAsyncThunk(
  "expenses/addExpenseToFirestore",
  async (expense: Omit<Expense, "id">) => {
      const docRef = await addDoc(collection(db, "expenses"), expense);
      return { id: docRef.id, ...expense };
  }
);

export const removeExpenseFromFirestore = createAsyncThunk(
  "expenses/removeExpenseFromFirestore",
  async (id: string) => {
      await deleteDoc(doc(db, "expenses", id));
      return id;
  }
);

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setExpenses: (state, action: PayloadAction<Expense[]>) => {
      state.expenses = action.payload;
    },
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses.push(action.payload);
    },
    removeExpense: (state, action: PayloadAction<string>) => {
      state.expenses = state.expenses.filter(expense => expense.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
  }
});
export const {addExpense, removeExpense } = expensesSlice.actions;
export default expensesSlice.reducer;