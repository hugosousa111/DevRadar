const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://hugo:oguhoguh1A@cluster0-0chhh.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//pq um ta na 3333(back) e o outro na 3000(front)
//app.use(cors({origin:'http://localhost:3000'}));
app.use(cors());

app.use(express.json());
app.use(routes);

app.listen(3333); //porta