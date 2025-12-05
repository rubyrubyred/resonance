import { CorpusItem } from './types';

// Table A: Sensation (X-Axis: Desire)
export const SENSATIONS: CorpusItem[] = [
  // Cold (Abstinent)
  { id: 'a1', text: '指尖的静电 (Static on fingertips)', tags: ['cold'] },
  { id: 'a2', text: '被克制的呼吸 (Restrained breath)', tags: ['cold'] },
  { id: 'a3', text: '系到最上一颗的纽扣 (The top button)', tags: ['cold'] },
  { id: 'a4', text: '隔着手套的触碰 (Touch through gloves)', tags: ['cold'] },
  { id: 'a5', text: '0.5秒的视线交汇 (0.5s eye contact)', tags: ['cold'] },
  { id: 'a6', text: '微凉的听诊器 (Cold stethoscope)', tags: ['cold'] },
  
  // Hot (Feverish)
  { id: 'a7', text: '脖颈的咬痕 (Bite mark on nape)', tags: ['hot'] },
  { id: 'a8', text: '缺氧的肺叶 (Hypoxic lungs)', tags: ['hot'] },
  { id: 'a9', text: '纠缠的发丝 (Entangled hair)', tags: ['hot'] },
  { id: 'a10', text: '39.5℃的低烧 (39.5℃ Low fever)', tags: ['hot'] },
  { id: 'a11', text: '耳边的喘息 (Gasp by the ear)', tags: ['hot'] },
  { id: 'a12', text: '汗湿的掌心 (Sweaty palms)', tags: ['hot'] },
];

// Table B: Atmosphere (Y-Axis: Gravity)
export const ATMOSPHERES: CorpusItem[] = [
  // Light (Redemption)
  { id: 'b1', text: '永不落下的太阳 (Eternal sun)', tags: ['light'] },
  { id: 'b2', text: '初雪时的围巾 (Scarf in first snow)', tags: ['light'] },
  { id: 'b3', text: '教堂的钟声 (Church bells)', tags: ['light'] },
  { id: 'b4', text: '唯一的避难所 (The only sanctuary)', tags: ['light'] },
  { id: 'b5', text: '海面的月光 (Moonlight on sea)', tags: ['light'] },
  
  // Dark (Possession)
  { id: 'b6', text: '上锁的房间 (Locked room)', tags: ['dark'] },
  { id: 'b7', text: '金色的鸟笼 (Golden cage)', tags: ['dark'] },
  { id: 'b8', text: '吞噬一切的深海 (Devouring deep sea)', tags: ['dark'] },
  { id: 'b9', text: '揉碎的玫瑰 (Crushed rose)', tags: ['dark'] },
  { id: 'b10', text: '无法逃离的迷宫 (Inescapable maze)', tags: ['dark'] },
];

// Table C: Trace Elements (Universal/Scientific)
export const TRACE_ELEMENTS: string[] = [
  '多巴胺过载 (Dopamine Overload)',
  '吊桥效应 (Suspension Bridge Effect)',
  '量子纠缠 (Quantum Entanglement)',
  '阿芙洛狄忒的诅咒 (Curse of Aphrodite)',
  '巴普洛夫的铃声 (Pavlov\'s Bell)',
  '共犯结构 (Complicity Structure)',
  '费洛蒙风暴 (Pheromone Storm)',
  '非线性时间 (Non-linear Time)',
];

export const TASTING_TEMPLATES = {
  abstinent_redemption: "如同赤脚走在雪原，寒冷中唯一的温度，是神明垂怜的一吻。",
  abstinent_possession: "以理智铸造的锁链，将彼此囚禁在名为‘克制’的玻璃监狱中。",
  feverish_redemption: "在燃烧的废墟中相拥，你是毁灭后的新生，是灰烬里的玫瑰。",
  feverish_possession: "这是一种危险的甜美。如同在悬崖边共舞，即便预见了坠落，也拒绝松开相扣的十指。",
};

// Logic Engine
export const generateResonanceReport = (x: number, y: number) => {
  const isHot = x > 0;
  const isLight = y > 0;

  // Filter pools
  const sensPool = SENSATIONS.filter(i => i.tags.includes(isHot ? 'hot' : 'cold'));
  const atmPool = ATMOSPHERES.filter(i => i.tags.includes(isLight ? 'light' : 'dark'));

  // Pick random
  const sensation = sensPool[Math.floor(Math.random() * sensPool.length)];
  const atmosphere = atmPool[Math.floor(Math.random() * atmPool.length)];
  const trace = TRACE_ELEMENTS[Math.floor(Math.random() * TRACE_ELEMENTS.length)];

  // Determine percentages (randomly distributed around 50/35/15)
  const p1 = Math.floor(45 + Math.random() * 15); // 45-60
  const p2 = Math.floor(25 + Math.random() * 15); // 25-40
  const p3 = 100 - p1 - p2;

  // Select tasting note
  let note = '';
  if (!isHot && isLight) note = TASTING_TEMPLATES.abstinent_redemption;
  else if (!isHot && !isLight) note = TASTING_TEMPLATES.abstinent_possession;
  else if (isHot && isLight) note = TASTING_TEMPLATES.feverish_redemption;
  else note = TASTING_TEMPLATES.feverish_possession;

  return {
    composition: [
      { element: sensation.text, percentage: p1, type: 'sensation' as const },
      { element: atmosphere.text, percentage: p2, type: 'atmosphere' as const },
      { element: trace, percentage: p3, type: 'trace' as const },
    ],
    tastingNote: note,
  };
};
