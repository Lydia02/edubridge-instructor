import fastifyPlugin from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";

async function jwtPlugin(fastify) {
  fastify.register(fastifyJwt, { secret: process.env.JWT_SECRET, sign: { expiresIn: "1h" } });

  fastify.decorate("authenticate", async function (request, reply) {
    try {
      const token = request.headers.authorization?.split(" ")[1];
      if (!token) throw new Error("Token not provided");

      await request.jwtVerify();
    } catch (error) {
      reply.status(401).send({ message: "Unauthorized" });
    }
  });
}

export default fastifyPlugin(jwtPlugin);
