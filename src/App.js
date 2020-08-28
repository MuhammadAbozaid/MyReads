import React from 'react';
import SearchBooks from './searchBooks';
import BookList from './bookList';
import './App.css';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    getValues: [],
    searchValues: []
  };

  render() {
    return (
      <div className="app">
        <Route exact path="/">
          <BookList />
        </Route>

        <Route path="/search">
          <SearchBooks />
        </Route>
      </div>
    );
  }
}

export default BooksApp;
