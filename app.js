const express = require('express'), 
      path = require('path'), 
      bodyParser = require('body-parser'), 
      adminRoutes = require('./routes/admin'), 
      shopRoutes = require('./routes/shop'),
      errorControl = require('./controllers/errors'),
      rootDir = require('./util/path'),
      MongoConnect = require('./util/database').client;
      //Product = require('./models/product'),
     // User = require('./models/user'),
     // Cart = require('./models/cart'),
     // CartItem = require('./models/cart-item');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(rootDir, 'public')));

app.use((req, res, next) =>{
  /*  User.findByPk(1)
        .then(user => { 
            req.user =  user; 
            //console.log(req.user);
            next();})
        .catch(err => console.log(err));*/
        next();
});

app.use("/admin", adminRoutes.routes);
app.use(shopRoutes.routes);

app.use(errorControl.notFound);

MongoConnect(() => app.listen(8080));


/*
Product.belongsTo(User, { constranits: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

let u;

db
.sync()
//.sync({ force: true })
.then(() =>{
        return User.findByPk(1);
        }).then( user =>{ 
            //console.log(result);
            if (!user)
                return User.create({
                    username: 'user',
                    first_name: 'Max',
                    last_name: 'teach',
                    email: 'fake@email.com',
                    dob: '1982-12-01'
                });
            return Promise.resolve(user);      
        }).then(user =>{
            u = user;
            return user.getCart()
        }).then(cart => {
            //console.log(cart);
            if (cart === null)
                return u.createCart().then(() => app.listen(8080)).catch(err => {console.log(err);});
           
        }).catch(err =>{
            console.log(err);
        });
*/

