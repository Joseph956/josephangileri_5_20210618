
//recuperation de la chaine de requete dans l'url (id du produit)
const queryString_url_id = window.location.search;
// console.log(queryString_url_id);

// extraction de l'id (retirer le point d'interrogation)
const leId = queryString_url_id.slice(4);
console.log(leId);

//affichage du produit selectionné par l'utilisateur par son id
//methode fetch en récupérant la valeur de l'id à la fin de l'url

(async () => {
    const leId = getIdProduit()
    const produit = await getProduit(leId)
    structureProduits(produit)
})()

function getIdProduit() {
const url = new URL(`http://localhost:3000/api/teddies/${leId}`);
console.log(url.href);
}

function getProduit() {
    return fetch(`http://localhost:3000/api/teddies/${leId}`)
    .catch((error) => {
        console.log(error)
      })
      .then((httpBodyResponse) => httpBodyResponse.json())
      .then((productData) => productData)
}

// Afficher le produit dans la page produit
function structureProduits(produit) {
    console.log(produit);
    const selectColors = document.getElementById("option-produit");
    document.getElementById("produit").innerHTML +=
   `   
    <div class="page-produit"> 
        <figure class="ourson">        
            <div>
                <img class="imageProduit" src="${produit.imageUrl}" alt="">
            </div>
            <div >
                <figcaption class="infodiapos">
                    <h2 class="nomProduits"><span>${produit.name}</span></h2>
                    <div class="vide"></div>
                    <div class="prixProduits"><span>${produit.price /100} € </span></div>
                </figcaption>
            </div>
            <div class="descriptionProduits">
                <p><span>${produit.description}</span></p>
            </div>            
        </figure>
        </div>
    `;

    for (const color of produit.colors) {
        console.log(color);

        let opt = document.createElement("option");
        opt.value = color;
        opt.text = color;

        selectColors.add(opt, null);
    } 
    

}

/*****************************************************************
***************************gestion du panier*********************
****************************************************************/

//récupération des données selectionnées par l'user
//1/selection de l'id du formulaire
const idForm = document.querySelector(".option_produit");
console.log(idForm);

//selection du bouton ajouter l'article dans le panier
const btn_envoyerPanier = document.querySelector(".btn-valider")
console.log(btn_envoyerPanier);

//ecouter le bouton et envoyer le panier
btn_envoyerPanier.addEventListener('click', (event) => {
    event.preventDefault();  //empêche la réactualisation de la page
    
    //mettre le choix de l'user dans une variable
    const choixForm = idForm.Value
    console.log(choixForm);

    //récupération des valeurs du formulaire
    let optionsProduit = {
        nomProduits: getProduit.name,
        ourson: getProduit._id,
        option_produit: getProduit.choixForm,
        quantité: 1,
        prixProduits: getProduit.price / 100
}

console.log(optionsProduit);
});

