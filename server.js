process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', err => {
  console.error('Unhandled Rejection:', err);
});
const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
// const db = new Database('blog.db');
const db = new Database('./blog.db');

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Auto-create tables on startup
db.exec(`
CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    author TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER NOT NULL,
    author TEXT NOT NULL,
    body TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`);

// Mock Users (no database, no hashing)
const USERS = [
    { username: 'alice', password: 'pass123' },
    { username: 'bob', password: 'pass456' }
];

// POST /api/login - check mock user list
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = USERS.find(u => u.username === username && u.password === password);
    
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    res.json({ username: user.username }); // just return the username
});

// Posts Routes
// GET all posts
app.get('/api/posts', (req, res) => {
    const posts = db.prepare('SELECT * FROM posts ORDER BY created_at DESC').all();
    res.json(posts);
});

// GET single post by ID
app.get('/api/posts/:id', (req, res) => {
    const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
});

// POST create new post
app.post('/api/posts', (req, res) => {
    const { title, body, author } = req.body;
    if (!title || !body || !author) {
        return res.status(400).json({ error: 'All fields required' });
    }
    const result = db.prepare('INSERT INTO posts (title, body, author) VALUES (?, ?, ?)').run(title, body, author);
    res.status(201).json({ id: result.lastInsertRowid });
});

// DELETE post
app.delete('/api/posts/:id', (req, res) => {
    db.prepare('DELETE FROM posts WHERE id = ?').run(req.params.id);
    res.json({ message: 'Deleted' });
});

// Comments Routes
// GET all comments for a post
app.get('/api/comments', (req, res) => {
    const { post_id } = req.query;
    const comments = db.prepare('SELECT * FROM comments WHERE post_id = ? ORDER BY created_at ASC').all(post_id);
    res.json(comments);
});

// POST add a comment
app.post('/api/comments', (req, res) => {
    const { post_id, author, body } = req.body;
    if (!post_id || !author || !body) {
        return res.status(400).json({ error: 'All fields required' });
    }
    const result = db.prepare('INSERT INTO comments (post_id, author, body) VALUES (?, ?, ?)').run(post_id, author, body);
    res.status(201).json({ id: result.lastInsertRowid });
});

// Start Server
// app.listen(3000, () => console.log('Server running on http://localhost:3000'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));