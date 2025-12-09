const { cards } = require('../data/store');

/**
 * Reorder / move a card between columns (simple version).
 */
exports.reorderCard = (req, res) => {
  const { cardId, newColumnId, newPosition } = req.body;

  const card = cards.find(c => c.id === Number(cardId));
  if (!card) {
    return res.status(404).json({ message: 'Card not found' });
  }

  const oldColumnId = card.columnId;
  const targetColIdNum = Number(newColumnId);
  const targetPosNum = Number(newPosition);

  // Get cards in columns
  const oldColumnCards = cards
    .filter(c => c.columnId === oldColumnId)
    .sort((a, b) => a.position - b.position);
  const newColumnCards = cards
    .filter(c => c.columnId === targetColIdNum)
    .sort((a, b) => a.position - b.position);

  // Remove from old column list
  const indexInOld = oldColumnCards.findIndex(c => c.id === card.id);
  if (indexInOld !== -1) {
    oldColumnCards.splice(indexInOld, 1);
  }

  // If moving to a new column, insert into that list
  if (oldColumnId !== targetColIdNum) {
    newColumnCards.splice(targetPosNum, 0, card);
  } else {
    // same column reorder
    newColumnCards.length = 0;
    Array.prototype.push.apply(newColumnCards, oldColumnCards);
    newColumnCards.splice(targetPosNum, 0, card);
  }

  // Reassign positions and columnId
  newColumnCards.forEach((c, idx) => {
    c.position = idx + 1;
    c.columnId = targetColIdNum;
  });
  if (oldColumnId !== targetColIdNum) {
    oldColumnCards.forEach((c, idx) => {
      c.position = idx + 1;
    });
  }

  return res.json({ message: 'Card reordered', cards });
};