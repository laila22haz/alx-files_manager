import dbClient from '../utils/db';

const sha1 = require('sha1');

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).send({
        message: 'Missing email',
      });
    }
    if (!password) {
      return res.status(400).json({
        message: 'Missing password',
      });
    }
    const existEmail = await dbClient.db.collection('users').findOne({ email });
    if (existEmail) {
      return res.status(400).json({
        message: 'Already exist',
      });
    }

    const hashedPassword = sha1(password);
    const result = dbClient.db.collection('users').insertOne({ email, password: hashedPassword });
    const user = { _id: result.insertId, email };
    return res.status(201).json(user);
  }
}

export default UsersController;
