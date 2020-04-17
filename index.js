const express = require('express')
//requiring path and fs modules
const path = require('path');
const fs = require('fs');

const mulPath = process.env.MUL_PATH || './';
const app = express()
const port = 3000

app.use(express.static('../endore/mul'))

app.get('/', (req, res) => {
const directoryPath = path.join(__dirname, mulPath);

fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 

	const pattern = new RegExp('/\.mul|\.idx|\.def|\.txt/', 'g');
	const filtered = files.filter(file => pattern.test(file));
	const response = filtered.map(file => `<a href="${file}">${file}</a>`).join("\r\n");
    res.send(response);
});
	})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
