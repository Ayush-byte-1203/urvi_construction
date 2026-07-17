export const servicesData = {
  residential: {
    id: 'residential',
    iconKey: 'residential',
    title: 'Residential Construction',
    tagline: 'Crafting luxury custom residential developments.',
    desc: 'We construct premium homes tailored to your aspirations. From modern waterfront estates to contemporary urban apartments, we build with focus on longevity, visual charm, and structural resilience.',
    features: ['Custom Luxury Homes', 'Multi-Family Residences', 'High-Rise Apartments'],
    process: ['Architectural Consultation', 'BIM Modelling & Visuals', 'Foundation & Frame Engineering', 'Interior Premium Fit-outs', 'Handover & Warranties'],
    benefits: ['Optimized energy efficiency layouts', 'Customized structural engineering plans', 'Dedicated project manager at site', 'Transparent smart budgeting reports']
  },
  commercial: {
    id: 'commercial',
    iconKey: 'commercial',
    title: 'Commercial Developments',
    tagline: 'High-performance buildings for modern corporations.',
    desc: 'We deliver commercial centers that foster productivity and drive brand value. Our engineering team excels in complex urban structures, multi-tenant properties, and corporate headquarters.',
    features: ['Office Buildings', 'Shopping Plazas', 'Corporate Headquarters'],
    process: ['Feasibility Analysis', 'Zoning & Permits Approval', 'Structural Steel Fabrication', 'Mechanical/HVAC Systems Install', 'Interior Modular Setup'],
    benefits: ['LEED green building compliance', 'Strict timeline adherence schedules', 'Optimized spatial floor utilization plans', 'Multi-layer site security surveillance']
  },
  industrial: {
    id: 'industrial',
    iconKey: 'industrial',
    title: 'Interior Designing',
    tagline: 'Robust infrastructure engineered for processing & manufacture.',
    desc: 'Building heavy-duty manufacturing zones requires deep engineering expertise. We deliver structural frameworks capable of hosting heavy machinery, massive inventory logistics, and safe operations.',
    features: ['Logistics Warehouses', 'Manufacturing Plants', 'Refineries & Power Units'],
    process: ['Civil Foundations Analysis', 'Heavy Steel Framing Assembly', 'Heavy Duty Flooring Layout', 'Utility & Grid Integrations', 'Safety Commissioning Checks'],
    benefits: ['Reinforced high-load capacity flooring', 'Advanced fire safety suppression grids', 'Scalable modular bay expansion options', 'Strict industrial safety standards compliance']
  },
  architecture: {
    id: 'architecture',
    iconKey: 'architecture',
    title: 'Structural/Architectural Consulting',
    tagline: 'Designing spatial systems that inspire human lives.',
    desc: 'Our design branch integrates structural physics with creative art. We manage site evaluations, zoning checks, visual walkthroughs, and material lists before a single brick is laid on site.',
    features: ['Structural Analysis', '3D Visualizations', 'BIM Modelling'],
    process: ['Site Layout Analysis', 'Schematic Spatial Designs', '3D Walkthrough Renderings', 'Engineering Calculations', 'Permits Submission Packages'],
    benefits: ['Photorealistic 3D visual walkthroughs', 'Energy optimization simulation checks', 'Cost-effective structural materials specification', 'Seamless collaboration with site supervisors']
  },
  // renovation: {
  //   id: 'renovation',
  //   iconKey: 'renovation',
  //   title: 'Interior Renovation & Fit-outs',
  //   tagline: 'Transforming existing layouts into premium environments.',
  //   desc: 'Overhaul your spaces without structural bottlenecks. We handle office fit-outs, historical facades restorations, and premium residential modernizations matching current codes.',
  //   features: ['Fit-out Contracting', 'Building Retrofitting', 'Historic Preservation'],
  //   process: ['Demolition & Clearout', 'Structural Reinforcements', 'Utility Retrofitting Work', 'Premium Finishes Application', 'Detailed Quality Inspection'],
  //   benefits: ['Zero-interruption operational phasing schedules', 'Premium acoustic isolation designs', 'Contemporary space planning and materials', 'Updated energy-efficient lighting upgrades']
  // },
  // sustainable: {
  //   id: 'sustainable',
  //   iconKey: 'sustainable',
  //   title: 'Sustainable Construction',
  //   tagline: 'Eco-conscious buildings for a smarter future.',
  //   desc: 'We construct low-impact buildings that use natural light, capture rainfall, and utilize renewable systems. Our engineering choices lower utility bills while preserving environmental integrity.',
  //   features: ['LEED Certification Support', 'Zero-Emission Building', 'Rainwater Harvesting Systems'],
  //   process: ['Solar Orientation Audits', 'Recycled Materials Selection', 'Geothermal/Solar Grid Design', 'Insulation Performance Analysis', 'System Performance Commissioning'],
  //   benefits: ['Up to 40% savings on future energy bills', 'Premium carbon-offset construction certificates', 'Healthier indoor air ventilation cycles', 'High durability eco-friendly materials usage']
  // },
  // pmc: {
  //   id: 'pmc',
  //   iconKey: 'pmc',
  //   title: 'Project Management Consultancy (PMC)',
  //   tagline: 'Millimetric project auditing, cost validation, and site monitoring.',
  //   desc: 'Keep construction parameters completely clear. Our certified project managers run concrete quality tests, review itemized billing quantities, verify supplier deadlines, and provide comprehensive weekly audit updates.',
  //   features: ['Quality Audits & Concrete Testing', 'Vendor & Labor Shifts Coordination', 'Weekly Drone & Photo Reports', 'BOQ Cost Sheets Verifications'],
  //   process: ['Contract Review & Baseline Setup', 'Daily Site Checklists Logging', 'Structural Labs Checks Verification', 'Independent Material Audits', 'Final Handover Auditing Signature'],
  //   benefits: ['Guaranteed zero billing leakage margins', '100% compliance with ISO quality standards', 'Daily live schedule tracking coordinates', 'Complete protection from contractor cost additions']
  // },
  // 'smart-home': {
  //   id: 'smart-home',
  //   iconKey: 'smarthome',
  //   title: 'Smart Home Solutions',
  //   tagline: 'Future-ready automation systems and intelligent control grids.',
  //   desc: 'Turn your villa into an integrated cognitive sanctuary. We design low-voltage home automations including ambient light routing, biometric secure access gates, solar battery grids, and CCTV security meshes.',
  //   features: ['Lighting & HVAC Automations', 'Smart Locks & Biometrics Access', 'Sensor-Triggered Energy Grids', 'Central Low-Voltage Panels Layout'],
  //   process: ['Electrical Conduit Architectural Layout', 'Network Architecture Specification', 'Automation System Integration', 'Control Dashboards Calibration', 'Client Diagnostics Walkthrough'],
  //   benefits: ['Up to 25% optimization in HVAC power consumption', 'Hands-free voice and sensory controls', 'Advanced secure remote surveillance', 'Flexible modular upgrades configurations']
  // },
  // 'material-supply': {
  //   id: 'material-supply',
  //   iconKey: 'material',
  //   title: 'Material Supply Logistics',
  //   tagline: 'Procuring certified raw materials directly from trusted yards.',
  //   desc: 'Eliminate duplicate middleman margins. We source certified cement, Fe 550D rebar steel, vitrified tiles, modular panels, and copper conduits directly from verified factories with fully logged quality certificates.',
  //   features: ['High-Strength Grade-53 Cement', 'TMT Ductile Rebar Steel Spans', 'Flame Retardant PVC Conduits', 'Premium Brand Ceramic sanitary ware'],
  //   process: ['Supplier Selection & Auditing', 'Lab Testing Certification Log', 'Logistics Staging Coordination', 'On-Site Delivery Compression Checks', 'Continuous Supply Pipeline Support'],
  //   benefits: ['Up to 15% cost savings on wholesale supply', 'Zero compromise on material strengths', 'Guaranteed delivery alignment timelines', 'Clear provenance tracing files']
  // },
  // 'plan-approval': {
  //   id: 'plan-approval',
  //   iconKey: 'approval',
  //   title: 'Plan Approval Assistance',
  //   tagline: 'Expedited municipal clearance and structural zoning filing.',
  //   desc: 'Avoid planning clearance delays. We draft and compile complete zoning packages, municipal layouts files, geotech reports files, and sewage clearance files to secure regulatory approvals.',
  //   features: ['Zoning Compliance Checks', 'Soil Geotech Testing Reports', 'Municipal Clearance Coordination', 'Environmental Impacts Assessments'],
  //   process: ['Site Boundary Auditing', 'Document Compilation', 'Municipal Portal Filing', 'Clearance Coordination Logs', 'Certificate Delivery'],
  //   benefits: ['Up to 50% quicker file clearings', 'Ensures 100% legal building status', 'Expert handling of local bylaws issues', 'Comprehensive documentation filing']
  // },
  // 'legal-assistance': {
  //   id: 'legal-assistance',
  //   iconKey: 'legal',
  //   title: 'Legal Documentation & Escrows',
  //   tagline: 'Drafting secure builder agreements and title clearings.',
  //   desc: 'Ensure total contract protection. We conduct deep land title audits, verify builder milestones agreements, structure secure escrows schedules, and handle property registrations smoothly.',
  //   features: ['Land Title History Audits', 'Milestones Agreement Drafting', 'Escrow Account Structuring', 'Official Land Registration Support'],
  //   process: ['Title Search & Verification', 'Contract Clauses Drafting', 'Joint Sign-off Meeting', 'Registration Desk Coordinates', 'Safe Ledger Handover'],
  //   benefits: ['Protects your structural build assets', 'Resolves boundary zoning disputes', 'Guarantees escrow payment safety', 'Clear legal provenance records']
  // }
};
