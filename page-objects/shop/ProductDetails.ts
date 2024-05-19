import { Page } from "@playwright/test";
import { CommonPage } from "../Common";
import { verifyTextContent } from "../../assertions";
import { TextValues } from "../../models/Assertions";

declare module "../../my-fixtures" {
  interface MyFixtures {
    productDetailsPage: ProductDetailsPage;
  }
}

export const injectProductDetailsPage = async ({ page }, use) =>
  await use(new ProductDetailsPage(page));

class ProductDetailsPage extends CommonPage {
  private readonly selectors = {};

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

  public async checkCartAmount(assertion: TextValues, value: string) {
    await verifyTextContent(
      super.getByTestId(this.testIds.cart.cartNumber),
      assertion,
      value
    );
  }

  public async addToCartButtonClick() {
    await super.clickByTestId(this.testIds.addToCartButton);
  }

  public async checkoutButtonClick() {
    await super.clickByTestId(this.testIds.checkoutButton);
  }
}
