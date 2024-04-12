var products = ["proversion", "pro_biannual", "pro_annual"];
var owned = localStorage.getItem("proVersion");
var product = localStorage.getItem("proProduct");

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
     document.getElementById("plans").innerHTML = "";
    var text = '';
    localStorage.proVersion = 0;
    for (i = 0; i < products.length; i++) {
        const product = CdvPurchase.store.get(products[i], CdvPurchase.Platform.GOOGLE_PLAY);
         if(product != null)
        {
            if(isProductOwned(product))
            {
                localStorage.proVersion = 1;
                localStorage.productId = product.id;
            }
            text += '<h4 style="text-align:center;"><button onclick=buy("' + product.id + '"); class="premium">' + product.title + ' - ' + product.pricing.price + '</button></h4>';
            // alert(text);
        }
    }
    $("#plans").append(text);
}

  function onTransactionApproved(transaction)
  {
    document.getElementById("plans").innerHTML = "";
    if(owned == null || owned == 0)
    {
        var text = '<label>Thank you for subscribing to our app and supporting us.</label><br>'
        $("#plans").append(text);
        localStorage.proVersion = 1;
        transaction.finish();
        window.location = "index.html";
    }
  }

  function buy(id) {
    // alert(id);
    const product = CdvPurchase.store.get(id, CdvPurchase.Platform.GOOGLE_PLAY);
    const offer = product.getOffer();
    if (offer)
      offer.order();
  }

  function isProductOwned(product)
  {
    return product.owned;
  }

  function loadPlans()
  {
    var text = '';
    for (i = 0; i < products.length; i++) {
        alert(products[i]);
        const product = CdvPurchase.store.get(products[i], CdvPurchase.Platform.GOOGLE_PLAY);
         if(product != null)
        {
            text += '<h4 style="text-align:center;"><button onclick="buy();" style="border:none; background-color:green; color:black;">' + product.title + ' - ' + product.pricing.price + '</button></h4>';
        }
    }

    $("#plans").append(text);
  }
