import React, { useState } from 'react';
import './App.css'; // Assuming basic CSS is applied here

// 1. Header Component
const Header = ({ title }) => {
  return (
    <header style={{ padding: '1rem', backgroundColor: '#282c34', color: 'white', textAlign: 'center' }}>
      <h1>{title}</h1>
    </header>
  );
};

// 2. Footer Component
const Footer = ({ currentYear, author }) => {
  return (
    <footer style={{ padding: '1rem', backgroundColor: '#f1f1f1', textAlign: 'center', marginTop: '2rem' }}>
      <p>&copy; {currentYear} {author}. All rights reserved.</p>
    </footer>
  );
};

// 3. Button Component
const Button = ({ label, onClick, type = "button", variant = "primary" }) => {
  const btnStyle = {
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    backgroundColor: variant === 'primary' ? '#007bff' : '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold'
  };

  return (
    <button type={type} onClick={onClick} style={btnStyle}>
      {label}
    </button>
  );
};

// 4. Card Component
const Card = ({ title, content, onDelete }) => {
  return (
    <div style={{ border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px', marginBottom: '1rem' }}>
      <h3>{title}</h3>
      <p>{content}</p>
      <Button label="Remove Item" onClick={onDelete} variant="secondary" />
    </div>
  );
};

// 5. Form Component
const Form = ({ onAddCard }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Event handling
    if (!title || !content) return;
    
    onAddCard({ id: Date.now(), title, content });
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', marginBottom: '2rem' }}>
      <input 
        type="text" 
        placeholder="Card Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        style={{ padding: '0.5rem' }}
      />
      <textarea 
        placeholder="Card Description" 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        style={{ padding: '0.5rem' }}
      />
      <Button label="Add New Card" type="submit" variant="primary" />
    </form>
  );
};

// Main App Component demonstrating state and dynamic rendering
const App = () => {
  // Managing state for dynamic rendering
  const [cards, setCards] = useState([
    { id: 1, title: 'Learn React Fundamentals', content: 'Understand JSX, Components, and Props.' },
    { id: 2, title: 'Master State & Events', content: 'Use useState hooks to create interactive UIs.' }
  ]);

  const handleAddCard = (newCard) => {
    setCards([...cards, newCard]);
  };

  const handleDeleteCard = (idToRemove) => {
    setCards(cards.filter(card => card.id !== idToRemove));
  };

  return (
    <div className="App">
      <Header title="React Components Practice" />
      
      <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h2>Dashboard</h2>
        
        {/* Reusable Form Component */}
        <Form onAddCard={handleAddCard} />
        
        <hr style={{ margin: '2rem 0' }} />
        
        {/* Dynamic Rendering of Reusable Card Components */}
        <div className="card-container">
          {cards.length === 0 ? (
            <p>No cards available. Add one above!</p>
          ) : (
            cards.map(card => (
              <Card 
                key={card.id} 
                title={card.title} 
                content={card.content} 
                onDelete={() => handleDeleteCard(card.id)}
              />
            ))
          )}
        </div>
      </main>

      <Footer currentYear={new Date().getFullYear()} author="Nazeer Ahmad" />
    </div>
  );
};

export default App;