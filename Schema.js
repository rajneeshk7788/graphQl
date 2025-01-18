export const typeDefs = `
type User {
    id: ID
    name: String
    email: String
    mobile: String
}

type Query {
    getUserList: [User]
}
type Mutation {
    addUser(name: String, email: String, mobile: String): User
}
`;
