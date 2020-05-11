const express = require('express'), 
      path = require('path'), 
      bodyParser = require('body-parser'), 
      adminRoutes = require('./routes/admin'), 
      shopRoutes = require('./routes/shop'),
      errorControl = require('./controllers/errors'),
      rootDir = require('./util/path'),
      Sequelize = require('sequelize'),
      db = require('./util/database');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(rootDir, 'public')));
app.use("/admin", adminRoutes.routes);
app.use(shopRoutes.routes);

app.use(errorControl.notFound);

db.sync().then(result =>{
    //console.log(result);
    app.listen(8080);
    }).catch(err =>{
    console.log(err);
    });


