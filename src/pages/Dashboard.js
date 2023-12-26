import React from "react";
import AppBar from "../Components/AppBar";
import "../styles/Dashboard.css";
import { UserContext } from '../context/UserContext';
import { useContext, useEffect, useState } from 'react';
import Shuffle from "../assets/shuffle.svg";

function Dashboard() {
    const [selectedTab, setSelectedTab] = useState('Upcoming Books'); // Add this line
    const { userDetails } = useContext(UserContext);
    const APIKEY = "AIzaSyBlkjVx_pktQUW2-wYWi4ErtOR1Ik7zDIY"
    const [books, setBooks] = useState([]);
    const [catalogueBooks, setCatalogueBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('relevance');
    const [page, setPage] = useState(1);
    const booksPerPage = 10;
    const [inputValue, setInputValue] = useState('');

    console.log(userDetails.currentRecommendations)
    useEffect(() => {
        const fetchPromises = userDetails.currentRecommendations.map(isbn => {
            const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${APIKEY}`;
            return fetch(apiUrl).then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            });
        });

        Promise.all(fetchPromises).then(data => {
            const books = data.map(response => response.items[0]);
            setBooks(books);
        }).catch(error => {
            console.error(error);
        });
    }, [userDetails, APIKEY]);

    useEffect(() => {
        if (selectedTab === 'Catalogue') {
            const startIndex = (page - 1) * booksPerPage;
            fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&orderBy=${sortOption}&startIndex=${startIndex}&maxResults=${booksPerPage}&printType=books&key=${APIKEY}`)
                .then(response => response.json())
                .then(data => {
                    if (data.items) {
                        setCatalogueBooks(data.items);
                    } else {
                        setCatalogueBooks([]);
                    }
                })
        }
    }, [selectedTab, searchQuery, sortOption, page]);


    return <div>
        <AppBar transparent={false} />
        <div className="dashboard-page">
            <div className="dashboard-menu">
                <button className="menu-button" onClick={() => setSelectedTab('Upcoming Books')}>Upcoming Books</button>
                <button className="menu-button" onClick={() => setSelectedTab('Book History')}>Book History</button>
                <button className="menu-button" onClick={() => setSelectedTab('Catalogue')}>Catalogue</button>
            </div>
            <div className="dashboard-books">
                {selectedTab === 'Upcoming Books' && books.map((book, index) => (
                    <div key={index} className="book-container">
                        <img src={book.volumeInfo.imageLinks.smallThumbnail} alt="Book Cover" className="book-cover"/>
                            <div className="book-details">
                                <p className="book-title">{book.volumeInfo.title}</p>
                                <p className="book-info">{book.volumeInfo.authors} ({book.volumeInfo.publishedDate})</p>
                                <p className="book-description">{book.volumeInfo.description.substring(0, 170) + '...'}</p>
                            </div>
                            <img src={Shuffle} alt="Shuffle" className="shuffle"/>
                    </div>
                ))}
                {selectedTab === 'Catalogue' && (
                <div className="catalogue">
                    <form onSubmit={e => { e.preventDefault(); setSearchQuery(inputValue); }}>
                        <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="Search books..." />
                        <input type="submit" value="Search" />
                    </form>
                    <select value={sortOption} onChange={e => setSortOption(e.target.value)}>
                        <option value="relevance">Relevance</option>
                        <option value="newest">Newest</option>
                        <option value="rating">Rating</option>
                    </select>
                    <button onClick={() => setPage(prevPage => prevPage - 1)}>Previous</button>
                    <button onClick={() => setPage(prevPage => prevPage + 1)}>Next</button>
                    <div className="catalogue-books-container">
                    {catalogueBooks.map((book, index) => (
                            <div className="catalogue-book-container">
                                {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail ? (
                                    <img src={book.volumeInfo.imageLinks.smallThumbnail} alt="Book Cover" className="catalogue-book-cover"/>
                                ) : (
                                    <div className="empty-container-catalogue"></div>
                                )}
                                <div className="catalogue-book-details">
                                    <p className="catalogue-book-title">{book.volumeInfo.title}</p>
                                    <p className="catalogue-book-info">{book.volumeInfo.authors} ({book.volumeInfo.publishedDate})</p>
                                </div>
                            </div>
                    ))}
                    </div>
                </div>
            )}
            </div>
        </div>
    </div>
}

export default Dashboard;