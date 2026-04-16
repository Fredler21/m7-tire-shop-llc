export interface ServiceDetail {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  startingPrice: number;
  icon: string;
  image: string;
  category: string;
  duration: string;
  warranty: string;
  includes: string[];
  faqs: { question: string; answer: string }[];
}

export const SERVICES: ServiceDetail[] = [
  {
    id: '1',
    name: 'Oil Change',
    description: 'Synthetic and specialized oil services using premium filters for engine longevity.',
    fullDescription:
      'Your engine oil is the lifeblood of your vehicle. Our oil change service uses only premium synthetic or conventional oil matched to your manufacturer specifications. We go beyond a simple drain-and-fill — every service includes a comprehensive vehicle health inspection to catch issues before they become costly repairs.',
    startingPrice: 45,
    icon: 'oil_barrel',
    image: '/images/hero-oil-change.png',
    category: 'maintenance',
    duration: '30 – 45 min',
    warranty: '6 months / 6,000 miles',
    includes: [
      'Premium synthetic or conventional oil (up to 5 qts)',
      'OEM-grade oil filter replacement',
      'Tire pressure check and adjustment',
      'All fluid levels inspection (coolant, brake, power steering)',
      'Battery terminal visual inspection',
      'Air filter visual check',
      'Multi-point vehicle health report',
    ],
    faqs: [
      { question: 'How often should I change my oil?', answer: 'Most modern vehicles with synthetic oil need a change every 5,000–7,500 miles. Conventional oil typically requires a change every 3,000–5,000 miles. Your owner\'s manual has the definitive interval for your vehicle.' },
      { question: 'What type of oil do you use?', answer: 'We use premium synthetic, synthetic blend, or conventional oil based on your vehicle\'s manufacturer specification. We carry all major viscosity grades.' },
      { question: 'Do I need an appointment?', answer: 'Walk-ins are welcome, but booking an appointment ensures minimal wait time. You can book online or call us directly.' },
    ],
  },
  {
    id: '2',
    name: 'Tire Services',
    description: 'Precision balancing, rotation, and high-performance tire fitment for ultimate grip.',
    fullDescription:
      'Your tires are the only contact point between your vehicle and the road. Our comprehensive tire services ensure maximum safety, even wear, and peak performance across all driving conditions. From precision mounting to computerized wheel balancing, we treat every tire service with the attention it deserves.',
    startingPrice: 60,
    icon: 'tire_repair',
    image: '/images/hero-tire-services.png',
    category: 'tires',
    duration: '45 – 90 min',
    warranty: 'Workmanship guaranteed',
    includes: [
      'Tire mounting and computerized balancing',
      '4-tire rotation (extends tire life significantly)',
      'Flat repair / plug-and-patch (where repairable)',
      'Wheel alignment angle check',
      'TPMS sensor reset and calibration',
      'Valve stem inspection and replacement',
      'Tread depth measurement across all tires',
    ],
    faqs: [
      { question: 'How often should I rotate my tires?', answer: 'Tire rotation is recommended every 5,000–8,000 miles to promote even wear and extend the life of your tires.' },
      { question: 'Can you fix a flat tire?', answer: 'We can repair most flats that have a puncture in the tread area. Sidewall damage typically requires a replacement. We\'ll inspect and advise you honestly.' },
      { question: 'Do you sell tires as well?', answer: 'Yes — we carry a range of OEM and performance tire brands. Ask our service advisors for current stock and pricing.' },
    ],
  },
  {
    id: '3',
    name: 'Brake Repair',
    description: 'Ceramic and composite pad replacement with full rotor resurfacing available.',
    fullDescription:
      'Brakes are your vehicle\'s most critical safety system. Our certified technicians perform a thorough inspection of the entire braking system before any work is done. We use ceramic and composite pads paired with properly machined or replaced rotors to restore stopping power and eliminate noise.',
    startingPrice: 150,
    icon: 'car_repair',
    image: '/images/hero-car-repair.png',
    category: 'repair',
    duration: '1.5 – 2.5 hrs',
    warranty: '12 months / 12,000 miles',
    includes: [
      'Front or rear brake pad replacement (ceramic/composite)',
      'Rotor inspection with machining or replacement',
      'Brake caliper piston inspection and lubrication',
      'Brake fluid level check and top-off',
      'Brake hardware kit installation',
      'Emergency brake adjustment',
      'Full brake system road test and verification',
    ],
    faqs: [
      { question: 'How do I know if my brakes need replacing?', answer: 'Warning signs include squealing or grinding noises when braking, a pulsating brake pedal, pulling to one side, or a brake warning light on your dashboard.' },
      { question: 'Do you replace front and rear brakes together?', answer: 'Not necessarily. We inspect both axles and only replace what is needed, saving you money. We\'ll give you a clear breakdown of what requires immediate attention vs. monitoring.' },
      { question: 'Is brake fluid included?', answer: 'A brake fluid top-off is included. A full brake fluid flush is available as an add-on service and is recommended every 2–3 years.' },
    ],
  },
  {
    id: '4',
    name: 'Engine Diagnostics',
    description: 'Advanced electronic scans and full system telemetry for modern engine modules.',
    fullDescription:
      'When your check engine light comes on, you need answers — not guesses. Our technicians use professional-grade OBD-II scanners and factory-level diagnostic software to pinpoint exactly what\'s wrong. We provide a detailed written report with a clear repair estimate so you can make an informed decision.',
    startingPrice: 85,
    icon: 'settings_suggest',
    image: '/images/hero-engine-diagnostics.png',
    category: 'diagnostics',
    duration: '45 – 75 min',
    warranty: 'Diagnostic fee waived on repair',
    includes: [
      'Full OBD-II fault code scan (all modules)',
      'Live data stream analysis across all sensors',
      'Manufacturer TSB (Technical Service Bulletin) check',
      'Emissions readiness and I/M monitor status check',
      'Battery and charging system test',
      'Detailed written diagnostic report',
      'Technician consultation with prioritized repair plan',
    ],
    faqs: [
      { question: 'What does the check engine light mean?', answer: 'It can indicate anything from a loose gas cap to a serious engine fault. The only way to know for certain is a proper diagnostic scan — guessing can lead to unnecessary repairs.' },
      { question: 'Is the diagnostic fee applied to repairs?', answer: 'Yes. If you authorize us to perform the recommended repair, the diagnostic fee is waived entirely.' },
      { question: 'Can you diagnose ABS, airbag, or transmission codes?', answer: 'Absolutely. Our scanners cover all vehicle modules including ABS, SRS (airbag), transmission, and body control systems.' },
    ],
  },
  {
    id: '5',
    name: 'Battery Replacement',
    description: 'Load testing, terminal cleaning, and replacement of OEM grade electrical units.',
    fullDescription:
      'A failing battery can leave you stranded without warning. Our battery service goes beyond a simple swap — we perform a full charging system test to make sure your alternator and electrical system are healthy, so your new battery lasts as long as it should.',
    startingPrice: 50,
    icon: 'battery_charging_full',
    image: '/images/hero-battery-replacement.png',
    category: 'parts',
    duration: '30 – 45 min',
    warranty: '6 months / 6,000 miles',
    includes: [
      'Battery load test and cold cranking amps (CCA) check',
      'Alternator output and voltage regulator test',
      'Battery terminal cleaning and anti-corrosion treatment',
      'OEM-spec battery installation (correct group size and CCA)',
      'Computer system re-registration (required on many European vehicles)',
      'Parasitic draw check if battery is draining unexpectedly',
      '6-month battery warranty included',
    ],
    faqs: [
      { question: 'How long does a car battery last?', answer: 'Most batteries last 3–5 years depending on climate, driving habits, and electrical load. Hot climates tend to wear batteries faster than cold ones.' },
      { question: 'Will I lose my radio presets?', answer: 'Some presets may reset when the battery is disconnected. For vehicles that require computer re-registration after a battery swap, we handle this in-house.' },
      { question: 'Can you test my battery without replacing it?', answer: 'Absolutely. If your battery tests healthy, we\'ll tell you — we only recommend replacement when the data shows it\'s necessary.' },
    ],
  },
  {
    id: '6',
    name: 'Body Shop',
    description: 'Precision panel work and factory-spec paint matching for structural integrity.',
    fullDescription:
      'Collision damage or cosmetic imperfections deserve skilled, patient workmanship — not shortcuts. Our body shop technicians are trained in modern repair techniques including dent pulling, panel replacement, and computerized paint color matching to restore your vehicle to its factory appearance.',
    startingPrice: 200,
    icon: 'build',
    image: '/images/hero-body-shop.png',
    category: 'body',
    duration: 'Varies by scope',
    warranty: '12 months on paint and workmanship',
    includes: [
      'Panel dent repair and metal reshaping',
      'Computerized factory-spec paint color matching',
      'Primer coating and surface preparation',
      'UV-resistant clear coat application',
      'Final cut-and-polish for seamless blend',
      'Structural alignment check post-repair',
      'Plastic bumper repair and texturing',
    ],
    faqs: [
      { question: 'Do you work with insurance companies?', answer: 'Yes. We work directly with most major insurance carriers and can assist you with the claims process from estimate to completion.' },
      { question: 'How long will body repairs take?', answer: 'Minor dent repairs can be done same-day. More extensive collision work involving panels and paint can take 2–5 business days depending on parts availability.' },
      { question: 'Can you fix scratches and paint chips?', answer: 'Yes — we offer paint touch-up, scratch removal, and full panel repaints. We\'ll recommend the most cost-effective solution for your specific damage.' },
    ],
  },
];
