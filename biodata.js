const express = require('express');
const app = express();
const port = 8000;

const {logger} = require ('./middleware/middleware_biodata');

//middleware untuk penerimaan json dari express (intinya ini middleware)
app.use(express.json());
app.use(logger);

app.listen(port, 'localhost', () => {
    console.log(`server berjalan di port ${port}`)
});

app.get('/hello', (request, response) => {
    return response.send('halo dari expressjs');
});

//representasi dari database (intinya ini database)
let biodatas = [
    {id: 1, name: 'irma nur faizah wiranto'},
    {id: 2, umur: '17'},
    {id: 3, alamat: 'vida bekasi'},
    {id: 4, sosial_media: '@kptn.rzap_'},
    {id: 5, nomor_telepon: '081387216863'},
];

//get: ambil semua biodata (ini ngambil semua data)
app.get('/biodatas', (request,response) => {
    response.status(200).json(biodatas);
});

//get: ambil berdasarkan id (ini ngambil 1 data aja karena dia pakai id)
app.get('/biodatas/:id', function (request, response) {
    const biodata = biodatas.find((data) => 
        data.id === parseInt(request.params.id));

    if(biodata) {
        response.json(biodata);
    } else {
        response.status(400).json({
            pesan: "data biodata tidak ditemukan",
        });
    }
});

//(ini post, tidak tau:'< )
app.post('/biodatas', (request, response) => {
    const newbiodata = {
        id: biodatas.length + 1,
    ...request.body
    };
    biodata.push(newbiodata);

    response.status(200).json(newbiodata);
});

//put: update biodata berdasarkan id (ini katanya buat merubah atau menambahkan sesuatu ke si data)
app.put('/biodatas/:id', (request, response) => {
    const biodata = biodatas.find((data) => 
        data.id === parseInt(request.params.id));
    if (biodata) {
        biodata.nama = request.body.nama;
        biodata.umur = request.body.umur;
        biodata.alamat = request.body.alamat;
        biodata.social_media = request.body.social_media;
        biodata.nomor_telepon = request.body.nomor_telepon;

        response.json(biodata);
    } else {
        response.status(404).json({
            pesan: "biodata tidak ditemukan"
        });
    }
});
