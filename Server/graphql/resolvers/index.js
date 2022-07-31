const User = require("../../models/user");
const SocialMedia = require("../../models/socialmedia");
const Post = require("../../models/post");
const Dataloader = require("dataloader");
const DataLoader = require("dataloader");

const usersloader = new DataLoader(async (userIds) => {
    console.log("userloader");
    const users = await User.find({ _id: { $in: userIds } });
    userIds.forEach((userId, index) => {
        const user = users.find((user) => {
            return user._id.toString() === userId.toString();
        });
        if (user) {
            userIds[index] = user;
        }
    });
    return userIds;
});

const postsloader = new DataLoader(async (postIds) => {
    console.log("postloader");
    return postIds.map(async (postId) => {
        const posts = await Post.find({ _id: { $in: postId } });
        return posts;
    });
});

const socialmediasloader = new DataLoader(async (socialmediaIds) => {
    console.log("socialmediasloader");
    const socialmedias = await SocialMedia.find({ _id: { $in: socialmediaIds } });
    return socialmedias;
});

module.exports = {
    Query: {
        getUsers: async () => {
            try {
                const users = await User.find({});
                return users;
            } catch (err) {
                console.log(err);
            }
        },
        getSocialMedias: async () => {
            try {
                const socialMedias = await SocialMedia.find({});
                for (const user of socialMedias) {
                    usersloader.prime(user.id, user);
                }
                return socialMedias;
            } catch (err) {
                console.log(err);
            }
        },
        getPosts: async () => {
            try {
                const posts = await Post.find({});
                return posts;
            } catch (err) {
                console.log(err);
            }
        },
    },
    Mutation: {
        createUser: async (root, args) => {
            try {
                const user = new User({
                    name: args.name,
                    email: args.email,
                    password: args.password,
                });
                const savedUser = await user.save();
                return savedUser;
            } catch (err) {
                console.log(err);
            }
        },
        createSocialMedia: async (root, args) => {
            try {
                const socialMedia = new SocialMedia({
                    media: args.nam,
                    belongsTo: args.belongsTo,
                });
                const updateusersocialmedia = await User.findByIdAndUpdate(
                    args.belongsTo,
                    {
                        socialMedia: socialMedia._id,
                    }
                );

                const savedSocialMedia = await socialMedia.save();
                return savedSocialMedia;
            } catch (err) {
                console.log(err);
            }
        },
        createPost: async (root, args) => {
            try {
                const post = new Post({
                    title: args.title,
                    description: args.description,
                    creator: args.creator,
                });
                const savedPost = await post.save();
                const user = await User.findById(args.creator);
                user.posts.push(savedPost);
                const updatedUser = await user.save();
                return savedPost;
            } catch (err) {
                console.log(err);
            }
        },
    },
    Post: {
        // using dataloader
        async creator(parent) {
            return usersloader.load(parent.creator);
        },
        // async creator(parent) {
        //     console.log("parent")
        //     return await User.findById(parent.creator);
        // },
    },
    SocialMedia: {
        // async belongsTo(parent) {
        //     console.log("socialmedia");
        //     return await User.findById(parent.belongsTo);

        // }
        // using dataloader
        async belongsTo(parent) {
            return usersloader.load(parent.belongsTo);
        },
    },
    User: {
        // using dataloader
        async socialMedia(parent) {
            if(!parent.socialMedia) return null;
            return socialmediasloader.load(parent.socialMedia);
        },
        // async socialMedia(parent) {
        //     console.log("usersm");
        //     return await SocialMedia.findById(parent.socialMedia);
        // },
        // using dataloader
        async posts(parent) {
            return postsloader.load(parent.posts);
        },
        // async posts(parent) {
        //     console.log("userposts");
        //     return await Post.find({ creator: parent._id });
        // }
    },
};
