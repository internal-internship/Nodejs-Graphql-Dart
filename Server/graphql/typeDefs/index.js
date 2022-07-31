const {gql} = require ('apollo-server-express')

module.exports = gql`
    type User{
        _id: ID!
        name: String!
        email: String!
        password: String!
        socialMedia: SocialMedia
        posts: [Post]

    }
    type Post{
        _id: ID!
        title: String!
        description: String!
        creator: User!
    }
    type nameurl{
        name: String!
        url: String!
    }
    input inputnameurl{
        name: String!
        url: String!
    }
    type SocialMedia{
        _id: ID!
        media: [nameurl]!    
        belongsTo: User!
    }
    type Query{
        getUsers: [User]
        getSocialMedias: [SocialMedia]
        getPosts: [Post]
    }
    type Mutation{
        createUser(name: String!, email: String!, password: String!): User
        createSocialMedia(nam:[inputnameurl]!, belongsTo: ID!): SocialMedia
        createPost(title: String!, description: String!, creator: ID!): Post
    }
`
