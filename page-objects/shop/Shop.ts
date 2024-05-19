import { Locator, Page, expect } from "@playwright/test";
import { CommonPage } from "../Common";

declare module "../../my-fixtures" {
  interface MyFixtures {
    shopPage: ShopPage;
  }
}

export const injectShopPage = async ({ page }, use) =>
  await use(new ShopPage(page));

class ShopPage extends CommonPage {
  private readonly selectors = {
    text: {
      buyNow: " Buy Now ",
    },
    ploomAdvancedShopItem: '[data-sku="ploom-x-advanced"]',
  };

  private readonly testIds = {
    button: "customButton",
    menubarShop: {
      header: "headerItem-1",
    },
  };

  public constructor(page: Page) {
    super(page);
  }

  public async hoverOnPloomAdvanced() {
    await super.mouseHoverOnElement(this.getPloomAdvanced());
  }

  public async clickBuyNow() {
    await this.getPloomAdvanced()
      .getByTestId(this.testIds.button)
      .getByText(this.selectors.text.buyNow)
      .click();
  }

  private getPloomAdvanced(): Locator {
    return super.getLocator(this.selectors.ploomAdvancedShopItem);
  }
}
