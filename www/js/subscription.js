var products = ["proversion", "pro_biannual", "pro_annual"];

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
      },
      {
        type: CdvPurchase.ProductType.PAID_SUBSCRIPTION,
        id: 'pro_biannual',
        platform: CdvPurchase.Platform.GOOGLE_PLAY,
      },
      {
        type: CdvPurchase.ProductType.PAID_SUBSCRIPTION,
        id: 'pro_annual',
        platform: CdvPurchase.Platform.GOOGLE_PLAY,
      }]); 
      
      CdvPurchase.store.when().productUpdated(onProductUpdated);
      CdvPurchase.store.when().approved(onTransactionApproved);
    //   CdvPurchase.store.initialize([CdvPurchase.Platform.TEST]);
      CdvPurchase.store.initialize([CdvPurchase.Platform.GOOGLE_PLAY]);
}

function onProductUpdated() {
    // const product = CdvPurchase.store.get('test-subscription', CdvPurchase.Platform.TEST);
    const product = CdvPurchase.store.get('proversion', CdvPurchase.Platform.GOOGLE_PLAY);
    // alert(product.title);
    // alert(product.pricing.price);
    //document.getElementById("btnSubscribe").innerText= "Remove Ads - " + product.pricing.price + "/mo";
    loadPlans();
}

  function onTransactionApproved(transaction)
  {
    alert('Thank you for supporting us. Bye ads!');
    localStorage.proVersion = 1;
    transaction.finish();
  }

  function buy() {
    const product = CdvPurchase.store.get('proversion', CdvPurchase.Platform.GOOGLE_PLAY);
    const offer = product.getOffer();
    if (offer)
      offer.order();
  }

  function loadPlans()
  {
    for (let i = 0; i < products.length; i++) {
        const product = CdvPurchase.store.get(products[i], CdvPurchase.Platform.GOOGLE_PLAY);
        text += '<h4 style="text-align:center;"><button onclick="buy();" style="border:none; background-color:green; color:black;">' + product.title + ' - ' + product.pricing.price + '</button></h4>';
      }
    $("#plans").append(text);
  }
