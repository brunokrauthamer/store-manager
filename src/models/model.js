const connection = require('./connection');

const testingConn = async () => {
  const [[result]] = await connection.execute(
    'SELECT * FROM sales',
  );
  console.log(result);
};

testingConn();