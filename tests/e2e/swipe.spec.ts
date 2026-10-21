import { test, expect } from "@playwright/test";

test("gestos para ambos os lados e desfazer preserva favorito prévio", async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem("cats-da-zl:favorites:v1", '["angela"]'),
  );
  await page.goto("/tinder");
  await expect(
    page.getByRole("heading", { name: "Ângela", exact: true }),
  ).toBeVisible();
  const drag = async (direction: number) => {
    await page.locator(".swipe-card .cat-image").scrollIntoViewIfNeeded();
    const bounds = await page.locator(".swipe-card .cat-image").boundingBox();
    if (!bounds) throw new Error("Cartão não visível");
    const x = bounds.x + bounds.width / 2;
    const y = bounds.y + 100;
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x + direction * 160, y, { steps: 12 });
    await page.mouse.up();
  };
  await drag(1);
  await expect(
    page.getByRole("heading", { name: "Chester", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Desfazer última ação" }).click();
  await expect(
    page.getByRole("heading", { name: "Ângela", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Meus favoritos (1)" }),
  ).toBeVisible();
  await drag(-1);
  await expect(
    page.getByRole("heading", { name: "Chester", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Meus favoritos (1)" }),
  ).toBeVisible();
});
