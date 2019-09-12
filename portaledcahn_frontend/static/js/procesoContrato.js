
function DefinirElementosContrato(){
    if(procesoRecord.compiledRelease){
      if(procesoRecord.compiledRelease.contracts&&procesoRecord.compiledRelease.contracts.length){
        $('.contrato.informacion').append(
          $('<div>',{class:'row'}).append(
            $('<h4>',{class:'col-6 col-sm-6 col-md-6 titularCajonSombreado',text:'Datos del Contrato'}),
            $('<div>',{class:'col-6 col-sm-6 col-md-6 textoAlineadoDerecha'}).append(
              $('<h4>',{class:'descargaIconos enLinea'}).append(
                $('<span>',{class:'textoColorGris textoAlineadoDerecha p-1 cursorMano transicion'}).append(
                  $('<i>',{class:'fas fa-file-download'}),
                  '&nbsp;.JSON'
                ),
                $('<span>',{class:'textoColorGris textoAlineadoDerecha p-1 cursorMano transicion'}).append(
                  $('<i>',{class:'fas fa-file-download'}),
                  '&nbsp;.CSV'
                ),
                $('<span>',{class:'textoColorGris textoAlineadoDerecha p-1 cursorMano transicion'}).append(
                  $('<i>',{class:'fas fa-file-download'}),
                  '&nbsp;.XLS'
                )
              ),
              $('<h4>',{class:'enLinea mb-0 enLinea alineadoArriba'}).append(
                $('<a>',{href:'/preguntas'}).append(
                  $('<div>',{class:'textoAlineadoCentrado cursorMano botonAyuda transicion', id:'informacionTipoDatos'}).append(
                  
                    $('<i>',{class:'fas fa-question'})
                  
                  )
                )
                
              )
            )
          ),
          AdjuntarInformacionContrato(procesoRecord.compiledRelease.contracts),
          
        );
        
      }
    }
  }
  function AdjuntarInformacionContrato(contratos){
    var elementos=[];
    elementos.push(
      $('<div>',{class:'cajonSombreado ', 'data-step':2, 'data-intro':'En esta sección puedes visualizar la información de los contratos del proceso de contratación.'}).append(
        $('<div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical" style="width: 200px;display:inline-block;vertical-align: top">').append(
          ObtenerEnlacesContratos(contratos)
          ),
        $('<div class="tab-content" id="v-pills-tabContent" style="width: calc( 100% - 210px);display:inline-block;vertical-align: top">').append(
          ObtenerContenidosContratos(contratos)
        )
      )
      

    )
    return elementos;
  }

  function ObtenerEnlacesContratos(contratos){
    var elementos=[];
    for(var i = 0; i< contratos.length;i++){
      elementos.push(
        $('<a class="nav-link enlaceContrato transicion '+(i===0?'active':'')+'" id="'+contratos[i].id+'ContratoTab" data-toggle="pill" href="#'+contratos[i].id+'ContratoContenido" role="tab" aria-controls="'+contratos[i].id+'ContratoContenido" aria-selected="true">CM-047-2018</a>')
      )
    }
    return elementos;
  }
  function ObtenerContenidosContratos(contratos){
    var elementos=[];
    for(var i = 0; i< contratos.length;i++){
      elementos.push(
        $('<div class="tab-pane fade '+(i===0?'active show':'')+'" id="'+contratos[i].id+'ContratoContenido" role="tabpanel" aria-labelledby="'+contratos[i].id+'ContratoTab">').append(
          $('<nav>').append(
            $('<div>',{class:'nav nav-tabs',role:'tablist'}).append(
            $('<a>',{class:'nav-item nav-link active','data-toggle':'tab',role:'tab','aria-controls':'informacionTabContrato'+contratos[i].id,href:'#informacionTabContrato'+contratos[i].id,'aria-selected':'true'}).append(
              $('<h4>',{class:'titularColor', style:'font-size: 15px',text:'Informacion'})
            ),
            $('<a>',{class:'nav-item nav-link ','data-toggle':'tab',role:'tab','aria-controls':'itemsTabContrato'+contratos[i].id,href:'#itemsTabContrato'+contratos[i].id,'aria-selected':'true'}).append(
              $('<h4>',{class:'titularColor', style:'font-size: 15px',text:'Items Solicitados'})
            )
            ,
            $('<a>',{class:'nav-item nav-link ','data-toggle':'tab',role:'tab','aria-controls':'documentosTabContrato'+contratos[i].id,href:'#documentosTabContrato'+contratos[i].id,'aria-selected':'true'}).append(
              $('<h4>',{class:'titularColor', style:'font-size: 15px',text:'Documentos'})
            )
            ,
            $('<a>',{class:'nav-item nav-link ','data-toggle':'tab',role:'tab','aria-controls':'implementacionTabContrato'+contratos[i].id,href:'#implementacionTabContrato'+contratos[i].id,'aria-selected':'true'}).append(
              $('<h4>',{class:'titularColor', style:'font-size: 15px',text:'Implementación'})
            )
              )
          ),
          $('<div>',{class:'tab-content cajonSombreado',id:'contenedorTabContrato'+contratos[i].id}).append(
            $('<div>',{class:'tab-pane fade show active',role:'tabpanel','aria-labelledby':'informacionTabContrato'+contratos[i].id,id:'informacionTabContrato'+contratos[i].id}).append(
              (contratos[i].title||contratos[i].description?
                $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
                    $('<table>').append(
                      $('<tbody>').append(
                            contratos[i].title?$('<tr>').append(
                            $('<td>',{class:'tituloTablaCaracteristicas',text:contratos[i].title,style:'color:#333',toolTexto:"contracts["+i+"].title"})):null,
                            contratos[i].description?$('<tr>').append(
                                $('<td>',{class:'',text:contratos[i].description,style:'color:#333',toolTexto:"contracts["+i+"].description"})):null
                      ))):null),
            $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
              $('<table>').append(
                $('<tbody>').append(
                    contratos[i].buyer&&contratos[i].buyer.name ? 
                      $('<tr>').append(
                        $('<td>',{class:'tituloTablaCaracteristicas',text:'Comprador:',toolTexto:"contracts["+i+"].buyer"}),
                        $('<td>',{class:'contenidoTablaCaracteristicas'}).append(ObtenerElementosParte(contratos[i].buyer.id))
                      ) : null,
                      contratos[i].suppliers ? 
                      $('<tr>').append(
                        $('<td>',{class:'tituloTablaCaracteristicas',text:'Proveedores:',toolTexto:"contracts["+i+"].suppliers"}),
                        $('<td>',{class:'contenidoTablaCaracteristicas'}).append(ObtenerProveedores(contratos[i].suppliers))
                      ) : null,
                  (contratos[i].dateSigned ? 
                      $('<tr>').append(
                        $('<td>',{class:'tituloTablaCaracteristicas',text:'Fecha de Firma'}),
                        $('<td>',{class:'contenidoTablaCaracteristicas',text:ObtenerFecha(contratos[i].dateSigned)})
                      ) : null)
                  )
                  )
            ),
            (contratos[i].value&&contratos[i].value.amount?
              $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
                $('<table>',{class:'tablaAncho'}).append(
                  $('<tbody>').append(
                    $('<tr>').append(
                      $('<td>',{class:'textoAlineadoDerecha'}).append(
                        $('<div>',{
                          class:'montoTotalProceso pr-3'
                        }).append(
                          $('<div>',{class:'contenedorMonto procesoMonto'}).append(
                            $('<div>',{class:'textoColorGris',text:'Monto'}),
                            $('<div>',{class:'valorMonto'}).append(
                              $('<span>',{toolTexto:"contracts["+i+"].value.amount"}).append(ValorMoneda(contratos[i].value.amount)),
                              $('<span>',{class:'textoColorPrimario',text:contratos[i].value.currency,toolTexto:"contracts["+i+"].value.currency"})
                            )
  
                            
                          )
                        )
                      )
                    )
                    )
                    )
              ):null)
            ),
            $('<div>',{class:'tab-pane fade',role:'tabpanel','aria-labelledby':'itemsTabContrato'+contratos[i].id,id:'itemsTabContrato'+contratos[i].id}).append(
              (contratos[i].items)?
              
                $('<div>', {class:' cajonSombreadox '}).append(
                  $('<table>',{class:'tablaGeneral'}).append(
                    $('<thead>').append(
                      $('<tr>').append(
                        $('<th>',{text:'Id', toolTexto:'contracts['+i+'].items[n].classification.id'}),
                        $('<th>',{text:'Clasificación', toolTexto:'contracts['+i+'].items[n].classification.scheme'}),
                        $('<th>',{text:'Descripción', toolTexto:'contracts['+i+'].items[n].classification.description'}),
                        /*$('<th>',{text:'Especificaciones'}),*/
                        $('<th>',{text:'Cantidad', toolTexto:'contracts['+i+'].items[n].quantity'}),
                        $('<th>',{text:'Precio', toolTexto:'contracts['+i+'].items[n].unit.value.amount'}),
                        $('<th>',{text:'Unidad', toolTexto:'contracts['+i+'].items[n].unit.name'})
                      )
                    ),
                    $('<tbody>').append(
                      ObtenerItems(contratos[i].items)
                    )
                  )
                )
              
              : $('<h4 class="titularColor textoColorPrimario mt-3">Esta contrato no posee items</h4>')
            ),
            $('<div>',{class:'tab-pane fade',role:'tabpanel','aria-labelledby':'documentosTabContrato'+contratos[i].id,id:'documentosTabContrato'+contratos[i].id}).append(
              (contratos[i].documents)?$('<div>', {class:' cajonSombreadox '}).append(
                $('<table>',{class:'tablaGeneral'}).append(
                  $('<thead>').append(
                    $('<tr>').append(
                      $('<th>',{text:'Nombre', toolTexto:'contracts['+i+'].documents[n].title'}),
                      $('<th>',{text:'Descripción',toolTexto:'contracts['+i+'].documents[n].description'}),
                      $('<th>',{text:'Tipo',toolTexto:'contracts['+i+'].documents[n].documentType'}),
                      $('<th>',{text:'Fecha',toolTexto:'contracts['+i+'].documents[n].datePublished'}),
                      $('<th>',{text:''})
                    )
                  ),
                  $('<tbody>').append(
                    ObtenerDocumentos(contratos[i].documents)
                  )
                )
              ):$('<h4 class="titularColor textoColorPrimario mt-3">Esta etapa no posee documentos</h4>')
            ),
            $('<div>',{class:'tab-pane fade',role:'tabpanel','aria-labelledby':'implementacionTabContrato'+contratos[i].id,id:'implementacionTabContrato'+contratos[i].id}).append(
              $('<h4 class="titularCajonSombreado">Transacciones</h4>'),
              (contratos[i].implementation&&contratos[i].implementation.transactions)?ObtenerTransacciones(contratos[i].implementation.transactions):$('<h4 class="titularColor textoColorPrimario mt-3">No hay transacciones disponibles.</h4>'),
              
              $('<h4 class="titularCajonSombreado">Obligaciones Financieras</h4>'),
              (contratos[i].implementation&&contratos[i].implementation.financialObligations)?ObtenerObligacionesFinancieras(contratos[i].implementation.financialObligations):$('<h4 class="titularColor textoColorPrimario mt-3">No hay obligaciones Financieras disponibles.</h4>'),
            )
          )
          )
        
      );
    }
    return elementos;
  }
function ObtenerTransacciones(transacciones){
  var elementos=[];

  for(var i =0; i < transacciones.length ; i++){
    elementos.push(
      $('<div class="mb-3" style="border-bottom: 3px solid #dee2e6;">').append(
        $('<div>',{class:'contenedorTablaCaracteristicas'}).append(
          $('<table>').append(
            $('<tbody>').append(
              transacciones[i].date ?
              $('<tr>').append(
                $('<td>',{class:'tituloTablaCaracteristicas',text:'Criterio de adjudicación',toolTexto:"contracts[n].transactions["+i+"].date"}),
                $('<td>',{class:'contenidoTablaCaracteristicas',text:ObtenerFecha(transacciones[i].date)})
              ) : null,
              (transacciones[i].payer&&transacciones[i].payer.name) ?
              $('<tr>').append(
                $('<td>',{class:'tituloTablaCaracteristicas',text:'Proveedor de Fondos',toolTexto:"contracts[n].transactions["+i+"].payer.name"}),
                $('<td>',{class:'contenidoTablaCaracteristicas'}).append(ObtenerElementosParte(transacciones[i].payer.id))
              ) : null,
              (transacciones[i].payee&&transacciones[i].payee.name) ?
              $('<tr>').append(
                $('<td>',{class:'tituloTablaCaracteristicas',text:'Receptor de Fondos',toolTexto:"contracts[n].transactions["+i+"].payee.name"}),
                $('<td>',{class:'contenidoTablaCaracteristicas'}).append(
                  ObtenerElementosParte(transacciones[i].payee.id)
                )
              ) : null
            )
          )
        ),
        transacciones[i].value?$('<div>',{
          class:'montoTotalProceso pb-3'
        }).append(
          /*$('<img>',{class:'imagenMonto mr-1',src:'/static/img/otros/monedasHonduras.png'}),*/
          $('<div>',{class:'contenedorMonto procesoMonto'}).append(
            $('<div>',{class:'textoColorGris',text:'Monto'}),
            $('<div>',{class:'valorMonto'}).append(
              $('<span>',{toolTexto:"contracts[n].transactions["+i+"].amount.amount"}).append(
                ValorMoneda(transacciones[i].value.amount)
              )
              ,
              $('<span>',{class:'textoColorPrimario',text:transacciones[i].value.currency,toolTexto:"contracts[n].transactions["+i+"].amount.currency"})
            )

            
          )
        ):null
      )
    );
  }

  return elementos;

}

function ObtenerObligacionesFinancieras(transacciones){
  var elementos=[];
  for(var i =0; i < transacciones.length ; i++){

  }
  return elementos;
}
  
  function ObtenerProveedoresContratos(proveedores){
    var elementos=[]
    for(i=0;i<proveedores.length;i++){
      if(proveedores[i].name){
        elementos.push(
          $('<tr>').append(
          $('<td>',{class:'tituloTablaCaracteristicas',text:'Contrato de Proveedor'}),
          $('<td>',{class:'contenidoTablaCaracteristicas'}).append(
            $('<a>',{text:proveedores[i].name,class:'enlaceTablaGeneral',href:'/proveedor/'+proveedores[i].id})
          )
        )
        );
        
      }
    }
    return elementos;
  }