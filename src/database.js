const mongoose = require('mongoose');


mongoose.connect(process.env.URL_DB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(res => console.log('Data base Online'))
    .catch(err => console.error(err));