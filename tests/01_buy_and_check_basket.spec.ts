import { test as base } from "@playwright/test";
import { MyFixtures } from "../my-fixtures";
import { injectDashboardPage } from "../page-objects/mainPage.ts/Dashboard";
import { URLS } from "../constans/urls";
import { injectShopPage } from "../page-objects/Shop/Shop";
import { injectProductDetailsPage } from "../page-objects/shop/ProductDetails";
import { injectCheckoutPage } from "../page-objects/shop/Checkout";

const test = base.extend<MyFixtures>({
  dashboardPage: injectDashboardPage,
  shopPage: injectShopPage,
  productDetailsPage: injectProductDetailsPage,
  checkoutPage: injectCheckoutPage,
});

test.describe("01 Shopping basic flow", () => {
  test("Go to URL, click Shop, choose item, add to cart, go to checkout, then check cart amount and cart item", async ({
    dashboardPage,
    shopPage,
    productDetailsPage,
    checkoutPage,
  }) => {
    await dashboardPage.visit();
    await dashboardPage.verifyCurrentUrl("eq", URLS.MAIN_URL);
    await dashboardPage.acceptCookie();
    await dashboardPage.clickOver18();
    await dashboardPage.clickShopMenubar();

    await shopPage.verifyCurrentUrl("eq", `${URLS.MAIN_URL}/shop`);
    await shopPage.hoverOnPloomAdvanced();
    await shopPage.clickBuyNow();

    await productDetailsPage.verifyCurrentUrl(
      "eq",
      `${URLS.MAIN_URL}/shop/products/devices/ploom-x-advanced`
    );
    await productDetailsPage.addToCartButtonClick();
    await productDetailsPage.checkCartAmount("contain.text", "1 Item");
    await productDetailsPage.checkoutButtonClick();

    await checkoutPage.verifyCurrentUrl(
      "eq",
      `${URLS.MAIN_URL}/cart-n-checkout#/`
    );
    await checkoutPage.verifyCartItemName("Ploom X Advanced Navy Blue");
  });
});
