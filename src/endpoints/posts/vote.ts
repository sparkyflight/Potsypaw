import { OnlyfoodzPost, User } from "../../database/types.interface.js";
import { FastifyReply, FastifyRequest } from "fastify";
import * as database from "../../database/handler.js";
import { getAuth } from "../../auth.js";

export default {
	url: "/posts/vote",
	method: "PUT",
	schema: {
		querystring: {
			type: "object",
			properties: {
				PostID: { type: "string" },
				type: { type: "string" },
			},
			required: ["PostID", "type"],
		},
		security: [
			{
				apiKey: [],
			},
		],
	},
	handler: async (request: FastifyRequest, reply: FastifyReply) => {
		const { PostID, type }: any = request.query;
		const Authorization: any = request.headers.authorization;
		const user: User | null = await getAuth(Authorization);

		const post: { user: User; post: OnlyfoodzPost } =
			await database.OnlyfoodzPosts.get(PostID);

		if (type === "up") {
			if (user) {
				if (post) {
					if (
						post.post.upvotes.includes(user.userid) ||
						post.post.downvotes.includes(user.userid)
					)
						return reply.send({
							error: "You cannot update your vote, for this post.",
						});
					else {
						const update = await database.OnlyfoodzPosts.upvote(
							PostID,
							user.userid
						);

						if (update)
							return reply.send({
								success: true,
							});
						else
							return reply.send({
								error: "An unexpected error has occured while trying to complete your request.",
							});
					}
				} else
					return reply.send({
						error: "The provided post id is invalid.",
					});
			} else
				return reply.send({
					error: "The provided user token is invalid, or the user does not exist.",
				});
		}

		if (type === "down") {
			if (user) {
				if (post) {
					if (
						post.post.upvotes.includes(user.userid) ||
						post.post.downvotes.includes(user.userid)
					)
						return reply.send({
							error: "You cannot update your vote, for this post.",
						});
					else {
						const update = await database.OnlyfoodzPosts.downvote(
							PostID,
							user.userid
						);

						if (update)
							return reply.send({
								success: true,
							});
						else
							return reply.send({
								error: "An unexpected error has occured while trying to complete your request.",
							});
					}
				} else
					return reply.send({
						error: "The provided post id is invalid.",
					});
			} else
				return reply.send({
					error: "The provided user token is invalid, or the user does not exist.",
				});
		}
	},
};
