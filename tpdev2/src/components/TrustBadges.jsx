import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Terminal } from 'lucide-react';

const BADGES = [
  {
    icon: Truck,
    code: 'LOGISTICS-01',
    title: 'Free Worldwide Dispatch',
    description: 'Complimentary expedited delivery on all orders over $150.'
  },
  {
    icon: RotateCcw,
    code: 'POLICY-02',
    title: '30-Day Evaluation',
    description: 'Full inspection period with unconditional return guarantee.'
  },
  {
    icon: ShieldCheck,
    code: 'HARDWARE-03',
    title: '2-Year Replacement',
    description: 'Complete hardware defect coverage and component warranty.'
  },
  {
    icon: Terminal,
    code: 'RUNTIME-04',
    title: 'Static In-Memory Architecture',
    description: 'Sub-millisecond client execution with zero network dependency.'
  }
];

export default function TrustBadges() {
  return (
    <section className="bg-[#161616] border-b border-[#393939] py-6">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BADGES.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div 
                key={idx} 
                className="bg-[#262626] border border-[#393939] hover:border-[#0f62fe] p-4 transition-colors group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#393939] text-[#8d8d8d] font-mono text-[10px]">
                    <span>// {badge.code}</span>
                    <Icon className="w-4 h-4 text-[#0f62fe] group-hover:scale-110 transition-transform" />
                  </div>
                  <h4 className="text-xs font-bold text-[#f4f4f4] tracking-tight">
                    {badge.title}
                  </h4>
                  <p className="text-xs text-[#c6c6c6] mt-1 font-light leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
