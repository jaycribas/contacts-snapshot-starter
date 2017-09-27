const db = require('./db')

const create = function(user){
  return db.query(`
    INSERT INTO
      users (name, password)
    VALUES
      ($1::text, $2::text)
    RETURNING
      *
    `,
    [user.name, user.password]
  )
  .catch(error => {
    console.error({ message: 'An error occurred while executing users.create',
                    arguments: arguments })
    throw error
  })
}
