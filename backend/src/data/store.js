/**
 * Simple in-memory data store.
 * In a real app, this would be PostgreSQL.
 */

let users = [
  { id: 1, email: 'test@example.com', password: 'password', name: 'Test User' }
];

let boards = [
  { id: 1, userId: 1, name: 'Demo Board' }
];

let columns = [
  { id: 1, boardId: 1, name: 'To Do', position: 1 },
  { id: 2, boardId: 1, name: 'In Progress', position: 2 },
  { id: 3, boardId: 1, name: 'Done', position: 3 }
];

let cards = [
  { id: 1, columnId: 1, title: 'Sample Task 1', description: 'Description 1', priority: 'High', position: 1 },
  { id: 2, columnId: 1, title: 'Sample Task 2', description: 'Description 2', priority: 'Medium', position: 2 }
];

let nextIds = {
  user: 2,
  board: 2,
  column: 4,
  card: 3
};

function getNextId(type) {
  const id = nextIds[type];
  nextIds[type] += 1;
  return id;
}

module.exports = {
  users,
  boards,
  columns,
  cards,
  getNextId
};