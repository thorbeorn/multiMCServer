const fs = require('fs');
const PropertiesFilePath = 'server.properties';

// Read 
function getProperties() {
  return new Promise((resolve, reject) => {
    fs.readFile(PropertiesFilePath, 'utf-8', (err, data) => {
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
function getPropertie(key) {
  return new Promise((resolve, reject) => {
    fs.readFile(PropertiesFilePath, 'utf-8', (err, data) => {
      if (err) {
        return reject(new Error('Erreur de lecture du fichier: ' + err));
      }
      const lignes = data.split('\n');
      try {
        let propertie = {};
        if (propertieRaw = lignes.find(ligne => ligne.includes(key))) {
          const [cle, valeur] = propertieRaw.split('=');
          propertie[cle.trim()] = valeur ? valeur.trim() : '';
        }
        resolve(propertie);
      } catch (e) {
        return reject(new Error('Erreur de recheche dans le fichier: ' + e));
      }
    });
  });
}

// Update
function updatePropertie(key, value) {
  return new Promise((resolve, reject) => {
    fs.readFile(PropertiesFilePath, 'utf-8', (err, data) => {
      if (err) {
        return reject(new Error('Erreur de lecture du fichier: ' + err));
      }
      const lignes = data.split('\n');
      let propertieUpdated = false;
      const updatedLines = lignes.map(ligne => {
        if (ligne.includes(key)) {
          propertieUpdated = true;
          return `${key}=${value}`;
        }
        return ligne;
      });
      if (!propertieUpdated) {
        resolve(false);
      }
      fs.writeFile(PropertiesFilePath, updatedLines.join('\n'), 'utf-8', (err) => {
        if (err) {
          return reject(new Error('Erreur d\'écriture dans le fichier: ' + err));
        }
        resolve(true);
      });
    });
  });
}

// Create = pas besoin le fichier se generer automatiquement
//==================
// Read 
// getProperties().then(properties => console.log(properties)).catch(error => console.error(error));
// getPropertie("white-list").then(propertie => console.log(propertie)).catch(error => console.error(error));
//==================
// Update
// updatePropertie("white-listd", "false").then(result => console.log(result)).catch(error => console.error(error));
//==================
// Delete = pas besoin le fichier se generer automatiquement