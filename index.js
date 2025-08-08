require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/glitchtip-webhook', async (req, res) => {
  const data = req.body;
    console.log(data)
  // Exemplo de extração de dados do Glitchtip
  const project = data.project?.name || 'Projeto desconhecido';
  const errorTitle = data.title || 'Erro sem título';
  const culprit = data.culprit || 'Sem informação';
  const url = data.url || '#';

  const message = {
    text: `🚨 *Novo erro detectado no Glitchtip!*\n\n📁 Projeto: ${project}\n🧠 Erro: ${errorTitle}\n🔍 Culprit: ${culprit}\n🔗 Ver mais`
  };

  try {
    await axios.post(process.env.TEAMS_WEBHOOK_URL, message);
    res.status(200).send('Mensagem enviada ao Teams com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar para o Teams:', error.message);
    res.status(500).send('Falha ao enviar mensagem para o Teams.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
