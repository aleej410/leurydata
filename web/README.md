# DigitalData · Sitio web

Sitio multipágina, optimizado para SEO: cada sección es su propia URL, con
title y meta description únicos, encabezado H1 propio, datos estructurados
(JSON-LD) y enlazado interno entre páginas.

## Mapa del sitio

| Página | Objetivo de búsqueda (criterio propio, sin datos de volumen real) |
|---|---|
| `index.html` | Business Intelligence para PyMEs |
| `el-problema.html` | Por qué mi empresa no aprovecha sus datos |
| `que-analizamos.html` | Auditoría de datos empresarial (los 5 pilares) |
| `el-semaforo.html` | Término de marca — vale la pena posicionarlo propio |
| `como-funciona.html` | Proceso de diagnóstico BI |
| `servicios.html` | Servicios de Business Intelligence (hub) |
| `servicio-diagnostico-bi.html` | Diagnóstico de datos gratis |
| `servicio-suscripcion-acompanamiento.html` | Consultoría BI mensual |
| `servicio-modulos-expansion.html` | Análisis predictivo para pymes |
| `contacto.html` | Conversión — aquí vive el único formulario del sitio |

**Nota honesta:** los objetivos de búsqueda de la tabla son criterio de
redacción SEO, no vienen de una herramienta real de volumen de búsqueda
(Keyword Planner, Ahrefs, Semrush). Si tienes acceso a alguna, vale la pena
afinar título y contenido con datos reales.

## Archivos

```
web/
├── index.html                                  → inicio
├── el-problema.html
├── que-analizamos.html                         → los 5 pilares
├── el-semaforo.html
├── como-funciona.html
├── servicios.html                               → hub de servicios
├── servicio-diagnostico-bi.html
├── servicio-suscripcion-acompanamiento.html
├── servicio-modulos-expansion.html
├── contacto.html                                → único formulario del sitio
├── sitemap.xml
├── robots.txt
├── favicon.svg
├── css/styles.css   → paleta + componentes de página interna (breadcrumbs, etc.)
└── js/main.js       → menú, nav activo, formulario (con guarda), WhatsApp
```

## Decisiones de SEO técnico que tomé

- **Cada página tiene su propio `<title>`, meta description y `<link rel="canonical">`** —
  ninguno se repite entre páginas (verificado).
- **Un solo H1 por página**, alineado con el title de esa página.
- **Datos estructurados (JSON-LD):** `Organization` + `WebSite` en inicio,
  `BreadcrumbList` en las 9 páginas internas, `Service` en las 3 páginas de
  servicio, `HowTo` en cómo-funciona. Todos validados como JSON correcto.
- **Migas de pan** visibles y con schema, para que Google entienda la
  jerarquía del sitio.
- **Enlazado interno con texto descriptivo** (nunca "clic aquí"), incluida
  navegación anterior/siguiente al final de cada artículo — esto reparte
  autoridad entre páginas y le da a Google una ruta clara de rastreo.
- **El formulario vive solo en `contacto.html`** — todas las demás páginas
  enlazan ahí en vez de duplicarlo, evitando contenido repetido.
- **`sitemap.xml` y `robots.txt`** apuntando el uno al otro.

## Antes de indexar en Search Console

- [x] Reemplazar `https://www.leurydata.it.com` por tu dominio real en **las 10
      páginas** (canonical, Open Graph, JSON-LD) y en `sitemap.xml`. Es un
      buen candidato para un buscar-y-reemplazar en todo `web/`.
- [ ] Dar de alta el dominio en Google Search Console y enviar `sitemap.xml`.
- [ ] Validar el marcado de datos estructurados con la
      [Prueba de resultados enriquecidos de Google](https://search.google.com/test/rich-results).

## Antes de publicar

Todo lo configurable está al inicio de [`js/main.js`](js/main.js), en el bloque `CONFIG`:

- [ ] **`WHATSAPP_NUMBER`** — tu número con código de país, solo dígitos.
      Ejemplo para México: `5213312345678`. Hoy tiene `000000000000`.
- [ ] **`EMAIL`** — el correo que se muestra en el pie de página.
      Hoy tiene `CORREO@digitaldata.com`.
- [ ] **`LEAD_WEBHOOK_URL`** *(opcional)* — si quieres guardar cada lead antes de
      abrir WhatsApp. Déjalo vacío si aún no lo tienes; el formulario funciona igual.

Además:

- [ ] Contratar dominio y hosting, y subir la carpeta `web/` completa.
      Sirve cualquier hosting estático: Netlify, Vercel, Hostinger, GoDaddy.
- [ ] Agregar el enlace real de AgInnova si cambia (hoy apunta a
      `https://aginnova.it.com`).
- [ ] Cuando tengas resultados reales, agregar una sección de casos o cifras.
      **A propósito no incluí números inventados** de clientes o retorno: poner
      cifras falsas en un sitio que vende análisis de datos es el peor lugar
      posible para hacerlo.
- [ ] Antes de indexar: revisar el texto de `<meta name="description">` y las
      etiquetas Open Graph, y generar una imagen `og:image` real.

## Cómo verla en tu computadora

Doble clic en `index.html` funciona para revisar el diseño.

Para que el formulario y el menú se comporten igual que en producción, mejor
levantar un servidor local:

```bash
python -m http.server 8000 --directory web
```

Y abrir `http://localhost:8000`.
