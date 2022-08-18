"use strict";
const got = require("got");

const link = (username) => {
	return `https://instagram.com/${username}`;
};

module.exports = (username) => {
	return got(link(username))
		.then((res) => {
			const followers = res.body
				.split(',"edge_followed_by":{"count":')[1]
				.split('},"')[0];
			const biography = res.body.split('{"biography":"')[1].split('","')[0];
			const avatar = res.body.split('"profile_pic_url":"')[1].split('",')[0];
			const instagram_id = res.body.split(',"id":"')[1].split('",')[0];
			const full_name = res.body.split('"full_name":"')[1].split('",')[0];
			// const category_name = res.body
			// 	.split('"category_name":"')[1]
			// 	.split('",')[0];
			const username = res.body.split(',"username":"')[1].split('",')[0];
			const is_professional_account = res.body
				.split(',"is_professional_account":')[1]
				.split(",")[0];

			return {
				followers: followers,
				biography: biography,
				avatar: avatar,
				instagram_id: instagram_id,
				full_name: full_name,
				// category_name: category_name,
				username: username,
				is_professional_account: is_professional_account,
			};
		})
		.catch((error) => {
			if (error) {
				return false;
			}
			return error.message;
		});
};
