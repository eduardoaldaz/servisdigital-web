# Base set (always-visible profile posts). Run: python3 build.py && render with headless Chrome.
MARK=open('../wa-1.html').read().split('<div class="foot">')[1].split('<span>')[0]
def page(name, cls, body):
    foot=f'<div class="foot">{MARK}<span>Servis<span class="a">Digital</span></span><span class="n">servisdigital.com</span></div>'
    open(name+'.html','w').write(f'<html><head><meta charset="utf-8"><link rel=stylesheet href=slide.css></head><body class="{cls}"><div class=grid></div><div class=p><div class=c>{body}</div>{foot}</div></body></html>')
def li(items, marks=None, light=False):
    st=' style="border-color:#9a5a00;color:#9a5a00"' if light else ''
    return ''.join(f'<li><span class="k"{st}>{(marks[i] if marks else i+1)}</span><span>{t}</span></li>' for i,t in enumerate(items))
P={
 'b1-servicios':('', '<p class="m">Qué hacemos</p><h2 class="d" style="margin-top:40px">Ponemos la IA a trabajar <span class="a">dentro de tu empresa.</span></h2><ol>'+li(['<b>Procesos:</b> medimos dónde se pierde el tiempo.','<b>IA:</b> lee documentos, responde a clientes, consulta tus datos.','<b>Software a medida:</b> apps web, móviles y portales.','<b>Integraciones:</b> ERP, Facturae, bancos y tiendas online.'])+'</ol>'),
 'b2-metodo':('light', '<p class="m">Cómo trabajamos</p><h2 class="d" style="margin-top:40px">Primero el proceso. <span class="a">Después la IA.</span></h2><ol>'+li(['<b>Diagnóstico:</b> 30 minutos para ver si la IA tiene sentido.','<b>Levantamiento:</b> dibujamos tu proceso real, con tiempos.','<b>Piloto:</b> un proceso acotado, con datos y usuarios reales.','<b>Despliegue y mejora:</b> al resto de la operación.'],light=True)+'</ol><p class="l" style="margin-top:48px">Puedes parar después de cualquier etapa.</p>'),
 'b3-principios':('', '<p class="m">Nuestros principios</p><h2 class="d" style="margin-top:40px">Así trabajamos <span class="a">con tu empresa.</span></h2><ul>'+li(['La IA propone, <b>una persona decide.</b>','Tus datos <b>siguen siendo tuyos.</b>','<b>Medimos</b> antes y después.','Hablas con <b>quien lo construye.</b>'],['✓']*4)+'</ul>'),
 'b4-calculadora':('', '<p class="m">Herramienta gratis</p><h1 class="d" style="margin-top:64px">¿Cuántas horas pierde tu equipo <span class="a">copiando datos?</span></h1><p class="l" style="margin-top:56px">Apunta tus tareas, cuántas veces y cuántos minutos. Ves las horas y el dinero al mes, y por dónde empezar.</p><p class="d" style="margin-top:64px;font-size:50px">servisdigital.com/calculadora</p>'),
 'b5-docusai':('light', '<p class="m">Nuestro producto · DocusAI</p><h2 class="d" style="margin-top:40px">Facturas de proveedor <span class="a">registradas solas.</span></h2><ul>'+li(['Lee facturas en <b>PDF, foto o correo.</b>','Las <b>valida</b> con las reglas fiscales españolas.','Las <b>exporta</b> a tu programa contable o a Business Central.'],['✓']*3,light=True)+'</ul><p class="l" style="margin-top:48px">Para gestorías y pymes en España.</p>'),
}
for k,(c,b) in P.items(): page(k,c,b)
