import { useState, useEffect } from 'react';

const useCharacters = () => {
    const [characters, setCharacters] = useState([]);
    const [errorMessage, setErrorMessage] = useState(false);
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [page, setPage] = useState(1);
    const [name, setName] = useState('');
    const [inputValue, setInputValue] = useState('');

    const getCharacters = async () => {
        setErrorMessage(false); 

        const request = await fetch(`https://rickandmortyapi.com/api/character?page=${page}&name=${name}`);
        const response = await request.json();

        if(response.error){ 
            setErrorMessage(true);
            setCharacters([]);
            setNumberOfPages(0);
            return
        }
        setNumberOfPages(response.info.pages);
        setCharacters(response.results);
    }

    useEffect(() => {
        getCharacters();
        }, [page, name]);


    const searchCharacters = () => {
        console.log(inputValue);
        setPage(1);
        setName(inputValue);
        setInputValue('')
    }

    const goToPrevPage = () => {
        if(page === 1 || numberOfPages === 0){
            return
        }

        setPage(prev => prev - 1);
       
    }

    const goToNextPage = () => {
        if(page === numberOfPages || numberOfPages === 0){
            return
        }

        setPage(prev => prev + 1);
    }

    return {
        characters, 
        errorMessage, 
        numberOfPages, 
        inputValue, 
        page, 
        setInputValue, 
        searchCharacters, 
        goToPrevPage, 
        goToNextPage
    }
}

export default useCharacters;