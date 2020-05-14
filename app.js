const uri = 'mongodb+srv://Earthboy13:0E23C784@nodejs-db-orfyf.gcp.mongodb.net/nodejs?retryWrites=true&w=majority',
      express = require('express'), 
      path = require('path'), 
      bodyParser = require('body-parser'), 
      adminRoutes = require('./routes/admin'),
      authRoutes = require('./routes/auth'), 
      shopRoutes = require('./routes/shop'),
      errorControl = require('./controllers/errors'),
      rootDir = require('./util/path'),
      mongoose = require('mongoose'),
      //Product = require('./models/product'),
      User = require('./models/user')
     // Cart = require('./models/cart'),
     // CartItem = require('./models/cart-item')
     ;


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(rootDir, 'public')));
//
 app.use((req, res, next) =>{
     User.findById('5ebcd651848da2020c07db7e')
        .then(user => { 
            req.user =  user; 
            //console.log(req.user);
            next();})
        .catch(err => console.log(err));
}); 

app.use(authRoutes.routes);
app.use("/admin", adminRoutes.routes);
app.use(shopRoutes.routes);

app.use(errorControl.notFound);

mongoose
.connect(
    uri
    , { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
)
.then(result => {
    console.log('Connected');
    //app.listen(8080);
    return User.find();
}).then(users => {
    //console.log(result);
    if (users.length == 0)
    {
        console.log('User added.');
        return User.create({
            username: 'user',
            first_name: 'Max',
            last_name: 'teach',
            email: 'fake@email.com',
            dob: '1982-12-01',
            cart: { cartItem: [], totalPrice: 0 }
        });
    }
    else
        console.log('User found');

    return Promise.resolve(users[0]);
})/*
.then(user => {
    u = user;
    return user.getCart()
}).then(cart => {
    //console.log(cart);
    if (cart === null)
        return u.createCart()
    return Promise.resolve(cart);
})*/
.then(() => {
    console.log('Site up.');
    app.listen(8080);
}).catch(err => { console.log(err); });

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
        return User.find();
        }).then( users =>{ 
            //console.log(result);
            if (!users)
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

