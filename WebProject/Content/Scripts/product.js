export class Product {
  constructor(Id, TotalAmount, AvailableAmount, Type, ArticleNumber, Name, Price, CreatedDate, Attributes) {
    this.Id = Id;
    this.TotalAmount = TotalAmount;
    this.AvailableAmount = AvailableAmount;
    this.Type = Type;
    this.ArticleNumber = ArticleNumber;
    this.Name = Name;
    this.Price = Price;
    this.CreatedDate = CreatedDate;
    this.Attributes = Attributes;
    this.DivKontejnerProizvoid = null;
    this.Manufactor = null;
    this.Shop = null;
    this.DugmeDodaj = null;

    this.PrikaziProizvod = null;
  }

  crtajProizvod(host) {
    if (!host) {
      throw new Error("Roditeljski element ne postoji");
    }

    this.DivKontejnerProizvoid = document.createElement("div");
    this.DivKontejnerProizvoid.className = "proizvodLista";
    this.DivKontejnerProizvoid.value = this.Id;
    host.appendChild(this.DivKontejnerProizvoid);

    var imeProizvoda = document.createElement("span");
    imeProizvoda.className = "proizvodTekst";
    imeProizvoda.innerHTML = this.Name;
    this.DivKontejnerProizvoid.appendChild(imeProizvoda);

    var slika = document.createElement("img");
    slika.className = "proizvodSlika";

    slika.onclick = () => {
      var glavni=document.querySelector(".glavni");

      var modalProduct=document.createElement("div");
      modalProduct.className="modal";
      glavni.appendChild(modalProduct);

      var glavniProduct = document.createElement("div");
      glavniProduct.className = "glavniProduct";
      modalProduct.appendChild(glavniProduct);

      var naslovProducta = document.createElement("div");
      naslovProducta.className = "naslovProducta";
      glavniProduct.appendChild(naslovProducta);

      var headerEl = document.createElement("header");
      naslovProducta.appendChild(headerEl);

      var h1el = document.createElement("h1");
      headerEl.appendChild(h1el);
      h1el.innerHTML = "Proizvod preview";

      var productForma = document.createElement("div");
      productForma.className = "productForma";
      glavniProduct.appendChild(productForma);

      var samoForma = document.createElement("div");
      samoForma.className = "samoForma";
      productForma.appendChild(samoForma);

      let nizProdu=["Ime","Tip","TotalAmount","AvailableAmount","ArticleNumber","Price","CreatedDate","Manufacturer"];
      let nizProdu1=[this.Name,this.Type,this.TotalAmount,this.AvailableAmount,this.ArticleNumber,this.Price,this.CreatedDate,this.Manufactor.name];

      for(var i=0;i<nizProdu.length;i++)
      {
        var divLabela = document.createElement("div");
        divLabela.className = "divLabela";
        samoForma.appendChild(divLabela);

        var divProdu=document.createElement("div");
        divProdu.className="divProdu";
        divLabela.appendChild(divProdu);

        var label=document.createElement("label");
        label.innerHTML=nizProdu[i]+" : ";
        divProdu.appendChild(label);

        var valueManu=document.createElement("label");
        valueManu.innerHTML=nizProdu1[i];
        valueManu.className=nizProdu[i];
        divProdu.appendChild(valueManu);
      }

      for (var i = 0; i < this.Attributes.length; ++i){
        var divLabela = document.createElement("div");
        divLabela.className = "divLabela";
        samoForma.appendChild(divLabela);

        var divProdu=document.createElement("div");
        divProdu.className="divProdu";
        divLabela.appendChild(divProdu);

        var label=document.createElement("label");
        label.innerHTML="Osobina " + (i+1)+ ": ";
        divProdu.appendChild(label);

        var valueManu=document.createElement("label");
        valueManu.innerHTML=this.Attributes[i].value;
        valueManu.className=this.Attributes[i].key;
        divProdu.appendChild(valueManu);
      }

        modalProduct.style.display = "block";

        /////////////
        var dugmeProizvod = document.createElement("div");
        dugmeProizvod.className = "pregledajProizvod";
        samoForma.appendChild(dugmeProizvod);

        var dugmeOdustani = document.createElement("button");
        dugmeOdustani.className = "abortPreview";
        dugmeOdustani.innerHTML = "Zatvori";

        dugmeOdustani.onclick = () => {
            glavni.removeChild(modalProduct);
        }

        dugmeProizvod.appendChild(dugmeOdustani);
    }

    this.DivKontejnerProizvoid.appendChild(slika);

    var proizvodText = document.createElement("span");
    proizvodText.className = "proizvodTekst";
    proizvodText.innerHTML = this.Price + " RSD";
    this.DivKontejnerProizvoid.appendChild(proizvodText);

    var divZaDugmeta = document.createElement("div");
    this.DivKontejnerProizvoid.appendChild(divZaDugmeta);

    var dugmeAzuriraj = document.createElement("button");
    dugmeAzuriraj.class = "azurirajProizvod";
    dugmeAzuriraj.innerHTML = "Azuriraj";

    dugmeAzuriraj.onclick = () => {
      var modal = document.querySelector(".modal");
      var dugmeAzurirajModal = document.querySelector(".updateProduct");
      var dugmeDodajModal = document.querySelector(".addProduct");
      
      dugmeAzurirajModal.style.display = "block";
      dugmeDodajModal.style.display = "none";

      modal.querySelector(".unosIme").value = this.Name;
      modal.querySelector(".unosTotalAmount").value = this.TotalAmount;
      modal.querySelector(".unosAvailableAmount").value = this.AvailableAmount;
      modal.querySelector(".unosTip").value = this.Type;
      modal.querySelector(".unosArticleNumber").value = this.ArticleNumber;
      modal.querySelector(".unosPrice").value = this.Price;
      modal.querySelector(".unosCreatedDate").value = Date.parse(this.CreatedDate);

      var selectManufactors = document.querySelector(".selProizvodjac");
      this.refreshPrikaz(selectManufactors);

      for (var i = 0; i < this.Shop.Proizvodjaci.length; ++i){
        var optProizvodjac = document.createElement("option");
        optProizvodjac.innerHTML = this.Shop.Proizvodjaci[i].name;
        optProizvodjac.value = this.Shop.Proizvodjaci[i].id;
        selectManufactors.appendChild(optProizvodjac);
      }

      selectManufactors.value = this.Manufactor.Id;

      var osobine = modal.querySelectorAll(".valueKarak");

      for (var i = 0; i < this.Attributes.length; ++i){
        if (this.Attributes[i] != null && this.Attributes[i].value !== ''){
          osobine[i].value = this.Attributes[i].value;
        }
      }

      modal.style.display = "block";
      
      dugmeAzurirajModal.onclick = () => {
        this.Name = modal.querySelector(".unosIme").value;
        this.TotalAmount = parseInt(modal.querySelector(".unosTotalAmount").value);///
        this.AvailableAmount = parseInt(modal.querySelector(".unosAvailableAmount").value);////
        this.Type = modal.querySelector(".unosTip").value;
        this.ArticleNumber = modal.querySelector(".unosArticleNumber").value;
        this.Price =parseInt(modal.querySelector(".unosPrice").value);
        this.CreatedDate = modal.querySelector(".unosCreatedDate").value;


        if (this.Type === '' || this.Type>50){
            alert("Proizvod mora da ima tip123.");

            return;
        }

        if (this.Name === '' || this.Name>30){
            alert("Proizvod mora da ima svoj naziv.");

            return;
        }

        if (this.ArticleNumber === '' || this.ArticleNumber>50){
            alert("Proizvod mora da ima svoju sifru.");

            return;
        }
     

        var osobine = modal.querySelectorAll(".valueKarak");
        let attributes = [];

        for (var i = 0; i < osobine.length; ++i){
            if (osobine[i].value != '') {
                var attr = {
                    key: "Attribute" + (i + 1),
                    value: osobine[i].value
                };

                attributes.push(attr);
            }
        }

        
        var manufactorId = selectManufactors.value;
        var checkDiv = document.querySelector(".divcheck");
        var radioId = checkDiv.querySelector("input[name=prod].proizvodjacRadio:checked");
        var idProdavnice = parseInt(radioId.value);

        var url = "https://localhost:5001/product/update?shopId=" + idProdavnice + "&manufactorId=" + manufactorId;
        fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "id": this.Id, "totalAmount": this.TotalAmount, "availableAmount": this.AvailableAmount,
                    "type": this.Type, "articleNumber": this.ArticleNumber, "name": this.Name, 
                    "price": this.Price, "createdDate": this.CreatedDate, "attributes": attributes})
        }).then(p => {
            if (!p.ok) {
                alert("Dogodila se greska prilikom azuriranja");

                return;
            }

            modal.style.display = "none";
            this.Shop.refresh();
        });
      }
    }

    divZaDugmeta.appendChild(dugmeAzuriraj);

    var dugmeIzbrisi = document.createElement("button");
    dugmeIzbrisi.class = "azurirajPrizbrisiProizvodoizvod";
    dugmeIzbrisi.innerHTML = "Izbrisi";

    dugmeIzbrisi.onclick = () => {
      var url = "https://localhost:5001/product/delete?productId=" + this.Id;

      fetch(url, { method: "DELETE" }).then(p => {
        if (p.ok) {
          this.Shop.refresh();
        } else {
          alert("Brisanje neuspesno!");
        }
      });
    };

    divZaDugmeta.appendChild(dugmeIzbrisi);
  }

  refreshPrikaz = (parent) => {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
  }
}