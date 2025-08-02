import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ bookTitle: '', content: '', rating: 0 });
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/reviews')
      .then(res => setReviews(res.data))
      .catch(() => setError('Failed to load reviews'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/reviews', form);
      setReviews([res.data, ...reviews]);
      setForm({ bookTitle: '', content: '', rating: 0 });
    } catch {
      setError('Submissions failed');
    }
  };

  return (
    <div className="App">
      <h1>Book Reviews</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input value={form.bookTitle} placeholder="Book Title" onChange={e => setForm({ ...form, bookTitle: e.target.value })} required />
        <textarea value={form.content} placeholder="Review content" onChange={e => setForm({ ...form, content: e.target.value })} required />
        <input type="number" min="0" max="5" value={form.rating} onChange={e => setForm({ ...form, rating: +e.target.value })} required />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {reviews.map(r => (
          <li key={r._id}>
            <h3>{r.bookTitle}</h3>
            <p>{r.content}</p>
            <strong>Rating: {r.rating}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
