import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/client';

const BoardPage = () => {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [columns, setColumns] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.get(`/boards/${id}`)
      .then(res => {
        setBoard(res.data.board);
        setColumns(res.data.columns);
        setCards(res.data.cards);
      })
      .catch(err => console.error(err));
  }, [id]);

  const getCardsForColumn = (columnId) =>
    cards
      .filter(c => c.columnId === columnId)
      .sort((a, b) => a.position - b.position);

  const handleDrop = async (e, columnId) => {
    const cardId = e.dataTransfer.getData('cardId');
    const columnCards = getCardsForColumn(columnId);
    const newPosition = columnCards.length; // append at end

    await api.post('/cards/reorder', {
      cardId,
      newColumnId: columnId,
      newPosition
    });

    const res = await api.get(`/boards/${id}`);
    setColumns(res.data.columns);
    setCards(res.data.cards);
  };

  const handleDragStart = (e, cardId) => {
    e.dataTransfer.setData('cardId', cardId);
  };

  if (!board) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>{board.name}</h2>
      <div style={{ display: 'flex', gap: 16, marginTop: 20 }}>
        {columns.map(col => (
          <div
            key={col.id}
            onDragOver={e => e.preventDefault()}
            onDrop={e => handleDrop(e, col.id)}
            style={{
              width: 250,
              minHeight: 200,
              border: '1px solid #ddd',
              borderRadius: 4,
              padding: 8
            }}
          >
            <h3>{col.name}</h3>
            {getCardsForColumn(col.id).map(card => (
              <div
                key={card.id}
                draggable
                onDragStart={e => handleDragStart(e, card.id)}
                style={{
                  border: '1px solid #ccc',
                  padding: 8,
                  marginBottom: 8,
                  borderRadius: 4,
                  background: '#fafafa'
                }}
              >
                <strong>{card.title}</strong>
                <p style={{ fontSize: 12 }}>{card.description}</p>
                <span style={{ fontSize: 11 }}>Priority: {card.priority}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardPage;