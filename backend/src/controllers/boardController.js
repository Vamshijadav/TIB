const { boards, columns, cards, getNextId } = require('../data/store');

// In a real app, userId would come from auth middleware
const FAKE_USER_ID = 1;

exports.getBoards = (req, res) => {
  const userBoards = boards.filter(b => b.userId === FAKE_USER_ID);
  res.json(userBoards);
};

exports.createBoard = (req, res) => {
  const { name } = req.body;
  const board = { id: getNextId('board'), userId: FAKE_USER_ID, name: name || 'Untitled Board' };
  boards.push(board);

  // create default columns
  const defaultCols = ['To Do', 'In Progress', 'Done'];
  defaultCols.forEach((colName, idx) => {
    columns.push({
      id: getNextId('column'),
      boardId: board.id,
      name: colName,
      position: idx + 1
    });
  });

  res.status(201).json(board);
};

exports.getBoardDetail = (req, res) => {
  const boardId = parseInt(req.params.id, 10);
  const board = boards.find(b => b.id === boardId && b.userId === FAKE_USER_ID);
  if (!board) {
    return res.status(404).json({ message: 'Board not found' });
  }
  const boardColumns = columns
    .filter(c => c.boardId === boardId)
    .sort((a, b) => a.position - b.position);
  const boardCards = cards.filter(card => boardColumns.some(c => c.id === card.columnId));
  res.json({ board, columns: boardColumns, cards: boardCards });
};