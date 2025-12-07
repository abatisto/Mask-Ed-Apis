    // app.js
// index.js (CommonJS)
    const fs = require("fs");
    const express = require('express');
    const cors = require("cors");
    const multer = require("multer");
    const app = express();
    const port = 3000;
    const path = require("path");

    const handlers = require("./build/main/handlers");
    const CSVParser = require("./build/main/classes/CSVParser").CSVParser;

    const csvDir = "csvs/"
    const upload = multer({
      dest: csvDir,
      fileFilter(req, file, callback) {
        const allowedExtensions = /csv/i;
        const isValid = allowedExtensions.test(file.originalname);

        if (!isValid) {
          return callback("Invalid File Extension", false);
        }

        callback(null, true);
      },
    });

    const fileNameMap = new Map();

    const allowedOrigins = [
      "http://localhost:4200",
      "https://mask-ed.vercel.app"
    ];

    app.use(cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
          return callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));
      },
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true
    }));

    app.use(express.json());


    app.post("/uploadCSV", upload.single("file"), async (req, res) => {
      try {
        if (!req.file) {
          return res.status(400).json({ error: "No file uploaded" });
        }
        

        const { originalname, filename, path: srcPath } = req.file;

        fileNameMap.set(filename, {originalName:originalname,dateUploaded:new Date(),path:srcPath});
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
      const fileId = req.params.filename;
      const filePath = path.join(__dirname, "out", fileId);
      const downloadName = fileNameMap.get(fileId).originalName;

      res.download(filePath, downloadName, (err) => {
        if (err) {
          console.error("Download error:", err);
          res.status(404).json({ error: "File not found" });
        }
      });
    });

    app.get("/downloadLog/:filename", (req, res) => {
      const fileId = req.params.filename;
      const filePath = path.join(__dirname, "logs", fileId);
      const downloadName = `log_${fileNameMap.get(fileId).originalName.replace(".csv",'.txt')}`;

      res.download(filePath, downloadName, (err) => {
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
      let testValue = req.body.value;
      let transforms = req.body.transforms;
      if(!transforms) {
        res.send({result:testValue});
      } else {
        let newValue = handlers.previewTransformsHandler(testValue, transforms);
        res.send({result:newValue});
      }
      
    })

    app.post("/runPipeline", async (req, res) => {
      let filename = fileNameMap.get(req.body.filename).path;
      let newFilename = path.join("out", path.basename(filename));
      let transforms = req.body.fieldInfo.map(f => {return {fieldName:f.name, transforms:f.transformChain}});
      try {
        await handlers.runTransformPipelineHandler(filename, newFilename, transforms);
      } catch(e) {
        return res.status(400).json({ error: e });
      }
      return res.send({status:"Success"})
    })

    app.listen(port, () => {
      console.log(`Express server listening at http://localhost:${port}`);
    });