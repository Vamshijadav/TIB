import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';

const BoardsPage = () => {
  const [boards, setBoards] = useState([]);
  const [newBoardName, setNewBoardName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/boards')
      .then(res => setBoards(res.data))
      .catch(err => console.error(err));
  }, []);

  const createBoard = async () => {
    const res = await api.post('/boards', { name: newBoardName });
    setBoards(prev => [...prev, res.data]);
    setNewBoardName('');
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>Your Boards</h2>
      <div style={{ marginBottom: 16 }}>
        <input
          placeholder="New board name"
          value={newBoardName}
          onChange={e => setNewBoardName(e.target.value)}
          style={{ padding: 8 }}
        />
        <button onClick={createBoard} style={{ marginLeft: 8 }}>Create</button>
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        {boards.map(board => (
          <div
            key={board.id}
            onClick={() => navigate(`/boards/${board.id}`)}
            style={{
              border: '1px solid #ccc',
              padding: 16,
              cursor: 'pointer',
              borderRadius: 4
            }}
          >
            {board.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardsPage;