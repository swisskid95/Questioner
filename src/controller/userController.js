import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pool from '../db';

class UserController {
  /**
   *Registers a new user
   *
   * @static userSignup
   *
   * @param {object} req
   * @param {object} res
   *
   * @memberof UserController
   */
  static userSignup(req, res) {
    const {
      firstName,
      lastName,
      otherName,
      username,
      email,
      password,
      phoneNumber,
      isAdmin,
    } = req.body;

    if (!email && !firstName && !lastName && !username && !isAdmin && !password) {
      return res.status(400).json({
        status: 400,
        error: 'required field(s) not given',
      });
    }
    if (typeof email !== 'string' && typeof isAdmin !== 'boolean' && typeof username !== 'string'
      && typeof lastName !== 'string') {
      return res.status(400).json({
        status: 400,
        error: 'Wrong input type',
      });
    }

    const encryptedPassword = bcrypt.hashSync(password, 8);

    pool.query('INSERT INTO users (first_name, last_name, other_name, username, email, password, phone_number, is_admin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [firstName, lastName, otherName, username, email, encryptedPassword, phoneNumber, isAdmin], (error, response) => {
      if (error) {
        // Checks if user name exists
        if (error.message === 'duplicate key value violates unique constraint users_username_key') {
          return res.status(400).json({
            status: 400,
            error: `Username: ${username} already exist please use another`,
          });
        }

        // checks if email exists
        if (error.message === 'duplicate key value violates unique constraint users_email_key') {
          return res.status(400).json({
            status: 400,
            error: `Email: ${email} already exist please use another`,
          });
        }

        return res.status(500).json({
          status: 500,
          error: error.message,
        });
      }

      if (response) {
        const user = response.rows[0];
        // const userRole = user.isAdmin ? 'admin' : 'user';
        const token = jwt.sign({ id: user.username, category: user.isAdmin ? 'admin' : 'user' }, process.env.SECRET_KEY, { expiresIn: '1d' });

        return res.status(201).json({
          status: 201,
          data: [{
            token,
            user: `${user.last_name}, Account has been created with username: ${user.username} for you`,
          }],
        });
      }
    });
  }

  /**
   *logs user in the app
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @memberof UserController
   */
  static userLogin(req, res) {
    const { username, password } = req.body;

    pool.query('SELECT * FROM users WHERE username = $1', [username], (error, response) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          error: error.message,
        });
      }

      if (response.rows[0]) {
        // Gets the value returned from query
        const user = response.rows[0];
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
          return res.status(401).json({
            status: 401,
            error: 'Wrong login credentials',
          });
        }
        const token = jwt.sign({ id: user.username, category: user.isAdmin ? 'admin' : 'user' }, process.env.SECRET_KEY, { expiresIn: '1d' });

        return res.status(200).json({
          status: 200,
          data: [{
            token,
            user: `${username} logged in successfully`,
          }],
        });
      }

      return res.status(404).json({
        status: 404,
        error: `account with userID: '${username}' does not exist`,
      });
    });
  }
}

export default UserController;
