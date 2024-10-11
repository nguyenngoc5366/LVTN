const authService = require('../services/auth.service.js');

exports.signup = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const user = await authService.signup(username, email, password, role);
    res.status(201).send({ message: 'User registered successfully!', user });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await authService.signin(email, password);
    res.status(200).send(data);
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};
