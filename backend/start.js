const app = require('./server');
const mongoose = require('mongoose');
const config = require('./configs/config');

mongoose
  .connect(config.mongo.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(3000, '0.0.0.0', function (err) {
      if (err) {
        app.log.error(err);
      }

      app.swagger();
    });
  })
  .catch((err) => {
    console.log(err);
  });
