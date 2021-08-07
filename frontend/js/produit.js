
let productSelected;
const queryString_url_id = window.location.search;
const leId = queryString_url_id.slice(4);

(async () => {
    productSelected = await getProduct(leId);
    structureProducts(productSelected);
})()

function getProduct() {
    return fetch(`http://localhost:3000/api/teddies/${leId}`)
    .then((httpBodyResponse) => httpBodyResponse.json())
    .catch((error) => {
        console.log(error)
    });      
};

function structureProducts(product) {
const selectColors = document.getElementById("option_product");
    document.getElementById("product").innerHTML +=
   `   
    <div class="page-produit"> 
        <figure class="ourson">        
            <div>
                <a class="liensProduits" href="/frontend/produit.html?id=${product._id}">
                    <img class="imageProduit" src="${product.imageUrl}" alt="">
                </a>
            </div>
            <div class="information">
                <div >
                    <figcaption class="infodiapos">
                        <h2 class="nomProduits"><span>${product.name}</span></h2>
                        <div class="vide"></div>
                        <div class="prixProduits"><span>${product.price /100},00 € </span></div>
                    </figcaption>
                </div>
                <div>
                    <p  class="descriptionProduits"><span>${product.description}</span></p>
                </div> 
            </div>             
        </figure>
    </div>
    `;

    for (const color of product.colors) {
    let opt = document.createElement("option");
        opt.value = color;
        opt.text = color;
        selectColors.add(opt, null);
    };
};

/***********************************************************
 *             Choisir la quantité de produit
 *********************************************************/
 const choisirQuantité = `
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    `;
const commandeQuantité = document.querySelector("#quantite");
commandeQuantité.innerHTML = choisirQuantité;

/*****************************************************************
                gestion du panier local storage
****************************************************************/
const btn_envoyerPanier = document.querySelector("#btn-valider");
btn_envoyerPanier.addEventListener('click', (event) => {
    event.preventDefault();

const selectColor = document.getElementById("option_product").value;
const choisirQuantité = commandeQuantité.value;
const optionsProduit = {
    id: productSelected._id,
    nom: productSelected.name,
    color: selectColor,
    quantite: choisirQuantité,
    prix: (productSelected.price * choisirQuantité),
    image: productSelected.imageUrl,
};
/********************************************************************
                        Le local storage
 *******************************************************************/
let panier = JSON.parse(window.localStorage.getItem("products"));
const popupConfirmation = () => {
    if (window.confirm(`${productSelected.name} Couleur : ${selectColor} a bien été ajouté au panier consultez le panier "Voir mon panier" ou revenir à l'accueil "annuler"`)) {
        window.location.href = "panier.html";
    } else {
        window.location.href = "index.html";
    };
}; 

const ajoutProduitLocalStorage = (productSelected) => {
    panier.push(productSelected);
    localStorage.setItem("products", JSON.stringify(panier)); 
};
    if(panier) {
        ajoutProduitLocalStorage(optionsProduit);
        popupConfirmation();
    } else {
        panier = [];
        ajoutProduitLocalStorage(optionsProduit);
        popupConfirmation();    
    };
});
