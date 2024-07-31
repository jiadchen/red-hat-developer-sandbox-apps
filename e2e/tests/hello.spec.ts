import { test, expect } from "@playwright/test";

test("環境変数が画面に表示されている", async ({ page }) => {
  // Arrange
  const expected = `{ "API_BASE_URL": "${process.env.API_BASE_URL}" }`;

  // Act
  await page.goto(`${process.env.TEST_PAGE_URL}/hello`);

  // Assert
  await expect(page.locator("text=" + expected)).toBeVisible();
});

test("ボタンをクリックしてメッセージが表示される", async ({ page }) => {
  // Arrange
  const expected = "Hello, openshift! version:1.0.49";

  // Act
  await page.goto(`${process.env.TEST_PAGE_URL}/hello`);
  const button = page.locator("role=button");
  await button.click();

  // Assert
  await expect(page.locator("text=" + expected)).toBeVisible();
});
