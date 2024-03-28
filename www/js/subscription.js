function loadProducts()
{
    // CdvPurchase.store.register([{
    //     type: CdvPurchase.ProductType.PAID_SUBSCRIPTION,
    //     id: 'test-subscription',
    //     platform: CdvPurchase.Platform.TEST,
    //   }]);
      CdvPurchase.store.register([{
        type: CdvPurchase.ProductType.PAID_SUBSCRIPTION,
        id: 'proversion',
        platform: CdvPurchase.Platform.GOOGLE_PLAY,
      }]);      
      CdvPurchase.store.when().productUpdated(onProductUpdated);
      CdvPurchase.store.when().approved(onTransactionApproved);
    //   CdvPurchase.store.initialize([CdvPurchase.Platform.TEST]);
      CdvPurchase.store.initialize([CdvPurchase.Platform.GOOGLE_PLAY]);
}

function onProductUpdated() {
    const body = document.getElementsByTagName('body')[0];
    // const product = CdvPurchase.store.get('test-subscription', CdvPurchase.Platform.TEST);
    const product = CdvPurchase.store.get('proversion', CdvPurchase.Platform.GOOGLE_PLAY);
    // alert(product.title);
    // alert(product.pricing.price);
    document.getElementById("btnSubscribe").innerText= "Remove Ads - " + product.pricing.price + "/mo";
  }

  function onTransactionApproved(transaction)
  {
    alert('Thank you for supporting us. Bye ads!');
    localStorage.proVersion = 1;
    transaction.finish();
  }
