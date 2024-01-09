import { Post } from "../../database/types.interface.js";
import * as database from "../../database/handler.js";
import { FastifyReply, FastifyRequest } from "fastify";

export default {
	url: "/sparkyflight/posts/list",
	method: "GET",
	schema: {
		summary: "Get all posts",
		description: "Returns all posts.",
		tags: ["posts"],
	},
	handler: async (request: FastifyRequest, reply: FastifyReply) => {
		let posts: Post[] | object[] = await database.Posts.listAllPosts();
		posts.reverse();

		return reply.send(posts);
	},
};
