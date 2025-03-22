import { BsSearch } from "react-icons/bs";
import { AiOutlineClear } from "react-icons/ai";
import { useState, KeyboardEvent } from "react";
import { SearchProps } from "../../types/SearchProps";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "./Search.module.css";


export default function Search({loadUser}: SearchProps) {
    const [ userName, setUserName ] = useState("");
    
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleSearch = () => {
        loadUser(userName).then((found) => {
            if (found) {
                toast.success("Usuário encontrado!", { autoClose: 3000 });
            } else {
                toast.error("Usuário não encontrado!", { autoClose: 3000 });
            }
            clearSearch();
        });
    };

    const clearSearch = () => {
        setUserName("");
    };

    const resetPage = () => {
        setUserName("");
        window.location.reload();
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
                <button onClick={handleSearch} title="Pesquisar">
                    <BsSearch />
                </button>
                <button onClick={resetPage}
                    className={classes.clear_button}
                    title="Limpar">
                    <AiOutlineClear />
                </button>
            </div>
        </div>
    );
}
