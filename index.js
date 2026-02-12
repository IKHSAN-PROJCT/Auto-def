export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    // =========================
    // SET COMMAND
    // =========================
    if (url.pathname === "/set" && request.method === "POST") {
      try {
        const body = await request.json()
        const cmd = body.cmd

        if (!cmd) {
          return new Response("Command kosong", { status: 400 })
        }

        await env.COMMAND_STORE.put("last_command", cmd)

        return new Response(
          JSON.stringify({ status: "success", cmd }),
          { headers: { "Content-Type": "application/json" } }
        )
      } catch (err) {
        return new Response("Error parsing JSON", { status: 400 })
      }
    }

    // =========================
    // GET COMMAND
    // =========================
    if (url.pathname === "/get" && request.method === "GET") {
      const cmd = await env.COMMAND_STORE.get("last_command")

      return new Response(
        JSON.stringify({ cmd: cmd || null }),
        { headers: { "Content-Type": "application/json" } }
      )
    }

    // =========================
    // DEFAULT
    // =========================
    return new Response("Worker aktif 🚀", { status: 200 })
  }
}
