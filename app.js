    // app.js
// index.js (CommonJS)
    const fs = require("fs");
    const express = require('express');
    const cors = require("cors");
    const multer = require("multer");
    const app = express();
    const port = 3000;
    const moment = require("moment");
    const path = require("path");

    const handlers = require("./build/main/handlers");
    const CSVParser = require("./build/main/classes/CSVParser").CSVParser;

    const csvDir = "csvs/"
    const upload = multer({dest: csvDir});

    const fileNameMap = new Map();

    app.use(cors({
      origin:'http://localhost:4200',
      methods:['GET', 'POST', 'PUT', 'DELTE', 'OPTIONS']
    }))

    app.use(express.json());


    app.post("/uploadCSV", upload.single("file"), async (req, res) => {
      try {
        if (!req.file) {
          return res.status(400).json({ error: "No file uploaded" });
        }

        const { originalname, filename, path: srcPath } = req.file;

        fileNameMap.set(filename, {originalName:originalname,dateUploaded:new Date(),path:srcPath});
        console.log(fileNameMap.get(filename))
        // Parse CSV
        let cols = new CSVParser(srcPath).getFileInfo();

        res.json({
          fileHash: filename,
          originalName: originalname,
          columns: cols
        });

      } catch (e) {
        console.log(e);
        return res.status(400).json({ error: "Error" });
      }
    });

    app.get("/download/:filename", (req, res) => {
      const filename = req.params.filename;
      const filePath = path.join(__dirname, "out", filename);

      res.download(filePath, filename, (err) => {
        if (err) {
          console.error("Download error:", err);
          res.status(404).json({ error: "File not found" });
        }
      });
    });


    


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

    app.post("/runPipeline", async (req, res) => {
      let filename = fileNameMap.get(req.body.filename).path;
      let newFilename = "out/test.csv";
      let transforms = req.body.fieldInfo.map(f => {return {fieldName:f.name, transforms:f.transformChain}});
      await handlers.runTransformPipelineHandler(filename, newFilename, transforms);
      return res.send({status:"Success"})
    })

    app.listen(port, () => {
      console.log(`Express server listening at http://localhost:${port}`);
    });