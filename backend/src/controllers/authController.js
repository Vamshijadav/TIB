const { users, getNextId } = require('../data/store');

// Very simple auth for demo only (no hashing/JWT)
exports.register = (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }
  const existing = users.find(u => u.email === email);
  if (existing) {
    return res.status(400).json({ message: 'Email already in use' });
  }
  const user = { id: getNextId('user'), email, password, name: name || 'User' };
  users.push(user);
  res.status(201).json({ user });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  res.json({ user });
};