const express = require('express');
const cors    = require('cors');

const app = express();

app.use(cors());

app.get('/', (req, res) => {
   res.json([
      {
         "id": "1",
         "title": "Book Review: The Bear & The Nightingale"
      },
      {
         "id": "2",
         "title": "Game Review: NBA2k 23 is the best 2k ever made"
      },
      {
         "id": "3",
         "title": "Show Review: Peacemaker will go down in history"
      }
   ]);
});


app.listen(4000, () => {
   console.log("Listening for requests on port 40000");
});