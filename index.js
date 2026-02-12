export default {
  async fetch(request, env) {

    const url = new URL(request.url);

    // =========================
    // SET COMMAND (POST)
    // =========================
    if (request.method === "POST" && url.pathname === "/set") {

      const body = await request.text();

      // body contoh: cmd=flash_on
      const cmd = body.replace("cmd=", "").trim();

      if (!cmd) {
        return new Response("Empty command");
      }

      await env.COMMAND_STORE.put("cmd", cmd);

      return new Response("OK", {
        headers: {
          "Cache-Control": "no-store"
        }
      });
    }

    // =========================
    // GET COMMAND
    // =========================
    if (request.method === "GET" && url.pathname === "/get") {

      const cmd = await env.COMMAND_STORE.get("cmd");

      return new Response(cmd || "none", {
        headers: {
          "Cache-Control": "no-store"
        }
      });
    }

    return new Response("Invalid route", { status: 404 });
  }
}
