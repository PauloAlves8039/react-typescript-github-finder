import { BsSearch } from "react-icons/bs";
import { useState, KeyboardEvent } from "react";
import classes from "./Search.module.css";

type SearchProps = {
    loadUser: (userName: string) => Promise<void>;
};

export default function Search({loadUser}: SearchProps) {
    const [ userName, setUserName ] = useState("");
    
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            loadUser(userName);
            clearSearch();
        }
    };

    const clearSearch = () => {
        setUserName("");
    };

    return (
        <div className={classes.search}>
            <h2>Busque por um usuário:</h2>
            <p>Conheça seus melhores repositórios</p>
            <div className={classes.search_container}>
                <input 
                    type="text" 
                    placeholder="Digite o nome do usuário"
                    value={userName} 
                    onChange={(e) => setUserName(e.target.value)}
                    onKeyDown={handleKeyDown} 
                />
                <button onClick={() => {
                    loadUser(userName);
                    clearSearch();
                }}>
                    <BsSearch />
                </button>
            </div>
        </div>
    );
}
