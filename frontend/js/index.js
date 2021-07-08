
/**********************************************************
 * 
 **********************************************************/
// Déclaration de l'objet "Oursons"
let Oursons = {  
    _id: "_id",
    imageUrl: "imageUrl",
    name: "name",
    price: "price",
    description: "description",
    colors: "colors",
  };
  
  // // Déclaration de la class "ourson"
  class ourson {   
    constructor(_id, imageUrl, name, price, description, colors) {
    this._id = _id;
    this.imageUrl = imageUrl;
    this.name = name;
    this.price = price;
    this.description =description;
    this.colors =colors;
    }
  };

// Déclaration de variables
let _id = [];
let nomproduit = [];
let descriptionProduits = [];
let imageUrl = [];
let prixProduits = [];
let couleurProduits = [];
let structureProduits = "";
let i = [];


/**************************************************************
 * 
 *************************************************************/
(async function produits() {
    const produits = await getProduits();
    console.table(produits);
    for (produit of produits) {
        displayProduit(produit);
    }   
})();
    
function getProduits() {
    return fetch(`http://localhost:3000/api/teddies/`)
    .then(function(httpBodyResponse) {
        return httpBodyResponse.json()
    })
    .then(function(produits) {       
        return produits
    }) 
    .catch(function(error) {
        alert(error)
    })
}

// Afficher tous les produits 
function displayProduit() {
    document.getElementById("produits").innerHTML += 
   `   
    <div class="container-produits"> 
        <figure class="oursons">
            <div>  
                <a class="liensProduits" href="/frontend/produit.html?id=${produit._id}">
                    <img class="imageProduits" src="${produit.imageUrl}" alt="">
                </a>
            </div>
            <div>
                <figcaption class="infodiapos">
                    <h2 class="nomProduits"><span>${produit.name}</span></h2>
                    <div class="vide"></div>
                    <div class="prixProduits"><span>${produit.price /100} € </span></div>
                </figcaption>
            </div>
            <div>
                <p class="descriptionProduits"><span>${produit.description}</span></p>
            </div>                
        </figure>
    </div>
    `
}

getProduits(produits);




