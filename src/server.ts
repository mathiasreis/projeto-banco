import express from 'express';
import { AccountController } from './controllers/account-controller';

const app = express();
app.use(express.json());
const accountController = new AccountController();

app.post('/account', async (req, res) => accountController.createAccount(req, res));

app.get('/account', async (req, res) => accountController.getAll(req, res));

app.get('/account/:id', async (req, res) => accountController.getAccount(req, res));

app.put('/account/:id', async (req, res) =>
  accountController.updateAccount(req, res),
);

app.delete('/account/:id', async (req, res) =>
  accountController.deleteAccount(req, res),
);

app.listen(3000, () => {
  console.log('Server iniciado na porta 3000');
});

// GET http://localhost:3000/pokemon/pikachu
