const express = require('express');
const app = express();
const port = 8000;
app.use(express.json(), express.urlencoded({extended: true}));
const cors = require('cors');
app.use(cors());

require("./server/config/mongoose.config");
require("./server/routes/pet.routes")(app);

app.listen(port, () => console.log(`listening on port ${port}`));