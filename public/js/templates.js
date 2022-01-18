
const logOutTemplate = Handlebars.compile(`
    <h4 class="alert alert-primary">
        Hasta luego {{userName}}
    </h4>
`)

const filterProductoTemplate = Handlebars.compile(`

<div class="container-fluid mt-100">
<div class="row d-flex justify-content-center">
    <div class="col-md-12">
        <div class="card">
            <article class="filter-group">
                <header class="card-header"> 
                    <a href="#" data-toggle="collapse" data-target="#collapse_aside1" data-abc="true" aria-expanded="false" class="collapsed" id="nombre" onclick="checkFilter(this)"> 
                        <i class="icon-control">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </i>
                        <h6 class="title">Nombre</h6>
                    </a> 
                </header>
                <div class="filter-content collapse" id="collapse_aside1" style="">
                    <div class="card-body">
                        <input type="text" class="form-control" id="filterName" aria-describedby="nameHelp" placeholder="Ingresar Nombre" onkeyup="filterProductos()">
                    </div>
                </div>
            </article>
            <article class="filter-group">
                <header class="card-header"> <a href="#" data-toggle="collapse" data-target="#collapse_aside2" data-abc="true" aria-expanded="false" class="collapsed" id="codigo" onclick="checkFilter(this)">
                <i class="icon-control">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                </svg>
                </i>
                        <h6 class="title">Código</h6>
                    </a> </header>
                <div class="filter-content collapse" id="collapse_aside2" style="">
                    <div class="card-body">
                        <input type="text" class="form-control" id="filterCode" aria-describedby="nameHelp" placeholder="Ingresar codigo" onkeyup="filterProductos()">
                    </div>
                </div>
            </article>

            <article class="filter-group">
                <header class="card-header"> 
                    <a href="#" data-toggle="collapse" data-target="#collapse_aside3" data-abc="true" aria-expanded="false" class="collapsed" id="precio" onclick="checkFilter(this)">
                    <i class="icon-control">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                    </i>
                        <h6 class="title">Precio</h6>
                    </a> 
                </header>
             
                <div class="filter-content collapse" id="collapse_aside3">
                    <div class="card-body"> 
                        <div class="form-row">
                            <div class="form-group col-md-6"> 
                                <label>Min</label>
                                <input class="form-control" placeholder="$0" type="number" id="minPrice">
                            </div>
                            <div class="form-group text-right col-md-6"> 
                                <label>Max</label> 
                                <input class="form-control" placeholder="$1000" type="number" id="maxPrice"> 
                            </div>
                        </div> 
                    <a href="#" class="highlight-button btn btn-medium button xs-margin-bottom-five" data-abc="true" onclick="filterProductos()">Filtrar</a>
                    </div>
                </div>
           
            </article>

            <article class="filter-group">
                <header class="card-header"> 
                    <a href="#" data-toggle="collapse" data-target="#collapse_aside4" data-abc="true" aria-expanded="false" class="collapsed" id="stock" onclick="checkFilter(this)">
                        <i class="icon-control">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                        </svg>
                        </i>
                        <h6 class="title">Stock </h6>
                    </a> 
                </header>
                <div class="filter-content collapse" id="collapse_aside4" style="">
                    <div class="card-body"> 
                            <div class="form-row">
                                <div class="form-group col-md-6"> 
                                    <label>Min</label> 
                                    <input class="form-control" placeholder="0" type="number" id="minStock"> 
                                </div>
                                <div class="form-group text-right col-md-6"> 
                                    <label>Max</label> 
                                    <input class="form-control" placeholder="100" type="number" id="maxStock"> 
                                </div>
                            </div> 
                        <a href="#" class="highlight-button btn btn-medium button xs-margin-bottom-five" data-abc="true" onclick="filterProductos()">Filtrar</a>
                    </div>
                </div>
            </article>
            <div  class="mt-2">
                <a href="#" class="highlight-button btn btn-medium button xs-margin-bottom-five" data-abc="true" onclick="limpiarFiltro()">Limpiar Filtros</a>
            </div>
        </div>

        <div class="flex mt-5">
            <button type="button" class="highlight-button btn btn-medium button xs-margin-bottom-five" onclick="location.href='/graphql'">GraphQL</button>
        </div>
        {{#if isAdmin}}
        <div class="flex mt-3">
            <button type="button" class="highlight-button btn btn-medium button xs-margin-bottom-five" onclick="location.href='/process/info'">Process Info</button>
        </div>
        <div class="d-flex align-items-center mt-3">
        <button type="button" class=" highlight-button btn btn-medium button xs-margin-bottom-five" onclick="generateRandoms()">Randoms</button>
        <input type="number" class="form-control"  id="randomQty" onchange="getQtyRandom()">
        </div>
        {{/if}}
    </div>
</div>
</div>

    <style>
    .mt-100 {
        margin-top: 150px
    }
    .filter-group {
        border-bottom: 1px solid #e4e4e4
    }
    .card-header {
        padding: 0.75rem 1.25rem;
        margin-bottom: 0;
        background-color: #fff;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1)
    }
    .card {
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        min-width: 0;
        word-wrap: break-word;
        background-color: #fff;
        background-clip: border-box;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 0.37rem
    }
    .filter-group .card-header {
        border-bottom: 0
    }
    .icon-control {
        margin-top: 6px;
        float: right;
        font-size: 80%
    }
    .list-menu {
        list-style: none;
        margin: 0;
        padding-left: 0
    }
    .list-menu a {
        color: #343a40
    }
    a {
        text-decoration: none !important;
        background-color: transparent
    }
   
    .checkbox-btn {
        position: relative
    }
   
    .checkbox-btn input {
        position: absolute;
        z-index: -1;
        opacity: 0
    }
   
    .checkbox-btn input:checked~.btn {
        border-color: #3167eb;
        background-color: #3167eb;
        color: #fff
    }
    .btn-light {
        display: inline-block;
        font-weight: 600;
        color: #343a40;
        text-align: center;
        vertical-align: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background-color: #eee;
        border: 1px solid #eee;
        padding: 0.45rem 0.85rem;
        font-size: 10px;
        line-height: 1.5;
        border-radius: 0.37rem
    }
   
    .btn-light:hover {
        background-color: #fff;
        border-color: #989898
    }
    .btn-medium {
        font-size: 12px;
        padding: 10px 22px;
        display: inline-block;
        margin-right: 20px;
        letter-spacing: 2px;
        border: 1px solid #157af6;
        width: 100%
    }
   
    .highlight-button:hover {
        background-color: #157af6;
        border: 2px solid #157af6;
        color: #fff
    }
   
    .custom-control {
        position: relative;
        display: block;
        min-height: 1.5rem;
        padding-left: 1.5rem
    }
    </style>
`)


const alertTemplate = Handlebars.compile(`
    <div class="alert {{this.alert}} alert-dismissible fade show" role="alert">
    <strong>{{this.text}}</strong>
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
    {{#if error}}
        {{error}}
    {{/if}}
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
                                <td>{{this.price}} $</td>
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
                width: 200px;
                height: auto;
            }
        </style>
    {{/if}}
`)

//  EL INPUT ES TIPO NUMBER, se coloco tipo text solo para forzar a enviar distinto a un numero y obtener 10 elementos.
const mockDataTemplate = Handlebars.compile(`
    <div class="card mt-3 mb-3">
        <div class="card-body">
            <h2 class="pt-1 pb-2">Generador de Mock Data</h2>
            <div class="input-group mb-3 col-6">
                <div class="input-group-prepend">
                    <button class="btn btn-primary" id="mockData" onclick="generateFakeProductos()" > Generar MockData</button>
                </div>
                <input type="text" value="0" min="0" class="form-control"  id="mocksQty" onchange="getQtyMocks()">
            </div>
            <div class="modal-body" id="tableTemplate"></div>    
        </div>
    </div>    
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
    <div class="card mt-3 mb-3">
        <div class="card-body ">
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



const chatNormalizaTemplate = Handlebars.compile(`
    <div class="card mt-3 mb-3">
        <div class="card-body">
            <h2 class="pt-1 pb-2">Centro de Mensajes --- Compresión: {{compresion}}</h2>
                <div class="form-group">
                    <input type="email" class="form-control" id="emailChat" aria-describedby="emailHelp" placeholder="Ingrese su mail" name="emailChat" required>
                    <small id="emailChat" class="form-text text-muted">No compartiremos su email con ninguna otra persona.</small>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" id="nombreChat" aria-describedby="nombreHelp" placeholder="Ingrese su Nombre" name="nombreChat" required>
                    <small id="nombreChat" class="form-text text-muted">Ingrese su nombre.</small>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" id="apellidoChat" aria-describedby="apellidoHelp" placeholder="Ingrese su Apellido" name="apellidoChat" required>
                    <small id="apellidoChat" class="form-text text-muted">Ingrese su apellido.</small>
                </div>
                <div class="form-group">
                    <input type="number" class="form-control" id="edadChat" aria-describedby="edadHelp" placeholder="Ingrese su edad" name="edadChat" required>
                    <small id="edadChat" class="form-text text-muted">Ingrese su edad.</small>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" id="aliasChat" aria-describedby="aliasHelp" placeholder="Ingrese su alias" name="aliasHelp" required>
                    <small id="aliasHelp" class="form-text text-muted">Ingrese su alias.</small>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" id="avatarChat" aria-describedby="aliasHelp" placeholder="Ingrese un thumbnail" name="avatarChat" required>
                    <small id="avatarChat" class="form-text text-muted">Ingrese un thumbnail de su avatar.</small>
                </div>

                
            <div id="chatData">
                {{#each messages}}
                    <div style="display:flex; align-items:center">
                        <div class="chat_avatar_image">
                            <img src="{{this.author.avatar}}" alt="{{this.author.avatar}}">
                        </div>
                        <div class="ml-2">
                            <strong style="color:blue">{{this.author.alias}}</strong>
                            <span style="color:brown">[{{this.date}}]: </span>
                            <em>{{this.text}}</em>
                        </div>
                        
                    </div>
                {{/each}}
            </div>
            <form class="form " onsubmit="return addMessage()">
                <div class="form-group mx-sm-0 mb-2 mt-3">
                    <label for="chatText" class="sr-only">Ingrese un mensaje</label>
                    <textarea  type="text" class="form-control" id="chatText" placeholder="Ingrese un mensaje" rows="3"></textarea>
                    <button type="submit" class="btn btn-primary mx-sm-2 mb-2 mt-2" id="submitChat">Enviar</button>
                </div>
                
            </form>
        </div>
    </div>  
    <style>
        .isInvalid{
            border-color: #dc3545;
        }
        .chat_avatar_image {
            width: 66px;
            height: 66px;
            float: left
            
        }
        
        .chat_avatar_image img {
            max-width: 100%
        }
    </style>  
`)
