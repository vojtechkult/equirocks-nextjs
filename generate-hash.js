// generate-hash.js
import bcrypt from 'bcrypt';

const password = 'konickove';
const saltRounds = 10;

bcrypt.hash(password, saltRounds).then(hash => {
  console.log('Vlož do MongoDB:', {
    email: 'admin@equirocks.cz',
    passwordHash: hash,
  });
});
