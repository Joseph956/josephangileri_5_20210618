const orderId = localStorage.getItem("orderId");
console.log(orderId);

const total = localStorage.getItem("prixTotal");
console.log(`total : ${total}`);

const confirmationCmd = document.querySelector('#containerCreationClient');

const confirmationCmdHtml = `
    <h1 class="titreConfirmation" >Contenu de votre panier</h1>

    <div class="creationClient">
        <p>Récapitulatif de votre commande</p>
        <p>Commande numéro : 
            <span class="nbCmd">${orderId}</span> 
        </p>
        <p>Le montant total de votre commande
            <span class="totCmd">${total /100} € </span>
        </p>
    </div>
    `;

confirmationCmd.insertAdjacentHTML("afterbegin", confirmationCmdHtml);

function removeLocalStorage(key) {
    localStorage.removeItem(key);

}

removeLocalStorage("orderId");
removeLocalStorage("products");
removeLocalStorage("prixTotal");
