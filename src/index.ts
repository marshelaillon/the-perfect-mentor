import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (_, res) => {
  res.send('Testing my server!');
});

app.listen(3000, () => {
  console.log('Listening on port: 3001');
});
