import { Product } from "./product.js";
import { Manufactor } from "./manufactor.js";

export class Shop {
    constructor(Id, Name, City, Zip, Email, StartTime, EndTime, Address, PhoneNumber) {
        this.Id = Id;
        this.Name = Name;
        this.City = City;
        this.Zip = Zip;
        this.Email = Email;
        this.StartTime = StartTime;
        this.EndTime = EndTime;
        this.Address = Address;
        this.PhoneNumber = PhoneNumber;
        this.DivKontejnerShop = null;
        this.Proizvodi = [];
        this.DivKontejnerSelectProizvoid = null;
        this.Proizvodjaci = [];
        this.DivKontejnerSelectProizvodjac = null;

        this.DugmeDodajProizvod = null;
        this.DugmeDodajProizvodjaca = null;

        this.ProizvoidDivSelect = null;
        this.ProizvodiDiv = null;
        this.ProizvodjaciDiv = null;
    }

    crtajShop(host, proizvoidDivSelect, proizvodiDiv, proizvodjaciDiv) // dodaje prodavnicu samo - vec postoji kostur
    {
        if (!host) {
            throw new Error("Roditeljski element ne postoji");
        }

        this.ProizvoidDivSelect = proizvoidDivSelect;
        this.ProizvodiDiv = proizvodiDiv;
        this.ProizvodjaciDiv = proizvodjaciDiv;

        this.DivKontejnerShop = document.createElement("div");
        this.DivKontejnerShop.className = "DivKontejnerShop";
        host.appendChild(this.DivKontejnerShop);

        var inputRadio = document.createElement("input");
        inputRadio.type = "radio";
        inputRadio.className = "proizvodjacRadio";
        inputRadio.name = "prod";
        inputRadio.value = this.Id;

        inputRadio.onclick = () => {
            // refresh - brisu se stari elementi
            this.refreshPrikaz(proizvoidDivSelect);
            this.refreshPrikaz(proizvodiDiv);
            this.refreshPrikaz(proizvodjaciDiv);
            this.Proizvodi = [];
            this.Proizvodjaci = [];

            // dodaju se novi
            this.prikaziProizvode(proizvoidDivSelect, proizvodiDiv, this.Id);
            this.prikaziProizvodjace(proizvodjaciDiv, proizvodiDiv,this.Id);
        }

        this.DivKontejnerShop.appendChild(inputRadio);

        var label = document.createElement("label");
        label.innerHTML = this.Name;
        this.DivKontejnerShop.appendChild(label);

        label.onmouseover = () => {
            var glavni=document.querySelector(".glavni");

            var modalProduct=document.createElement("div");
            modalProduct.className="modalShopInfo";
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
            h1el.innerHTML = "Shop preview";

            var productForma = document.createElement("div");
            productForma.className = "productForma";
            glavniProduct.appendChild(productForma);

            var samoForma = document.createElement("div");
            samoForma.className = "samoForma";
            productForma.appendChild(samoForma);
            
            let nizShopu=["Ime","Grad","Zip","Email","StartTime","Endtime","Adress","BrojTelefona"];
            let nizShopu1=[this.Name,this.City,this.Zip,this.Email,this.StartTime,this.EndTime,this.Address,this.PhoneNumber];

            for(var i=0;i<nizShopu.length;i++)
            {
                var divLabela = document.createElement("div");
                divLabela.className = "divLabela";
                samoForma.appendChild(divLabela);

                var divProdu=document.createElement("div");
                divProdu.className="divProdu";
                divLabela.appendChild(divProdu);

                var label=document.createElement("label");
                label.innerHTML=nizShopu[i]+": ";
                divProdu.appendChild(label);

                var valueManu=document.createElement("label");
                valueManu.innerHTML=nizShopu1[i];
                valueManu.className=nizShopu[i];
                divProdu.appendChild(valueManu);
            }

            modalProduct.style.display = "block";
        }

        label.onmouseleave = () => {
            var glavni=document.querySelector(".glavni");
            var modalShop=document.querySelector(".modalShopInfo");

            if (modalShop == null){
                return;
            }

            glavni.removeChild(modalShop);
        }

        this.DugmeDodajProizvod = document.querySelector(".dodajProizvodDugme");
        this.DugmeDodajProizvodjaca = document.querySelector(".dodajProizvodjacaDugme");

        this.dodajProizvod();
        this.dodajProizvodjaca();
    }

    prikaziProizvode(divSelectHost, divProizvodiHost, shopId) {
        if (!divSelectHost || !divProizvodiHost) {
            throw new Error("Roditeljski element ne postoji");
        }

        //console.log(shopId);

        var typesUrl = "https://localhost:5001/product/get/types?shopId=" + shopId;
        fetch(typesUrl, {
            method: "GET"
        }).then(p => p.json().then(types => {
            types.forEach(type => {
                this.crtajSelectProizvod(divSelectHost, type, divProizvodiHost);
            });
        }));

        //////////////////////////////////////////////////////////
        var url = "https://localhost:5001/product/get/all/shop?shopId=" + shopId;
        fetch(url, {
            method: "GET"
        }).then(p => p.json().then(products => {
           // console.log(products);
            products.forEach(product => {
                this.Proizvodi.push(product);
                var prod = new Product(product.id, product.totalAmount, product.availableAmount, product.type, product.articleNumber, product.name, product.price, product.createdDate, product.attributes);
                prod.Manufactor = product.manufactor;
                prod.Shop = this;

                prod.crtajProizvod(divProizvodiHost);
            });
        }));
    }

    prikaziProizvodjace(proizvodjaciDiv, hostProizvodiDiv,shopId) {
        if (!proizvodjaciDiv) {
            throw new Error("Roditeljski element ne postoji");
        }

        var url = "https://localhost:5001/manufactor/fetch?shopId=" + shopId;
        fetch(url, {
            method: "GET"
        }).then(p => p.json().then(manufactors => {
            manufactors.forEach(manufactor => {
                this.Proizvodjaci.push(manufactor);
                var man = new Manufactor(manufactor.id, manufactor.name, manufactor.city, manufactor.address, manufactor.email, manufactor.createdDate, manufactor.information, manufactor.phoneNumber, manufactor.zip);
                man.Shop = this; // dodaje referencu na shop

                man.crtajSelectProizvodjaca(proizvodjaciDiv, hostProizvodiDiv);
            });
        }));
    }

    refresh = () => {
        // refresh - brisu se stari elementi
        //console.log(this.Proizvodi);
        this.refreshPrikaz(this.ProizvoidDivSelect);
        this.refreshPrikaz(this.ProizvodiDiv);
        this.refreshPrikaz(this.ProizvodjaciDiv);
        this.Proizvodi = [];
        this.Proizvodjaci = [];

        var checkDiv = document.querySelector(".divcheck");
        var radioId = checkDiv.querySelector("input[name=prod].proizvodjacRadio:checked");
        var idProdavnice = parseInt(radioId.value);

        // dodaju se novi
        this.prikaziProizvode(this.ProizvoidDivSelect, this.ProizvodiDiv, idProdavnice);
        this.prikaziProizvodjace(this.ProizvodjaciDiv, this.ProizvodiDiv,idProdavnice);
        
    }

    refreshPrikaz = (parent) => {
        while (parent.lastChild) {
            parent.removeChild(parent.lastChild);
        }
    }

    crtajSelectProizvod(host, type, hostProizvodiDiv) {
        if (!host) {
            throw new Error("Roditeljski element ne postoji");
        }

        this.DivKontejnerSelectProizvoid = document.createElement("div");
        this.DivKontejnerSelectProizvoid.className = "DivKontejnerSelectProizvoid";
        host.appendChild(this.DivKontejnerSelectProizvoid);

        var proizvodCheckbox = document.createElement("input");
        proizvodCheckbox.type = "checkbox";
        proizvodCheckbox.value = type;
        proizvodCheckbox.checked = true;
        proizvodCheckbox.className = "proizvodSelect";

        proizvodCheckbox.onclick = () => {
            if (!proizvodCheckbox.checked) // izbrisi proizvode iz liste koji imaju cekirani tip
            {
                for (var i = 0; i < this.Proizvodi.length; ++i) {
                    if (this.Proizvodi[i].type === type) {
                        this.Proizvodi = this.Proizvodi.filter(el => el.type !== type)
                    }
                }

                this.refreshPrikaz(hostProizvodiDiv);

                this.Proizvodi.forEach(product => {
                    var prod = new Product(product.id, product.totalAmount, product.availableAmount, product.type, product.articleNumber, product.name, product.price, product.createdDate, product.attributes);
                    prod.crtajProizvod(hostProizvodiDiv);
                });
            }

            if (proizvodCheckbox.checked) // ucitaj sve proizvode sa cekiranim tipom i dodaj u postojecu listu
            {
                var url = "https://localhost:5001/product/get/by/type?shopId=" + this.Id + "&type=" + type;

                var selektovaniProizvodjaci = document.querySelectorAll("input[class=proizvodjacSelect]:checked");
                var nizImenaPomocni = [];

                for (var i = 0; i < selektovaniProizvodjaci.length; ++i){
                    nizImenaPomocni.push(selektovaniProizvodjaci[i].value);
                }

                fetch(url, { method: "GET" })
                    .then(p => p.json().then(products => {
                        products.forEach(product => {
                            if (!this.Proizvodi.some(p => p.id == product.id) && nizImenaPomocni.some(el => el === product.manufactor.name))
                            {
                                this.Proizvodi.push(product);   
                            }
                        });

                        this.refreshPrikaz(hostProizvodiDiv);
                        this.Proizvodi.forEach(product => {
                            var prod = new Product(product.id, product.totalAmount, product.availableAmount, product.type, product.articleNumber, product.name, product.price, product.createdDate, product.attributes);
                            prod.crtajProizvod(hostProizvodiDiv);
                        });
                    }));
            }
        }

        this.DivKontejnerSelectProizvoid.appendChild(proizvodCheckbox);

        var labelaProzivod = document.createElement("label");
        labelaProzivod.innerHTML = type;
        this.DivKontejnerSelectProizvoid.appendChild(labelaProzivod);
    }

    dodajProizvod = () => {
        this.DugmeDodajProizvod.onclick = () => {
            var divModal = document.querySelector(".modal");
            var dugmeDodajModal = document.querySelector(".addProduct");
            var dugmeAzurirajModal = document.querySelector(".updateProduct");

            dugmeDodajModal.style.display = "block";
            dugmeAzurirajModal.style.display = "none";

            this.refreshModal(divModal);

            var checkDiv = document.querySelector(".divcheck");
            var radioId = checkDiv.querySelector("input[name=prod].proizvodjacRadio:checked");
            var idProdavnice = parseInt(radioId.value);

            var url = "https://localhost:5001/manufactor/get/all";
            var selProizvodjac = document.querySelector(".selProizvodjac");
            this.refreshPrikaz(selProizvodjac);

            fetch(url, {
                method: "GET"
            }).then(s => s.json().then(manufactors => {
                manufactors.forEach(manufactor => {
                    var optProizvodjac = document.createElement("option");
                    optProizvodjac.innerHTML = manufactor.name;
                    optProizvodjac.value = manufactor.id;
                    selProizvodjac.appendChild(optProizvodjac);
                })
            }));

            divModal.style.display = "block";

            dugmeDodajModal.onclick = () => {
                var product = new Product();
                product.Name = divModal.querySelector(".unosIme").value;
                product.TotalAmount = parseInt(divModal.querySelector(".unosTotalAmount").value);
                product.AvailableAmount = parseInt(divModal.querySelector(".unosAvailableAmount").value);
                product.Type = divModal.querySelector(".unosTip").value;
                product.ArticleNumber = divModal.querySelector(".unosArticleNumber").value;
                product.Price = parseInt(divModal.querySelector(".unosPrice").value);
                product.CreatedDate = divModal.querySelector(".unosCreatedDate").value;
        
                if (product.Type === '' || product.Type.length>50){
                    alert("Proizvod mora da ima tip.");
        
                    return;
                }
        
                if (product.Name === '' || product.Name.length>30){
                    alert("Proizvod mora da ima svoj naziv.");
        
                    return;
                }
        
                if (product.ArticleNumber === '' || product.ArticleNumber.length>50){
                    alert("Proizvod mora da ima svoju sifru.");
        
                    return;
                }

                var osobine = divModal.querySelectorAll(".valueKarak");
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

                var selectManufactors = document.querySelector(".selProizvodjac");
                var manufactorId = selectManufactors.value;

                var url = "https://localhost:5001/product/create?shopId=" + idProdavnice + "&manufactorId=" + manufactorId;
                fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ "totalAmount": product.TotalAmount, "availableAmount": product.AvailableAmount,
                            "type": product.Type, "articleNumber": product.ArticleNumber, "name": product.Name, 
                            "price": product.Price, "createdDate": product.CreatedDate, "attributes": attributes})
                }).then(p => {
                    if (!p.ok) {
                        alert("Dogodila se greska prilikom dodavanja");
        
                        return;
                    }

                    divModal.style.display = "none";
                    this.refresh();
                });
            }
        }
    }

    refreshModal = (modal) => {
        modal.querySelector(".unosIme").value = '';
        modal.querySelector(".unosTotalAmount").value = '';
        modal.querySelector(".unosAvailableAmount").value = '';
        modal.querySelector(".unosTip").value = '';
        modal.querySelector(".unosArticleNumber").value = '';
        modal.querySelector(".unosPrice").value = '';
        modal.querySelector(".unosCreatedDate").value = '';
        
        var osobine = modal.querySelectorAll(".valueKarak");

        for (var i = 0; i < osobine.length; ++i){
            osobine[i].value = '';
        }
    }

    dodajProizvodjaca = () => {
        this.DugmeDodajProizvodjaca.onclick = () => {
            var divModal = document.querySelector(".modalProizvodjac");
            this.refreshModalProizvodjac(divModal);
            divModal.style.display = "block";

            var dugmeDodajModal = divModal.querySelector(".addManufactor");

            dugmeDodajModal.onclick = () => {
                var manufactor = new Manufactor();
                manufactor.Name = divModal.querySelector(".nazivMan").value;
                manufactor.Address = divModal.querySelector(".adresaMan").value;
                manufactor.Zip = divModal.querySelector(".zipMan").value;
                manufactor.Information = divModal.querySelector(".infoMan").value;
                manufactor.Email = divModal.querySelector(".emailMan").value;
                manufactor.City = divModal.querySelector(".gradMan").value;
                manufactor.PhoneNumber = divModal.querySelector(".telMan").value;
                manufactor.CreatedDate = divModal.querySelector(".dateMan").value;

                if (manufactor.Name === '' || manufactor.Name.length>50){
                    alert("Proizvodjac mora da ima svoj naziv.");
        
                    return;
                }
        
                if (manufactor.PhoneNumber === '' || manufactor.PhoneNumber.length>30){
                    alert("Proizvodjac mora da ima svoj kontakt telefon.");
        
                    return;
                }
        
                if (manufactor.Email === ''){
                    alert("Proizvodjac mora da ima email.");
        
                    return;
                }

                fetch("https://localhost:5001/manufactor/create", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ "name": manufactor.Name, "address": manufactor.Address,
                            "zip": manufactor.Zip, "information": manufactor.Information, "email": manufactor.Email, 
                            "city": manufactor.City, "phoneNumber": manufactor.PhoneNumber, "createdDate": manufactor.CreatedDate})
                }).then(p => {
                    if (!p.ok) {
                        alert("Dogodila se greska prilikom dodavanja proizvodjaca");
        
                        return;
                    }

                    divModal.style.display = "none";
                    this.refresh();
                });
            }
        }
    }

    refreshModalProizvodjac = (modal) => {
        modal.querySelector(".nazivMan").value = '';
        modal.querySelector(".gradMan").value = '';
        modal.querySelector(".adresaMan").value = '';
        modal.querySelector(".zipMan").value = '';
        modal.querySelector(".emailMan").value = '';
        modal.querySelector(".dateMan").value = '';
        modal.querySelector(".infoMan").value = '';
        modal.querySelector(".telMan").value = '';
    }
}