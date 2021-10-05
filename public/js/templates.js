const navBarTemplate = Handlebars.compile(`
    <nav class="navbar fixed-top navbar-dark bg-dark">
        <a href="#cartModal" data-toggle="modal" onclick="showCart()" style="text-decoration:none">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16" style="color:white">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
        </a>
        <div id="alertContainer"></div>
    </nav>
`);

const alertTemplate = Handlebars.compile(`
    <div class="alert alert-success alert-dismissible fade show" role="alert">
    <strong>Producto Agregado al Carrito</strong>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
    </div>
`)

const formTemplate = Handlebars.compile(`
    <div class="card mt-3">
        <div class="card-body">
            <h2 class="pt-1 pb-2">Agregar nuevo Producto</h2>
                <form  class="needs-validation" onsubmit="return false" novalidate>
                    {{#each inputInfo}}
                        <div class="form-group">
                            <label for={{this.tag}}>{{this.name}}</label>
                            <input type={{this.type}} class="form-control" id={{this.tag}} placeholder="Ingresar titulo" name={{this.tag}} required>
                            <div class="valid-feedback">
                                Genial!
                            </div>
                        </div>
                    {{/each}}
                    <button class="btn btn-primary" id="submit" onclick="addProduct()" > Enviar</button>
                </form>
        </div>
    </div>    
`)



const tableTemplate = Handlebars.compile(`
    {{#if productos}}
            <div class="card mt-3">
                <div class="card-body">
                    <table class="table table-hover table-dark table-sm ">
                        <thead>
                            <tr>
                                {{#each productosKeys}}
                                <th scope="col">{{this}}</th>
                                {{/each}}
                            </tr>
                        </thead>
                        <tbody>
                            {{#each productos}}
                            <tr>
                                <th scope="row">{{this.title}}</th>
                                <td>{{this.price}}</td>
                                <td><img src={{this.thumbnail}} atl={{this.title}}></td>
                            </tr>
                            {{/each}}
                        </tbody>
                    </table>
                    <a href={{buttonHref}} class="btn btn-success">{{buttonDescription}}</a>
                </div>
            </div>
        <style>
            .table tr {
                text-align: center;  
            }
            .table img {
                display: block;
                margin: auto;
                width: 40px;
                height: auto;
            }
        </style>
    {{/if}}
`);

const cardsTemplate = Handlebars.compile(`

    <div class="modal fade show" id="cartModal" tabindex="-1" aria-labelledby="cartModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="cartModalLabel">Shopping Cart</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" id="modalCart">
        
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Seguir comprando</button>
                    <button type="button" class="btn btn-primary" onclick="saveCart()" data-dismiss="modal">Confirmar Compra</button>
                </div>
            </div>
        </div>
    </div>

{{#if productos}}
    <div class="row row-cols-1 row-cols-md-3 mt-2">
        {{#each productos}}
            <div class="col mb-4">
                <div class="card text-white bg-dark" id="product{{this.id}}">
                    <img src={{this.thumbnail}}  class="card-img-top" alt={{this.title}}>
                    <div class="card-body">
                        <h5 class="card-title">{{this.title}}</h5>
                        <h6 class="card-subtitle mb-2 text-muted font-weight-bolder"><bdi>{{this.price}} <span>$</span></bdi></h6>
                        <p class="card-text">{{this.description}}</p>
                        <a href="javascript:void(0)" data-toggle="modal" onclick="addToCart('{{this._id}}')" class="card-link">Agregar al Carrito</a>
                        <a href="#updateModal" data-toggle="modal" onclick="passIdProductToModal('{{this._id}}')" class="card-link">Actualizar</a>
                        <a href="javascript:void(0)" onclick="deleteProduct('{{this._id}}')" class="card-link">Eliminar</a>             
                    </div>
                </div>
            </div>
        {{/each}}
    </div>

    <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" id="modalForm">
            </div>
        </div>
    </div>

{{/if}}
`)

const modalCartTemplate = Handlebars.compile(`
    <div class="cart_section">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-10 offset-lg-1">
                    <div class="cart_container">
                        <div class="cart_items">
                        {{#each order}}
                            <ul class="cart_list">
                                <li class="cart_item clearfix">
                                    <div class="cart_item_image"><img src="{{this.producto.thumbnail}}" alt="{{this.producto.description}}"></div>
                                    <div class="cart_item_info d-flex flex-md-row flex-column justify-content-between">
                                        <div class="cart_item_name cart_info_col">
                                            <div class="cart_item_title">Nombre</div>
                                            <div class="cart_item_text">{{this.producto.title}}</div>
                                        </div>
                                        <div class="cart_item_quantity cart_info_col">
                                            <div class="cart_item_title">Cantidad</div>
                                            <div class="cart_item_text">{{this.quantity}}</div>
                                        </div>
                                        <div class="cart_item_price cart_info_col">
                                            <div class="cart_item_title">Precio</div>
                                            <div class="cart_item_text">{{this.producto.price}}</div>
                                        </div>
                                        <div class="cart_item_total cart_info_col">
                                            <div class="cart_item_title">Total</div>
                                            <div class="cart_item_text">{{this.total}}</div>
                                        </div>
                                        <div class="cart_item_delete cart_info_col">
                                            <div class="cart_item_title">Borrar</div>
                                            <div class="cart_item_text">
                                                <a href="javascript:void(0)" onclick="deleteCart('{{this._id}}')">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        {{/each}}    
                        </div>
                        <div class="order_total">
                            <div class="order_total_content text-md-right">
                                <div class="order_total_title">Orden Total:</div>
                                <div class="order_total_amount">{{orderTotal}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <style>
        ul {
            list-style: none;
            margin-bottom: 0px
        }
        .cart_section {
            width: 100%;
            padding-top: 93px;
            padding-bottom: 111px
        }
        
        .cart_title {
            font-size: 30px;
            font-weight: 500
        }
        
        .cart_items {
            margin-top: 8px
        }
        
        .cart_list {
            border: solid 1px #e8e8e8;
            box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
            background-color: #fff
        }
        
        .cart_item {
            width: 100%;
            padding: 15px;
            padding-right: 46px
        }
        
        .cart_item_image {
            width: 133px;
            height: 133px;
            float: left
        }
        
        .cart_item_image img {
            max-width: 100%
        }
        
        .cart_item_info {
            width: calc(100% - 133px);
            float: left;
            padding-top: 18px
        }
        
        .cart_item_name {
            margin-left: 7.53%
        }
        
        .cart_item_title {
            font-size: 14px;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.5)
        }
        
        .cart_item_text {
            font-size: 18px;
            margin-top: 35px
        }
        
        .cart_item_text span {
            display: inline-block;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            margin-right: 11px;
            -webkit-transform: translateY(4px);
            -moz-transform: translateY(4px);
            -ms-transform: translateY(4px);
            -o-transform: translateY(4px);
            transform: translateY(4px)
        }
        
        .cart_item_price {
            text-align: right
        }
        
        .cart_item_total {
            text-align: right
        }

        .cart_item_delete {
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            text-decoration: none;
        }
        .cart_item_delete svg{
            color: black;
            text-decoration: none;
        }

        .cart_item_delete svg:hover {
            border-color: #0e8ce4;
            color: #0e8ce4
        }
        
        .order_total {
            width: 100%;
            height: 60px;
            margin-top: 30px;
            border: solid 1px #e8e8e8;
            box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
            padding-right: 46px;
            padding-left: 15px;
            background-color: #fff
        }
        
        .order_total_title {
            display: inline-block;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.5);
            line-height: 60px
        }
        
        .order_total_amount {
            display: inline-block;
            font-size: 18px;
            font-weight: 500;
            margin-left: 26px;
            line-height: 60px
        }
    </style>
`);

const modalTemplate = Handlebars.compile(`
    <div class="modal-header">
        <h5 class="modal-title" id="updateModalLabel">Actualizar producto {{this.productCode}}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body" > 
        <form  class="needs-validation" onsubmit="return false" novalidate>
            {{#each inputInfo}}
                <div class="form-group">
                    <label for="{{this.tag}}">{{this.name}}</label>
                    <input type="{{this.type}}" class="form-control" id="{{this.tag}}" value="{{this.value}}" name="{{this.tag}} "required>
                    <div class="valid-feedback">
                        Genial!
                    </div>
                </div>
            {{/each}}
        </form>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal" onclick=(updateProduct('{{productId}}'))>Guardar cambios</button>
    </div>
`)


const chatTemplate = Handlebars.compile(`
    <div class="card mt-3">
        <div class="card-body">
            <h2 class="pt-1 pb-2">Centro de Mensajes</h2>
                <div class="form-group">
                    <input type="email" class="form-control" id="emailChat" aria-describedby="emailHelp" placeholder="Ingrese su mail" name="emailChat" required>
                    <small id="emailChat" class="form-text text-muted">No compartiremos su email con ninguna otra persona.</small>
                </div>
            <div id="chatData">
                {{#each messages}}
                    <div>
                        <strong style="color:blue">{{this.author}}</strong>
                        <span style="color:brown">[{{this.date}}]: </span>
                        <em>{{this.text}}</em>
                    </div>
                {{/each}}
            </div>
            <form class="form-inline " onsubmit="return addMessage()">
                <div class="form-group mx-sm-0 mb-2 mt-2">
                    <label for="chatText" class="sr-only">Ingrese un mensaje</label>
                    <input type="text" class="form-control" id="chatText" placeholder="Ingrese un mensaje" >
                </div>
                <button type="submit" class="btn btn-primary mx-sm-2 mb-2 mt-2" id="submitChat" >Enviar</button>
            </form>
        </div>
    </div>  
    <style>
        .isInvalid{
            border-color: #dc3545;

        }
    </style>  
`)
