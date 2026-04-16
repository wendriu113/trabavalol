import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../services/api';

export default function FormAbility() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id);

    const [champions, setChampions] = useState([]);
    const [championsLoaded, setChampionsLoaded] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        tecla: 'Q',
        descricao: '',
        danoBase: '',
        champion: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        carregarCampeoes();
        if (isEditing) {
            carregarAbilidade();
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

    const carregarAbilidade = async () => {
        try {
            const response = await api.get(`/abilities/${id}`);
            const ability = response.data;
            setFormData({
                nome: ability.nome || '',
                tecla: ability.tecla || 'Q',
                descricao: ability.descricao || '',
                danoBase: ability.danoBase || '',
                champion: ability.champion?._id || ability.champion || '',
            });
        } catch (err) {
            setError('Erro ao carregar habilidade');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'danoBase' ? parseFloat(value) : value
        }));
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
                await api.put(`/abilities/${id}`, formData);
                setSuccess('Habilidade atualizada com sucesso!');
            } else {
                await api.post('/abilities', formData);
                setSuccess('Habilidade criada com sucesso!');
                setFormData({
                    nome: '',
                    tecla: 'Q',
                    descricao: '',
                    danoBase: '',
                    champion: '',
                });
            }
            setTimeout(() => navigate(-1), 1500);
        } catch (err) {
            setError(err.response?.data?.msg || 'Erro ao salvar habilidade');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">{isEditing ? '✏️ Editar Habilidade' : '⚡ Nova Habilidade'}</h2>

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
                    <label htmlFor="nome">Nome da Habilidade</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        placeholder="Ex: Golpe Decisivo"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="tecla">Tecla</label>
                    <select
                        id="tecla"
                        name="tecla"
                        value={formData.tecla}
                        onChange={handleChange}
                        required
                    >
                        <option value="Q">Q</option>
                        <option value="W">W</option>
                        <option value="E">E</option>
                        <option value="R">R</option>
                        <option value="Passiva">Passiva</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="danoBase">Dano Base</label>
                    <input
                        type="number"
                        id="danoBase"
                        name="danoBase"
                        value={formData.danoBase}
                        onChange={handleChange}
                        placeholder="Ex: 100"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="descricao">Descrição</label>
                    <textarea
                        id="descricao"
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                        placeholder="Descreva a habilidade..."
                        required
                    />
                </div>

                <div className="form-buttons">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Salvando...' : isEditing ? 'Salvar Alterações' : 'Criar Habilidade'}
                    </button>
                    <button type="button" className="btn btn-danger" onClick={() => navigate(-1)}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}
