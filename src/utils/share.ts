export async function shareLink(
  title: string,
  url = window.location.href,
): Promise<string> {
  try {
    if (navigator.share) {
      await navigator.share({ title, url });
      return "Compartilhamento aberto.";
    }
    await navigator.clipboard.writeText(url);
    return "Link copiado! Agora é só compartilhar.";
  } catch (error) {
    return error instanceof Error && error.name === "AbortError"
      ? ""
      : "Não foi possível compartilhar. Copie o endereço na barra do navegador.";
  }
}
