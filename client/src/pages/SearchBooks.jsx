import { useState } from 'react';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';


import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations';


import Auth from '../utils/auth';
import { searchGoogleBooks } from '../utils/API';
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';

const SearchBooks = () => {

  const [searchedBooks, setSearchedBooks] = useState([]);
  const [saveBookIdsArr, setSaveBookIdsArr] = useState([]);
  const [searchInput, setSearchInput] = useState("");



  const [saveBook, { error, data }] = useMutation(SAVE_BOOK);

  // update state based on form input changes
  const handleSaveBook = async (bookId) => {
    // const { name, value } = event.target;

    // setSearchedBooks({
    //   ...searchedBooks,
    //   [name]: value,
    // });

    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }


    const searchBookData = Array.from(searchedBooks);


   // pass in userid and book, switch to mutations and use graphql
    // need to use graphql not fetch

    //   try {
    //     const { data } = await saveBook({
    //       variables: { ...bookToSave },
    //     });
  
    //     Auth.login(data.bookToSave.token);
    //   } catch (e) {
    //     console.error(e);
    //   }
    // };



    try {
      const response = await saveBook({
        variables: { bookType: { ...bookToSave } }, // Pass bookType as an object
      });
    
      // Check if the mutation was successful
      if (response.data.saveBook) {
        // If successful, update the saved book ids state
        setSaveBookIdsArr([...saveBookIdsArr, bookToSave.bookId]);
      }
    } catch (err) {
      console.error(err);
    }
  };
  

  // // create state for holding returned google api data
  // const [searchedBooks, setSearchedBooks] = useState([]);
  // create state for holding our search field data
  // const [searchInput, setSearchInput] = useState("");




  // try {
  //   const response = await fetch(
  //     `https://www.googleapis.com/books/v1/volumes?q=${searchInput}`
  //   );





  // // create state to hold saved bookId values
  // const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  // // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  // useEffect(() => {
  //   return () => saveBookIds(savedBookIds);
  // });

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGoogleBooks(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setSearchedBooks(bookData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };


  // const saveBook = async (event) => {
  //   event.preventDefault();
  //   console.log(searchedBooks);

  //   try {
  //     const { data } = await saveBook({
  //       variables: { ...searchedBooks },
  //     });

  //     Auth.login(data.addProfile.token);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

// //Use the Apollo useMutation() Hook to execute the SAVE_BOOK mutation 
//   // create function to handle saving a book to our database
//   const handleSaveBook = async (bookId) => {
//     // find the book in `searchedBooks` state by the matching id
//     const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

//     // get token
//     const token = Auth.loggedIn() ? Auth.getToken() : null;

//     if (!token) {
//       return false;
//     }

//     try {
//       const response = await saveBook(bookToSave, token);

//       if (!response.ok) {
//         throw new Error('something went wrong!');
//       }

//       // if book successfully saves to user's account, save book id to state
//       setSavedBookIds([...savedBookIds, bookToSave.bookId]);
//     } catch (err) {
//       console.error(err);
//     }
//   };






  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
        {data ? (
          <h1>Search for Books!</h1>
        ) : (
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a book'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form> )}
        </Container>



        {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}


      </div>


      {/* const searchBookData = Array.from(searchedBooks); */}




      <Container>
        <h2 className='pt-5'>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : 'Search for a book to begin'}
        </h2>
        <Row>
          {/* {searchedBooks.map((book) => { */}
          {Array.isArray(searchedBooks) ? searchedBooks.map((book) => {
            return (
              <Col md="4" key={book.bookId}>
                <Card border='dark'>
                  {book.image ? (
                    <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={saveBookIdsArr?.some((savedBookId) => savedBookId === book.bookId)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveBook(book.bookId)}>
                        {/* {saveBookIds?.some((savedBookId) => savedBookId === book.bookId) */}
                        {saveBookIdsArr?.some((savedBookId) => savedBookId === book.bookId)
                          ? 'This book has already been saved!'
                          : 'Save this Book!'}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          }) : 'Empty' }        </Row>
      </Container>
    </>
  );
};

export default SearchBooks;