import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';

class Book extends Component {
  state = {
    values: []
  };

  componentDidMount = () => {
    this.getData();
  };

  getData = () => {
    BooksAPI.getAll().then(values => {
      this.setState(() => ({
        values
      }));
      console.log('data returned');
    });
  };

  searchData = e => {
    BooksAPI.search(e.target.value).then(values => {
      this.setState(() => ({
        values
      }));
    });
  };

  updateData = (e, book) => {
    if (e.target.value === 'currentlyReading') {
      BooksAPI.update(book, 'currentlyReading').then(() => {
        this.getData();
      });
    } else if (e.target.value === 'wantToRead') {
      BooksAPI.update(book, 'wantToRead').then(() => {
        this.getData();
      });
    } else if (e.target.value === 'read') {
      BooksAPI.update(book, 'read').then(() => {
        this.getData();
      });
    } else {
      BooksAPI.update(book, 'none').then(() => {
        this.getData();
      });
    }
  };

  render() {
    return (
      <div className="bookshelf-books">
        {this.state.values.length > 0 && (
          <ol className="books-grid">
            {this.state.values.map(book => {
              if (book.shelf === 'currentlyReading') {
                console.log(book);
                return (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div
                          className="book-cover"
                          style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url("${book.imageLinks.thumbnail}")`
                          }}
                        ></div>
                        <div className="book-shelf-changer">
                          <select
                            onChange={e => this.updateData(e, book)}
                            value={book.shelf}
                          >
                            <option value="move" disabled>
                              Move to...
                            </option>
                            <option value="currentlyReading">
                              Currently Reading
                            </option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">
                        {book.authors &&
                          book.authors.map(book => book).join(', ')}{' '}
                      </div>
                    </div>
                  </li>
                );
              } else if (book.shelf === 'wantToRead') {
                return (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div
                          className="book-cover"
                          style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url("${book.imageLinks.thumbnail}")`
                          }}
                        ></div>
                        <div className="book-shelf-changer">
                          <select
                            onChange={e => this.updateData(e, book)}
                            value={book.shelf}
                          >
                            <option value="move" disabled>
                              Move to...
                            </option>
                            <option value="currentlyReading">
                              Currently Reading
                            </option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">
                        {book.authors &&
                          book.authors.map(book => book).join(', ')}{' '}
                      </div>
                    </div>
                  </li>
                );
              }
            })}
          </ol>
        )}
      </div>
    );
  }
}

export default Book;
