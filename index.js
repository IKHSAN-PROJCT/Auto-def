let storedData = "idle";

export default {
  async fetch(request) {

    if (request.method === "POST") {
      let text = await request.text();
      storedData = text.toLowerCase();
      return new Response("OK");
    }

    if (request.method === "GET") {
      return new Response(storedData);
    }

    return new Response("Not allowed");
  }
  }
