# Tech-Vedha-Admin ↔ Tech-Vedha-frontend: linking tree

Every connection between the CMS (`Tech-Vedha-Admin`, port 3000) and the website (`Tech-Vedha-frontend`,
port 3002): configuration, requests, shared contracts and what happens when a link is down.
This file is identical in both repos. Update both copies together.

Paths are written `admin:` or `web:` relative to each repo root.

---

## 1. Topology

```
                         ┌───────────────────────── MySQL (DATABASE_URL) ─────────────────────────┐
                         │ jmt_site_pages · jmt_seo · leads · users · jmt_admin_roles · media ... │
                         └───────────────────────────────────▲────────────────────────────────────┘
                                                             │ Prisma (admin only)
 Editor's browser ──cookie authToken──► Tech-Vedha-Admin (:3000) ──FTPS──► Hostinger media folder
        │                                  │      ▲                          (HOSTINGER_MEDIA_URL)
        │ "Preview" / "View live"          │      │                                   │
        │ (NEXT_PUBLIC_FRONTEND_URL)       │      │ GET  content, SEO, preview drafts  │ https images
        ▼                                  │      │ POST enquiries                     ▼
 Visitor's browser ◄──── HTML ──── Tech-Vedha-frontend (:3002) ◄──────── allowed by MEDIA_HOSTNAMES
                                   ▲       │
                                   │       └─ GET  ADMIN_API_URL/api/...           (server to server)
                                   └───────── POST FRONTEND_URL/api/revalidate      (server to server)
```

- The website never talks to MySQL. It reads everything through the admin's public API.
- All admin ↔ website calls are **server to server**. No browser calls the admin API cross-origin, so CORS
  plays no part in this link.
- A single shared secret, `REVALIDATE_SECRET`, guards every call that changes or reveals anything:
  sent as the `x-revalidate-secret` header.

---

## 2. Environment linking tree

```
REVALIDATE_SECRET ·························· MUST BE THE SAME VALUE ON BOTH SIDES
├─ admin: sends it   → web /api/revalidate             (admin: app/lib/utils/revalidateFrontend.ts)
├─ admin: checks it  ← web reading a preview draft     (admin: app/api/preview/[token]/route.ts)
├─ admin: checks it  ← web posting an enquiry          (admin: app/lib/utils/leadThrottle.ts → hasSharedSecret)
├─ web:   checks it  ← admin revalidate call           (web: app/api/revalidate/route.ts)
└─ web:   sends it   → admin preview + lead endpoints  (web: lib/adminApi.ts → sharedSecret)
   Both sides strip surrounding quotes/spaces (normalizeSecret) and compare in constant time.

Website origin (http://localhost:3002 locally, the https site URL in production)
├─ admin: FRONTEND_URL               → where revalidate POSTs go                (server, read at runtime)
├─ admin: PRODUCTION_URL             → same origin; notified once if equal, also the CORS allow-list
├─ admin: NEXT_PUBLIC_FRONTEND_URL   → "Preview" and "View live" links          (BAKED IN AT BUILD TIME)
└─ web:   SITE_URL                   → canonical URLs, sitemap.xml, robots.txt, Open Graph, JSON-LD

Admin origin (http://localhost:3000 locally, the admin's https URL in production)
└─ web:   ADMIN_API_URL              → base of every content / SEO / preview / enquiry call
          unset in production = no admin calls at all: bundled copy only, enquiries open the email app

Media host
├─ admin: HOSTINGER_MEDIA_URL        → public URL prefix of uploaded files (https://<host>/tech-vedha/media)
└─ web:   MEDIA_HOSTNAMES            → MUST contain <host> of HOSTINGER_MEDIA_URL, or uploaded images are
                                       replaced by the bundled image (web: lib/adminApi.ts → isAllowedImageSrc)
                                       and next/image refuses them (web: next.config.ts → remotePatterns)

Admin only (not part of the link): DATABASE_URL, JWT_SECRET, SMTP_*, ADMIN_NOTIFY_EMAIL, NOTIFY_CC_EMAIL,
HOSTINGER_FTP_*, HOSTINGER_MEDIA_PATH, HOSTINGER_APPLICATIONS_PATH
Web only, optional: NEXT_PUBLIC_CONTACT_EMAIL, NEXT_PUBLIC_CONTACT_PHONE, NEXT_PUBLIC_WHATSAPP_NUMBER
(bundled defaults for Site & Menus; values saved in the admin win)
```

### Values per environment

| Variable | Side | Local | Production |
|---|---|---|---|
| `REVALIDATE_SECRET` | both | same random value | same random value (`openssl rand -hex 32`), new for prod |
| `ADMIN_API_URL` | web | `http://localhost:3000` (default) | `https://<admin project>.vercel.app` |
| `SITE_URL` | web | unset → `http://localhost:3002` | unset → Vercel production domain (automatic); set for a custom domain |
| `MEDIA_HOSTNAMES` | web | `navajowhite-octopus-630288.hostingersite.com` | host of `HOSTINGER_MEDIA_URL` |
| `FRONTEND_URL` | admin | `http://localhost:3002` | `https://<website project>.vercel.app` |
| `NEXT_PUBLIC_FRONTEND_URL` | admin | optional, defaults to `FRONTEND_URL` | optional, defaults to `FRONTEND_URL` (inlined at build) |
| `PRODUCTION_URL` | admin | optional, defaults to `FRONTEND_URL` | optional, defaults to `FRONTEND_URL` |
| `DATABASE_URL` | admin | MySQL URL, `?connection_limit=5` | production MySQL, `?connection_limit=5` |

No trailing slashes on origins (both sides strip them anyway).

`.env` is git-ignored, so the localhost values never reach Vercel: there the values come from
Project → Settings → Environment Variables. Changing one there needs a redeploy.

Guards that catch a wrong production config:
- admin: `next.config.ts` **fails** a Vercel production build when `DATABASE_URL`, `JWT_SECRET` or
  `REVALIDATE_SECRET` is missing, and warns about localhost/missing frontend URLs. On a deployed admin,
  localhost frontend URLs are ignored (admin: `lib/frontendUrl.ts`).
- web: `next.config.ts` **warns** on a production build/start when `ADMIN_API_URL`, `REVALIDATE_SECRET` or
  `SITE_URL` is missing, or when a URL is localhost on Vercel production.

---

## 3. Content linking tree

One JSON document per key in table `jmt_site_pages`. Same keys and locked paths on both sides:
admin: `app/lib/content/site-pages.ts` ↔ web: `lib/content/registry.ts`.

Every page owns ALL of its content: nothing a visitor reads on one page comes from another page's document. Pages
that show the same kind of section (FAQ, "Let's talk" + enquiry form, client stories, service names) each keep their
own copy, so each can be edited on its own. Only contact SETTINGS (email, phone, WhatsApp number) are site-wide.

```
key                 admin editor                              web getter (server/content.ts)  pages using it
├─ site             /dashboard/site-pages/site                getSite()          layout chrome on every page: SEO defaults,
│                                                                                 skip link, logo, header + Services menu,
│                                                                                 "Start a project" pop-up, footer, 404,
│                                                                                 /site-map; contact settings
├─ home             /dashboard/site-pages/home                getHome()          / only
├─ about            /dashboard/site-pages/about               getAbout()         /about only
├─ contact          /dashboard/site-pages/contact             getContact()       /contact only (+ contact settings from site)
├─ services         /dashboard/site-pages/services            getServices()      routing only: which /services/<slug> pages
│                                                                                 exist; names for search-engine JSON-LD
├─ service-apps     /dashboard/site-pages/service-apps        getServicePage()   /services/app-development only
├─ service-marketing /dashboard/site-pages/service-marketing  getServicePage()   /services/digital-marketing only
└─ service-<slug>   /dashboard/site-pages/service-<slug>      getServicePage()   /services/<slug> (services added in the admin)
```

Each page's bundled copy, locked paths and list templates live in its own data file (web: `data/home.ts`,
`data/about.ts`, `data/contact.ts`, `data/service-pages.ts`, `data/custom-service-pages.ts`, `data/services.ts`,
`lib/site.ts`); the admin's editor definition lives in `admin: app/lib/content/site-page-defs/<page>.ts`, with its
cards (`sections`) in page order, top to bottom. Starter copies shared by several pages are copied, never referenced:
`web: data/forms.ts` (enquiry forms, incl. validation messages and the "Enquiry sent" pop-up) and `web: data/stories.ts`.

New service pages (Service catalogue → Added services) start as **drafts**: anyone with "Edit website pages" can build
them and check them with Preview; only users with **"Publish new service pages"** (`pages.publish`: the Super Admin, or
a role they tick it for in Roles) can put one live, take it offline, or rename / remove a live one. The admin enforces
this on save (`admin: app/lib/server/servicePublishing.ts`, `PUT /api/site-pages/services`) and offers a Publish button
on the page editor (`POST /api/site-pages/publish`). The website only shows a published page (or a draft in Preview).

Images: every image on a page is an image field (`{ src, alt, width, height }`, or a path string for story
avatars/photos). In the editor, the **Images** tab lists every image of the page, section by section, with Upload and
Media Library. `web: server/content.ts → guardImages` resets any image whose address is not a site path or a
MEDIA_HOSTNAMES URL to the bundled one.

Per key, the link is:

```
read   web: fetchContent(key)
         └─ GET  ADMIN_API_URL/api/site-pages/client/<key>     public, no secret (content is public anyway)
              admin: app/api/site-pages/client/[key]/route.ts → { page: { content, updatedAt } | null }
         └─ cached under tag  jmt-page-<key>, revalidate 600 s, timeout 10 s
         └─ mergeContent(saved, bundled, locked)  → identical file on both sides
              admin: lib/sitePages/mergeContent.ts ≡ web: lib/content/mergeContent.ts
save   admin: PUT /api/site-pages/<key>  (content.edit)
         └─ normalizeSitePage (same merge) → upsert jmt_site_pages
         └─ POST FRONTEND_URL/api/revalidate { tags: ["jmt-page-<key>"] } + x-revalidate-secret
              web: revalidateTag(tag, { expire: 0 }) + revalidatePath("/", "layout")
reset  admin: DELETE /api/site-pages/<key> → row removed → same revalidate → web shows bundled copy
```

Locked paths (kept from the bundled copy, hidden in the editor; lists containing them keep their length —
enforced by mergeContent on both sides, not only by the editor):

| Key | Locked |
|---|---|
| `site` | `sitemapPage.pages[].path` (the cards point at real pages) |
| `home`, `about`, `contact` | — (nothing locked: every list can be added to, deleted from and reordered) |
| `services` | `items[].id`, `items[].slug` |
| `service-apps`, `service-marketing`, `service-<slug>` | `id` |

Defaults: admin `data/siteContentDefaults.json` is **generated** from web `lib/content/registry.ts`
by `npm run sync:defaults` (admin). Run it after any change to web `data/` or `lib/site.ts`.

---

## 4. Other links

```
SEO & Scripts
├─ admin: /dashboard/seo  (seo.manage / seo.scripts) → table jmt_seo, one row per scope
│    scopes: global, /, /about, /contact, /services/app-development, /services/digital-marketing, /site-map
├─ web:   server/seo.ts → GET ADMIN_API_URL/api/seo/client   (public; enabled scripts, parsed nodes only)
│    cached under tag jmt-seo; layout renders global, each page renders <PageSeo path=…/>
└─ save → revalidate ["jmt-seo"]
   Built-in JSON-LD the site already emits (shown in the admin to avoid duplicates):
   admin: app/lib/content/seo.ts → builtInSchemaTypes  ≡  web: lib/seo.ts usages in app/**/page.tsx

Preview (unsaved edits)
├─ admin editor → POST /api/preview {kind:"site-page", key, content}   (content permission)
│    → in-memory draft, token /^[a-f0-9]{32}$/, 2 h TTL     (admin: app/lib/server/previewStore.ts)
├─ browser opens NEXT_PUBLIC_FRONTEND_URL/api/preview?token=…&path=…
│    web: checks the token with GET ADMIN_API_URL/api/preview/<token>?rev=1 (+ secret)
│    → Draft Mode on, cookie tv-preview, redirect to path (same-site paths only)
├─ web: getPreviewDraft() → GET /api/preview/<token> (+ secret) → draft replaces that key's content
│    only in that browser; never cached
├─ later edits are re-sent under the same token: reload the preview tab to see them
└─ "View live" → /api/preview?exit=1&path=… → Draft Mode off
   Token pattern: admin TOKEN_PATTERN ≡ web PREVIEW_TOKEN_PATTERN (lib/preview.ts)

Enquiries → Leads
├─ web forms: components/home/contact/EnquiryForm.tsx ("homepage"),
│             components/contact/ContactForm.tsx ("contact")
├─ web: app/actions/enquiry.ts (Server Action)
│    → POST ADMIN_API_URL/api/lead/<homepage|contact>  multipart, + secret, + x-site-client-ip
├─ admin: app/lib/server/enquiryLead.ts → handleEnquiry
│    fields: name, phone, email, service (repeatable), otherService, company, city, timeframe, message
│    honeypot: tv_hp_ref  (web: components/ui/Honeypot.tsx) filled → fake success, not saved
│    limits: 5 per IP / 10 min (per instance), 3 per email or phone / 10 min (MySQL)
│    → leads row (leadSource "Homepage — Let's talk" / "Contact page — Start a project")
│    → email to ADMIN_NOTIFY_EMAIL (cc NOTIFY_CC_EMAIL), waits at most 8 s
├─ replies: 200 ok → "sent" state; 400/429 → message shown; anything else → fallback
└─ fallback (admin down, no ADMIN_API_URL or no secret) → visitor's email app opens, pre-filled
   admin: /dashboard/leads (leads.view / leads.manage)

Media
├─ admin: /dashboard/media → FTPS upload to HOSTINGER_MEDIA_PATH → URL HOSTINGER_MEDIA_URL/<file>
│    every upload from an image field goes the same way (Upload button → /api/media → Hostinger)
├─ default pictures: also in the Hostinger media folder (admin: npm run upload:frontend-media), listed in
│    web: data/media.ts (MEDIA map, MEDIA_HOST); the bundled content points at those URLs, so admin previews show them
├─ web: MEDIA_HOST is always an allowed image host (next.config.ts, lib/adminApi.ts) even without MEDIA_HOSTNAMES
└─ web: an image field accepts a site path (/home/…) or https on MEDIA_HOSTNAMES; anything else →
        bundled image (server/content.ts → guardImages, every page)

Manual cache controls (admin)
├─ "Revalidate Cache" on an editor  → POST /api/revalidate      → that screen's tags
└─ "Reset all cache" (cache.reset)   → POST /api/revalidate/all  → every static tag + jmt-page-<all keys>,
                                                                   in chunks of 50 (web accepts ≤ 50,
                                                                   /^[a-z0-9_-]{1,100}$/i)
```

---

## 5. Contracts that must stay in sync

| What | Admin | Website |
|---|---|---|
| Merge logic (identical file) | `lib/sitePages/mergeContent.ts` | `lib/content/mergeContent.ts` |
| Page keys + locked paths | `app/lib/content/site-pages.ts` | `lib/content/registry.ts` |
| Bundled defaults (generated) | `data/siteContentDefaults.json` | `data/*`, `lib/site.ts` |
| Page cache tag `jmt-page-<key>` | `app/lib/utils/cacheTags.ts` → `jmtSitePageTags` | `lib/content/registry.ts` → `contentTag` |
| SEO cache tag `jmt-seo` | `app/lib/utils/cacheTags.ts` → `JMT_SEO_TAG` | `server/seo.ts` → `SEO_TAG` |
| Preview token pattern | `app/lib/server/previewStore.ts` → `TOKEN_PATTERN` | `lib/preview.ts` → `PREVIEW_TOKEN_PATTERN` |
| Preview draft shape | `app/api/preview/[token]/route.ts` | `lib/preview.ts` → `PreviewDraft` |
| Secret normalization | `app/lib/utils/revalidateFrontend.ts` → `normalizeSecret` | `lib/adminApi.ts` → `normalizeSecret` |
| Enquiry fields + honeypot | `app/lib/server/enquiryLead.ts` | the two forms + `components/ui/Honeypot.tsx` |
| Tag limits (≤ 50, pattern) | `app/lib/utils/cacheTags.ts` → `MAX_TAGS_PER_REQUEST` | `app/api/revalidate/route.ts` |
| Built-in JSON-LD list | `app/lib/content/seo.ts` → `builtInSchemaTypes` | `lib/seo.ts` + `app/**/page.tsx` |

The `jmt-` prefix on tags and tables is inherited from the JMT admin. It is only a name, and renaming it
would need a database migration, so it stays.

---

## 6. When a link is down

| Broken link | What the visitor sees | What the editor sees |
|---|---|---|
| Admin down / DB down | Last cached page; after expiry, the bundled copy. Never an error page. | — |
| `ADMIN_API_URL` unset (prod) | Bundled copy only; enquiries open the email app | Saves don't appear on the site |
| Secret mismatch | Content still loads (public read) but edits take up to 10 min; enquiries fall back to email | Save succeeds silently; "Revalidate Cache" toast says "secret mismatch"; Preview says "Invalid preview link" |
| `FRONTEND_URL` wrong | Edits appear within 10 min (cache expiry) | Save succeeds silently; "Revalidate Cache" toast says "unreachable" / "timed out" |
| `NEXT_PUBLIC_FRONTEND_URL` wrong | — | Preview / View live open the wrong host (rebuild the admin after fixing) |
| `MEDIA_HOSTNAMES` missing host | Bundled image instead of the uploaded one | — |
| Bad saved value | Bundled value for that field (merge rejects wrong types/shapes) | — |

---

## 7. Verify the link

```bash
# 1. Secrets match (prints nothing but the result)
cmp <(grep '^REVALIDATE_SECRET=' Tech-Vedha-Admin/.env | cut -d= -f2- | tr -d "\"'") \
    <(grep '^REVALIDATE_SECRET=' Tech-Vedha-frontend/.env | cut -d= -f2- | tr -d "\"'") && echo match

# 2. Website accepts the admin's revalidate call   → {"success":true,...}  (401 = secrets differ)
curl -X POST "$FRONTEND_URL/api/revalidate" -H "Content-Type: application/json" \
  -H "x-revalidate-secret: $REVALIDATE_SECRET" -d '{"tags":["jmt-page-home"]}'

# 3. Admin serves content                          → {"page":null} before the first save, then the document
curl "$ADMIN_API_URL/api/site-pages/client/home"
curl "$ADMIN_API_URL/api/seo/client"

# 4. Defaults in sync (no diff after regenerating)
cd Tech-Vedha-Admin && npm run sync:defaults
```

End to end, after deploying both: save any field in the admin, and the website shows it on the next load.
Preview opens the page with the unsaved change. A test enquiry appears in Leads and sends the alert email.

---

## 8. Known limits

- **Share-image alt text uses the bundled brand copy**: the manifest, favicon monogram and share images read
  Site & menus live, but the share images' `alt` text is fixed at build time from web `lib/site.ts`.
- **Every visible word is an admin field**, including screen-reader labels (`<section>.a11y`) and the words inside
  the drawn mock-ups. Not editable: decorative shapes in illustrations, decorative arrows/glyphs, tool logos on
  service pages (code icons; their names are editable), fallbacks used when a field is left empty, and the
  spam-trap field label (never shown).
- **Adding a service** creates its page; showing it elsewhere (header menu, footer, homepage, About, form choices,
  /site-map) means adding it on each of those pages, because no page reads another page's content.
- **Previews and the per-IP lead limit are in memory**: on serverless or multi-instance hosting they are per
  instance. The per-email/phone limit is in MySQL and always applies.
- **The preview tab does not refresh itself**: reload it to see edits made after opening it.
- **JMT legacy code** (homepage, service pages, menus, blog, packages, applications editors and their APIs)
  is still in the admin, unlinked in the sidebar, and unused by this website.
- **Running the admin in production mode on localhost** (`npm run build && npm start` locally) ignores
  localhost frontend URLs, so revalidation and preview links are disabled. Use `npm run dev` locally.
