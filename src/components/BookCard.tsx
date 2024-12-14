import React from 'react';
import './bookCard.css';

interface BookProps {
  id: number;
  title: string;
  author: string;
  img: string;
  link: string;
}

const BookCard: React.FC<BookProps> = ({ id, title, author, img, link }) => {
  return (
    <div className="book-card">
      <img src={img} alt={title} className="book-image" />
      <div className="book-info">
        <h3 className="book-title">{title}</h3>
        <p className="book-author">{author}</p>
      </div>
    </div>
  );
};

export default BookCard;
