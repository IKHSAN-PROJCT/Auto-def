let command = "none";

export default {
  async fetch(request) {

    const url = new URL(request.url);

    if (request.method === "POST" && url.pathname === "/set") {
      const formData = await request.text();
      command = formData.replace("cmd=", "");
      return new Response("OK");
    }

    if (url.pathname === "/get") {
      return new Response(command, {
        headers: {
          "Cache-Control": "no-store"
        }
      });
    }

    return new Response("Invalid");
  }
}
