interface OnlyfoodzPost {
	userid: string;
	caption: string;
	image: string;
	plugins: {
		type: string;
		url: string;
	}[];
	type: number;
	createdat: Date;
	postid: string;
	upvotes: string[];
	downvotes: string[];
	comments: {
		user: User;
		comment: {
			caption: string;
			image: string;
		};
	}[];
}

interface User {
	id: number;
	name: string;
	userid: string;
	usertag: string;
	bio: string;
	avatar: string;
	createdat: Date;
	followers: string[];
	following: string[];
	badges: string[];
	coins: number;
}

interface Token {
	id: number;
	creatorid: string;
	token: string;
	active: boolean;
	permissions: string[];
	createdat: Date;
}

export type { OnlyfoodzPost, User, Token };