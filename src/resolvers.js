import { users } from "./db";

const resolvers = {
    Query: {
        user:(parent, { id }, context, info) =>{
            const userId = parseInt(id); // Convert the ID argument to a number
            return users.find(user => user.id === userId);
        }, 
        users: (parent, args, context, info) => {
            return users;
        }
    },
    Mutation:{
        createUser: (parent, { id, name, email, age}, context, info) => {
            const newUser = { id, name, email, age };
            users.push(newUser);
            return newUser;
        },

        updateUser: (parent, { id, name, email, age}, context, info) => {
            let updatedUser = users.find(user => user.id === id)

            updatedUser.name = name
            updatedUser.email = email
            updatedUser.age = age

            return updatedUser
        },

        deleteUser: (parent, { id }, context, info) => {
            const userId = parseInt(id); 
           
            const userIndex = users.findIndex(user => user.id === userId)

            if(userIndex === -1) throw new Error('User not found')

            const deletedUser = users.splice(userIndex, 1)

            return deletedUser[0]
        }
    }
  };
  
  export default resolvers;