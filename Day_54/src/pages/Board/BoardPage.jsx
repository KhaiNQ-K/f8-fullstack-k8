import AppBar from '@/components/AppBar/AppBar';
import { Container } from '@mui/material';
import BoardBar from './components/BoardBar/BoardBar';
import BoardContent from './components/BoardContent/BoardContent';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTasks } from '@/app/slice/boardSlice';
function BoardPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        height: '100vh',
      }}
    >
      <AppBar />
      <BoardBar />
      <BoardContent />
    </Container>
  );
}

export default BoardPage;
