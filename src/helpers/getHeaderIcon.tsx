import dynamic from 'next/dynamic';

const AboutUsIcon = dynamic(() => import('@/components/Icons/AboutUsIcon'));
const ArticlesIcon = dynamic(() => import('@/components/Icons/ArticlesIcon'));
const BoardMemberIcon = dynamic(
  () => import('@/components/Icons/BoardMemberIcon'),
);
const CareersIcon = dynamic(() => import('@/components/Icons/CareersIcon'));
const DigitalInvestmentIcon = dynamic(
  () => import('@/components/Icons/DigitalInvestmentIcon'),
);
const DiversificationIcon = dynamic(
  () => import('@/components/Icons/DiversificationIcon'),
);
const FinancialOverview = dynamic(
  () => import('@/components/Icons/FinancialOverview'),
);
const InplIcon = dynamic(() => import('@/components/Icons/InplIcon'));
const InsightsOverview = dynamic(
  () => import('@/components/Icons/InsightsOverview'),
);
const InvestmentIcon = dynamic(
  () => import('@/components/Icons/InvestmentIcon'),
);
const KnowledgeHubIcon = dynamic(
  () => import('@/components/Icons/KnowledgeHubIcon'),
);
const LeadershipTeamIcon = dynamic(
  () => import('@/components/Icons/LeadershipTeamIcon'),
);
const ManagementViewIcon = dynamic(
  () => import('@/components/Icons/ManagementViewIcon'),
);
const MarketOutlookIcon = dynamic(
  () => import('@/components/Icons/MarketOutlookIcon'),
);
const MarketPlaceIcon = dynamic(
  () => import('@/components/Icons/MarketPlaceIcon'),
);
const OfficeLocationsIcon = dynamic(
  () => import('@/components/Icons/OfficeLocationsIcon'),
);
const PortfolioBuilderIcon = dynamic(
  () => import('@/components/Icons/PortfolioBuilderIcon'),
);
const PressReleaseIcon = dynamic(
  () => import('@/components/Icons/PressReleaseIcon'),
);
const PrivateMarketIcon = dynamic(
  () => import('@/components/Icons/PrivateMarketIcon'),
);
const RetirementIcon = dynamic(
  () => import('@/components/Icons/RetirementIcon'),
);
const RiskProfilerIcon = dynamic(
  () => import('@/components/Icons/RiskProfilerIcon'),
);
const TailoredIcon = dynamic(() => import('@/components/Icons/TailoredIcon'));
const WebinarsIcon = dynamic(() => import('@/components/Icons/WebinarsIcon'));
const WhatWeOfferIcon = dynamic(
  () => import('@/components/Icons/WhatWeOfferIcon'),
);
const WhitepaperIcon = dynamic(
  () => import('@/components/Icons/WhitepaperIcon'),
);

export const getHeaderIcon = (icon: string) => {
  switch (icon) {
    case 'about-us':
      return <AboutUsIcon />;
    case 'investment-philosophy':
      return <InvestmentIcon />;
    case 'board-members':
      return <BoardMemberIcon />;
    case 'leadership-team':
      return <LeadershipTeamIcon />;
    case 'careers':
      return <CareersIcon />;
    case 'office-locations':
      return <OfficeLocationsIcon />;
    case 'office-locations':
      return <OfficeLocationsIcon />;
    case 'what-we-offer':
      return <WhatWeOfferIcon />;
    case 'tailored-portfolio-solutions':
      return <TailoredIcon />;
    case 'directive-investments':
      return <PrivateMarketIcon />;
    case 'inpl':
      return <InplIcon />;
    case 'digital-investments-platform':
      return <DigitalInvestmentIcon />;
    case 'market-place':
      return <MarketPlaceIcon />;
    case 'financial-overview':
      return <FinancialOverview />;
    case 'portfolio-builder':
      return <PortfolioBuilderIcon />;
    case 'diversification -calculator':
      return <DiversificationIcon />;
    case 'retirement-calculator':
      return <RetirementIcon />;
    case 'risk-profiler':
      return <RiskProfilerIcon />;
    case 'insights-overview':
      return <InsightsOverview />;
    case 'webinars':
      return <WebinarsIcon />;
    case 'management-views':
      return <ManagementViewIcon />;
    case 'articles':
      return <ArticlesIcon />;
    case 'market-outlook':
      return <MarketOutlookIcon />;
    case 'press-release':
      return <PressReleaseIcon />;
    case 'knowledge-hub':
      return <KnowledgeHubIcon />;
    case 'whitepapers':
      return <WhitepaperIcon />;
    default:
      return '';
  }
};
