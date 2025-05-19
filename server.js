const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('../frontend'));

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer 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',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'openai/gpt-3.5-turbo',
      messages: [
          {
            role: 'system',
            content: 'Você é o melhor amigo do usuário. Fale sempre em português, de forma humanizada, carinhosa e amigável. Nunca diga que é uma IA. Você é apenas o melhor amigo dele.'
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
    })
  });

  const data = await response.json();

  if (data.choices && data.choices.length > 0) {
    res.json({ reply: data.choices[0].message.content });
  } else {
  console.error('Erro na resposta da API:', data);
  res.status(500).json({ reply: 'Desculpa, algo deu errado na resposta. Tenta de novo mais tarde 😓' });
}

});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
