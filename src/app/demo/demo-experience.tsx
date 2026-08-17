"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChefHat,
  CircleDollarSign,
  ClipboardCheck,
  CreditCard,
  HelpCircle,
  QrCode,
  RotateCcw,
  ScanLine,
  School,
  ShieldCheck,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "./demo.module.css";

type Role = "parent" | "admin" | "kitchen";
type ParentStep = "identify" | "menu" | "review" | "payment" | "success";
type KitchenStatus = "confirmed" | "preparing" | "ready";
type DeliveryStatus = "pending" | "scanned" | "delivered";

type MenuOption = {
  id: string;
  name: string;
  description: string;
};

type MenuDay = {
  id: string;
  short: string;
  label: string;
  options: MenuOption[];
};

type DemoState = {
  role: Role;
  parentStep: ParentStep;
  cycleId: string;
  courseId: string;
  studentId: string;
  selections: Record<string, string>;
  paymentMethod: "debit" | "credit" | "other";
  orderCreated: boolean;
  kitchenStatus: KitchenStatus;
  deliveryStatus: DeliveryStatus;
  guideVisible: boolean;
};

const STORAGE_KEY = "enbandeja-demo-v2";
const PRICE = 4200;

const SCHOOL_DIRECTORY = [
  {
    id: "prebasica",
    label: "Educación parvularia",
    courses: [
      { id: "kinder-a", label: "Kínder A", students: [{ id: "student-04", label: "Estudiante Demo 04" }, { id: "student-08", label: "Estudiante Demo 08" }] },
    ],
  },
  {
    id: "basica",
    label: "Enseñanza básica",
    courses: [
      { id: "third-b", label: "3° Básico B", students: [{ id: "student-01", label: "Estudiante Demo 01" }, { id: "student-05", label: "Estudiante Demo 05" }] },
      { id: "fourth-a", label: "4° Básico A", students: [{ id: "student-07", label: "Estudiante Demo 07" }, { id: "student-09", label: "Estudiante Demo 09" }] },
      { id: "sixth-a", label: "6° Básico A", students: [{ id: "student-12", label: "Estudiante Demo 12" }, { id: "student-14", label: "Estudiante Demo 14" }] },
    ],
  },
  {
    id: "media",
    label: "Enseñanza media",
    courses: [
      { id: "first-c", label: "1° Medio C", students: [{ id: "student-17", label: "Estudiante Demo 17" }, { id: "student-19", label: "Estudiante Demo 19" }] },
    ],
  },
] as const;

type SelectedIdentity = {
  cycle: string;
  course: string;
  student: string;
};

function getSelectedIdentity(state: DemoState): SelectedIdentity {
  const cycle = SCHOOL_DIRECTORY.find((item) => item.id === state.cycleId);
  const course = cycle?.courses.find((item) => item.id === state.courseId);
  const student = course?.students.find((item) => item.id === state.studentId);
  return {
    cycle: cycle?.label ?? "Ciclo no seleccionado",
    course: course?.label ?? "Curso no seleccionado",
    student: student?.label ?? "Estudiante no seleccionado",
  };
}

const MENU: MenuDay[] = [
  {
    id: "mon",
    short: "Lun 3",
    label: "Lunes 3 de agosto",
    options: [
      { id: "daily", name: "Menú del día", description: "Pollo al horno, arroz y ensalada" },
      { id: "veg", name: "Vegetariano", description: "Pastel de choclo vegetal" },
      { id: "special", name: "Alternativa especial", description: "Pasta con salsa de tomate" },
    ],
  },
  {
    id: "tue",
    short: "Mar 4",
    label: "Martes 4 de agosto",
    options: [
      { id: "daily", name: "Menú del día", description: "Albóndigas de pavo con puré" },
      { id: "veg", name: "Vegetariano", description: "Croquetas de lentejas con puré" },
      { id: "special", name: "Alternativa especial", description: "Arroz primavera" },
    ],
  },
  {
    id: "wed",
    short: "Mié 5",
    label: "Miércoles 5 de agosto",
    options: [
      { id: "daily", name: "Menú del día", description: "Charquicán con huevo" },
      { id: "veg", name: "Vegetariano", description: "Charquicán vegetal" },
      { id: "special", name: "Alternativa especial", description: "Pasta corta con verduras" },
    ],
  },
  {
    id: "thu",
    short: "Jue 6",
    label: "Jueves 6 de agosto",
    options: [
      { id: "daily", name: "Menú del día", description: "Pescado al horno con papas" },
      { id: "veg", name: "Vegetariano", description: "Tortilla de verduras con papas" },
      { id: "special", name: "Alternativa especial", description: "Arroz con verduras" },
    ],
  },
  {
    id: "fri",
    short: "Vie 7",
    label: "Viernes 7 de agosto",
    options: [
      { id: "daily", name: "Menú del día", description: "Lasaña de carne y ensalada" },
      { id: "veg", name: "Vegetariano", description: "Lasaña de verduras" },
      { id: "special", name: "Alternativa especial", description: "Pasta con salsa suave" },
    ],
  },
];

const seedState: DemoState = {
  role: "parent",
  parentStep: "identify",
  cycleId: "",
  courseId: "",
  studentId: "",
  selections: {},
  paymentMethod: "debit",
  orderCreated: false,
  kitchenStatus: "confirmed",
  deliveryStatus: "pending",
  guideVisible: true,
};

const seedOrders = [
  ["DEM-1041", "Estudiante Demo 12", "6° Básico A", 5, "Sincronizado"],
  ["DEM-1039", "Estudiante Demo 10", "5° Básico B", 5, "Sincronizado"],
  ["DEM-1036", "Estudiante Demo 07", "4° Básico A", 4, "Observado"],
  ["DEM-1034", "Estudiante Demo 05", "3° Básico B", 5, "Sincronizado"],
] as const;

const money = (value: number) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(value);

function BrandMark() {
  return (
    <span className={styles.brand} aria-label="EnBandeja">
      <svg viewBox="0 0 96 80" aria-hidden="true">
        <path fill="#17385F" d="M13 8h31v11H25v8h17v10H25v9h19v11H13z" />
        <path fill="#E8794F" fillRule="evenodd" d="M49 8h20c10 0 16 5 16 13 0 5-3 9-7 11 6 2 9 6 9 12 0 9-7 13-18 13H49zm12 10v10h8c3 0 5-2 5-5s-2-5-5-5zm0 20v9h9c4 0 6-2 6-5s-2-4-6-4z" />
        <path fill="#17385F" d="M8 61h80c-2 8-8 12-17 12H25C16 73 10 69 8 61Z" />
      </svg>
      <strong>EnBandeja</strong>
    </span>
  );
}

function Status({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "success" | "warning" | "new" }) {
  return <span className={`${styles.status} ${styles[`status_${tone}`]}`}>{children}</span>;
}

export function DemoExperience() {
  const [state, setState] = useState<DemoState>(seedState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setState({ ...seedState, ...(JSON.parse(stored) as DemoState) });
      } catch {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const selectionRows = useMemo(
    () =>
      MENU.flatMap((day) => {
        const selected = state.selections[day.id];
        if (!selected || selected === "none") return [];
        const option = day.options.find((item) => item.id === selected);
        return option ? [{ day, option }] : [];
      }),
    [state.selections],
  );

  const orderTotal = selectionRows.length * PRICE;
  const selectedIdentity = getSelectedIdentity(state);
  const guideStep = !state.orderCreated
    ? 1
    : state.role === "kitchen" || state.kitchenStatus !== "confirmed" || state.deliveryStatus !== "pending"
      ? 3
      : 2;

  const setRole = (role: Role) => setState((current) => ({ ...current, role }));

  const resetDemo = () => {
    if (window.confirm("Se eliminarán tus cambios locales y volverá el estado inicial de la demo.")) {
      sessionStorage.removeItem(STORAGE_KEY);
      setState(seedState);
    }
  };

  return (
    <div className={styles.demoShell}>
      <a className={styles.skipLink} href="#demo-content">Saltar al contenido</a>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <BrandMark />
          <div className={styles.schoolIdentity}>
            <School aria-hidden="true" />
            <span><strong>Colegio Modelo EnBandeja</strong><small>Casino Escolar Demo</small></span>
          </div>
          <Status tone="new">Demo · flujo configurable</Status>
          <div className={styles.headerActions}>
            <button type="button" className={styles.textButton} onClick={() => setState((current) => ({ ...current, guideVisible: true }))}>
              <HelpCircle aria-hidden="true" /> Cómo recorrerla
            </button>
            <button type="button" className={styles.textButton} onClick={resetDemo}>
              <RotateCcw aria-hidden="true" /> Reiniciar
            </button>
            <Link className={styles.textButton} href="/">
              <ArrowLeft aria-hidden="true" /> Volver
            </Link>
          </div>
        </div>
        <nav className={styles.roleNav} aria-label="Elegir vista de la demostración">
          {([
            ["parent", "Apoderado", UserRound],
            ["admin", "Administración", ClipboardCheck],
            ["kitchen", "Cocina", ChefHat],
          ] as const).map(([role, label, Icon]) => (
            <button
              key={role}
              type="button"
              aria-current={state.role === role ? "page" : undefined}
              className={state.role === role ? styles.roleActive : ""}
              onClick={() => setRole(role)}
            >
              <Icon aria-hidden="true" /> {label}
            </button>
          ))}
        </nav>
      </header>

      <div className={styles.disclaimer}>
        <ShieldCheck aria-hidden="true" />
        <p><strong>Ejemplo configurable.</strong> Los datos y pagos son ficticios. Los módulos, reglas, estados e integraciones se acuerdan con cada casino según su operación y logística.</p>
      </div>

      {state.guideVisible ? (
        <aside className={styles.guide} aria-label="Guía de la demostración">
          <span className={styles.guideNumber}>0{guideStep}</span>
          <div>
            <small>{guideStep} de 3 · Recorrido recomendado</small>
            <strong>{guideStep === 1 ? "Identifica al estudiante y arma su semana" : guideStep === 2 ? "Revisa la operación desde Administración" : "Continúa con producción y entrega"}</strong>
          </div>
          <button type="button" aria-label="Cerrar guía" onClick={() => setState((current) => ({ ...current, guideVisible: false }))}><X aria-hidden="true" /></button>
        </aside>
      ) : null}

      <main id="demo-content" className={styles.main}>
        {state.role === "parent" ? (
          <ParentView state={state} setState={setState} selectionRows={selectionRows} orderTotal={orderTotal} identity={selectedIdentity} />
        ) : state.role === "admin" ? (
          <AdminView state={state} setState={setState} orderTotal={orderTotal} selectedCount={selectionRows.length} identity={selectedIdentity} />
        ) : (
          <KitchenView state={state} setState={setState} selectedCount={selectionRows.length} identity={selectedIdentity} />
        )}
      </main>
      <div className={styles.liveRegion} aria-live="polite">
        {state.deliveryStatus === "delivered" ? "Entrega ficticia registrada. El estado ya está actualizado." : state.orderCreated ? "El pedido ficticio fue creado y ya está visible en la operación." : ""}
      </div>
    </div>
  );
}

function ParentView({ state, setState, selectionRows, orderTotal, identity }: {
  state: DemoState;
  setState: React.Dispatch<React.SetStateAction<DemoState>>;
  selectionRows: { day: MenuDay; option: MenuOption }[];
  orderTotal: number;
  identity: SelectedIdentity;
}) {
  const selectedCycle = SCHOOL_DIRECTORY.find((item) => item.id === state.cycleId);
  const selectedCourse = selectedCycle?.courses.find((item) => item.id === state.courseId);
  const identityComplete = Boolean(state.cycleId && state.courseId && state.studentId);

  if (state.parentStep === "identify") {
    return (
      <section>
        <PageHeading
          eyebrow="Vista del apoderado · Paso 1 de 4"
          title="¿Para quién realizarás el pedido?"
          copy="En esta configuración no necesitas crear una cuenta. El acceso puede adaptarse al modelo que defina cada colegio."
        />
        <div className={styles.identifyLayout}>
          <form className={styles.identityForm} onSubmit={(event) => {
            event.preventDefault();
            if (identityComplete) setState((current) => ({ ...current, parentStep: "menu" }));
          }}>
            <div className={styles.identityProgress} aria-label="Progreso de identificación">
              <span className={state.cycleId ? styles.identityDone : styles.identityCurrent}>1</span>
              <i />
              <span className={state.courseId ? styles.identityDone : state.cycleId ? styles.identityCurrent : ""}>2</span>
              <i />
              <span className={state.studentId ? styles.identityDone : state.courseId ? styles.identityCurrent : ""}>3</span>
            </div>

            <label className={styles.selectField}>
              <span>Ciclo</span>
              <select
                value={state.cycleId}
                onChange={(event) => setState((current) => ({ ...current, cycleId: event.target.value, courseId: "", studentId: "" }))}
              >
                <option value="">Selecciona un ciclo</option>
                {SCHOOL_DIRECTORY.map((cycle) => <option value={cycle.id} key={cycle.id}>{cycle.label}</option>)}
              </select>
            </label>

            <label className={styles.selectField}>
              <span>Curso</span>
              <select
                value={state.courseId}
                disabled={!selectedCycle}
                onChange={(event) => setState((current) => ({ ...current, courseId: event.target.value, studentId: "" }))}
              >
                <option value="">{selectedCycle ? "Selecciona un curso" : "Primero selecciona el ciclo"}</option>
                {selectedCycle?.courses.map((course) => <option value={course.id} key={course.id}>{course.label}</option>)}
              </select>
            </label>

            <label className={styles.selectField}>
              <span>Estudiante</span>
              <select
                value={state.studentId}
                disabled={!selectedCourse}
                onChange={(event) => setState((current) => ({ ...current, studentId: event.target.value }))}
              >
                <option value="">{selectedCourse ? "Selecciona un estudiante" : "Primero selecciona el curso"}</option>
                {selectedCourse?.students.map((student) => <option value={student.id} key={student.id}>{student.label}</option>)}
              </select>
            </label>

            <button className={styles.primaryButton} disabled={!identityComplete} type="submit">
              Continuar a la semana <ArrowRight aria-hidden="true" />
            </button>
          </form>

          <aside className={styles.accessConfig}>
            <ShieldCheck aria-hidden="true" />
            <span className={styles.summaryIndex}>Acceso configurable</span>
            <h2>Sin cuenta en este ejemplo</h2>
            <p>La demo identifica al estudiante mediante ciclo, curso y nombre. Una implementación también puede usar cuentas de apoderado, códigos privados o una integración existente.</p>
          </aside>
        </div>
      </section>
    );
  }

  if (state.parentStep === "menu") {
    return (
      <section>
        <PageHeading eyebrow="Vista del apoderado · Paso 2 de 4" title="Elige los almuerzos de la semana" copy={`${identity.student} · ${identity.course}. Selecciona una alternativa por día o deja días sin pedido.`} />
        <div className={styles.menuLayout}>
          <div className={styles.dayList}>
            {MENU.map((day) => (
              <fieldset className={styles.day} key={day.id}>
                <legend><span>{day.short}</span>{day.label}</legend>
                {day.options.map((option) => (
                  <label className={styles.menuChoice} key={option.id}>
                    <input
                      type="radio"
                      name={day.id}
                      value={option.id}
                      checked={state.selections[day.id] === option.id}
                      onChange={() => setState((current) => ({ ...current, selections: { ...current.selections, [day.id]: option.id } }))}
                    />
                    <span><strong>{option.name}</strong><small>{option.description}</small></span>
                    <b>{money(PRICE)}</b>
                  </label>
                ))}
                <label className={`${styles.menuChoice} ${styles.noLunch}`}>
                  <input
                    type="radio"
                    name={day.id}
                    value="none"
                    checked={state.selections[day.id] === "none"}
                    onChange={() => setState((current) => ({ ...current, selections: { ...current.selections, [day.id]: "none" } }))}
                  />
                  <span><strong>No solicitar almuerzo</strong><small>Este día no se agregará al pedido</small></span>
                </label>
              </fieldset>
            ))}
          </div>
          <aside className={styles.orderSummary}>
            <span className={styles.summaryIndex}>02 / 04</span>
            <h2>Tu selección</h2>
            {selectionRows.length ? (
              <ul>{selectionRows.map(({ day, option }) => <li key={day.id}><span>{day.short}</span><strong>{option.name}</strong></li>)}</ul>
            ) : <p className={styles.emptyCopy}>Selecciona al menos un almuerzo para continuar.</p>}
            <div className={styles.totalLine}><span>{selectionRows.length} almuerzos</span><strong>{money(orderTotal)} <small>demo</small></strong></div>
            <button className={styles.primaryButton} disabled={!selectionRows.length} type="button" onClick={() => setState((current) => ({ ...current, parentStep: "review" }))}>
              Revisar pedido <ArrowRight aria-hidden="true" />
            </button>
            <button className={styles.summaryBackButton} type="button" onClick={() => setState((current) => ({ ...current, parentStep: "identify", selections: {} }))}>
              Cambiar estudiante
            </button>
          </aside>
        </div>
      </section>
    );
  }

  if (state.parentStep === "review") {
    return (
      <section>
        <PageHeading eyebrow="Vista del apoderado · Paso 3 de 4" title="Revisa antes de continuar" copy="Este resumen pertenece únicamente a la demostración." />
        <div className={styles.reviewGrid}>
          <article className={styles.paperPanel}>
            <div className={styles.paperHeader}><span>Pedido semanal</span><Status tone="neutral">Borrador</Status></div>
            <dl className={styles.identityList}><div><dt>Estudiante</dt><dd>{identity.student}</dd></div><div><dt>Curso</dt><dd>{identity.course}</dd></div><div><dt>Semana</dt><dd>3–7 de agosto</dd></div></dl>
            <div className={styles.reviewRows}>{selectionRows.map(({ day, option }) => <div key={day.id}><span>{day.short}</span><strong>{option.name}</strong><b>{money(PRICE)}</b></div>)}</div>
            <div className={styles.grandTotal}><span>Total ficticio</span><strong>{money(orderTotal)}</strong></div>
          </article>
          <aside className={styles.actionPanel}>
            <CircleDollarSign aria-hidden="true" />
            <h2>No se realizará ningún cobro</h2>
            <p>El siguiente paso representa una pasarela configurable. No pedirá datos bancarios ni realizará cargos.</p>
            <button type="button" className={styles.primaryButton} onClick={() => setState((current) => ({ ...current, parentStep: "payment" }))}>Ir al pago de demostración <ArrowRight aria-hidden="true" /></button>
            <button type="button" className={styles.secondaryButton} onClick={() => setState((current) => ({ ...current, parentStep: "menu" }))}>Editar selección</button>
          </aside>
        </div>
      </section>
    );
  }

  if (state.parentStep === "payment") {
    return (
      <section>
        <PageHeading eyebrow="Vista del apoderado · Paso 4 de 4" title="Pasarela de pago simulada" copy="Este checkout representa una integración posible; cada cliente define su propia pasarela y reglas." />
        <div className={styles.receiptStage}>
          <div className={styles.paymentHeader}><CreditCard aria-hidden="true" /><div><strong>Total de demostración</strong><span>{money(orderTotal)} · no se realizará ningún cargo</span></div><Status tone="new">Pasarela ficticia</Status></div>
          <fieldset className={styles.paymentMethods}>
            <legend>Método habilitado en esta configuración de ejemplo</legend>
            {([['debit','Tarjeta de débito','Confirmación inmediata simulada'],['credit','Tarjeta de crédito','Cuotas no disponibles en la demo'],['other','Otro medio integrado','Depende de la pasarela del cliente']] as const).map(([value,label,copy]) => (
              <label key={value}><input type="radio" name="payment-method" value={value} checked={state.paymentMethod === value} onChange={() => setState((current) => ({ ...current, paymentMethod: value }))}/><span><strong>{label}</strong><small>{copy}</small></span></label>
            ))}
          </fieldset>
          <button type="button" className={styles.primaryButton} onClick={() => setState((current) => ({ ...current, orderCreated: true, parentStep: "success" }))}>Simular pago aprobado y crear pedido <ArrowRight aria-hidden="true" /></button>
          <p className={styles.safeNote}><ShieldCheck aria-hidden="true" /> No ingreses datos bancarios: este pago es completamente ficticio y local.</p>
        </div>
      </section>
    );
  }

  if (state.parentStep === "success") {
    const delivered = state.deliveryStatus === "delivered";
    const ready = state.kitchenStatus === "ready";
    return (
      <section className={styles.successStage}>
        <span className={styles.successIcon}><Check aria-hidden="true" /></span>
        <p className={styles.eyebrow}>Pedido de demostración creado</p>
        <h1>DEM-1042</h1>
        <Status tone="success">
          {delivered ? "Entregado" : ready ? "Listo para entrega" : "Pedido recibido"}
        </Status>
        <p>{delivered ? "La entrega quedó registrada en esta demostración mediante QR ficticio." : ready ? "Cocina terminó la preparación. El pedido está esperando su entrega." : "El pedido ficticio ya forma parte de la operación y puede revisarse desde las demás perspectivas."}</p>
        <div className={styles.successActions}>
          <button type="button" className={styles.primaryButton} onClick={() => setState((current) => ({ ...current, role: "admin" }))}>Ver pedido en Administración <ArrowRight aria-hidden="true" /></button>
          <Link className={styles.secondaryButton} href="/?ref=demo-parent#contacto">Quiero verlo adaptado a mi casino</Link>
        </div>
      </section>
    );
  }

  return null;
}

function AdminView({ state, setState, orderTotal, selectedCount, identity }: {
  state: DemoState;
  setState: React.Dispatch<React.SetStateAction<DemoState>>;
  orderTotal: number;
  selectedCount: number;
  identity: SelectedIdentity;
}) {
  const [detailOpen, setDetailOpen] = useState(state.orderCreated);
  const exceptionCount = 2;

  return (
    <section>
      <PageHeading eyebrow="Vista de administración" title="Toda la operación en un solo lugar" copy="Una visión común para revisar pedidos, excepciones, producción y trazabilidad durante toda la jornada." />
      <div className={styles.adminMetrics}>
        <div><small>Pedidos de la semana</small><strong>{state.orderCreated ? 12 : 11}</strong><span><UsersRound aria-hidden="true" /> operación demo</span></div>
        <div><small>Excepciones</small><strong>{exceptionCount}</strong><span>requieren revisión</span></div>
        <div><small>En operación</small><strong>{state.orderCreated ? 9 : 8}</strong><span><CheckCircle2 aria-hidden="true" /> visibles para Cocina</span></div>
      </div>

      {state.orderCreated ? (
        <div className={styles.newOrderBanner}>
          <span>Nuevo</span><div><strong>DEM-1042 ya está disponible</strong><p>Pedido ficticio · {selectedCount} raciones consideradas en Cocina</p></div>
          <button type="button" className={styles.secondaryButton} onClick={() => setDetailOpen(true)}>Ver trazabilidad</button>
        </div>
      ) : (
        <div className={styles.emptyAdmin}><ClipboardCheck aria-hidden="true" /><div><strong>Aún no llega el pedido del recorrido</strong><p>Créalo primero desde la vista del Apoderado.</p></div><button className={styles.secondaryButton} type="button" onClick={() => setState((current) => ({ ...current, role: "parent" }))}>Ir a Apoderado</button></div>
      )}

      <div className={styles.adminWorkspace}>
        <div className={styles.ordersPanel}>
          <div className={styles.panelHeading}><div><span className={styles.summaryIndex}>Monitoreo operacional</span><h2>Pedidos recientes</h2></div><Status tone="neutral">Semana 32</Status></div>
          <div className={styles.orderTable} role="table" aria-label="Pedidos recientes">
            <div className={styles.tableHead} role="row"><span>Pedido</span><span>Perfil y curso</span><span>Raciones</span><span>Estado</span><span>Acción</span></div>
            {state.orderCreated ? (
          <div className={styles.tableRow} role="row"><strong>DEM-1042 <small>Nuevo</small></strong><span>{identity.student}<small>{identity.course}</small></span><b>{selectedCount}</b><Status tone="success">Recibido</Status><button type="button" onClick={() => setDetailOpen(true)}>Ver detalle</button></div>
            ) : null}
            {seedOrders.map(([id, profile, course, portions, status]) => (
              <div className={styles.tableRow} role="row" key={id}><strong>{id}</strong><span>{profile}<small>{course}</small></span><b>{portions}</b><Status tone={status === "Sincronizado" ? "success" : "warning"}>{status}</Status><button type="button">Ver</button></div>
            ))}
          </div>
        </div>

        <aside className={`${styles.detailPanel} ${detailOpen && state.orderCreated ? styles.detailPanelOpen : ""}`} aria-hidden={!detailOpen || !state.orderCreated}>
          {detailOpen && state.orderCreated ? (
            <>
              <div className={styles.detailTop}><div><span className={styles.summaryIndex}>Detalle</span><h2>DEM-1042</h2></div><button type="button" aria-label="Cerrar detalle" onClick={() => setDetailOpen(false)}><X aria-hidden="true" /></button></div>
              <Status tone="success">Pedido recibido</Status>
              <dl className={styles.detailList}><div><dt>Estudiante</dt><dd>{identity.student}</dd></div><div><dt>Curso</dt><dd>{identity.course}</dd></div><div><dt>Raciones</dt><dd>{selectedCount}</dd></div><div><dt>Total demo</dt><dd>{money(orderTotal)}</dd></div><div><dt>Pago</dt><dd>Aprobado por pasarela ficticia</dd></div><div><dt>Entrega</dt><dd>{state.deliveryStatus === "delivered" ? "Entregado vía QR ficticio" : state.kitchenStatus === "ready" ? "Listo · pendiente" : "Pendiente"}</dd></div></dl>
              <div className={styles.fileLine}><CreditCard aria-hidden="true" /><span><strong>Pago aprobado</strong><small>Respuesta ficticia de pasarela · sin datos bancarios</small></span></div>
              <div className={styles.impactNote}><ChefHat aria-hidden="true" /><p><strong>Impacto en producción</strong>Este pedido considera {selectedCount} raciones dentro de la planificación de Cocina.</p></div>
              <div className={styles.impactNote}><ClipboardCheck aria-hidden="true" /><p><strong>Operación configurable</strong>Si el casino necesita una hora de corte, puede acordarse un cierre global por día o periodo.</p></div>
              <button type="button" className={styles.primaryButton} onClick={() => setState((current) => ({ ...current, role: "kitchen" }))}>Ver actualización en Cocina <ArrowRight aria-hidden="true" /></button>
            </>
          ) : <div className={styles.detailPlaceholder}><ArrowLeft aria-hidden="true" /><p>Selecciona un pedido para revisar su trazabilidad.</p></div>}
        </aside>
      </div>
    </section>
  );
}

function KitchenView({ state, setState, selectedCount, identity }: {
  state: DemoState;
  setState: React.Dispatch<React.SetStateAction<DemoState>>;
  selectedCount: number;
  identity: SelectedIdentity;
}) {
  const added = state.orderCreated ? selectedCount : 0;
  const total = 33 + added;
  const [grouping, setGrouping] = useState<"menu" | "course">("menu");

  return (
    <section>
      <PageHeading eyebrow="Vista de cocina" title="Producción y entrega en un mismo flujo" copy="Consulta cantidades y registra la entrega con la modalidad acordada para cada casino." />
      <div className={styles.kitchenHero}>
        <div className={styles.bigTotal}><small>Producción de hoy</small><strong>{total}</strong><span>raciones confirmadas</span></div>
        <div className={styles.kitchenDate}><span>Martes</span><strong>04 AGO</strong><small>Turno de demostración</small></div>
        <div className={styles.syncState}><span className={added ? styles.syncPulse : ""}><Check aria-hidden="true" /></span><p><strong>{added ? "Pedido incluido en la jornada" : "Esperando el pedido del recorrido"}</strong>{added ? `DEM-1042 considera ${selectedCount} raciones dentro de la planificación actual.` : "Crea el pedido como Apoderado para continuar el recorrido."}</p></div>
      </div>

      <div className={styles.productionLayout}>
        <div className={styles.productionPanel}>
          <div className={styles.panelHeading}><div><span className={styles.summaryIndex}>Distribución operacional</span><h2>Raciones por {grouping === "menu" ? "menú" : "curso"}</h2></div><div className={styles.tabSwitch} role="group" aria-label="Agrupar producción"><button type="button" className={grouping === "menu" ? styles.tabActive : ""} onClick={() => setGrouping("menu")}>Por menú</button><button type="button" className={grouping === "course" ? styles.tabActive : ""} onClick={() => setGrouping("course")}>Por curso</button></div></div>
          {grouping === "menu" ? (
            <div className={styles.productionRows}>
              <ProductionRow label="Menú del día" value={19 + (added ? 2 : 0)} total={total} />
              <ProductionRow label="Vegetariano" value={9 + (added ? 1 : 0)} total={total} />
              <ProductionRow label="Alternativa especial" value={5 + (added ? 1 : 0)} total={total} />
            </div>
          ) : (
            <div className={styles.productionRows}>
              <ProductionRow label="3° Básico B" value={3 + added} total={total} note={added ? "Incluye DEM-1042" : undefined} />
              <ProductionRow label="2° Básico A" value={7} total={total} />
              <ProductionRow label="5° Básico B" value={6} total={total} />
              <ProductionRow label="Otros cursos" value={17} total={total} />
            </div>
          )}
        </div>

        <aside className={styles.kitchenOrder}>
          <span className={styles.summaryIndex}>Detalle operacional</span>
          <h2>{added ? "DEM-1042" : "Pedido conectado"}</h2>
          {added ? (
            <>
              <p>{identity.student} · {identity.course}</p>
              <dl><div><dt>Raciones semanales</dt><dd>{selectedCount}</dd></div><div><dt>Observación</dt><dd>Sin observaciones</dd></div></dl>
              <Status tone={state.deliveryStatus === "delivered" ? "success" : state.kitchenStatus === "ready" ? "warning" : state.kitchenStatus === "preparing" ? "new" : "neutral"}>{state.deliveryStatus === "delivered" ? "Entregado" : state.kitchenStatus === "ready" ? "Listo · entrega pendiente" : state.kitchenStatus === "preparing" ? "En preparación" : "Confirmado"}</Status>
              {state.kitchenStatus === "confirmed" ? <button type="button" className={styles.primaryButton} onClick={() => setState((current) => ({ ...current, kitchenStatus: "preparing" }))}>Marcar en preparación</button> : null}
              {state.kitchenStatus === "preparing" ? <button type="button" className={styles.primaryButton} onClick={() => setState((current) => ({ ...current, kitchenStatus: "ready" }))}>Marcar listo para entrega <Check aria-hidden="true" /></button> : null}
              {state.kitchenStatus === "ready" && state.deliveryStatus === "pending" ? <div className={styles.deliveryStage}><QrCode aria-hidden="true" /><div><strong>Entrega demostrada con QR</strong><p>Simula la lectura del código del estudiante para identificar el pedido.</p></div><button type="button" className={styles.primaryButton} onClick={() => setState((current) => ({ ...current, deliveryStatus: "scanned" }))}><ScanLine aria-hidden="true" /> Simular lectura de QR</button></div> : null}
              {state.deliveryStatus === "scanned" ? <div className={styles.deliveryStage}><Check aria-hidden="true" /><div><strong>Identidad ficticia encontrada</strong><p>{identity.student} · pedido DEM-1042 · listo para entregar.</p></div><button type="button" className={styles.primaryButton} onClick={() => setState((current) => ({ ...current, deliveryStatus: "delivered" }))}>Confirmar entrega <Check aria-hidden="true" /></button></div> : null}
              {state.deliveryStatus === "delivered" ? <button type="button" className={styles.secondaryButton} onClick={() => setState((current) => ({ ...current, role: "parent", parentStep: "success" }))}>Ver estado como Apoderado</button> : null}
              <div className={styles.deliveryConfig}><strong>Logística configurable</strong><p>Esta demo usa QR. En cada implementación se puede acordar ticket impreso, búsqueda manual, listado por curso o conservar el flujo actual del casino.</p></div>
            </>
          ) : (
            <div className={styles.kitchenEmpty}><ChefHat aria-hidden="true" /><p>Completa el recorrido del Apoderado para ver el pedido dentro de la planificación de esta jornada ficticia.</p><button type="button" className={styles.secondaryButton} onClick={() => setState((current) => ({ ...current, role: "parent" }))}>Crear pedido</button></div>
          )}
        </aside>
      </div>
    </section>
  );
}

function ProductionRow({ label, value, total, note }: { label: string; value: number; total: number; note?: string }) {
  return <div><span><strong>{label}</strong>{note ? <small>{note}</small> : null}</span><i><b style={{ width: `${Math.max(8, (value / total) * 100)}%` }} /></i><em>{value}</em></div>;
}

function PageHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <div className={styles.pageHeading}><div><p className={styles.eyebrow}>{eyebrow}</p><h1>{title}</h1></div><p>{copy}</p></div>;
}
