# EnBandeja — Prompt de ejecución Sonnet V2

Trabajaremos sobre la landing existente de EnBandeja.

## DOCUMENTOS OBLIGATORIOS

Antes de tocar código, lee completamente:

1. `EnBandeja_Producto_Precios_Landing_v1.docx`
2. `EnBandeja_Landing_Comercial_Master_Prompt_v2.md`

El DOCX es la fuente comercial definitiva.
El Markdown traduce esa estrategia a requisitos de landing.

Si hay contradicción entre ambos, manda el DOCX.

---

# OBJETIVO DE ESTA SESIÓN

No quiero volver a discutir estrategia ni diseñar una landing desde cero.

Quiero:

**auditar → escribir SPEC → validar SPEC contra el repo → ejecutar SPEC completa → validar build y responsive**

No necesito una segunda aprobación entre la SPEC y la implementación.

---

# PASO 1 — AUDITORÍA REAL DEL REPOSITORIO

Antes de modificar código:

- revisa la landing completa;
- identifica rutas;
- componentes;
- secciones;
- assets;
- screenshots;
- estilos;
- responsive;
- demo;
- formularios;
- metadata/SEO;
- analytics;
- integraciones;
- componentes reutilizables;
- specs existentes del repo.

No asumas nombres ni rutas.

Usa los nombres reales del proyecto.

---

# PASO 2 — CREAR LA SPEC

Crea dentro del sistema de specs existente del repositorio una nueva spec.

Nombre sugerido:

`enbandeja-commercial-landing-v2`

La spec debe quedar escrita como fuente ejecutable del trabajo.

Debe incluir como mínimo:

## 1. Objetivo comercial
Conversión esperada y público objetivo.

## 2. Fuente de verdad
Referencia explícita a:
`EnBandeja_Producto_Precios_Landing_v1.docx`

## 3. Estado actual
Qué existe y qué se reutiliza.

## 4. Arquitectura final de la landing
Orden definitivo de secciones.

## 5. Copy
H1, subtítulos, CTAs y mensajes clave.

## 6. Modalidades comerciales
Exactamente:
- EnBandeja Almuerzos
- EnBandeja + Cafetería
- EnBandeja Multicolegio

Con precios y reglas exactas del DOCX.

## 7. Demo
Producto base completo + badges:
- Incluido en EnBandeja Almuerzos
- Módulo Cafetería
- Multicolegio

## 8. Captura de leads
Formulario, WhatsApp, demo.

## 9. Analytics
Eventos + UTMs.

## 10. SEO
Metadata, OG, schema, sitemap, headings, indexabilidad.

## 11. Diseño
Qué se conserva, simplifica y modifica.

## 12. Responsive
390 / 430 / 768 / 1440.

## 13. Implementación técnica
Lista concreta de tareas por archivos/componentes reales.

## 14. Acceptance criteria
Criterios verificables por tarea.

## 15. Fuera de alcance
Todo lo que no debe construirse.

---

# PASO 3 — VALIDAR LA SPEC CONTRA EL CÓDIGO REAL

Antes de implementar:

- reemplaza supuestos por rutas/componentes reales;
- reutiliza componentes existentes;
- evita duplicación;
- trabaja sobre la landing existente;
- confirma que precios y alcance coinciden con el DOCX;
- confirma que no se estén vendiendo funciones fuera de alcance;
- confirma que la demo no use la lógica antigua de tiers artificiales.

No cambies la estrategia comercial por preferencias de implementación.

---

# PASO 4 — EJECUTAR LA SPEC COMPLETA

Una vez escrita y validada:

**ejecuta toda la spec.**

No te detengas a pedirme decisiones menores de diseño.

Toma decisiones coherentes con:

1. claridad comercial;
2. conversión;
3. mobile;
4. producto real;
5. performance;
6. SEO;
7. consistencia visual.

---

# REGLAS CRÍTICAS

- No crear otra landing.
- No reconstruir desde cero.
- No inventar clientes.
- No inventar métricas.
- No inventar testimonios.
- No inventar funcionalidades.
- No modificar precios.
- No usar “Plan 1 / 2 / 3”.
- No ocultar reportes/anulaciones/pendientes para upsell.
- No vender roadmap.
- No usar “el cliente es dueño de su plataforma”.
- No mencionar competidores en la landing.
- No vender IA ni automatización genérica.
- No usar “desde” en los tres productos principales.
- No esconder mensualidad.
- No agregar dependencias sin necesidad.
- No reemplazar screenshots reales por stock/mockups genéricos.

---

# VALIDACIÓN FINAL OBLIGATORIA

Al terminar:

1. ejecutar lint;
2. ejecutar typecheck si existe;
3. ejecutar build;
4. corregir errores;
5. revisar responsive en 390 / 430 / 768 / 1440;
6. revisar hero;
7. revisar CTAs;
8. revisar formulario;
9. revisar WhatsApp;
10. revisar demo;
11. revisar pricing;
12. revisar regla multicolegio;
13. revisar badges de demo;
14. revisar metadata/SEO;
15. revisar OG;
16. comprobar que no haya copy antiguo incompatible;
17. comprobar que no quede lógica comercial antigua de planes fragmentados.

---

# CHECK FINAL DE PRECIOS

Debe quedar exactamente:

### EnBandeja Almuerzos
$690.000 implementación
$119.000/mes
1 colegio

### EnBandeja + Cafetería
$890.000 implementación
$139.000/mes
1 colegio

### EnBandeja Multicolegio
$1.190.000 implementación
$179.000/mes
2 colegios

### Colegio adicional
+$250.000 implementación
+$30.000/mes

### Cafetería en Multicolegio
+$200.000 implementación
+$20.000/mes por operación

Si cualquier valor difiere, corrígelo antes de cerrar.

---

# ENTREGA FINAL

Entrégame únicamente un resumen operativo:

### SPEC
Ruta creada.

### IMPLEMENTADO
Qué quedó listo.

### CAMBIOS PRINCIPALES
Qué cambió respecto de la landing anterior.

### VALIDACIÓN
Lint / typecheck / build / responsive.

### CONVERSIÓN
Cómo quedó demo, WhatsApp y captura de lead.

### SEO
Qué quedó implementado.

### PENDIENTES
Solo elementos que realmente requieran una decisión mía.

Criterio de cierre:

**EnBandeja debe parecer un producto vertical que ya existe, funciona, tiene precios claros y puede implementarse hoy.**
