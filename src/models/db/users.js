const db = require('./db')

const create = function(user){
  return db.query(`
    INSERT INTO
      users (username, password)
    VALUES
      ($1::text, $2::text)
    RETURNING
      *
    `,
    [user.username, user.password]
  )
  .catch(error => {
    console.error({ message: 'An error occurred while executing users.create',
                    arguments: arguments })
    throw error
  })
}

const find = function(user){
  return db.query(`
    SELECT
      *
    FROM
      users
    WHERE
      username = ($1::text)
    `,
    [user]
  )
  .catch(error => {
    console.error({ message: 'An error occurred while executing users.find',
                    arguments: arguments })
    throw error
  })
}

module.exports = { create, find }
