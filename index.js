const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

app.use(express.static('public'));

app.get('/', (req, res) => {
})

app.listen(port, () => {
  console.log(`Nathan racer listening on port ${port}`);
})