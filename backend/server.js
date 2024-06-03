const express = require('express');
const multer = require('multer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());

const PORT = 5000;
app.post('/upload', upload.single('file'), (req, res) => {
  const filePath = req.file.path;
  const outputPath = path.join('uploads', `${Date.now()}.pdf`);

  const doc = new PDFDocument();
  const writeStream = fs.createWriteStream(outputPath);

  doc.pipe(writeStream);
  doc.image(filePath, {
    fit: [500, 700],
    align: 'center',
    valign: 'center'
  });
  doc.end();

  writeStream.on('finish', () => {
    res.download(outputPath, 'converted.pdf', (err) => {
      if (err) {
        console.error(err);
      }
      fs.unlink(filePath, () => {});
      fs.unlink(outputPath, () => {});
    });
  });
});



app.listen(PORT, () => 
    console.log(`You are listening to port ${PORT}`)
);
