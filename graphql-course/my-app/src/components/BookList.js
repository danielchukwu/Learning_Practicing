import React, { useState } from 'react';
import {gql, useQuery} from '@apollo/client';

const GET_BOOKS = gql`
{
   books {
      id
      title
      pages
      rating
      authorId
   }
}
`

export const BookList = () => {
   const { loading, error, data} = useQuery(GET_BOOKS);
   const [state, setState] = useState({name: '', });
   console.log("Data: ", data);
   setState

   if (loading) return 'Loading...';
   if (error) return `Error: ${error.message}`;

   const displayAuthors = () => ( data.books.map(book => (<li key={book.id}>Book name: {book.title}</li>)));

   return (
      <div>
         <ul id="book-list">
            {data && displayAuthors()}
         </ul>
      </div>
   )
};