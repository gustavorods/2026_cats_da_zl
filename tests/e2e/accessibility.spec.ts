import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("contraste e semântica das telas principais", async ({ page }) => {
  test.setTimeout(90000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  const issues: unknown[] = [];
  for (const route of [
    "/",
    "/gatos",
    "/gatos/mingau",
    "/match",
    "/tinder",
    "/ajudar",
    "/duvidas",
    "/contato",
  ]) {
    await page.goto(route);
    await expect(page.locator("h1")).toBeVisible();
    if (route === "/match")
      await page.getByRole("button", { name: "Começar quiz" }).click();
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    issues.push(
      ...result.violations.map((v) => ({
        route,
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    );
  }
  expect(issues).toEqual([]);
});

test("prévia desktop e mobile", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.locator(".hero h1")).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await page.locator("img").evaluateAll(async (images) => {
    const photos = images.filter(
      (image): image is HTMLImageElement => image instanceof HTMLImageElement,
    );
    for (const image of photos) image.loading = "eager";
    await Promise.all(
      photos.map((image) => image.decode().catch(() => undefined)),
    );
  });
  await page.screenshot({
    path: "/tmp/cats-da-zl-desktop.png",
    fullPage: true,
  });
  await page.screenshot({ path: "/tmp/cats-da-zl-hero.png" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "/tmp/cats-da-zl-mobile.png", fullPage: true });
});
