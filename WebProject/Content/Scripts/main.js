import { Manufactor } from "./manufactor.js";
import { Shop } from "./shop.js";

// iscrtavanje stranice - kostur -> pocetak

var glavni = document.createElement("div");
glavni.className = "glavni";
document.body.appendChild(glavni);

var divNaslov = document.createElement("div");
divNaslov.className = "naslov";
glavni.appendChild(divNaslov);

var header = document.createElement("header");
divNaslov.appendChild(header);

var h1Naslov = document.createElement("h1");
h1Naslov.innerHTML = "Welcome to the WEB shop";
header.appendChild(h1Naslov);

var divZaPrikaz = document.createElement("div");
divZaPrikaz.className = "divZaPrikaz";
glavni.appendChild(divZaPrikaz);

var checkDiv = document.createElement("div");
checkDiv.className = "divcheck";
divZaPrikaz.appendChild(checkDiv);

var h1Prodavnice = document.createElement("h1");
h1Prodavnice.innerHTML = "Prodavnice: ";
checkDiv.appendChild(h1Prodavnice);

var divProd = document.createElement("div");
divProd.className = "divprod";
checkDiv.appendChild(divProd);

var h1Proizvodi = document.createElement("h1");
h1Proizvodi.innerHTML = "Proizvodi: ";
checkDiv.appendChild(h1Proizvodi);

var proizvoidDivSelect = document.createElement("div");
proizvoidDivSelect.className = "divproizvod";
checkDiv.appendChild(proizvoidDivSelect);

////
var h1Proizvodjaci = document.createElement("h1");
h1Proizvodjaci.innerHTML = "Proizvodjaci: ";
checkDiv.appendChild(h1Proizvodjaci);

var divproizvodjac = document.createElement("div");
divproizvodjac.className = "divproizvodjac";
checkDiv.appendChild(divproizvodjac);

///

var divDodajProizvod = document.createElement("div");
checkDiv.appendChild(divDodajProizvod);

var buttonDodaj = document.createElement("button");
buttonDodaj.className = "dodajProizvodDugme";
buttonDodaj.innerHTML = "Dodaj proizvod";
divDodajProizvod.appendChild(buttonDodaj);

var buttonDodajProizvodjaca = document.createElement("button");
buttonDodajProizvodjaca.className = "dodajProizvodjacaDugme";
buttonDodajProizvodjaca.innerHTML = "Dodaj proizvodjaca";
divDodajProizvod.appendChild(buttonDodajProizvodjaca);

var proizvodiDiv = document.createElement("div");
proizvodiDiv.className = "divselect";
divZaPrikaz.appendChild(proizvodiDiv);

// iscrtavanje stranice - kostur -> kraj


fetch("https://localhost:5001/shop/get/all", {
    method: "GET"
}).then(s => s.json().then(shops => {
    shops.forEach(shop => {
        var sh = new Shop(shop.id, shop.name, shop.city, shop.zip, shop.email, shop.startTime, shop.endTime, shop.address, shop.phoneNumber);
        sh.crtajShop(divProd, proizvoidDivSelect, proizvodiDiv, divproizvodjac);/////////
    })
}));

// kreiranje modala koji ce da se koristi za dodavanje i azuriranje proizvoda

var divModal = document.createElement("div");
divModal.className = "modal";
glavni.appendChild(divModal);

var glavniProduct = document.createElement("div");
glavniProduct.className = "glavniProduct";
divModal.appendChild(glavniProduct);

var naslovProducta = document.createElement("div");
naslovProducta.className = "naslovProducta";
glavniProduct.appendChild(naslovProducta);

var headerEl = document.createElement("header");
naslovProducta.appendChild(headerEl);

var h1el = document.createElement("h1");
headerEl.appendChild(h1el);
h1el.innerHTML = "Web Shop - Dodaj proizvod";

var productForma = document.createElement("div");
productForma.className = "productForma";
glavniProduct.appendChild(productForma);
////////////////////////////
var entryTipsLeft = document.createElement("div");
entryTipsLeft.className = "entryTipsLeft";
productForma.appendChild(entryTipsLeft);

var entryTipsRight = document.createElement("div");
entryTipsRight.className = "entryTipsRight";
productForma.appendChild(entryTipsRight);

var samoForma = document.createElement("div");
samoForma.className = "samoForma";
entryTipsLeft.appendChild(samoForma);

var nizTipova = ["text", "text", "number", "number", "text", "number", "date", "image"];
var nizImena = ["Ime", "Tip", "TotalAmount", "AvailableAmount", "ArticleNumber", "Price", "CreatedDate", "Slika"];

var nizClassName = ["unosIme", "unosTip", "unosTotalAmount", "unosAvailableAmount", "unosArticleNumber", "unosPrice", "unosCreatedDate", "unosSlike",];

for (var i = 0; i < nizTipova.length; i++) {
    var divLabela = document.createElement("div");
    divLabela.className = "divLabela";
    samoForma.appendChild(divLabela);

    var prc = document.createElement("div");
    prc.className = "prc";
    prc.classList.add("prc1");
    divLabela.appendChild(prc);

    var labela = document.createElement("label");
    labela.innerHTML = nizImena[i];
    prc.appendChild(labela);

    var prc = document.createElement("div");
    prc.className = "prc";
    divLabela.appendChild(prc);

    var unosProducta = document.createElement("input");
    unosProducta.type = nizTipova[i];
    unosProducta.className = nizClassName[i];
    prc.appendChild(unosProducta);
}

var divZaProizvodjaca = document.createElement("div");
divZaProizvodjaca.className = "divLabela";
samoForma.appendChild(divZaProizvodjaca);

var prc = document.createElement("div");
prc.className = "prc";
divZaProizvodjaca.appendChild(prc);

var label = document.createElement("label");
label.innerHTML = "Manufacturer";
divZaProizvodjaca.appendChild(label);

var prc = document.createElement("div");
prc.className = "prc";
divZaProizvodjaca.appendChild(prc);

var selProizvodjac = document.createElement("select");
selProizvodjac.className = "selProizvodjac";
divZaProizvodjaca.appendChild(selProizvodjac);

var div = document.createElement("div");
entryTipsRight.appendChild(div);

var label = document.createElement("label");
label.innerHTML = "Dodaj karakteristike";
label.className = "naslovKarak";
div.appendChild(label);

var divZaKakakteristike = document.createElement("div");
divZaKakakteristike.className = "divZaKakakteristike";
entryTipsRight.appendChild(divZaKakakteristike);

var nizKarak = ["Osobina 1", "Osobina 2", "Osobina 3", "Osobina 4", "Osobina 5"];

for (var i = 0; i < nizKarak.length; i++) {
    var divKarakteristika = document.createElement("div");
    divKarakteristika.className = "divKarakteristika";
    divZaKakakteristike.appendChild(divKarakteristika);

    var imeKarak = document.createElement("label");
    imeKarak.innerHTML = nizKarak[i];
    divKarakteristika.appendChild(imeKarak);

    var valueKarak = document.createElement("input");
    valueKarak.className = "valueKarak";
    divKarakteristika.appendChild(valueKarak);
}

/////////////
var dugmeProizvod = document.createElement("div");
dugmeProizvod.className = "dodajProizvodDiv";
entryTipsLeft.appendChild(dugmeProizvod);

var dugmeAzuriraj = document.createElement("button");
dugmeAzuriraj.className = "updateProduct";
dugmeAzuriraj.innerHTML = "Azuriraj";
dugmeProizvod.appendChild(dugmeAzuriraj);

var dugmeDodaj = document.createElement("button");
dugmeDodaj.className = "addProduct";
dugmeDodaj.innerHTML = "Dodaj";
dugmeProizvod.appendChild(dugmeDodaj);

var dugmeOdustani = document.createElement("button");
dugmeOdustani.className = "abortProduct";
dugmeOdustani.innerHTML = "Odustani";

dugmeOdustani.onclick = () => {
    divModal.style.display = "none";
}

dugmeProizvod.appendChild(dugmeOdustani);

// kreiranje modala koji ce da se koristi za dodavanje proizvodjaca

var divModalProizvodjac = document.createElement("div");
divModalProizvodjac.className = "modalProizvodjac";
glavni.appendChild(divModalProizvodjac);

var glavniProduct = document.createElement("div");
glavniProduct.className = "glavniProduct";
divModalProizvodjac.appendChild(glavniProduct);

var naslovProducta = document.createElement("div");
naslovProducta.className = "naslovProducta";
glavniProduct.appendChild(naslovProducta);

var headerEl = document.createElement("header");
naslovProducta.appendChild(headerEl);

var h1el = document.createElement("h1");
headerEl.appendChild(h1el);
h1el.innerHTML = "Web Shop - Dodaj proizvodjaca";

var productForma = document.createElement("div");
productForma.className = "productForma";
glavniProduct.appendChild(productForma);

var entryTipsLeft = document.createElement("div");
entryTipsLeft.className = "entryTipsLeft";
productForma.appendChild(entryTipsLeft);

var samoForma = document.createElement("div");
samoForma.className = "samoForma";
entryTipsLeft.appendChild(samoForma);

var nizTipova = ["text", "text", "text", "number", "text", "date", "text", "text"];
var nizImena = ["Ime", "Grad", "Adresa", "Postanski broj", "Email", "CreatedDate", "Informacije", "Broj telefona"];

var nizClassName = ["nazivMan", "gradMan", "adresaMan", "zipMan", "emailMan", "dateMan", "infoMan", "telMan",];

for (var i = 0; i < nizTipova.length; i++) {
    var divLabela = document.createElement("div");
    divLabela.className = "divLabela";
    samoForma.appendChild(divLabela);

    var prc = document.createElement("div");
    prc.className = "prc";
    prc.classList.add("prc1");
    divLabela.appendChild(prc);

    var labela = document.createElement("label");
    labela.innerHTML = nizImena[i];
    prc.appendChild(labela);

    var prc = document.createElement("div");
    prc.className = "prc";
    divLabela.appendChild(prc);

    var unosProducta = document.createElement("input");
    unosProducta.type = nizTipova[i];
    unosProducta.className = nizClassName[i];
    prc.appendChild(unosProducta);
}

var divZaProizvodjaca = document.createElement("div");
divZaProizvodjaca.className = "divLabela";
samoForma.appendChild(divZaProizvodjaca);

/////////////
var dugmeProizvod = document.createElement("div");
dugmeProizvod.className = "dodajProizvodjacaDiv";
entryTipsLeft.appendChild(dugmeProizvod);

var dugmeDodaj = document.createElement("button");
dugmeDodaj.className = "addManufactor";
dugmeDodaj.innerHTML = "Dodaj";
dugmeProizvod.appendChild(dugmeDodaj);

var dugmeOdustani = document.createElement("button");
dugmeOdustani.className = "abortManufactor";
dugmeOdustani.innerHTML = "Odustani";

dugmeOdustani.onclick = () => {
    divModalProizvodjac.style.display = "none";
}

dugmeProizvod.appendChild(dugmeOdustani);