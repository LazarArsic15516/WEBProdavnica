import { Product } from "./product.js";

export class Manufactor {
    constructor(Id, Name, City, Address, Email, CreatedDate, Information, PhoneNumber, Zip) {
        this.Id = Id;
        this.Name = Name;
        this.City = City;
        this.Address = Address;
        this.Email = Email;
        this.CreatedDate = CreatedDate;
        this.Information = Information;
        this.PhoneNumber = PhoneNumber;
        this.Zip = Zip;
        this.DivKontejnerSelectProizvodjac = null;
        this.Shop = null;
    }

    crtajSelectProizvodjaca(host, hostProizvodiDiv) {
        if (!host) {
            throw new Error("Roditeljski element ne postoji");
        }

        this.DivKontejnerSelectProizvodjac = document.createElement("div");
        this.DivKontejnerSelectProizvodjac.className = "DivKontejnerSelectProizvodjac";
        host.appendChild(this.DivKontejnerSelectProizvodjac);

        var proizvodjacCheckbox = document.createElement("input");
        proizvodjacCheckbox.type = "checkbox";
        proizvodjacCheckbox.value = this.Name;
        proizvodjacCheckbox.checked = true;
        proizvodjacCheckbox.className = "proizvodjacSelect";

        proizvodjacCheckbox.onclick = () => {
            if (!proizvodjacCheckbox.checked)
            {
               // console.log(this.Shop.Proizvodi.length);
                for (var i = 0; i < this.Shop.Proizvodi.length; ++i) {
                   // console.log(this.Shop.Proizvodi[i]);
                   // console.log(this.Id);
                    if (this.Shop.Proizvodi[i] == null || this.Shop.Proizvodi[i].manufactor == null)
                    {
                        continue;
                    }

                    if (this.Shop.Proizvodi[i].manufactor.id === this.Id) {
                        this.Shop.Proizvodi = this.Shop.Proizvodi.filter(el => el.manufactor.id !== this.Id);
                    }
                }
                
                this.Shop.refreshPrikaz(hostProizvodiDiv);
                
                this.Shop.Proizvodi.forEach(product => {
                    var prod = new Product(product.id, product.totalAmount, product.availableAmount, product.type, product.articleNumber, product.name, product.price, product.createdDate, product.attributes);
                    prod.Manufactor=this;
                    prod.Shop=this.Shop;
                    prod.crtajProizvod(hostProizvodiDiv);
                });
            }

            if (proizvodjacCheckbox.checked) 
            {
                //console.log(this.Shop.Id);
               // console.log(this.Shop.Proizvodi);
                var url = "https://localhost:5001/product/get/all/manufactor/shop?manufactorId=" + this.Id + "&shopId=" + this.Shop.Id;
                var selektovaniProizvodi = document.querySelectorAll("input[class=proizvodSelect]:checked");
                //console.log(checkDiv);

                var nizTipovaPomocni=[];

                for(var i = 0; i < selektovaniProizvodi.length; ++i){
                    nizTipovaPomocni.push(selektovaniProizvodi[i].value);
                }

                fetch(url, { method: "GET" })
                    .then(p => p.json().then(products => {
                        products.forEach(product => {
                            //console.log(product);
                            if (!this.Shop.Proizvodi.some(p => p.id == product.id) && nizTipovaPomocni.some(el => el == product.type))
                            {
                                this.Shop.Proizvodi.push(product);   
                            }

                        });
                       // console.log(hostProizvodiDiv);
                        this.Shop.refreshPrikaz(hostProizvodiDiv);

                        this.Shop.Proizvodi.forEach(product => {
                            var prod = new Product(product.id, product.totalAmount, product.availableAmount, product.type, product.articleNumber, product.name, product.price, product.createdDate, product.attributes);
                            prod.Manufactor=this;
                            prod.Shop=this.Shop;
                            prod.crtajProizvod(hostProizvodiDiv);

                        });
                    }));
            }
        }

        this.DivKontejnerSelectProizvodjac.appendChild(proizvodjacCheckbox);

        var labelaProizvodjac = document.createElement("label");
        labelaProizvodjac.innerHTML = this.Name;

        labelaProizvodjac.onmouseover = () => {
            var glavni=document.querySelector(".glavni");

            var modalProduct=document.createElement("div");
            modalProduct.className="modalManufactorInfo";
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
            h1el.innerHTML = "Manufactor preview";

            var productForma = document.createElement("div");
            productForma.className = "productForma";
            glavniProduct.appendChild(productForma);

            var samoForma = document.createElement("div");
            samoForma.className = "samoForma";
            productForma.appendChild(samoForma);
            
            let nizManu=["Ime","Grad","Adresa","Postanski Broj","Email","CreatedDate","Informacije","BrojTelefona"];
            let nizManu1=[this.Name,this.City,this.Address,this.Zip,this.Email,this.CreatedDate,this.Information,this.PhoneNumber];

            for(var i=0;i<nizManu.length;i++)
            {
                var divLabela = document.createElement("div");
                divLabela.className = "divLabela";
                samoForma.appendChild(divLabela);

                var divProdu=document.createElement("div");
                divProdu.className="divProdu";
                divLabela.appendChild(divProdu);

                var label=document.createElement("label");
                label.innerHTML=nizManu[i]+": ";
                divProdu.appendChild(label);

                var valueManu=document.createElement("label");
                valueManu.innerHTML=nizManu1[i];
                valueManu.className=nizManu[i];
                divProdu.appendChild(valueManu);
            }

            modalProduct.style.display = "block";
        }

        labelaProizvodjac.onmouseleave = () => {
            var glavni=document.querySelector(".glavni");
            var modalMan=document.querySelector(".modalManufactorInfo");

            if (modalMan == null){
                return;
            }

            glavni.removeChild(modalMan);
        }

        this.DivKontejnerSelectProizvodjac.appendChild(labelaProizvodjac);
    }
}