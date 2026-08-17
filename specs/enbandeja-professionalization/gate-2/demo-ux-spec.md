# Gate 2 — Especificación UX de la demo

## 1. Alcance y transparencia

La demo presenta un flujo ficticio y configurable para `Colegio Modelo EnBandeja` y `Casino Escolar Demo`. No representa un producto cerrado ni compromete módulos específicos.

- Badge persistente: `Demo · flujo configurable`.
- Aviso persistente: `Ejemplo configurable. Los datos y pagos son ficticios. Los módulos, reglas, estados e integraciones se acuerdan con cada casino según su operación y logística.`
- Ninguna acción genera cobros, guarda datos reales ni se conecta a una pasarela.
- No se usan comprobantes de transferencia. Cada cliente tendrá la pasarela acordada para su implementación.
- QR es solo la modalidad de entrega interactiva de la demo; tickets impresos, búsqueda manual, listados por curso o el flujo actual son alternativas configurables.

## 2. Promesa y recorrido principal

La experiencia demuestra en menos de cinco minutos que una misma información avanza desde la familia hasta Administración, Cocina y entrega.

1. Apoderado selecciona cuatro almuerzos para `Estudiante Demo 01`.
2. Una pasarela genérica devuelve un pago ficticio aprobado y crea `DEM-1042`.
3. El pedido se confirma y sincroniza automáticamente con Administración y Cocina.
4. Administración supervisa la trazabilidad y atiende únicamente excepciones.
5. Cocina recibe cuatro raciones, marca preparación y luego listo para entrega.
6. Cocina simula una lectura QR, verifica la identidad ficticia y confirma la entrega.
7. El estado entregado aparece para Apoderado y Administración.

## 3. Dataset semilla

- Institución, casino, sede, estudiantes, pedidos y montos son explícitamente ficticios.
- Semana: 3 al 7 de agosto.
- Perfil interactivo: `Estudiante Demo 01 · 3° Básico B`.
- Menús: menú del día, vegetariano y alternativa especial.
- Happy path: lunes, martes, jueves y viernes; cuatro almuerzos; `$16.800` ficticios.
- Pedido interactivo: `DEM-1042`, inexistente antes de iniciar el flujo.
- Las observaciones son operacionales y no incluyen diagnósticos ni datos médicos.

## 4. Modelo de estado conectado

```text
DemoState
├── activeRole: parent | admin | kitchen
├── weeklySelections: Selection[]
├── orderCreated: boolean
├── paymentMethod: debit | credit | other
├── exceptionStatus: none | pending | resolved
├── kitchenStatus: confirmed | preparing | ready
├── deliveryStatus: pending | scanned | delivered
└── guideDismissed: boolean
```

| Estado anterior | Acción | Estado siguiente | Consecuencia |
|---|---|---|---|
| No existe | Simular pago aprobado y crear pedido | Pago ficticio aprobado | `DEM-1042` aparece en Administración |
| Pago ficticio aprobado | Sincronización automática | Confirmado | Cocina suma cuatro raciones sin intervención manual |
| Confirmado | Supervisar en Administración | Confirmado | Se muestra trazabilidad; solo las excepciones requieren acción |
| Confirmado | Marcar en preparación | En preparación | El estado se refleja entre roles |
| En preparación | Marcar listo | Listo para entrega | Se habilita el registro de entrega |
| Listo | Simular lectura de QR | Identificado | Se muestra identidad y pedido ficticios |
| Identificado | Confirmar entrega | Entregado | Apoderado y Administración reflejan entrega |
| Cualquiera | Reiniciar demo | Dataset semilla | Se eliminan los cambios locales |

## 5. Shell común

Incluye marca EnBandeja, identidad ficticia, badge y aviso de configuración, selector de roles, guía de tres pasos, reinicio y regreso a la landing. Cambiar de rol conserva la única fuente de verdad local.

Guía:

1. `Crea y paga un pedido ficticio como Apoderado.`
2. `Comprueba su sincronización automática en Administración.`
3. `Prepara y registra la entrega en Cocina.`

## 6. Apoderado

- Inicio: perfil ficticio, semana activa y CTA `Elegir almuerzos`.
- Menú: cinco días, alternativas con radios, resumen de días y total.
- Revisión: selecciones y aviso de que el monto es ficticio.
- Pasarela: representación genérica, selector ilustrativo débito/crédito/otro, sin campos bancarios, CTA `Simular pago aprobado y crear pedido`.
- Estado: `Confirmado automáticamente`, `En preparación`, `Listo para entrega` o `Entregado`, según corresponda.
- CTA guiado hacia Administración y CTA comercial secundario.

## 7. Administración

- KPIs, lista de pedidos y detalle responsive.
- `DEM-1042` aparece primero como nuevo, pagado y sincronizado automáticamente.
- El detalle muestra respuesta ficticia de pasarela, nunca archivo o comprobante.
- No existe CTA de aprobación individual. Se informa que Cocina ya recibió cuatro raciones y se ofrece cambiar de rol.
- Administración monitorea estados y gestiona solo pagos rechazados o pendientes, anulaciones, modificaciones, reembolsos e incidencias.
- Si una operación requiere hora de corte, puede acordarse un cierre global por día o periodo; nunca una aprobación pedido por pedido.
- El detalle refleja también `Listo para entrega` o `Entregado`.

## 8. Cocina y entrega

- Producción de hoy con totales confirmados, agrupación por menú o curso y detalle operacional.
- Estados: `Confirmado` → `En preparación` → `Listo · entrega pendiente` → `Entregado`.
- Al estar listo, CTA `Simular lectura de QR`.
- Tras la lectura se muestra `Estudiante Demo 01 · DEM-1042` y CTA `Confirmar entrega`.
- Aviso permanente en el detalle: `Esta demo usa QR. En cada implementación se puede acordar ticket impreso, búsqueda manual, listado por curso o conservar el flujo actual del casino.`

## 9. Microcopy aprobada

| Contexto | Texto |
|---|---|
| Pago | `Pago ficticio aprobado; no se realizará ningún cargo.` |
| Administración | `Sincronizado automáticamente · sin aprobación individual.` |
| Entrega | `QR simulado. La modalidad real se acuerda con cada casino.` |
| Reinicio | `Se eliminarán tus cambios locales y volverá el estado inicial.` |
| CTA comercial | `Quiero verlo adaptado a mi casino.` |

## 10. Responsive y accesibilidad

- Una columna funcional desde 375 px; tablas se convierten en tarjetas.
- Targets mínimos de 44×44 px, labels visibles y foco contrastado.
- Estados siempre expresados con texto, no solo color.
- Cambios conectados anunciados con `aria-live=polite`.
- Sin scroll anidado ni acciones fijas que oculten contenido.
- Reinicio con confirmación, Escape y retorno del foco.
