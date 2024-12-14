import React from 'react';
import { Link } from 'react-router-dom';
import './bookCard.css';

interface BookProps {
  id: number;
  title: string;
  author: string;
  img: string;
}

const BookCard: React.FC<BookProps> = ({ id, title, author, img, }) => {
  return (
    <div className="book-card">
      <Link to={`/book-detail/${id}`} >
        <img src={img} alt={title} className="book-image" />
      </Link>

      <div className="book-info">
        <Link to={`/book-detail/${id}`}>
          <h3 className="book-title">{title}</h3>
        </Link>
        <p className="book-author">{author}</p>
      </div>
    </div>
  );
};

export default BookCard;
