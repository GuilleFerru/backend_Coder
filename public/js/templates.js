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
                    <button class="btn btn-success" id="submit" onclick="addProduct()" > Enviar</button>
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
{{#if productos}}
    <div class="row row-cols-1 row-cols-md-3 mt-2">
        {{#each productos}}
            <div class="col mb-4">
                <div class="card text-white bg-dark" id="product{{this.id}}">
                    <img src={{this.thumbnail}}  class="card-img-top" alt={{this.title}}>
                    <div class="card-body">
                        <h5 class="card-title">{{this.title}}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{{this.code}}</h6>
                        <p class="card-text">{{this.description}}</p>
                        <a href="#updateModal" data-toggle="modal" onclick="passIdProductToModal({{this.id}})" class="card-link">Actualizar</a>
                        <a href="javascript:void(0)" onclick="deleteProduct({{this.id}})" class="card-link">Eliminar</a>             
                    </div>
                </div>
            </div>
        {{/each}}
    </div>

    <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="updateModalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" id="modalForm">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
    </div>

{{/if}}
`)

const modalTemplate = Handlebars.compile(`

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
