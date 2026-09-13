# Validation status / สถานะการตรวจสอบ

วันที่จัดทำ: 14 กันยายน 2026

## ตรวจแล้ว

- Node configuration tests: ผ่าน 4 กรณี — root URL, repository subpath, trailing-slash normalization และ invalid prefix rejection.
- TypeScript/TSX syntax-only transpilation: ตรวจ 24 ไฟล์ ไม่พบ syntax diagnostics. **ไม่ใช่ dependency-aware type checking**.
- Node syntax checks: finalize-export.mjs, preview.mjs และ verify-export.mjs ผ่าน.
- YAML: deploy.yml และ check.yml อ่านโครงสร้างได้. การอ่าน YAML ไม่ใช่การรัน GitHub Actions.
- Layout: สร้าง HTML/CSS preview แบบ offline จาก components โดยใช้ตัวแทน React/Next.js แล้ว render ใน Chromium ที่ desktop 1440px และ mobile 390px รวม 10 หน้า × 2 ขนาด = 20 กรณี. ไม่พบ horizontal overflow, broken images หรือจำนวน H1 ผิดใน preview นี้ และตรวจภาพหน้าแรกด้วยสายตา.

## ยังไม่ได้ยืนยัน

สภาพแวดล้อมที่จัดทำไฟล์เชื่อมต่อ npm registry ไม่ได้ จึงยังไม่ได้ติดตั้ง dependency tree, ทำ dependency-aware TypeScript check, รัน production Next.js build หรือทดสอบ WebGL และ React hydration จริง รวมถึงยังไม่ได้ deploy ไปยังบัญชี GitHub ของผู้ใช้. Layout preview ใช้ fallback แบบ HTML/CSS ไม่ใช่ภาพจาก runtime Three.js.

ก่อนเผยแพร่ให้ใช้เครื่องที่เชื่อมต่ออินเทอร์เน็ตแล้วรัน:

```bash
npm install
npm run test:config
npm run typecheck
npm run build
npm run verify:export
npm run preview
```

หลังจากนั้นทดสอบทุก route ด้วยการเปิด URL โดยตรงและ refresh, โหมดมือถือ, การหมุนและเลือกชั้นใน 3D, fallback เมื่อไม่มี WebGL, ลิงก์โทร/อีเมล และ GitHub Pages subpath จริง.

บันทึกและ commit package-lock.json ที่ได้จากการติดตั้งครั้งแรก; workflow จะเลือก npm ci เมื่อมี lock file.
