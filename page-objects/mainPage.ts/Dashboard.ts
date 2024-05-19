import { Page } from "@playwright/test";
import { CommonPage } from "../Common";
import { URLS } from "../../constans/urls";

declare module "../../my-fixtures" {
  interface MyFixtures {
    dashboardPage: DashboardPage;
  }
}

export const injectDashboardPage = async ({ page }, use) =>
  await use(new DashboardPage(page));

class DashboardPage extends CommonPage {
  private readonly selectors = {
    text: {
      over18Text: " Yes, discover more ",
      shopMenubarText: " Shop ",
    },
    cookieAccept: '[id="onetrust-accept-btn-handler"]',
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

  private readonly url = () => URLS.MAIN_URL;

  public async visit() {
    await super.visitUrl(this.url());
  }

  public async acceptCookie() {
    await super.clickLocator(this.selectors.cookieAccept);
  }

  public async clickOver18() {
    await this.clickButton(this.selectors.text.over18Text);
  }

  public async clickShopMenubar() {
    await super
      .getByTestId(this.testIds.menubarShop.header)
      .getByText(this.selectors.text.shopMenubarText)
      .click();
  }

  private async clickButton(id: string) {
    await super.getByTestId(this.testIds.button).getByText(`${id}`).click();
  }
}
