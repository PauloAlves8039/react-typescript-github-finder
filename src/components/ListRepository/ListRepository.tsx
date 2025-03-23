import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar, 
         FaCodeBranch, 
         FaExternalLinkAlt, 
         FaArrowUp, 
         FaArrowLeft 
} from "react-icons/fa";
import { Repo } from "../../types/Repo"; 
import { BASE_URL } from "../../config/constants";
import classes from "./ListRepository.module.css";

export default function ListRepository() {
  const { username } = useParams<{ username: string }>();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchRepositories() {
      try {
        const response = await fetch(`${BASE_URL}${username}/repos`);
        if (!response.ok) throw new Error("Erro ao buscar repositórios");

        const data: Repo[] = await response.json();
        setRepos(data);
      } catch (error) {
        console.error("Erro ao buscar repositórios:", error);
        setError("Não foi possível carregar os repositórios.");
      } finally {
        setLoading(false);
      }
    }

    fetchRepositories();
  }, [username]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    window.history.back();
  };

  if (loading) return <p>Carregando repositórios...</p>;
  if (error) return <p className={classes.error}>{error}</p>;

  return (
    <div className="animation-fade-in-downbig-1s">
      <div className={classes.repository_container}>

        <h2>Repositórios de {username}</h2>

        <div className={classes.repo_list}>
          {repos.map((repo) => (
            <div key={repo.name} className={classes.repo_card}>
              <h3>{repo.name}</h3>
              <p>{repo.description || "Sem descrição disponível"}</p>
              <div className={classes.repo_info}>
                <span><FaStar /> {repo.stargazers_count}</span>
                <span><FaCodeBranch /> {repo.forks_count}</span>
              </div>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Acessar repositório ${repo.name}`}
              >
                Visitar <FaExternalLinkAlt />
              </a>
            </div>
          ))}
        </div>
      </div>

      <button className={classes.scroll_top} onClick={scrollToTop} title="Voltar ao topo">
        <FaArrowUp />
      </button>
      <button className={classes.go_back} onClick={goBack} title="Voltar">
        <FaArrowLeft />
      </button>
    </div>
  );
}
