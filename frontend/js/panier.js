function panierVide() {
    if (products == null || products == 0) {
        console.log("le panier est vide : true");
        return true;
    } else {
        console.log("le panier est vide : false");
        return false;
    };
};

let products = JSON.parse(localStorage.getItem("products"));

/*******************************************************************
                affichage produits dans le panier
 ******************************************************************/
let structureProduitsPanier = [];
const produitDansPanier = document.querySelector(".produits-selectionne"); 

    if (products === null || products == 0) {
        const panierVide = 
        `
            <div class="panier-vide">
                <div> Le panier est vide</div>
            </div>
        `; 
        produitDansPanier.innerHTML = panierVide;

    } else {
        for (i = 0; i < products.length; i++) {
        structureProduitsPanier = structureProduitsPanier +=
            `     
            <div class="panier-recapitulatif">                          
                <div id="produitsdupanier">
                    <form>
                        <input class="supprimeArticle" type="button" value="Supprimer" id="btnSupprimer" type="submit" action="supprimer"/>
                    </form>
                        <img class="imagesPanier" src="${products[i].image}">                            
                    <div class="infosOursons">
                        <div class="oursInfos">${products[i].nom}</div>
                        <div class="oursInfos"> ${products[i].color}</div>
                        <div class="oursInfos">Qty ${products[i].quantite}</div>
                        <div class="oursInfos">Prix ${products[i].prix /100} € </div>
                    </div>
                </div>
            </div>
            `;
            }
        if(i == products.length) {
            produitDansPanier.innerHTML = structureProduitsPanier;
        }
    };

/************************************************************
        début suppression des articles du panier
*************************************************************/
let btnSupprimer = document.querySelectorAll("#btnSupprimer");

for (let j=0; j < btnSupprimer.length; j++) {
    btnSupprimer[j].addEventListener('click', (event) => {
        event.preventDefault();
    
    let id_selectionner_suppression = products[j].id;
        products = products.filter( ele => ele.id !== id_selectionner_suppression); 
        localStorage.setItem("products", JSON.stringify(products));
        alert("Ce produit a été supprimé du panier");
        window.location.href = "panier.html";
    });
};

/*******************************************************************
                Début vider entierement le panier
 ******************************************************************/
if(panierVide() == false) {
const btn_viderPanier_html = `
    <button class="btn-viderPanier"> Vider le panier </button>`;
    produitDansPanier.insertAdjacentHTML("beforeend", btn_viderPanier_html);

const btn_viderPanier = document.querySelector(".btn-viderPanier");
    btn_viderPanier.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('products');
        alert("Le panier a été vidé");
        window.location.href = "panier.html";
    });

/*****************************************************************************
    mettre les données clients du localStorage dans les champs formulaire
 ************************************************************************** */
const donneesLocalStorage = localStorage.getItem("contact");
const donneesLocalStorageObjet = JSON.parse(donneesLocalStorage);
        
function remplirFormDonneesClientsStorage(input) {
    if (donneesLocalStorageObjet == null) {
        console.log("le local storage à pour valeur null");
    } else {
    document.querySelector(`#${input}`).value = donneesLocalStorageObjet[input];
    };    
};
    remplirFormDonneesClientsStorage('firstName');
    remplirFormDonneesClientsStorage("lastName");
    remplirFormDonneesClientsStorage("address");
    remplirFormDonneesClientsStorage("city");
    remplirFormDonneesClientsStorage("codePostal");
    remplirFormDonneesClientsStorage("email");

/*****************************************************************
                calculer le montant total du panier
******************************************************************/
let prixTotalPanier = [];
    if (panierVide() == false) {
        for (let g = 0; g < products.length; g++) {
            let prixProduitsPanier = products[g].prix;
            prixTotalPanier.push(prixProduitsPanier)
        };  
    };

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTotal = prixTotalPanier.reduce(reducer,0);
const prixTotalValidationClient = `
    <div class="prixTotalValidationClient">Le prix total du panier est de : ${prixTotal /100},00 €</div>
    `;
    produitDansPanier.insertAdjacentHTML('beforeend', prixTotalValidationClient);

/*********************************************************
            le formulaire de commandes
 *******************************************************/
const btnValiderFormulaire = document.querySelector("#validerFormulaire");
    btnValiderFormulaire.addEventListener('click', (e) => {
    e.preventDefault();

const contact = new Client (
    document.getElementById('firstName').value, 
    document.getElementById('lastName').value, 
    document.getElementById('address').value, 
    document.getElementById('city').value, 
    document.getElementById('codePostal').value, 
    document.getElementById('email').value,  
);

/******************************************************************************   
                Validation des inputs données clients
******************************************************************************/
const textAlert = (value) => {
    return `${value}: Ce champ est obligatoire (Chiffres et symboles ne sont pas autorisés. Ne pas dépasser 20 caractères, minimum 3 caractères)`;
};
    
const validationIdentiteClient = (value) => {   //regEx nom / prenom client
    return /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(value);
};

const validationCodePostalClient = (value) => {  //regEx code postal client
    return /^[0-9]{5}$/.test(value);
};

const validationEmailClient = (value) => {      //regEx email client
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);       
};

const validationAdresseClient = (value) => {   //regEx adresse client
    return /^[A-Za-z0-9\s]{5,50}$/.test(value);
};

function validationDonneesClientsTextVide(querySelectorId) {         
    document.querySelector(`#${querySelectorId}`).textContent="";
};

function validationDonneesClientsText(querySelectorId) {        
    document.querySelector(`#${querySelectorId}`).textContent="Ce champ est obligatoire";
};


function validationNom() {
const nomClient = contact.firstName;
    if (validationIdentiteClient(nomClient)) {
        validationDonneesClientsTextVide("nomManquant");
        return true;
    } else {
        validationDonneesClientsText("nomManquant");
        alert(textAlert("Nom"));
        return false;
    };
};

function validationPrenom() {
const prenomClient = contact.lastName;
    if (validationIdentiteClient(prenomClient)) {
        validationDonneesClientsTextVide("prenomManquant");
        return true;
    } else {
        validationDonneesClientsText("prenomManquant");
        alert(textAlert("Prenom"));
        return false;
    };    
};

function validationAdresse() {
const adresseClient = contact.address;
    if (validationAdresseClient(adresseClient)) {
        validationDonneesClientsTextVide("adresseManquante");
        return true;
    } else {
        validationDonneesClientsText("adresseManquante");
        alert("l'adresse doit contenir des lettres sans ponctuation et des chiffres");
        return false;
    };
};

function validationVille() {
    if (validationIdentiteClient(contact.city)) {
        validationDonneesClientsTextVide("villeManquante");
        return true;
    } else {
        validationDonneesClientsText("villeManquante");
        alert(textAlert("Ville"));
        return false;
    };    
};

function validationCodePostal() {
    if (validationCodePostalClient(contact.codePostal)) {
        validationDonneesClientsTextVide("codePostalManquant");
        return true;
    } else {
        validationDonneesClientsText("codePostalManquant");
        alert("Code Postal : doit être composé de 5 chiffres");
        return false;
    };    
};

function validationEmail() {
    if (validationEmailClient(contact.email)) {
        validationDonneesClientsTextVide("emailManquant");
        return true;
    } else {
        validationDonneesClientsText("emailManquant");
        alert("Veuillez entrer une adresse e-mail valide");
        return false;
    };    
};

 //**************Fin Validation des inputs données clients*********************/

if (validationNom() && validationPrenom() &&validationAdresse() 
    && validationVille()&& validationCodePostal() && validationEmail()) {
    localStorage.setItem("contact",  JSON.stringify(contact));
    localStorage.setItem("prixTotal",  JSON.stringify(prixTotal));

    const payload = {
        contact: {
            firstName: contact.firstName,
            lastName: contact.lastName,
            address: contact.address,
            city: contact.city,
            email: contact.email
            },
            products: products.map(product => product.id)
        };

    const envoieDonneesClient = fetch ("http://localhost:3000/api/teddies/order", {
        method: 'POST', 
            headers: { 
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(payload),        
        })

        .then(response => response.json())
        .then(res => {
            localStorage.setItem("orderId", res.orderId);
            window.location.href = "confirmation.html";
        })

        .catch((error) => {
        console.error('Error:', error);
        });

    }  else  {
        alert("Veuillez remplir tous les champs du formulaire");
        };
    });  
};