import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function Home() {
    const [champions, setChampions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtros, setFiltros] = useState({ funcao: '', dificuldade: '', nome: '' });
    const [favorites, setFavorites] = useState(new Set());

    useEffect(() => {
        carregarCampeoes();
    }, [filtros]);

    const carregarCampeoes = async () => {
        try {
            setLoading(true);
            const params = {};
            if (filtros.funcao) params.funcao = filtros.funcao;
            if (filtros.dificuldade) params.dificuldade = filtros.dificuldade;
            if (filtros.nome) params.nome = filtros.nome;

            const response = await api.get('/champions', { params });
            setChampions(response.data);

            const favoritesIds = new Set();
            for (const champion of response.data) {
                const favRes = await api.get(`/favorites/${champion._id}/check`);
                if (favRes.data.isFavorito) {
                    favoritesIds.add(champion._id);
                }
            }
            setFavorites(favoritesIds);
        } catch (error) {
            console.error('Erro ao carregar campeões:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFavorite = async (championId) => {
        try {
            if (favorites.has(championId)) {
                await api.delete('/favorites/remove', { data: { championId } });
                setFavorites(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(championId);
                    return newSet;
                });
            } else {
                await api.post('/favorites/add', { championId });
                setFavorites(prev => new Set(prev).add(championId));
            }
        } catch (error) {
            console.error('Erro ao alterar favorito:', error);
        }
    };

    if (loading) {
        return (
            <div className="loading">
                <div className="loader"></div>
                <p>Carregando campeões...</p>
            </div>
        );
    }

    return (
        <div className="container">
            <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>⚔️ Campeões League of Legends</h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem',
                padding: '1.5rem',
                background: 'rgba(13, 202, 240, 0.05)',
                borderRadius: '8px',
                border: '1px solid var(--border-color)'
            }}>
                <input
                    type="text"
                    placeholder="Buscar por nome..."
                    value={filtros.nome}
                    onChange={(e) => setFiltros({ ...filtros, nome: e.target.value })}
                    style={{
                        padding: '0.75rem',
                        background: 'rgba(0, 0, 0, 0.3)',
                        border: '2px solid var(--border-color)',
                        color: 'var(--text-light)',
                        borderRadius: '4px',
                    }}
                />

                <select
                    value={filtros.funcao}
                    onChange={(e) => setFiltros({ ...filtros, funcao: e.target.value })}
                    style={{
                        padding: '0.75rem',
                        background: 'rgba(0, 0, 0, 0.3)',
                        border: '2px solid var(--border-color)',
                        color: 'var(--text-light)',
                        borderRadius: '4px',
                    }}
                >
                    <option value="">Todas as Funções</option>
                    <option value="Top">Top</option>
                    <option value="Jungle">Jungle</option>
                    <option value="Mid">Mid</option>
                    <option value="ADC">ADC</option>
                    <option value="Support">Support</option>
                </select>

                <select
                    value={filtros.dificuldade}
                    onChange={(e) => setFiltros({ ...filtros, dificuldade: e.target.value })}
                    style={{
                        padding: '0.75rem',
                        background: 'rgba(0, 0, 0, 0.3)',
                        border: '2px solid var(--border-color)',
                        color: 'var(--text-light)',
                        borderRadius: '4px',
                    }}
                >
                    <option value="">Todas as Dificuldades</option>
                    <option value="Fácil">Fácil</option>
                    <option value="Médio">Médio</option>
                    <option value="Difícil">Difícil</option>
                </select>

                <button onClick={() => setFiltros({ funcao: '', dificuldade: '', nome: '' })} className="btn btn-secondary">
                    Limpar Filtros
                </button>
            </div>

            {champions.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--accent-color)' }}>
                    <p style={{ fontSize: '1.2rem' }}>Nenhum campeão encontrado.</p>
                </div>
            ) : (
                <div className="champions-grid">
                    {champions.map(champion => (
                        <div key={champion._id} className="champion-card">
                            <img src={champion.imagem} alt={champion.nome} className="champion-card-image" />
                            <button className="champion-card-favorites" onClick={() => handleFavorite(champion._id)}>
                                {favorites.has(champion._id) ? '⭐' : '☆'}
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
