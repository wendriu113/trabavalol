import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function ChampionDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [champion, setChampion] = useState(null);
    const [abilities, setAbilities] = useState([]);
    const [gameplays, setGameplays] = useState([]);
    const [selectedGameplay, setSelectedGameplay] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFav, setIsFav] = useState(false);
    const [selectedAbility, setSelectedAbility] = useState(null);

    useEffect(() => {
        carregarDados();
    }, [id]);

    const carregarDados = async () => {
        try {
            setLoading(true);
            const chamRes = await api.get(`/champions/${id}`);
            setChampion(chamRes.data);

            const habRes = await api.get(`/abilities/champion/${id}`);
            setAbilities(habRes.data);

            const gameRes = await api.get(`/gameplays/champion/${id}`);
            setGameplays(gameRes.data);
            if (gameRes.data.length > 0) setSelectedGameplay(gameRes.data[0]);

            const favRes = await api.get(`/favorites/${id}/check`);
            setIsFav(favRes.data.isFavorito);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleFavorite = async () => {
        try {
            if (isFav) {
                await api.delete('/favorites/remove', { data: { championId: id } });
            } else {
                await api.post('/favorites/add', { championId: id });
            }
            setIsFav(!isFav);
        } catch (error) {
            console.error('Erro ao alterar favorito:', error);
        }
    };

    const handleEdit = () => {
        navigate(`/form-champion/${id}`);
    };

    const handleDelete = async () => {
        if (window.confirm(`Tem certeza que deseja excluir ${champion.nome}?`)) {
            try {
                await api.delete(`/champions/${id}`);
                alert('Campeão excluído com sucesso!');
                navigate('/');
            } catch (error) {
                console.error('Erro ao deletar campeão:', error);
                alert('Erro ao excluir campeão: ' + error.message);
            }
        }
    };

    const handleDeleteAbility = async (abilityId, abilityName) => {
        if (window.confirm(`Excluir a habilidade "${abilityName}"?`)) {
            try {
                await api.delete(`/abilities/${abilityId}`);
                setAbilities(prev => prev.filter(a => a._id !== abilityId));
            } catch (error) {
                console.error('Erro ao deletar habilidade:', error);
                alert('Erro ao excluir habilidade');
            }
        }
    };

    const handleDeleteGameplay = async (gameplayId, gameplayTitle) => {
        if (window.confirm(`Excluir o gameplay "${gameplayTitle}"?`)) {
            try {
                await api.delete(`/gameplays/${gameplayId}`);
                const updated = gameplays.filter(g => g._id !== gameplayId);
                setGameplays(updated);
                if (selectedGameplay?._id === gameplayId) {
                    setSelectedGameplay(updated.length > 0 ? updated[0] : null);
                }
            } catch (error) {
                console.error('Erro ao deletar gameplay:', error);
                alert('Erro ao excluir gameplay');
            }
        }
    };

    if (loading) {
        return (
            <div className="loading">
                <div className="loader"></div>
                <p>Carregando detalhes do campeão...</p>
            </div>
        );
    }

    if (!champion) {
        return (
            <div className="container">
                <p>Campeão não encontrado.</p>
                <Link to="/" className="btn btn-primary">Voltar</Link>
            </div>
        );
    }

    const getKeyColor = (key) => {
        const colors = { 'Q': '#0dcaf0', 'W': '#ffc700', 'E': '#28a745', 'R': '#dc3545', 'Passiva': '#b19cd9' };
        return colors[key] || '#0dcaf0';
    };

    return (
        <div className="champion-detail">
            <div style={{ marginBottom: '2rem' }}>
                <Link to="/" style={{ color: 'var(--accent-color)', textDecoration: 'none' }}>← Voltar</Link>
            </div>

            <div className="detail-header">
                <img src={champion.imagem} alt={champion.nome} className="detail-image" />

                <div className="detail-info">
                    <h1>{champion.nome}</h1>

                    <div className="detail-stats">
                        <div className="stat">
                            <div className="stat-label">Função</div>
                            <div className="stat-value">{champion.funcao}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-label">Dificuldade</div>
                            <div className="stat-value">{champion.dificuldade}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-label">Favoritos</div>
                            <div className="stat-value">{champion.favoritos || 0}</div>
                        </div>
                    </div>

                    <p>{champion.descricao}</p>

                    <button className={`favorite-btn ${isFav ? 'favorited' : ''}`} onClick={handleToggleFavorite}>
                        {isFav ? '⭐ Favorito' : '☆ Adicionar aos Favoritos'}
                    </button>
                </div>
            </div>

            {abilities.length > 0 && (
                <div className="abilities-section">
                    <h2 className="section-title">⚡ Habilidades</h2>

                    <div className="abilities-grid">
                        {abilities.map(ability => (
                            <div
                                key={ability._id}
                                className="ability-card"
                                onClick={() => setSelectedAbility(selectedAbility?._id === ability._id ? null : ability)}
                            >
                                <div className="ability-key" style={{ backgroundColor: getKeyColor(ability.tecla) }}>
                                    {ability.tecla}
                                </div>
                                <div className="ability-name">{ability.nome}</div>
                                <div className="ability-description">{ability.descricao}</div>
                                <div className="ability-damage">⚔️ Dano Base: {ability.danoBase}</div>

                                <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.5rem' }}>
                                    <button
                                        className="btn btn-primary btn-detail"
                                        onClick={(e) => { e.stopPropagation(); navigate(`/form-ability/${ability._id}`); }}
                                    >
                                        ✏️ Editar
                                    </button>
                                    <button
                                        className="btn btn-danger btn-detail"
                                        onClick={(e) => { e.stopPropagation(); handleDeleteAbility(ability._id, ability.nome); }}
                                    >
                                        🗑️ Excluir
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {gameplays.length > 0 && (
                <div className="gameplays-section">
                    <h2 className="section-title">🎮 Gameplays</h2>

                    {gameplays.length > 1 && (
                        <div className="video-dropdown">
                            <label>Selecione o Gameplay:</label>
                            <select value={selectedGameplay?._id || ''} onChange={(e) => setSelectedGameplay(gameplays.find(g => g._id === e.target.value))}>
                                {gameplays.map(gameplay => (
                                    <option key={gameplay._id} value={gameplay._id}>{gameplay.titulo}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {selectedGameplay && (
                        <div>
                            {selectedGameplay.videoUrl.includes('youtube') ? (
                                <iframe
                                    className="video-player"
                                    src={selectedGameplay.videoUrl.replace('watch?v=', 'embed/')}
                                    title={selectedGameplay.titulo}
                                    allowFullScreen
                                />
                            ) : (
                                <video className="video-player" controls src={selectedGameplay.videoUrl} />
                            )}
                            <p className="video-description">
                                <strong>{selectedGameplay.titulo}</strong><br />{selectedGameplay.descricao}
                            </p>
                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                                <button
                                    className="btn btn-primary btn-detail"
                                    onClick={() => navigate(`/form-gameplay/${selectedGameplay._id}`)}
                                >
                                    ✏️ Editar Gameplay
                                </button>
                                <button
                                    className="btn btn-danger btn-detail"
                                    onClick={() => handleDeleteGameplay(selectedGameplay._id, selectedGameplay.titulo)}
                                >
                                    🗑️ Excluir Gameplay
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to={`/form-ability`} className="btn btn-secondary">+ Adicionar Habilidade</Link>
                <Link to={`/form-gameplay`} className="btn btn-secondary">+ Adicionar Gameplay</Link>
                <button onClick={handleEdit} className="btn btn-primary">✏️ Editar Campeão</button>
                <button onClick={handleDelete} className="btn btn-danger">🗑️ Excluir Campeão</button>
            </div>
        </div>
    );
}
