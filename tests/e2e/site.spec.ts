import { test, expect } from "@playwright/test";

test("catálogo, perfil, galeria, favoritos persistentes e status", async ({
  page,
}) => {
  await page.addInitScript(() => {
    if (!localStorage.getItem("cats-da-zl:favorites:v1")) {
      localStorage.setItem("cats-da-zl:favorites:v1", '["demo-mingau"]');
    }
  });
  await page.goto("/gatos");
  await expect(page.locator(".cat-card")).toHaveCount(7);
  await expect(
    page.getByRole("button", { name: "Meus favoritos (0)" }),
  ).toBeVisible();
  await page.getByLabel("Pesquisar por nome").fill("Mijona");
  await expect(page.locator(".cat-card")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Adicionar Mijona aos favoritos" })
    .click();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Remover Mijona dos favoritos" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Meus favoritos (1)" }).click();
  await expect(page.locator(".cat-card")).toHaveCount(1);
  await page
    .getByRole("link", { name: "Conhecer história", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Oi, eu sou Mijona." }),
  ).toBeVisible();
  const firstPhoto = await page
    .locator(".gallery-main img")
    .getAttribute("src");
  await page.getByRole("button", { name: "Ver imagem 2 de Mijona" }).click();
  await expect(page.locator(".gallery-main img")).not.toHaveAttribute(
    "src",
    firstPhoto!,
  );
  await expect(page.locator(".gallery-main img")).toHaveAttribute(
    "src",
    /\.jpeg/,
  );
  await expect(
    page.getByRole("link", { name: "Quero adotar Mijona" }),
  ).toHaveAttribute("href", /wa.me\/5511952685748\?text=.*Mijona/);
  await page.goto("/gatos/miyagi");
  await expect(
    page.getByText("Idade não informada", { exact: true }).first(),
  ).toBeVisible();
  await expect(page.locator(".health-facts")).toContainText("Não informado");
  await expect(page.locator(".demo-notice")).toHaveCount(0);
  await page.goto("/gatos/inexistente");
  await expect(
    page.getByRole("heading", { name: "Esse gatinho não está por aqui." }),
  ).toBeVisible();
});

test("quiz completo, retorno entre perguntas e nenhuma preferência", async ({
  page,
}) => {
  await page.goto("/match");
  await page.getByRole("button", { name: "Começar quiz" }).click();
  await expect(
    page.getByRole("button", { name: "Próxima pergunta" }),
  ).toBeDisabled();
  await page.getByRole("radio", { name: "Fêmea", exact: true }).check();
  await page.getByRole("button", { name: "Próxima pergunta" }).click();
  await page.getByRole("button", { name: "Voltar", exact: true }).click();
  await expect(
    page.getByRole("radio", { name: "Fêmea", exact: true }),
  ).toBeChecked();
  for (let i = 0; i < 5; i++) {
    await page
      .getByRole("radio", { name: "Sem preferência", exact: true })
      .check();
    await page
      .getByRole("button", {
        name: i === 4 ? "Ver meus matches" : "Próxima pergunta",
      })
      .click();
  }
  await expect(
    page.getByRole("heading", {
      name: "Encontramos alguns amiguinhos para você!",
    }),
  ).toBeVisible();
  await expect(page.locator(".result-wrapper")).toHaveCount(7);
  await expect(page.locator(".result-affinity")).not.toContainText(["%"]);
  await page.getByRole("button", { name: "Refazer quiz" }).click();
  await page.getByRole("button", { name: "Começar quiz" }).click();
  for (const [i, label] of [
    "Macho",
    "Frajola",
    "3 — Muito sociável",
    "2 — Brincalhão",
    "3 — Muito carinhoso",
  ].entries()) {
    await page.getByRole("radio", { name: label, exact: true }).check();
    await page
      .getByRole("button", {
        name: i === 4 ? "Ver meus matches" : "Próxima pergunta",
      })
      .click();
  }
  await expect(page.locator(".best-match")).toContainText("Mu");
  await expect(page.locator(".best-match")).toContainText(
    "100% de afinidade estimada",
  );
  await expect(page.getByText(/Estimativa parcial/)).toHaveCount(0);
});

test("Tinder permite favoritar, desfazer sem perder favorito anterior, passar e recomeçar", async ({
  page,
}) => {
  await page.goto("/tinder");
  await page.getByRole("button", { name: "Favoritar Ângela" }).click();
  await expect(
    page.getByRole("heading", { name: "Chester", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Meus favoritos (1)" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Desfazer última ação" }).click();
  await expect(
    page.getByRole("heading", { name: "Ângela", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Meus favoritos (0)" }),
  ).toBeVisible();
  for (let i = 0; i < 7; i++) {
    await page.getByRole("button", { name: /^Passar / }).click();
    await expect(page.locator(".swipe-card.leaving")).toHaveCount(0);
  }
  await expect(
    page.getByRole("heading", {
      name: "Você conheceu todos os nossos fofinhos!",
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Recomeçar", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Ângela", exact: true }),
  ).toBeVisible();
});

test("doações sem dados fictícios, FAQ e erro 404", async ({ page }) => {
  await page.goto("/ajudar");
  await expect(page.getByText("Chave Pix em breve")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Copiar chave Pix" }),
  ).toBeDisabled();
  await expect(page.locator(".pix-qr")).toHaveCount(0);
  await page.goto("/duvidas");
  await page
    .getByText("O Cats da ZL recebe gatos abandonados?", { exact: true })
    .click();
  await expect(
    page.getByText(/Não. Nosso projeto é voltado exclusivamente/),
  ).toBeVisible();
  await page.goto("/pagina-inexistente");
  await expect(
    page.getByRole("heading", {
      name: "Ops! Esse gatinho se perdeu pelo caminho.",
    }),
  ).toBeVisible();
});

for (const width of [320, 390, 768, 1440]) {
  test(`rotas acessíveis sem overflow a ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const route of [
      "/",
      "/gatos",
      "/gatos/angela",
      "/match",
      "/tinder",
      "/adotar",
      "/ajudar",
      "/sobre",
      "/duvidas",
      "/contato",
    ]) {
      await page.goto(route);
      await expect(page.locator("h1")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      const broken = await page.locator("img").evaluateAll((images) =>
        images
          .filter(
            (image): image is HTMLImageElement =>
              image instanceof HTMLImageElement,
          )
          .filter((image) => image.complete && image.naturalWidth === 0)
          .map((image) => image.src),
      );
      expect(broken).toEqual([]);
    }
    expect(errors).toEqual([]);
    if (width === 320) {
      await page.getByRole("button", { name: "Abrir menu" }).click();
      await expect(
        page.getByRole("navigation", { name: "Navegação no celular" }),
      ).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(
        page.getByRole("navigation", { name: "Navegação no celular" }),
      ).toBeHidden();
    }
  });
}
