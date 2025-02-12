const { error } = require('console');
const fs = require('fs');
const cheminFichier = 'server.properties';

function getProperties() {
  return new Promise((resolve, reject) => {
    fs.readFile(cheminFichier, 'utf-8', (err, data) => {
      if (err) {
        return reject(new Error('Erreur de lecture du fichier: ' + err));
      }
      const lignes = data.split('\n');
      const properties = {};
      lignes.forEach(ligne => {
        if (ligne.trim() === '' || ligne.startsWith('#')) return;
        const [cle, valeur] = ligne.split('=');
        properties[cle.trim()] = valeur ? valeur.trim() : '';
      });
      resolve(properties);
    });
  });
}

getProperties().then(properties => console.log(properties)).catch(error => console.error(error));


// Create = pas besoin le fichier se generer automatiquement
// Read 
// Update
// Delete = pas besoin le fichier se generer automatiquement