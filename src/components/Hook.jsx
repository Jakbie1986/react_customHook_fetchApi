import useCharacters from "../hooks/useCharacters";

const Hook = () => {
    const {characters, errorMessage, inputValue, numberOfPages, page, setInputValue, searchCharacters, goToPrevPage, goToNextPage} = useCharacters();

    const handleClik = (e) => {
        console.log(e.target.value)
        searchCharacters(e.target.value);
    }

    return (
        <div>
            <input onChange={(e) => setInputValue(e.target.value)} value={inputValue}/>
            <button onClick={handleClik}>Zapisz</button>
            {errorMessage && <p>Brak wyników wyszukiwania</p>}
            {numberOfPages > 1 &&
                <div>
                    <button onClick={goToPrevPage} disabled = {page === 1 ? true : false}> &lt; </button>
                    <button onClick={goToNextPage} disabled = {page === numberOfPages ? true : false}> &gt; </button>
                </div>
            }
            <ul>
                {characters.map(el => 
                    <li key={el.id}>
                        <h3>{el.name}</h3>
                        <img src={el.image} />
                    </li>)}
            </ul>
        </div>
    )
}

export default Hook;