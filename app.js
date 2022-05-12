const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const data = ["Louis", "Amani", "Paul"];

function echaperCaractere(word, caracteres) {
  let response = false;
  caracteres.forEach((caractere) => {
    if (word.includes(caractere)) {
      response = true;
    }
  });
  return response;
}

app.get("/", (req, res) => {
  let htmlForm =
    '<h1>Bienvenu sur notre site</h1><form action="/" method="post"><label' +
    ' for="nom">Nom</label><br><textarea name="nom" id="" cols="30" rows="3">' +
    '</textarea><br><br><button type="submit">Enregistrer</button></form>';
  let htmlList = "";
  data.forEach((nom) => {
    htmlList = htmlList + "<li>" + nom + "</li>";
  });
  htmlList = "<ul>" + htmlList + "</ul>";
  res.send(htmlForm + htmlList);
});

app.post("/", (req, res) => {
  let inputData = new String(req.body.nom);

  let htmlForm =
    '<h1>Bienvenu sur notre site</h1><form action="/" method="post"><label' +
    ' for="nom">Nom</label><br><textarea name="nom" id="" cols="30" rows="3">' +
    '</textarea><br><br><button type="submit">Enregistrer</button></form>';

  if (echaperCaractere(inputData, [">", "<"])) {
    let htmlList = "";
    data.forEach((nom) => {
      htmlList = htmlList + "<li>" + nom + "</li>";
    });
    htmlList = "<ul>" + htmlList + "</ul>";
    res.send(
      htmlForm +
        htmlList +
        "<script>alert('Faite attention avec vos pratiques malvaillant');</script>"
    );
  } else {
    data.push(inputData);

    let htmlList = "";
    data.forEach((nom) => {
      htmlList = htmlList + "<li>" + nom + "</li>";
    });
    htmlList = "<ul>" + htmlList + "</ul>";
    res.send(htmlForm + htmlList);
  }
});

app.listen(3000);
console.log("Attente des requêtes au port 3000");
