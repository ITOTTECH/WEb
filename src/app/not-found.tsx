import Link from "next/link";
export default function NotFound() { return <section className="container page-intro"><p className="eyebrow">404 / PAGE NOT FOUND</p><h1>หน้านี้ยังไม่อยู่<br />ในระบบของเรา</h1><p>ตรวจสอบที่อยู่เว็บไซต์ หรือกลับไปเริ่มต้นที่หน้าแรก</p><Link href="/" className="button">กลับหน้าแรก ↗</Link></section>; }
