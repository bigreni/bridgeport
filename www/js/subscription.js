var myProduct;

function loadProducts()
{
    const {store, ProductType, Platform} = CdvPurchase;
    refreshUI();
    store.register([{
      type: ProductType.PAID_SUBSCRIPTION,
      id: 'proVersion',
      platform: Platform.TEST,
    }]);
    store.when()
      .productUpdated(refreshUI)
      .approved(finishPurchase);
    store.initialize([Platform.TEST]);
}

function finishPurchase(transaction) {
    localStorage.proVersion = 1;
    transaction.finish();
    refreshUI();
  }

  function refreshUI() {
    const {store, ProductType, Platform} = CdvPurchase;
    myProduct = store.get('proVersion', Platform.TEST);
    const myTransaction = store.findInLocalReceipts(myProduct);
    const button = '<button onclick="myProduct.getOffer().order()">Remove Ads for ' +  myProduct.pricing.price +' per month</button>';
  
    document.getElementsByTagName('body')[0].innerHTML = `
    <div>
      <pre>
        proVersion: ${localStorage.proVersion | 0}
  
        Product.state: ${myTransaction ? myTransaction.state : ''}
               .title: ${myProduct ? myProduct.title : ''}
               .descr: ${myProduct ? myProduct.description : ''}
               .price: ${myProduct ? myProduct.pricing.price : ''}
  
      </pre>
      ${myProduct.canPurchase ? button : ''}
    </div>`;
  }