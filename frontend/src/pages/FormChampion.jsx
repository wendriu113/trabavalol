import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function FormChampion() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nome: '',
        funcao: 'Top',
        dificuldade: 'Médio',
        descricao: '',
        imagem: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (id) {
            carregarCampeao();
        }
    }, [id]);

    const carregarCampeao = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/champions/${id}`);
            setFormData(response.data);
        } catch (err) {
            setError('Erro ao carregar campeão');
        } finally {
            setLoading(false);
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

        try {
            setLoading(true);
            if (id) {
                await api.put(`/champions/${id}`, formData);
                setSuccess('Campeão atualizado com sucesso!');
            } else {
                await api.post('/champions', formData);
                setSuccess('Campeão criado com sucesso!');
                setFormData({
                    nome: '',
                    funcao: 'Top',
                    dificuldade: 'Médio',
                    descricao: '',
                    imagem: '',
                });
            }
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            setError(err.response?.data?.msg || 'Erro ao salvar campeão');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">
                {id ? '✏️ Editar Campeão' : '⚔️ Novo Campeão'}
            </h2>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nome">Nome do Campeão</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        placeholder="Ex: Garen, Yasuo..."
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="funcao">Função</label>
                    <select
                        id="funcao"
                        name="funcao"
                        value={formData.funcao}
                        onChange={handleChange}
                        required
                    >
                        <option value="Top">Top</option>
                        <option value="Jungle">Jungle</option>
                        <option value="Mid">Mid</option>
                        <option value="ADC">ADC</option>
                        <option value="Support">Support</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="dificuldade">Dificuldade</label>
                    <select
                        id="dificuldade"
                        name="dificuldade"
                        value={formData.dificuldade}
                        onChange={handleChange}
                        required
                    >
                        <option value="Fácil">Fácil</option>
                        <option value="Médio">Médio</option>
                        <option value="Difícil">Difícil</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="imagem">URL da Imagem</label>
                    <input
                        type="url"
                        id="imagem"
                        name="imagem"
                        value={formData.imagem}
                        onChange={handleChange}
                        placeholder="https://..."
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
                        placeholder="Descreva o campeão..."
                        required
                    />
                </div>

                <div className="form-buttons">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Salvando...' : 'Salvar'}
                    </button>
                    <Link to="/" className="btn btn-danger">Cancelar</Link>
                </div>
            </form>
        </div>
    );
}
