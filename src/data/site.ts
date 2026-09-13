// Editorial source: IT_OT_TECH-Company_Profile-2026.pdf, pages 3–8, 10–12.
// Phone number overrides the PDF, following the user's explicit instruction.
export const site = {
  name: "IT OT TECH CO., LTD.",
  thaiName: "บริษัท ไอที โอที เทค จำกัด",
  phone: "082-270-5941",
  phoneHref: "tel:+66822705941",
  email: "itottech@gmail.com",
  facebook: "https://www.facebook.com/profile.php?id=61581363568226",
  tagline: "Connecting IT & OT. Engineering smarter energy.",
  description: "ออกแบบอุปกรณ์ เชื่อมต่อระบบ และต่อยอดข้อมูลพลังงาน ด้วยเทคโนโลยี Embedded Systems, DLMS/COSEM และ Smart Grid",
  office: "อาคาร TGGS ชั้น 9 ห้อง 904-1 มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ แขวงวงศ์สว่าง เขตบางซื่อ กรุงเทพมหานคร",
} as const;

export type Solution = {
  slug: string; number: string; short: string; title: string;
  summary: string; intro: string; tags: string[];
  capabilities: { title: string; body: string }[];
};
export const solutions: Solution[] = [
  {
    slug: "embedded-systems", number: "01", short: "Hardware",
    title: "Embedded Systems & Hardware Design",
    summary: "ออกแบบวงจร อุปกรณ์ IoT และเฟิร์มแวร์ เพื่อเชื่อมต่อข้อมูลจากภาคสนาม",
    intro: "พัฒนาระบบสมองกลฝังตัวและฮาร์ดแวร์ ตั้งแต่งานออกแบบแผงวงจร Smart Gateway ไปจนถึงอุปกรณ์เฉพาะทางและเฟิร์มแวร์สำหรับการทำงานของระบบ",
    tags: ["PCB Layout", "Smart Gateways", "RTOS Firmware"],
    capabilities: [
      { title: "PCB Layout & Smart Gateways", body: "ออกแบบและพัฒนาแผงวงจรสำหรับอุปกรณ์ IoT และงานอุตสาหกรรม" },
      { title: "Specialized Hardware", body: "วิจัยและสร้างอุปกรณ์เฉพาะทาง เช่น BLE Optical Probes" },
      { title: "RTOS Firmware", body: "พัฒนาโปรแกรมและเฟิร์มแวร์บนระบบปฏิบัติการแบบเรียลไทม์ เพื่อรองรับการทำงานของอุปกรณ์" },
    ],
  },
  {
    slug: "industrial-protocols", number: "02", short: "Protocols",
    title: "Industrial Protocols & Standardization",
    summary: "เชื่อมต่ออุปกรณ์และระบบสารสนเทศ ด้วยความเข้าใจโปรโตคอลและมาตรฐานอุตสาหกรรม",
    intro: "เชื่อมโยงข้อมูลจากมิเตอร์และอุปกรณ์ภาคสนามสู่ระบบสารสนเทศ โดยให้ความสำคัญกับมาตรฐานการสื่อสาร ความเข้ากันได้ของระบบ และเสถียรภาพในการรับส่งข้อมูล",
    tags: ["DLMS/COSEM", "Enterprise Integration", "Interoperability"],
    capabilities: [
      { title: "DLMS/COSEM", body: "ประยุกต์ใช้มาตรฐาน DLMS/COSEM ในการเชื่อมโยงข้อมูลจากอุปกรณ์วัดพลังงาน" },
      { title: "Enterprise Integration", body: "ออกแบบการเชื่อมต่อข้อมูลระหว่างอุปกรณ์ภาคสนามและระบบสารสนเทศขององค์กร" },
      { title: "Security & Stability", body: "พิจารณาความปลอดภัยและความเสถียรของการรับส่งข้อมูลเป็นส่วนหนึ่งของการออกแบบระบบ" },
    ],
  },
  {
    slug: "smart-grid-analytics", number: "03", short: "Analytics",
    title: "Smart Grid & Energy Analytics",
    summary: "เปลี่ยนข้อมูลการวัดพลังงานให้เป็นข้อมูลประกอบการบริหารจัดการโครงข่ายไฟฟ้า",
    intro: "พัฒนาและเชื่อมโยงระบบ AMI, Head-End System และ Meter Data Management System พร้อมประยุกต์ใช้การวิเคราะห์ข้อมูลพลังงานเพื่อสนับสนุนการทำงานของโครงข่ายไฟฟ้าอัจฉริยะ",
    tags: ["AMI", "HES & MDMS", "Energy Analytics"],
    capabilities: [
      { title: "Advanced Metering Infrastructure", body: "ให้คำปรึกษาและพัฒนาระบบโครงสร้างพื้นฐานการวัดอัจฉริยะ" },
      { title: "Core Systems: HES & MDMS", body: "พัฒนาระบบ Head-End System และ Meter Data Management System สำหรับการจัดการข้อมูลมิเตอร์" },
      { title: "Proactive Energy Analytics", body: "ประมวลผลและวิเคราะห์ข้อมูลพลังงานเชิงรุก เพื่อสนับสนุนการวางแผนและการตัดสินใจ" },
    ],
  },
];
export const project = {
  title: "PEA-PARO",
  subtitle: "Proactive Energy Analytics & Rooftop Optimizer",
  context: "PEA Hackathon 2026",
  summary: "แนวทางการวิเคราะห์ข้อมูลพลังงานเชิงรุก ผสานการพยากรณ์ความต้องการใช้ไฟฟ้าและการบริหารจัดการพลังงานแสงอาทิตย์บนหลังคา",
  area: "Koh Tao Grid",
  goal: "สนับสนุนการบริหารจัดการโครงข่ายไฟฟ้าให้มีความมั่นคง มีประสิทธิภาพ และลดต้นทุน",
};
export const nav = [
  { href: "/solutions/", label: "Solutions" },
  { href: "/technology/", label: "Technology" },
  { href: "/projects/", label: "Projects" },
  { href: "/about/", label: "About" },
] as const;
