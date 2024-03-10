import dbClient from '../utils/db';

const sha1 = require('sha1');

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        error: 'Missing email',
      });
    }
    if (!password) {
      return res.status(400).json({
        error: 'Missing password',
      });
    }
    const existEmail = await dbClient.db.collection('users').findOne({ email });
    if (existEmail) {
      return res.status(400).json({
        error: 'Already exist',
      });
    }
    const hashedPassword = sha1(password);
    const result = await dbClient.db.collection('users').insertOne({ email, password: hashedPassword });
    return res.status(201).json({ id: result.insertedId.toString(), email });
  }
}

export default UsersController;
