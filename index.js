let command = "none";

export default {
  async fetch(request) {

    const url = new URL(request.url);

    // SET COMMAND
    if (url.pathname === "/set" && request.method === "POST") {

      const body = await request.text();
      command = body.trim();

      return new Response("SET: " + command);
    }

    // GET COMMAND
    if (url.pathname === "/get" && request.method === "GET") {

      return new Response(command);
    }

    return new Response("Invalid route");
  }
}
