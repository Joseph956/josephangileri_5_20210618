(async function products() {
    const products = await getProducts();
    for (product of products) {
        displayProduct(product);
    }   
})();
    
function getProducts() {
    return fetch(`http://localhost:3000/api/teddies/`)
    .then(function(httpBodyResponse) {
        return httpBodyResponse.json()
    })
    .then(function(products) {       
        return products
    }) 
    .catch(function(error) {
        alert(error)
    });
};

function displayProduct(product) {
    document.getElementById("produits").innerHTML += 
   `   
    <div class="container-produits"> 
        <figure class="ourson">
            <div>  
                <a class="liensProduits" href="/frontend/produit.html?id=${product._id}">
                    <img class="imageProduits" src="${product.imageUrl}" alt="">
                </a>
            </div>
            <div class="information">
                <div>
                    <figcaption class="infodiapos">
                        <h2 class="nomProduits"><span> ${product.name}</span></h2>
                        <div class="vide"></div>
                        <div class="prixProduits"><span> ${product.price /100},00 € </span></div>
                    </figcaption>
                </div>
                <div>
                    <p class="descriptionProduits">
                    <span> Description : ${product.description}</span>
                    </p>
                </div>
            </div>               
        </figure>
    </div>
    `
};




