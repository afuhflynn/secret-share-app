// A simple in-memory adapter for NextAuth in development mode
export const MockAdapter = () => {
  const users = new Map()
  const accounts = new Map()
  const sessions = new Map()
  const verificationTokens = new Map()

  return {
    createUser: async (data) => {
      const id = Math.random().toString(36).substring(2, 15)
      const user = { id, ...data }
      users.set(id, user)
      return user
    },
    getUser: async (id) => {
      return users.get(id) || null
    },
    getUserByEmail: async (email) => {
      return Array.from(users.values()).find((user) => user.email === email) || null
    },
    getUserByAccount: async ({ provider, providerAccountId }) => {
      const account = Array.from(accounts.values()).find(
        (account) => account.provider === provider && account.providerAccountId === providerAccountId,
      )
      if (!account) return null
      return users.get(account.userId) || null
    },
    updateUser: async (data) => {
      const user = users.get(data.id)
      if (!user) throw new Error("User not found")
      const updatedUser = { ...user, ...data }
      users.set(data.id, updatedUser)
      return updatedUser
    },
    deleteUser: async (id) => {
      users.delete(id)
    },
    linkAccount: async (data) => {
      const id = Math.random().toString(36).substring(2, 15)
      const account = { id, ...data }
      accounts.set(id, account)
      return account
    },
    unlinkAccount: async ({ provider, providerAccountId }) => {
      const accountToDelete = Array.from(accounts.values()).find(
        (account) => account.provider === provider && account.providerAccountId === providerAccountId,
      )
      if (accountToDelete) {
        accounts.delete(accountToDelete.id)
      }
    },
    createSession: async (data) => {
      sessions.set(data.sessionToken, data)
      return data
    },
    getSessionAndUser: async (sessionToken) => {
      const session = sessions.get(sessionToken)
      if (!session) return null
      const user = users.get(session.userId)
      if (!user) return null
      return { session, user }
    },
    updateSession: async (data) => {
      const session = sessions.get(data.sessionToken)
      if (!session) throw new Error("Session not found")
      const updatedSession = { ...session, ...data }
      sessions.set(data.sessionToken, updatedSession)
      return updatedSession
    },
    deleteSession: async (sessionToken) => {
      sessions.delete(sessionToken)
    },
    createVerificationToken: async (data) => {
      verificationTokens.set(data.identifier + data.token, data)
      return data
    },
    useVerificationToken: async ({ identifier, token }) => {
      const key = identifier + token
      const verificationToken = verificationTokens.get(key)
      if (!verificationToken) return null
      verificationTokens.delete(key)
      return verificationToken
    },
  }
}

