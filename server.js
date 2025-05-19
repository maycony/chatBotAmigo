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
  res.json({ reply: data.choices[0].message.content });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
