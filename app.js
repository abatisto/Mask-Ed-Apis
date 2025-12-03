    // app.js
// index.js (CommonJS)
    const fs = require("fs");
    const express = require('express');
    const cors = require("cors");
    const multer = require("multer");
    const app = express();
    const port = 3000;

    const handlers = require("./build/main/handlers");
    const CSVParser = require("./build/main/classes/CSVParser").CSVParser;

    const csvDir = "csvs/"
    const upload = multer({dest: csvDir});


    app.use(cors({
      origin:'http://localhost:4200',
      methods:['GET', 'POST', 'PUT', 'DELTE', 'OPTIONS']
    }))

    app.get('/', (req, res) => {
      res.send('Hello from Express!');
    });

    app.get('/pastUploads', (req, res) => {
      let contents = fs.readdirSync(csvDir);
      res.send(contents)
    })

    app.post('/previewTransforms', (req, res) => {
      let transforms = req.body.transforms;
      let value = req.body.value;
      let newValue = handlers.previewTransformsHandler(value, transforms);
      res.send(newValue);
    })


    app.post("/uploadCSV", upload.single("file"), async (req, res) => {
      try {
        if (!req.file) {
          return res.status(400).json({ error: "No file uploaded" });
        }

        const srcPath = req.file.path;
        let cols = new CSVParser(srcPath).getFileInfo()
        res.send(cols)

      } catch(e) {
        console.log(e);
        return res.status(400).json({ error: "Error" });
      }
      
    });

    app.listen(port, () => {
      console.log(`Express server listening at http://localhost:${port}`);
    });