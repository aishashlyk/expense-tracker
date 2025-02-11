import { useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';

const categories = ['Еда', 'Транспорт', 'Развлечения'];

const ExpenseForm = () => {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [sum, setSum] = useState('');
  const [category, setCategory] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post('http://localhost:3000/transactions', {
      dateTime: date,
      sum: parseFloat(sum),
      category,
      comment,
      author: 'User', // Можно заменить на логин пользователя
    });
    setSum('');
    setCategory('');
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        type="date"
        label="Дата"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        type="number"
        label="Сумма"
        value={sum}
        onChange={(e) => setSum(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        select
        label="Категория"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        fullWidth
        margin="normal"
      >
        {categories.map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Комментарий"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Добавить расход
      </Button>
    </form>
  );
};

export default ExpenseForm;
