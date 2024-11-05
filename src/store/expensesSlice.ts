import { createSlice, PayloadAction, createAsyncThunk  } from "@reduxjs/toolkit";
import { db } from '../../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

interface Expense {
  id: number;
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

export const fetchExpenses = createAsyncThunk("expenses/fetchExpenses", async () => {
  const snapshot = await getDocs(collection(db, "expenses"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Expense));
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
      addExpense: (state, action: PayloadAction<Expense>) => {
          state.expenses.push(action.payload);
      },
      removeExpense: (state, action: PayloadAction<number>) => {
        state.expenses = state.expenses.filter(expense => expense.id !== action.payload)
      }
  },
});
export const {addExpense, removeExpense } = expensesSlice.actions;
export default expensesSlice.reducer;