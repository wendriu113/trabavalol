import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarFavoritos();
    }, []);

    const carregarFavoritos = async () => {
        try {
            setLoading(true);
            const response = await api.get('/favorites');
            setFavorites(response.data);
        } catch (error) {
            console.error('Erro ao carregar favoritos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFavorite = async (championId) => {
        try {
            await api.delete('/favorites/remove', { data: { championId } });
            setFavorites(favorites.filter(champ => champ._id !== championId));
        } catch (error) {
            console.error('Erro ao remover favorito:', error);
        }
    };

    if (loading) {
        return (
            <div className="loading">
                <div className="loader"></div>
                <p>Carregando favoritos...</p>
            </div>
        );
    }

    return (
        <div className="container">
            <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>⭐ Meus Campeões Favoritos</h1>

            {favorites.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <p style={{ fontSize: '1.2rem', color: 'var(--accent-color)', marginBottom: '1.5rem' }}>
                        Você ainda não tem nenhum campeão favorito.
                    </p>
                    <Link to="/" className="btn btn-primary">Explorar Campeões</Link>
                </div>
            ) : (
                <div className="champions-grid">
                    {favorites.map(champion => (
                        <div key={champion._id} className="champion-card">
                            <img src={champion.imagem} alt={champion.nome} className="champion-card-image" />
                            <button
                                className="champion-card-favorites favorited"
                                onClick={() => handleRemoveFavorite(champion._id)}
                                style={{ zIndex: 10 }}
                            >
                                ⭐
                            </button>
                            <div className="champion-card-content">
                                <h2 className="champion-card-name">{champion.nome}</h2>
                                <span className="champion-card-role">{champion.funcao}</span>
                                <span className={`champion-card-difficulty difficulty-${champion.dificuldade.toLowerCase()}`}>
                                    {champion.dificuldade}
                                </span>
                                <p style={{ color: 'var(--text-light)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                                    {champion.descricao.substring(0, 60)}...
                                </p>
                                <Link to={`/champion/${champion._id}`} className="btn btn-primary btn-detail">
                                    Ver Detalhes
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
