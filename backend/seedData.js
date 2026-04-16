// backend/seedData.js - Dados de exemplo para popular o banco
// Execute com: node seedData.js (após configurar MongoDB)

require('dotenv').config();
const mongoose = require('mongoose');
const dns = require('dns');
const Champion = require('./models/Champion');
const Ability = require('./models/Ability');
const Gameplay = require('./models/Gameplay');

// Usa o DNS do Google para resolver registros SRV do MongoDB Atlas
dns.setServers(['8.8.8.8', '8.8.4.4']);


const champions = [
  {
    nome: 'Garen',
    funcao: 'Top',
    dificuldade: 'Fácil',
    descricao: 'Garen marcha para a batalha com sua espada gigante, o poder de Demacia o guia. Um guerreiro invencível que protege seus aliados com sua resistência.',
    imagem: 'https://wiki.leagueoflegends.com/en-us/images/Garen_OriginalSkin.jpg?b6a4b',
  },
  {
    nome: 'Yasuo',
    funcao: 'Mid',
    dificuldade: 'Difícil',
    descricao: 'Yasuo cavalga o vento em combate, um espadachim ágil que desliza entre inimigos. Seu elo perdido o torna impredizível e devastador.',
    imagem: 'https://wiki.leagueoflegends.com/en-us/images/Yasuo_OriginalSkin.jpg?58436',
  },
  {
    nome: 'Ahri',
    funcao: 'Mid',
    dificuldade: 'Médio',
    descricao: 'Ahri é uma raposa espiritual mística que seduz seus inimigos com magia. Seus ataques são elegantes e devastadores.',
    imagem: 'https://wiki.leagueoflegends.com/en-us/images/Ahri_OriginalSkin.jpg?a73be',
  },
  {
    nome: 'Lee Sin',
    funcao: 'Jungle',
    dificuldade: 'Difícil',
    descricao: 'Lee Sin é um monge cego que sente o campo de batalha através de sua conexão com a energia. Mestre das artes marciais e insuperável em combate.',
    imagem: 'https://wiki.leagueoflegends.com/en-us/images/Lee_Sin_OriginalSkin.jpg?6c139',
  },
  {
    nome: 'Lux',
    funcao: 'Support',
    dificuldade: 'Fácil',
    descricao: 'Lux é maestra da luz, usando seu poder mágico para iluminar o caminho de seus aliados. Uma feiticeira poderosa e benevolente.',
    imagem: 'https://wiki.leagueoflegends.com/en-us/images/Lux_OriginalSkin.jpg?09938',
  },
  {
    nome: 'Draven',
    funcao: 'ADC',
    dificuldade: 'Médio',
    descricao: 'Draven é o Grande General Noxiano, um guerreiro corajoso que luta com seus machados giratórios. Poderoso e imparável no campo de batalha.',
    imagem: 'https://wiki.leagueoflegends.com/en-us/images/Draven_OriginalSkin.jpg?e9822',
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lol-champions');
    console.log('✅ Conectado ao MongoDB');

    // Limpar dados existentes
    await Champion.deleteMany({});
    console.log('🗑️  Campeões removidos');

    await Ability.deleteMany({});
    console.log('🗑️  Habilidades removidas');

    await Gameplay.deleteMany({});
    console.log('🗑️  Gameplays removidos');

    // Inserir campeões
    const insertedChampions = await Champion.insertMany(champions);
    console.log(`✅ ${insertedChampions.length} campeões inseridos`);

    // Inserir habilidades para Garen
    const garen = insertedChampions[0];
    const garenAbilities = [
      { nome: 'Corte Decisivo', tecla: 'Q', descricao: 'Garen carrega para frente e ataca.', danoBase: 75, champion: garen._id },
      { nome: 'Coragem', tecla: 'W', descricao: 'Garen ativa sua defesa passiva.', danoBase: 0, champion: garen._id },
      { nome: 'Velocidade do Julgamento', tecla: 'E', descricao: 'Garen gira seu machado causando dano.', danoBase: 60, champion: garen._id },
      { nome: 'Execução de Demacia', tecla: 'R', descricao: 'Garen executa seu inimigo com sua espada.', danoBase: 200, champion: garen._id },
      { nome: 'Colossalismo', tecla: 'Passiva', descricao: 'Garen aumenta em tamanho com armadura.', danoBase: 0, champion: garen._id },
    ];
    await Ability.insertMany(garenAbilities);
    console.log(`✅ 5 habilidades de Garen inseridas`);

    // Inserir habilidades para Yasuo
    const yasuo = insertedChampions[1];
    const yasuoAbilities = [
      { nome: 'Aço Afiado', tecla: 'Q', descricao: 'Yasuo projeta vento em linha reta.', danoBase: 65, champion: yasuo._id },
      { nome: 'Barreira de Vento', tecla: 'W', descricao: 'Yasuo cria uma barreira de proteção.', danoBase: 0, champion: yasuo._id },
      { nome: 'Deslize Aéreo', tecla: 'E', descricao: 'Yasuo desliza através dos inimigos.', danoBase: 55, champion: yasuo._id },
      { nome: 'Último Suspiro', tecla: 'R', descricao: 'Yasuo lança uma tempestade devastadora.', danoBase: 150, champion: yasuo._id },
      { nome: 'Tensão de Aço', tecla: 'Passiva', descricao: 'Yasuo aumenta sua velocidade de ataque.', danoBase: 0, champion: yasuo._id },
    ];
    await Ability.insertMany(yasuoAbilities);
    console.log(`✅ 5 habilidades de Yasuo inseridas`);

    // Inserir gameplays para Garen
    const garenGameplay = [
      {
        champion: garen._id,
        titulo: 'Montage Garen',
        videoUrl: 'https://www.youtube.com/watch?v=q8zeSFlzk3w',
        descricao: 'Aprenda todos os combos e posicionamentos corretos para dominar com Garen na trilha superior.',
        tipo: 'Highlight',
      },
    ];
    await Gameplay.insertMany(garenGameplay);
    console.log(`✅ 1 gameplays de Garen inseridos`);

    // Inserir gameplays para Yasuo
    const yasuoGameplay = [
      {
        champion: yasuo._id,
        titulo: 'Guia Yasuo - Dominar o Lane',
        videoUrl: 'https://www.youtube.com/watch?v=0fxviZLa9AU',
        descricao: 'Tudo que você precisa saber para jogar Yasuo no mid lane com perfeição.',
        tipo: 'Guide',
      },
    ];
    await Gameplay.insertMany(yasuoGameplay);
    console.log(`✅ 1 gameplay de Yasuo inserido`);

    console.log('\n🎉 Banco de dados populado com sucesso!');
    console.log('Acesse http://localhost:3000 para ver os dados');

    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Erro ao popular banco de dados:', error);
    process.exit(1);
  }
};

seedDatabase();
