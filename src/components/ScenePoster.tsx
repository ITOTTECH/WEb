/** Lightweight HTML/CSS fallback: available before WebGL loads and without JS. */
export default function ScenePoster() {
  return <div className="scene-poster" aria-label="แผนภาพสามชั้น: ฮาร์ดแวร์ โปรโตคอล และการวิเคราะห์พลังงาน">
    <div className="poster-stack" aria-hidden="true">
      <div className="poster-floor floor-bottom"><b className="cpu" /><i className="node n1" /><i className="node n2" /><i className="node n3" /><em>HARDWARE</em></div>
      <div className="poster-floor floor-middle"><b className="gateway" /><i className="node n1" /><i className="node n2" /><i className="node n3" /><em>PROTOCOLS</em></div>
      <div className="poster-floor floor-top"><b className="tower t1" /><b className="tower t2" /><b className="tower t3" /><span className="poster-chart"><i /><i /><i /><i /></span><em>ANALYTICS</em></div>
    </div>
  </div>;
}
