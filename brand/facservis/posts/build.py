def page(name, cls, body, num):
    foot=f'<div class="foot"><span>Fac<span class="a">Servis</span>™</span><span class="n">{num}</span></div>'
    open(name+'.html','w').write(f'<html><head><meta charset="utf-8"><link rel=stylesheet href=fs.css></head><body class="{cls}"><div class=grid></div><div class=p><div class=c>{body}</div>{foot}</div></body></html>')
def li(items, marks=None):
    return ''.join(f'<li><span class="k">{(marks[i] if marks else i+1)}</span><span>{t}</span></li>' for i,t in enumerate(items))
S={}
S['ct']=[
 ('','<p class="m">Facturación electrónica · Ecuador</p><h1 class="d" style="margin-top:64px">Emitir la factura <span class="a">es lo mínimo.</span></h1><p class="l" style="margin-top:56px">Lo que pasa después es lo que decide si tu negocio gana plata →</p>'),
 ('','<p class="m">Después de facturar</p><h2 class="d" style="margin-top:40px">¿Sabes, ahora mismo…</h2><ol>'+li(['cuánto stock te queda en bodega?','cuánta plata te deben y desde cuándo?','qué producto te deja más ganancia?'])+'</ol>'),
 ('','<p class="m">Cómo funciona</p><h2 class="d" style="margin-top:40px">Cada documento <span class="a">mueve tu negocio.</span></h2><ul>'+li(['Cada <b>factura</b> descuenta stock.','Cada <b>compra</b> lo repone.','Cada <b>venta a crédito</b> crea una cuenta por cobrar con su fecha.'],['✓']*3)+'</ul>'),
 ('light','<p class="m">Un solo panel</p><h2 class="d" style="margin-top:40px">Sin digitar <span class="a">nada dos veces.</span></h2><div style="margin-top:56px"><span class="chip" style="background:#0C2F57;color:#F3F6F2">Facturación SRI</span><span class="chip" style="background:#0C2F57;color:#F3F6F2">Inventario</span><span class="chip" style="background:#0C2F57;color:#F3F6F2">Compras</span><span class="chip" style="background:#0C2F57;color:#F3F6F2">Cuentas por cobrar</span><span class="chip" style="background:#0C2F57;color:#F3F6F2">Reportes</span></div><p class="l" style="margin-top:48px">Desde el celular. Sin instalaciones.</p>'),
 ('','<p class="m">FacServis</p><h1 class="d" style="margin-top:64px">Factura, controla, <span class="a">crece.</span></h1><p class="l" style="margin-top:56px">Pide tu demo y te lo mostramos con tus propios productos.</p><p class="d" style="margin-top:64px;font-size:56px">facservis.com</p>'),
]
S['xm']=[
 ('','<p class="m">Compras</p><h1 class="d" style="margin-top:64px">Deja de digitar <span class="a">las facturas de tus proveedores.</span></h1><p class="l" style="margin-top:56px">Hay una forma más rápida →</p>'),
 ('','<p class="m">Hoy</p><h2 class="d" style="margin-top:40px">Abrir el PDF <span class="a">y copiar a mano…</span></h2><ul>'+li(['RUC y razón social','Cada producto y su cantidad','Valores, IVA y descuentos','…y rezar para no equivocarte'],['·']*4)+'</ul>'),
 ('light','<p class="m">Con FacServis</p><h2 class="d" style="margin-top:40px">Cargas el <span class="a">XML</span> del comprobante electrónico.</h2><p class="l" style="margin-top:56px">El mismo archivo que tu proveedor ya te envía. Todos los datos vienen dentro, sin teclear.</p>'),
 ('','<p class="m">Y pasa solo</p><h2 class="d" style="margin-top:40px">Una carga, <span class="a">tres resultados.</span></h2><ol>'+li(['Entra la <b>compra</b> registrada.','Sube el <b>stock</b> de cada producto.','Queda el <b>costo real</b> para tus reportes.'])+'</ol>'),
 ('','<p class="m">FacServis</p><h1 class="d" style="margin-top:64px">Menos digitar, <span class="a">más vender.</span></h1><p class="l" style="margin-top:56px">Pide tu demo en</p><p class="d" style="margin-top:24px;font-size:56px">facservis.com</p>'),
]
S['cp']=[
 ('','<p class="m">SRI · Ecuador 🇪🇨</p><h1 class="d" style="margin-top:64px">Los 6 comprobantes electrónicos, <span class="a">en 1 minuto.</span></h1><p class="l" style="margin-top:56px">Cuándo se usa cada uno →</p>'),
 ('','<p class="m">1 y 2</p><ul>'+li(['<b>Factura</b><br><span style="color:#c9dbef">Cuando vendes un bien o un servicio.</span>','<b>Nota de crédito</b><br><span style="color:#c9dbef">Para una devolución o un descuento sobre una venta ya facturada.</span>'],['1','2'])+'</ul>'),
 ('','<p class="m">3 y 4</p><ul>'+li(['<b>Nota de débito</b><br><span style="color:#c9dbef">Para cobrar un valor adicional sobre una factura ya emitida.</span>','<b>Comprobante de retención</b><br><span style="color:#c9dbef">Cuando, como agente de retención, retienes impuestos en un pago.</span>'],['3','4'])+'</ul>'),
 ('','<p class="m">5 y 6</p><ul>'+li(['<b>Guía de remisión</b><br><span style="color:#c9dbef">Para respaldar el traslado de mercadería.</span>','<b>Liquidación de compra</b><br><span style="color:#c9dbef">Cuando compras a alguien que no puede emitirte un comprobante de venta.</span>'],['5','6'])+'</ul>'),
 ('light','<p class="m">FacServis</p><h1 class="d" style="margin-top:64px">Los seis, <span class="a">en un solo sistema.</span></h1><p class="l" style="margin-top:56px">Firmados con tu firma electrónica y autorizados por el SRI en segundos.</p><p class="d" style="margin-top:56px;font-size:56px">facservis.com</p>'),
]
for k,sl in S.items():
    for i,(cls,b) in enumerate(sl,1): page(f'{k}-{i}',cls,b,f'{i}/{len(sl)}')
page('sri','', '<p class="m">¿Se cayó el SRI?</p><h1 class="d" style="margin-top:64px">Tus facturas salen solas <span class="a">cuando vuelve.</span></h1><p class="l" style="margin-top:56px">FacServis las deja en cola y las reenvía automáticamente. Sin que nadie tenga que estar pendiente.</p>','facservis.com')
page('car','light', '<p class="m">Cuentas por cobrar</p><h1 class="d" style="margin-top:64px">¿Cuánta plata tienes <span class="a">regada sin cobrar?</span></h1><ul>'+li(['Cartera por cliente','Antigüedad de saldos','Recordatorios de cobro por WhatsApp'],['✓']*3)+'</ul>','facservis.com')
page('tes','', '<p class="m">Clientes reales · No inventamos testimonios</p><p class="q" style="margin-top:56px">«Ahora entro a un solo panel y tengo todo listo para la declaración. <span class="a">Lo que más agradezco es que los reportes cuadran.»</span></p><p class="l" style="margin-top:56px"><b style="color:#F3F6F2">Alexandra Olaya</b> · Contadora</p>','facservis.com')
