import subprocess, os
MARK=open('wa-1.html').read().split('<div class="foot">')[1].split('<span>')[0]
def page(name, cls, body, num):
    foot=f'<div class="foot">{MARK}<span>Servis<span class="a">Digital</span></span><span class="n">{num}</span></div>'
    open(name+'.html','w').write(f'<html><head><link rel=stylesheet href=slide.css></head><body class="{cls}"><div class=grid></div><div class=p><div class=c>{body}</div>{foot}</div></body></html>')
def li(items, k=None):
    out=''
    for i,(t) in enumerate(items):
        mark = k[i] if k else str(i+1)
        cls = ' x' if mark=='✕' else ''
        out+=f'<li><span class="k{cls}">{mark}</span><span>{t}</span></li>'
    return out
S={}
# A) Facturas de proveedor (lun 30/11)
S['fa']=[
 ('', '<p class="m">Facturas de proveedor</p><h1 class="d" style="margin-top:64px">Teclear facturas <span class="a">ya no es un trabajo.</span></h1><p class="l" style="margin-top:56px">Cómo las registra la IA, y dónde sigue haciendo falta una persona →</p>'),
 ('', '<p class="m">Por qué ahora sí</p><h2 class="d" style="margin-top:40px">El OCR de siempre necesitaba <span class="a">una plantilla por proveedor.</span></h2><p class="l" style="margin-top:56px">Cada proveedor nuevo o cada cambio de diseño la rompía.</p><p class="l" style="margin-top:32px"><b style="color:#fff">La IA de hoy entiende la factura como una persona:</b> sabe qué es una base imponible aunque esté en otro sitio o en una foto torcida.</p>'),
 ('', '<p class="m">El proceso</p><h2 class="d" style="margin-top:40px">De la bandeja de entrada <span class="a">a la contabilidad.</span></h2><ol>'+li(['<b>Recoge</b> la factura del correo, una carpeta o el móvil.','<b>Extrae</b> emisor, NIF, fecha, bases, cuotas y total.','<b>Valida</b> con reglas fiscales.','<b>Separa</b> lo correcto de lo dudoso.','<b>Exporta</b> a tu programa contable o ERP.'])+'</ol>'),
 ('light', '<p class="m">Las reglas mandan</p><h2 class="d" style="margin-top:40px">La IA lee. <span class="a">Las reglas comprueban.</span></h2><ul>'+li(['Base × tipo = cuota.','La suma cuadra con el total.','El NIF tiene un formato válido.','La factura no está ya registrada.','El proveedor existe en tu contabilidad.'],['✓']*5).replace('class="k"','class="k" style="border-color:#9a5a00;color:#9a5a00"')+'</ul>'),
 ('', '<p class="m">El objetivo</p><h1 class="d" style="margin-top:64px">Que solo se miren <span class="a">las facturas que lo necesitan.</span></h1><p class="l" style="margin-top:56px">Las que no cuadran, los casos fiscales especiales y la primera de cada proveedor.</p><p class="d" style="margin-top:64px;font-size:50px">Agenda 30 min · servisdigital.com</p>'),
]
# B) Asistente de IA (lun 7/12)
S['as']=[
 ('', '<p class="m">Asistentes de IA</p><h1 class="d" style="margin-top:64px">Un chatbot que inventa respuestas <span class="a">es peor que no tener chatbot.</span></h1><p class="l" style="margin-top:56px">Cuatro decisiones para que el tuyo no lo haga →</p>'),
 ('', '<p class="m">1 · Tu información, no internet</p><h2 class="d" style="margin-top:40px">Responde <span class="a">solo con lo que tú le das.</span></h2><p class="l" style="margin-top:56px">Preguntas frecuentes, condiciones, catálogo, procedimientos.</p><p class="l" style="margin-top:32px">Ante cada pregunta busca primero en tus documentos. <b style="color:#fff">Si no encuentra nada, no improvisa.</b></p>'),
 ('', '<p class="m">2 · Saber decir «no lo sé»</p><h2 class="d" style="margin-top:40px">Pasa el caso a una persona, <span class="a">ya resumido.</span></h2><p class="l" style="margin-top:56px">Quién es el cliente, qué preguntó, qué se le respondió y qué falta.</p><p class="l" style="margin-top:32px">Reclamaciones, descuentos y temas legales se derivan siempre.</p>'),
 ('light', '<p class="m">3 y 4 · Datos vivos y registro</p><h2 class="d" style="margin-top:40px">Consulta, <span class="a">no memoriza.</span></h2><ul>'+li(['<b>Precios, stock y pedidos</b> se consultan en tu sistema en el momento.','<b>Solo de lectura</b>, y solo lo que ese cliente tiene derecho a ver.','<b>Cada conversación queda registrada</b> para revisar y mejorar.'],['✓']*3).replace('class="k"','class="k" style="border-color:#9a5a00;color:#9a5a00"')+'</ul>'),
 ('', '<p class="m">Cómo empezar sin riesgo</p><h1 class="d" style="margin-top:64px">Primero, <span class="a">en modo borrador.</span></h1><p class="l" style="margin-top:56px">La IA propone la respuesta y una persona la envía. Así mides cuántas acierta sin que el cliente vea un error.</p><p class="d" style="margin-top:64px;font-size:50px">Agenda 30 min · servisdigital.com</p>'),
]
# C) Coste de tareas manuales (lun 14/12)
S['co']=[
 ('', '<p class="m">Antes de invertir en IA</p><h1 class="d" style="margin-top:64px">¿Cuánto te cuestan <span class="a">las tareas manuales?</span></h1><p class="l" style="margin-top:56px">Calcúlalo en una tarde, con una hoja de cálculo →</p>'),
 ('', '<p class="m">Paso 1</p><h2 class="d" style="margin-top:40px">Pregunta a cada persona <span class="a">de tu equipo:</span></h2><p class="d" style="margin-top:56px;font-size:58px;line-height:1.12;color:#c3d0cc">«¿Qué haces cada semana que consiste en leer, copiar, teclear, buscar o responder lo mismo?»</p>'),
 ('', '<p class="m">Paso 2</p><h2 class="d" style="margin-top:40px">Tres números <span class="a">por tarea.</span></h2><ol>'+li(['¿Cuántas veces pasa <b>al mes</b>?','¿Cuántos <b>minutos</b> lleva cada vez?','¿Cuántas veces al mes <b>sale algo mal</b>?'])+'</ol><p class="l" style="margin-top:56px">Una estimación honesta vale más que una medición que nunca se hace.</p>'),
 ('light', '<p class="m">Paso 3</p><h2 class="d" style="margin-top:40px">Pásalo <span class="a">a dinero.</span></h2><p class="d" style="margin-top:64px;font-size:54px;line-height:1.25">Horas/mes = veces × minutos ÷ 60</p><p class="d" style="margin-top:28px;font-size:54px;line-height:1.25">Coste/mes = horas × <span class="a">coste/hora</span></p><p class="l" style="margin-top:56px">El coste por hora de cada perfil, con sueldo y cargas. No una media.</p>'),
 ('', '<p class="m">Paso 4</p><h1 class="d" style="margin-top:64px">Ordena por coste. <span class="a">La primera fila es tu primer proyecto.</span></h1><p class="l" style="margin-top:56px">Y repite el cálculo tres meses después. Si no baja, algo no ha funcionado.</p><p class="d" style="margin-top:64px;font-size:50px">Agenda 30 min · servisdigital.com</p>'),
]
for key,slides in S.items():
    for i,(cls,body) in enumerate(slides,1):
        page(f'{key}-{i}',cls,body,f'{i}/{len(slides)}')
# Singles (jueves)
page('se','', '<p class="m">Antes de empezar con IA</p><h2 class="d" style="margin-top:40px">4 señales de que un proceso <span class="a">está listo para la IA.</span></h2><ol>'+li(['<b>Se repite mucho:</b> decenas o cientos de veces al mes.','<b>La entrada es desordenada:</b> PDF, fotos, correos, WhatsApp.','<b>El resultado se puede comprobar</b> con una regla.','<b>Un error se corrige</b> antes de causar daño.'])+'</ol>','servisdigital.com')
page('pr','', '<p class="m">La pregunta útil</p><p class="d" style="margin-top:64px;font-size:92px;line-height:1.02">No es qué herramienta de IA usar.<br><span class="a">Es qué tarea de tu equipo consiste en leer, copiar o buscar.</span></p>','servisdigital.com')
page('da','light', '<p class="m">IA y datos de clientes</p><h2 class="d" style="margin-top:40px">5 preguntas <span class="a">a cualquier proveedor de IA.</span></h2><ol>'+li(['¿Usa mis datos para <b>entrenar</b> sus modelos?','¿<b>Dónde</b> se procesan y se guardan?','¿Cuánto tiempo <b>conserva</b> lo que le envío?','¿Hay <b>contrato de encargo</b> del tratamiento?','¿Queda <b>registro</b> de lo que hace la IA?']).replace('class="k"','class="k" style="border-color:#9a5a00;color:#9a5a00"')+'</ol>','servisdigital.com')
