import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
      addExpense: (state, action: PayloadAction<Expense>) => {
          state.expenses.push(action.payload);
      },
  },
});
export const {addExpense} = expensesSlice.actions;
export default expensesSlice.reducer;