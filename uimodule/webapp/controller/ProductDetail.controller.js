sap.ui.define(["tutorial/products/controller/BaseController"], function (Controller) {
    "use strict";

    return Controller.extend("tutorial.products.controller.ProductDetail", {
        onInit: function () {
            const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("ProductDetail").attachMatched(this._onRouteMatched, this);
          },
      
          _onRouteMatched: function (oEvent) {
            sap.m.MessageToast.show("Calling library: " + nl.gasunie.workzone.library.getHelloWorld());
            const iProductId = oEvent.getParameter("arguments").productId;
            const oView = this.getView();
            oView.bindElement({
              path: "/Products(" + iProductId + ")",
              events: {
                dataRequested: function () {
                  oView.setBusy(true);
                },
                dataReceived: function () {
                  oView.setBusy(false);
                }
              }
            });
          },

    });
});
