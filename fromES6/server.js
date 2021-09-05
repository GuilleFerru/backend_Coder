"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var express = require("express");

var http = require("http");

var io = require("socket.io");

var fs = require("fs");

var app = express();
var server = http.Server(app);
var port = 8080;
var ioServer = io(server);
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
server.listen(port, function () {
  console.info("Servidor listo en el puerto ".concat(port));
});
server.on("error", function (error) {
  console.error(error);
}); ///////////////////////////////////////////////////////////////////////

var Productos = /*#__PURE__*/function () {
  function Productos() {
    _classCallCheck(this, Productos);

    this.productos = [];
    this.count = 0;
  }

  _createClass(Productos, [{
    key: "getProductos",
    value: function getProductos() {
      return this.productos;
    }
  }, {
    key: "getProductoById",
    value: function getProductoById(id) {
      return this.productos.find(function (element) {
        return element.id === Number(id);
      });
    }
  }, {
    key: "addProducto",
    value: function addProducto(object) {
      this.productos.push(_objectSpread(_objectSpread({}, object), {}, {
        id: this.count + 1
      }));
      this.count++;
      return object;
    }
  }, {
    key: "updateProducto",
    value: function updateProducto(newProducto, id, _) {
      return this.productos[id - 1] = _objectSpread(_objectSpread({}, newProducto), {}, {
        id: Number(id)
      });
    }
  }, {
    key: "deleteProducto",
    value: function deleteProducto(productToBeDelete) {
      var index = this.productos.indexOf(productToBeDelete);
      this.productos.splice(index, 1);
      return productToBeDelete;
    }
  }]);

  return Productos;
}(); ////////////////////////////////////////////////////////////////////////////////////////


var producto = new Productos();
var fileName = "./messages.txt";
var messages = [];
app.use(express["static"]("./public"));
app.get("/", function (_, res) {
  res.sendFile("index.html", {
    root: __dirname
  });
});
ioServer.on('connection', function (socket) {
  socket.emit('loadProducts', producto.getProductos());
  socket.emit('messages', messages);
  socket.on('newMessage', function (message) {
    messages.push(message);
    ioServer.sockets.emit("messages", messages);
    saveMessages(messages);
  });
});

(function () {
  fs.readFile(fileName, "UTF-8", function (error, content) {
    if (error) {
      console.error("Hubo un error con fs.readFile!");
    } else {
      var savedMessages = JSON.parse(content);
      savedMessages.forEach(function (message) {
        messages.push(message);
      });
    }
  });
})();

var saveMessages = function saveMessages(messages) {
  try {
    fs.writeFileSync(fileName, JSON.stringify(messages, null, "\t"));
  } catch (error) {
    console.log("Hubo un error");
  }
};

var getTablaRows = function getTablaRows(req, _, next) {
  req.productos = producto.getProductos();

  if (req.productos.length > 0) {
    req.errorData = true;
  } else {
    req.errorData = false;
  }

  next();
};

var getTablaHeaders = function getTablaHeaders(req, _, next) {
  req.productosKeys = ['Nombre', 'Precio', 'Foto'];
  next();
};

app.get('/productos/vista', getTablaRows, getTablaHeaders, function (req, res) {
  var productos = req.productos,
      productosKeys = req.productosKeys,
      errorData = req.errorData;

  if (productos.length > 0) {
    res.render('listOfProducts.hbs', {
      productos: productos,
      productosKeys: productosKeys,
      dataOk: true,
      buttonHref: '/',
      buttonDescription: 'Volver'
    });
  } else {
    res.render('listOfProducts.hbs', {
      dataOk: errorData,
      wrongTitle: 'No existen productos cargados',
      wrongDescription: 'Para visualizar los productos primero los debe registrar.',
      buttonHref: '/',
      buttonDescription: 'Cargar Producto'
    });
  }
});
var routerAPI = express.Router();
app.use("/api", routerAPI);
routerAPI.get('/productos/listar', function (_, res) {
  var newProducto = producto.getProductos();

  if (newProducto.length > 0) {
    res.status(200).json(newProducto);
  } else {
    res.status(404).json({
      error: 'no hay productos cargados'
    });
  }
});
routerAPI.get('/productos/listar/:id', function (req, res) {
  var id = req.params.id;
  var newProducto = producto.getProductoById(id);

  if (newProducto) {
    res.status(200).json(newProducto);
  } else {
    res.status(404).json({
      error: 'producto no encontrado'
    });
  }
});
routerAPI.post('/productos/guardar', function (req, res) {
  var newProducto = req.body;

  if (newProducto.price && newProducto.title && newProducto.thumbnail) {
    producto.addProducto(newProducto);
    ioServer.sockets.emit('loadProducts', producto.getProductos());
    res.redirect(302, '/');
  } else {
    res.status(400).json({
      error: 'Producto mal cargado'
    });
  }
});
routerAPI.put('/productos/actualizar/:id', function (req, res) {
  var id = req.params.id;
  var newProducto = {
    title: req.body.title,
    price: req.body.price,
    thumbnail: req.body.thumbnail
  };

  if (newProducto) {
    res.status(200).json(producto.updateProducto(newProducto, id, req));
  } else {
    res.status(404).json({
      error: 'producto no encontrado'
    });
  }
});
routerAPI["delete"]('/productos/borrar/:id', function (req, res) {
  var id = req.params.id;
  var productToBeDelete = producto.getProductoById(id);

  if (productToBeDelete) {
    res.status(200).json(producto.deleteProducto(productToBeDelete));
  } else {
    res.status(404).json({
      error: 'producto no existente, no se puede borrar'
    });
  }
});
