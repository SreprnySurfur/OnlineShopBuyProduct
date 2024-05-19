import { Page, expect } from "@playwright/test";
import { CommonPage } from "../Common";

declare module "../../my-fixtures" {
  interface MyFixtures {
    checkoutPage: CheckoutPage;
  }
}

export const injectCheckoutPage = async ({ page }, use) =>
  await use(new CheckoutPage(page));

class CheckoutPage extends CommonPage {
  private readonly selectors = {
    itemsCard: '[data-variant="card-variant1"]',
    test: '[aria-label="Ploom X Advanced Navy Blue"]',
  };

  private readonly testIds = {
    cart: {
      cartNumber: "mini-cart-header",
    },
    addToCartButton: "pdpAddToProduct",
    checkoutButton: "miniCartCheckoutButton",
  };

  public constructor(page: Page) {
    super(page);
  }

  //I decided to do this this way as position in basket will always be the same
  public async verifyCartItemName(expected: string) {
    const item = super.getLocator(this.selectors.itemsCard).nth(1);

    await expect(item).toContainText(expected);
  }
}
