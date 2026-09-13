# IT OT TECH — Next.js + Interactive 3D + GitHub Pages

เบอร์ติดต่อ: **082-270-5941** · อีเมล: **itottech@gmail.com**

ต้นแบบเว็บไซต์บริษัทแบบหลายหน้า ใช้ Next.js App Router, TypeScript, Three.js, React Three Fiber และ Drei ออกแบบตามแนวทางสีขาว/เขียวอมฟ้า/น้ำเงิน/ทองจากแบบที่ตกลงไว้ ฉาก 3D สร้างจาก geometry ในโค้ด ไม่ต้องหาไฟล์โมเดลก่อนเริ่มต้น และไม่ใช่ภาพเสมือนจริงหรือ Digital Twin ที่ต่อข้อมูลสด

## สถานะของชุดโค้ด

เป็น source project ไม่ใช่เว็บไซต์ที่เผยแพร่แล้ว ไม่รวม `node_modules`, `out` หรือ `package-lock.json` ต้องติดตั้งแพ็กเกจก่อนใช้งาน การตรวจที่ทำในสภาพแวดล้อมจัดทำไฟล์: configuration tests และ TypeScript/TSX syntax checks ไม่ใช่การตรวจ type กับ dependencies ทั้งชุดหรือ production build เนื่องจากสภาพแวดล้อมนี้เชื่อมต่อ npm registry ไม่ได้ จึงยังไม่ยืนยัน runtime ของ Next.js/WebGL หรือผล deploy บัญชีจริง กรุณารันคำสั่งตรวจด้านล่างบนเครื่องที่มีอินเทอร์เน็ตก่อนเผยแพร่

## ข้อจำกัดของ GitHub Pages ที่ต้องอ่านก่อนเผยแพร่

GitHub Pages ให้บริการไฟล์ static ไม่ได้รัน Next.js server หลัง deploy โดย GitHub ระบุว่าไม่อนุญาตให้ใช้เป็นบริการโฮสต์ฟรีเพื่อดำเนินธุรกิจออนไลน์ เว็บไซต์อีคอมเมิร์ซ เว็บไซต์ที่มุ่งอำนวยความสะดวกแก่ธุรกรรมเชิงพาณิชย์เป็นหลัก หรือ SaaS เชิงพาณิชย์ อย่าสรุปว่าไม่มีตะกร้าสินค้าแล้วจะได้รับอนุญาตโดยอัตโนมัติ ควรตรวจลักษณะการใช้งานเว็บบริษัทกับเงื่อนไขปัจจุบันหรือสอบถาม GitHub ก่อนนำไปใช้งานจริง

เอกสารทางการ: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits

โค้ดนี้ใช้ static export จึงย้ายผลลัพธ์ `out/` ไปยังโฮสต์ static ที่รองรับการใช้งานทางธุรกิจได้ โดยกำหนด origin/basePath ใหม่และ build อีกครั้ง ไม่ต้องรื้อเว็บใหม่

## 1. โปรแกรมที่ต้องมี

ติดตั้ง Node.js 24, โปรแกรมแก้โค้ด เช่น VS Code และ Git ใช้ Terminal ของ VS Code หรือ Command Prompt บน Windows แล้วตรวจ:

```bash
node --version
npm --version
git --version
```

โปรเจกต์กำหนด Node.js >=22; workflow ใช้ 24 เอกสาร Next.js ที่ตรวจรองรับขั้นต่ำ 20.9 แต่ให้ใช้เวอร์ชันตามโปรเจกต์เพื่อลดความต่างระหว่างเครื่องกับ CI

## 2. เปิดบนเครื่องตัวเอง

แตก ZIP แล้วเปิดโฟลเดอร์ `itot-tech-nextjs` ใน VS Code ต้องเห็น `package.json` อยู่ที่ระดับบนสุด เปิด Terminal ในโฟลเดอร์นั้นแล้วรัน:

```bash
npm install
npm run dev
```

เปิด `http://localhost:3000` หยุดด้วย Ctrl+C เมื่อใช้งานเสร็จ `npm install` ครั้งแรกจะสร้าง `package-lock.json` ให้เก็บและ commit ไฟล์นี้ด้วยเพื่อให้การติดตั้งครั้งต่อไปใช้เวอร์ชันเดิมผ่าน `npm ci`

ไม่ต้องรัน `create-next-app` ซ้ำเมื่อใช้ ZIP นี้ และไม่ต้องอัปโหลด ZIP ทั้งก้อนขึ้น repository ต้องแตกไฟล์ก่อน

Windows: ถ้า PowerShell แจ้ง `npm.ps1 cannot be loaded` ให้ใช้ `npm.cmd install` / `npm.cmd run dev` หรือเปลี่ยน Terminal เป็น Command Prompt โดยไม่จำเป็นต้องผ่อนนโยบายความปลอดภัยทั้งเครื่อง

## 3. ทดสอบ static build ก่อนอัปโหลด

```bash
npm run test:config
npm run typecheck
npm run build
npm run verify:export
npm run preview
```

เปิด URL ที่ Terminal แสดง ปกติคือ `http://localhost:4173` คำสั่ง preview ใช้ static server ขนาดเล็กที่แนบมา ไม่ต้องติดตั้งเพิ่ม และจะอ่าน basePath จากไฟล์ JSON ที่ Next.js สร้างตอน build

ต้องเปิดผ่าน HTTP ไม่ใช่ดับเบิลคลิก `out/index.html` ด้วย file:// และไม่ใช้ `next start` สำหรับ output แบบ export

ทดสอบการเปิดทุกหน้าจาก address bar โดยตรง รวมทั้ง refresh หน้าย่อย ปุ่มเลือกชั้น, หมุนด้วยเมาส์, แยก/ยุบชั้น, ปุ่มลูกศรบนแป้นพิมพ์, มือถือ และ fallback เมื่อไม่มี WebGL

บนจอกว้าง ฉากจะโหลดเมื่ออุปกรณ์รองรับ WebGL2 และไม่ได้ตั้ง reduced motion มือถือและผู้ใช้ reduced motion ต้องกดเปิดฉากเองเพื่อลดการดาวน์โหลดและภาระเครื่อง การหมุนอัตโนมัติเริ่มต้นเป็นปิด และหยุดเมื่อฉากพ้นจอหรือเปลี่ยนแท็บ

## 4. หน้าเว็บไซต์

| URL | เนื้อหา |
|---|---|
| `/` | Hero, Interactive ecosystem, Solutions, โครงการเด่น และช่องทางติดต่อ |
| `/solutions/` | ภาพรวมสามกลุ่มความเชี่ยวชาญ |
| `/solutions/embedded-systems/` | Embedded Systems & Hardware Design |
| `/solutions/industrial-protocols/` | Industrial Protocols & Standardization |
| `/solutions/smart-grid-analytics/` | Smart Grid & Energy Analytics |
| `/technology/` | ฉาก 3D และคำอธิบายความเชื่อมโยงสามชั้น |
| `/projects/` | ภาพรวมตัวอย่างโครงการ |
| `/projects/pea-paro/` | โครงการ PEA-PARO และภาพหน้าจอจาก Company Profile |
| `/about/` | ข้อมูลแนะนำบริษัท |
| `/contact/` | โทรศัพท์ อีเมล Facebook และ R&D Office |

ข้อมูลบริการยึด Company Profile หน้า 5–8; PEA-PARO ยึดหน้า 10–11 ไม่มีการแต่งผลประหยัด รางวัล หรือผลการตรวจรับเพิ่ม ภาพ dashboard เป็นภาพในเอกสาร ไม่ใช่ข้อมูลสด รายละเอียดแหล่งที่มาอยู่ใน `docs/SOURCES.md`

## 5. ตำแหน่งไฟล์ที่แก้บ่อย

```text
itot-tech-nextjs/
├─ .github/workflows/
│  ├─ deploy.yml                   # Build และ deploy เมื่อ push main
│  └─ check.yml                    # ตรวจ pull request ทั้ง root และ subpath
├─ public/images/
│  ├─ logo.png                     # โลโก้ที่สกัดจากไฟล์ของผู้ใช้
│  ├─ pea-paro.webp                 # ภาพโครงการจาก Company Profile
│  └─ pea-paro-dashboard.webp       # ภาพ dashboard จาก Company Profile
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx                 # Header, Footer, metadata
│  │  ├─ page.tsx                   # หน้าแรก
│  │  ├─ globals.css                # สี รูปแบบ ขนาด และ responsive
│  │  ├─ solutions/[slug]/page.tsx  # สร้างสามหน้าย่อยตอน build
│  │  ├─ technology/page.tsx
│  │  ├─ projects/pea-paro/page.tsx
│  │  ├─ about/page.tsx
│  │  ├─ contact/page.tsx
│  │  ├─ sitemap.ts
│  │  ├─ robots.ts
│  │  └─ build-info.json/route.ts   # สร้างไฟล์ JSON ตอน build ไม่ใช่ backend
│  ├─ components/
│  │  ├─ Hero3D.tsx                 # ปุ่มควบคุม, dynamic import, fallback
│  │  ├─ EcosystemCanvas.tsx        # Geometry, กล้อง, แสง, OrbitControls
│  │  └─ ScenePoster.tsx            # ภาพสำรองแบบ HTML/CSS
│  ├─ data/site.ts                  # ข้อมูลบริษัท บริการ และเบอร์ติดต่อ
│  └─ lib/paths.ts                  # URL รูปภาพและ canonical ที่รวม basePath
├─ scripts/                        # Preview และการตรวจไฟล์ที่ export
├─ next.config.mjs
├─ package.json
└─ README_TH.md
```

เบอร์โทรแก้จุดเดียวใน `src/data/site.ts` โดยให้ค่าที่แสดงและลิงก์โทรตรงกัน:

```ts
phone: "082-270-5941",
phoneHref: "tel:+66822705941",
```

แก้สีที่ `:root` ของ `src/app/globals.css` ไม่จำเป็นต้องใช้ Tailwind ในชุดนี้ ส่วนข้อความไทย/อังกฤษยังเป็นเนื้อหาในหน้าเดียว ไม่ใช่ระบบสลับภาษาทั้งเว็บไซต์

## 6. สร้าง GitHub repository

ตัวอย่างใช้ชื่อบัญชี `YOUR_GITHUB_USERNAME` และ repository `itot-tech`:

1. เข้า GitHub แล้วเลือก New repository ตั้งชื่อ `itot-tech`.
2. เลือก Public สำหรับ GitHub Free และอย่าใส่ข้อมูลลับไว้ใน source/ภาพ/ไฟล์ที่อัปโหลด.
3. สร้าง repository ว่าง ไม่ต้องเลือก Add README, .gitignore หรือ License เพราะชุดโค้ดมีไฟล์พร้อมแล้ว.
4. ในโฟลเดอร์โปรเจกต์ที่รัน `npm install` แล้ว ใช้คำสั่งด้านล่าง โดยเปลี่ยนชื่อบัญชีให้เป็นของตนเอง.

```bash
git init
git add .
git commit -m "Initial IT OT TECH website"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/itot-tech.git
git push -u origin main
```

หาก Git ยังไม่รู้จักชื่อผู้สร้าง commit ให้ตั้งชื่อ/อีเมลของคุณเองก่อน ไม่ต้องใส่ตัวอย่างของคนอื่น หากระบบร้องขอให้เข้าสู่บัญชี ให้ใช้ช่องทาง authentication ของ Git/GitHub บนเครื่อง ไม่ใส่รหัสผ่านหรือ token ในโค้ดหรือไฟล์สาธารณะ

`.gitignore` จะกัน `node_modules`, `.next`, `out` และไฟล์ `.env` ไม่ให้ถูก commit แต่จะเก็บ `package-lock.json` ตามปกติ

## 7. เปิด GitHub Pages ด้วย GitHub Actions

ใน repository เปิด **Settings → Pages → Build and deployment → Source → GitHub Actions**

มี workflow มาให้แล้ว ไม่ต้องสร้าง workflow Next.js อีกชุดและไม่ต้องเลือก Deploy from a branch จากนั้นเปิดแท็บ **Actions → Deploy Next.js static site to GitHub Pages → Run workflow** เลือก `main` แล้ว Run อีกครั้ง โดยเฉพาะกรณีการ push ครั้งแรกเกิดก่อนเปิด Pages ซึ่งอาจทำให้รอบแรกหา Pages ไม่พบ

workflow จะติดตั้ง dependencies ตรวจ config/type แล้ว build/upload โฟลเดอร์ `out` และ deploy ผลลัพธ์ URL ดูได้จาก deploy job หรือ Settings → Pages

```text
https://YOUR_GITHUB_USERNAME.github.io/itot-tech/
```

ขั้นตอน deploy ใช้ GITHUB_TOKEN ที่ GitHub จัดให้กับ workflow ไม่ต้องเพิ่ม Personal Access Token ใน source ถ้า environment ต้องรออนุมัติ ให้ผู้มีสิทธิ์อนุมัติใน Actions

## 8. basePath: จุดสำคัญที่สุดของ Project Pages

| รูปแบบ URL | basePath |
|---|---|
| `https://YOUR_NAME.github.io/itot-tech/` | `/itot-tech` |
| `https://YOUR_NAME.github.io/` จาก repository `YOUR_NAME.github.io` | ค่าว่าง |
| โดเมนของคุณเองที่เปิดเว็บไซต์นี้ตรง root | ค่าว่าง |

workflow อ่าน `base_path` และ `origin` จาก `actions/configure-pages` โดยตรง ดังนั้นไม่ต้องใส่ username ในโค้ด เมื่อตั้ง custom domain ให้ตั้ง DNS/Pages ให้ถูกต้องแล้ว build ใหม่ ไม่ต้องใส่ assetPrefix ซ้ำกับ basePath

สำหรับลิงก์ภายใน ใช้ `next/link` แบบนี้ เพราะ Next.js เติม basePath ให้:

```tsx
<Link href="/about/">About</Link>
```

อย่าเติม `/itot-tech` ซ้ำใน Link แต่สำหรับไฟล์ใน `public/`, `next/image`, `fetch` หรือโมเดล `.glb` ต้องใช้ helper:

```tsx
import Image from "next/image";
import { assetPath } from "@/lib/paths";
<Image src={assetPath("images/logo.png")} width={42} height={45} alt="IT OT TECH" />
```

ไฟล์ชื่อ `public/images/logo.png` มี URL เป็น `/images/logo.png` ไม่ใช่ `/public/images/logo.png`

ทดสอบ subpath บน Windows PowerShell:

```powershell
$env:NEXT_PUBLIC_BASE_PATH="/itot-tech"
$env:NEXT_PUBLIC_SITE_ORIGIN="https://YOUR_GITHUB_USERNAME.github.io"
npm run build
npm run verify:export
npm run preview
```

ทดสอบบน macOS/Linux:

```bash
NEXT_PUBLIC_BASE_PATH=/itot-tech NEXT_PUBLIC_SITE_ORIGIN=https://YOUR_GITHUB_USERNAME.github.io npm run build
npm run verify:export
npm run preview
```

เปิด `http://localhost:4173/itot-tech/` ใน PowerShell ลบค่าที่ตั้งไว้ก่อนกลับไป dev ที่ root ด้วย `Remove-Item Env:NEXT_PUBLIC_BASE_PATH` และ `Remove-Item Env:NEXT_PUBLIC_SITE_ORIGIN` หรือปิด Terminal แล้วเปิดใหม่

## 9. ทำไมต้อง Next.js ร่วมกับ Three.js

Next.js ดูแลหน้าเว็บ เมนู การแยก route และสร้าง HTML ตอน build ส่วน Three.js วาด 3D ใน browser React Three Fiber ทำให้เขียน Three.js เป็น React components ได้ และ Drei มี OrbitControls สำหรับหมุนกล้อง ไม่ใช่เฟรมเวิร์กที่ต้องเลือกใช้แทนกัน

`Hero3D.tsx` เป็น Client Component ซึ่งโหลด `EcosystemCanvas` แบบ `dynamic(..., { ssr: false })` เพื่อไม่ให้ WebGL/DOM ทำงานตอน build ส่วนข้อความบริษัทและปุ่มไปหน้าต่าง ๆ ยังคงอยู่ใน HTML ไม่ซ่อนข้อมูลสำคัญไว้ใน canvas

R3F major 9 ใช้กับ React 19; ไม่ควรอัปเดตข้าม major แยกกันโดยไม่ตรวจ compatibility ชุดนี้กำหนด major ที่เข้าคู่กัน แต่การติดตั้งครั้งแรกยังต้อง resolve minor/patch และสร้าง lockfile บนเครื่องที่มีอินเทอร์เน็ต

## 10. ข้อจำกัดและการต่อยอด

ไม่มี Node server บน Pages: ใช้ SSR ต่อ request, Server Actions หรือ API POST สำหรับรับฟอร์มไม่ได้ ชุดนี้จึงใช้ `tel:` และ `mailto:` โดยไม่แสดงข้อความหลอกว่าส่งฟอร์มสำเร็จ ปุ่มอีเมลต้องมีโปรแกรม/บริการอีเมลที่ตั้งค่าไว้บนเครื่องผู้ใช้

การมี 3D และปุ่มที่ทำงานใน browser ไม่ทำให้เว็บไซต์เลิกเป็น static site คำว่า static ในที่นี้หมายถึงไฟล์ที่ส่งจากโฮสต์ ไม่ใช่การห้ามมี JavaScript

ไม่ใส่ API keys หรือข้อมูลระบบจริงใน `NEXT_PUBLIC_*`, JavaScript หรือ `public/` เพราะผู้เข้าชมอ่านได้ ไม่ฝัง analytics, cookie tracker, iframe แผนที่ หรือบริการส่งฟอร์มจากภายนอกไว้โดยอัตโนมัติ

การเพิ่มโมเดลจริงภายหลัง: สร้าง/เตรียมไฟล์ `.glb` ที่มีสิทธิ์ใช้งาน วางใน `public/models/` แล้วโหลดผ่าน `useGLTF(assetPath("models/gateway.glb"))` ของ Drei ต้องปรับขนาด/กล้องและทดสอบ performance บนมือถือ โมเดล CAD ดิบที่ใหญ่ไม่ควรส่งลงเว็บตรง ๆ

## 11. อัปเดตเว็บหลังแก้ไข

```bash
npm run typecheck
npm run build
npm run verify:export
git add .
git commit -m "Update website content"
git push
```

workflow จะ build ใหม่จาก `main` ไม่ต้องอัปโหลด `out` เอง ตรวจ Actions ว่าผ่านทั้ง build และ deploy ก่อนถือว่าอัปเดตสำเร็จ

## 12. ปัญหาที่พบบ่อย

| อาการ | ตรวจจุดนี้ |
|---|---|
| `npm` ไม่รู้จัก | ติดตั้ง Node.js และเปิด Terminal ใหม่ |
| `Cannot find package` | รัน `npm install` ในโฟลเดอร์ที่มี package.json |
| Pages เปิดเป็น 404 | Source เป็น GitHub Actions หรือไม่, deploy สำเร็จหรือไม่, URL รวมชื่อ repo หรือไม่ |
| CSS/รูปไม่ขึ้น | basePath และ assetPath; เปิด Network ดู URL ที่เป็น 404 |
| หน้าย่อย refresh ไม่ได้ | `trailingSlash: true` และต้องมีหน้านั้นใน static export |
| `window is not defined` | Browser API อยู่ใน useEffect/Client Component หรือไม่; 3D ใช้ ssr:false ใน Client Component |
| `Export encountered errors` | อย่าใช้ server-only features; หน้าย่อย dynamic ต้องมี generateStaticParams |
| `npm ci` บอก lockfile ไม่ตรง | รัน npm install ใหม่หลังแก้ package.json แล้ว commit lockfile ที่อัปเดต |
| Pages metadata/permission error | เปิด Pages ก่อน แล้ว Run workflow ใหม่; ตรวจ environment/organization policy |
| มีภาพสำรองแทน 3D | มือถือ/reduced motion ต้องกดเปิด; ตรวจ WebGL2 และ hardware acceleration |
| Browser เปิด mailto แล้วไม่ส่ง | ปุ่มนี้เพียงเปิดโปรแกรมอีเมล ผู้ใช้ต้องส่งอีเมลเอง |

## เอกสารทางการ

- Next.js static export: https://nextjs.org/docs/app/guides/static-exports
- basePath: https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath
- Lazy loading / Client Components: https://nextjs.org/docs/app/guides/lazy-loading
- generateStaticParams: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
- GitHub custom workflows: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- GitHub Pages limits: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- React Three Fiber: https://github.com/pmndrs/react-three-fiber
- Pages metadata: https://github.com/actions/configure-pages/blob/main/action.yml

ตรวจเอกสารสำหรับชุดนี้: 14 กันยายน 2026 การใช้งานจริงให้ตรวจ dependency updates, usage terms, สิทธิ์ในภาพ/โลโก้ และข้อมูลบริษัทอีกครั้ง
