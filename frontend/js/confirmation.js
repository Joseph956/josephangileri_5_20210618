const orderId = localStorage.getItem("orderId");
const total = localStorage.getItem("prixTotal");

const confirmationCmd = document.querySelector('#containerCreationClient');
const confirmationCmdHtml = `
    <div class="creationClient">
        <figure class="oursonConfirm">  
            <figcaption class="confirmationCmd">
                <h1>Bordereau de commande</h1>    
                <p class="cmdNb"> - Facture numéro - <br>
                    <span class="nbCmd">${orderId}</span>
                </p>
                <p>Merci pour votre commande <br>Montant total - 
                    <span class="totCmd">${total /100} € </span>
                </p>
            </figcaption>
        </figure>
    </div>

    <div>
        <h2 class="facturation" >Vous recevrez votre facture par mail après réglement de votre commande.
        </h2>
    </div>
    `;

confirmationCmd.insertAdjacentHTML("afterbegin", confirmationCmdHtml);
function removeLocalStorage(key) {
    localStorage.removeItem(key);
};

removeLocalStorage("orderId");
removeLocalStorage("products");
removeLocalStorage("prixTotal");

if (orderId == null || total == null) {
    window.location.href="index.html";
};