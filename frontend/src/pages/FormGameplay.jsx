import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../services/api';

export default function FormGameplay() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id);

    const [champions, setChampions] = useState([]);
    const [championsLoaded, setChampionsLoaded] = useState(false);
    const [formData, setFormData] = useState({
        champion: '',
        titulo: '',
        videoUrl: '',
        descricao: '',
        tipo: 'Guide',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        carregarCampeoes();
        if (isEditing) {
            carregarGameplay();
        }
    }, [id]);

    const carregarCampeoes = async () => {
        if (championsLoaded) return;
        try {
            const response = await api.get('/champions');
            setChampions(response.data);
            setChampionsLoaded(true);
        } catch (err) {
            setError('Erro ao carregar campeões');
        }
    };

    const carregarGameplay = async () => {
        try {
            const response = await api.get(`/gameplays/${id}`);
            const gameplay = response.data;
            setFormData({
                champion: gameplay.champion?._id || gameplay.champion || '',
                titulo: gameplay.titulo || '',
                videoUrl: gameplay.videoUrl || '',
                descricao: gameplay.descricao || '',
                tipo: gameplay.tipo || 'Guide',
            });
        } catch (err) {
            setError('Erro ao carregar gameplay');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!formData.champion) {
            setError('Selecione um campeão');
            return;
        }

        try {
            setLoading(true);
            if (isEditing) {
                await api.put(`/gameplays/${id}`, formData);
                setSuccess('Gameplay atualizado com sucesso!');
            } else {
                await api.post('/gameplays', formData);
                setSuccess('Gameplay criado com sucesso!');
                setFormData({
                    champion: '',
                    titulo: '',
                    videoUrl: '',
                    descricao: '',
                    tipo: 'Guide',
                });
            }
            setTimeout(() => navigate(-1), 1500);
        } catch (err) {
            setError(err.response?.data?.msg || 'Erro ao salvar gameplay');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">{isEditing ? '✏️ Editar Gameplay' : '🎮 Novo Gameplay'}</h2>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="champion">Campeão</label>
                    <select
                        id="champion"
                        name="champion"
                        value={formData.champion}
                        onChange={handleChange}
                        onFocus={carregarCampeoes}
                        required
                    >
                        <option value="">Selecione um campeão...</option>
                        {champions.map(champion => (
                            <option key={champion._id} value={champion._id}>
                                {champion.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="titulo">Título do Gameplay</label>
                    <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleChange}
                        placeholder="Ex: Tutorial Completo Garen"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="videoUrl">URL do Vídeo (YouTube ou MP4)</label>
                    <input
                        type="url"
                        id="videoUrl"
                        name="videoUrl"
                        value={formData.videoUrl}
                        onChange={handleChange}
                        placeholder="https://www.youtube.com/watch?v=... ou URL MP4"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="tipo">Tipo</label>
                    <select
                        id="tipo"
                        name="tipo"
                        value={formData.tipo}
                        onChange={handleChange}
                        required
                    >
                        <option value="Guide">Guide</option>
                        <option value="Tutorial">Tutorial</option>
                        <option value="Ranked">Ranked</option>
                        <option value="Highlight">Highlight</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="descricao">Descrição</label>
                    <textarea
                        id="descricao"
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                        placeholder="Descreva o gameplay..."
                        required
                    />
                </div>

                <div className="form-buttons">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Salvando...' : isEditing ? 'Salvar Alterações' : 'Criar Gameplay'}
                    </button>
                    <button type="button" className="btn btn-danger" onClick={() => navigate(-1)}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}
