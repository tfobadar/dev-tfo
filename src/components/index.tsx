import dynamic from 'next/dynamic';

const Article = dynamic(() => import('./Article'));
const ArticleList = dynamic(() => import('./ArticleList/ArticleList'));
const Articles = dynamic(() => import('./Articles'));
const BreadCrumb = dynamic(() => import('./BreadCrumb/BreadCrumb'));
const TFOButtons = dynamic(() => import('./Buttons/Buttons'));
const CardItem = dynamic(() => import('./Cards/CardItem'));
const Cards = dynamic(() => import('./Cards/Cards'));
const IconWithContent = dynamic(() => import('./Cards/IconWithContent'));
const TopImage = dynamic(() => import('./Cards/TopImage'));
const CardWithReadMore = dynamic(() => import('./Cards/WithReadMore'));
const TFOCarousel = dynamic(() => import('./Carousel/TFOCarousel'));
const TFOSlider = dynamic(() => import('./Carousel/TFOSlider'));
const CeoQuote = dynamic(() => import('./CeoQuote/CeoQuote'));
const CreateAccountBanner = dynamic(
  () => import('./CreateAccountBanner/CreateAccountBanner'),
);
const DiversificationTool = dynamic(() =>
  import('./DiversificationTool/DiversificationTool').then(
    (mod) => mod.DiversificationTool,
  ),
);
const FAQ = dynamic(() => import('./FAQ/FAQ'));
const FeaturedArticle = dynamic(
  () => import('./FeaturedArticle/FeaturedArticle'),
);
const FeatureWithMultiLayoutImages = dynamic(() =>
  import('./Features').then((mod) => mod.FeatureWithMultiLayoutImages),
);
const FeatureWithStatistics = dynamic(() =>
  import('./Features').then((mod) => mod.FeatureWithStatistics),
);
const PartnerAssetManager = dynamic(() =>
  import('./Features').then((mod) => mod.PartnerAssetManager),
);
const FeedBackForm = dynamic(() => import('./Forms/FeedbackForm'));
const GeneralEnquiryForm = dynamic(() => import('./Forms/GeneralEnquiry'));
const ScheduleCallForm = dynamic(() => import('./Forms/ScheduleCall'));
const HearFromExperts = dynamic(
  () => import('./HearFromExperts/HearFromExperts'),
);
const Hero = dynamic(() => import('./Hero/Hero'));
const InsightsCategories = dynamic(
  () => import('./Insights/InsightsCategories'),
);
const InsightsHome = dynamic(() => import('./InsightsHome'));
const OurInvestmentSolutions = dynamic(
  () => import('./OurInvestmentSolutions'),
);
const Page = dynamic(() => import('./Page'));
const PopularArctiles = dynamic(
  () => import('./PopularArticles/PopularArticles'),
);
const AboutUsIntro = dynamic(() =>
  import('./Sections').then((mod) => mod.AboutUsIntro),
);
const ContactOurExperts = dynamic(() =>
  import('./Sections').then((mod) => mod.ContactOurExperts),
);
const CorePrinciples = dynamic(() =>
  import('./Sections').then((mod) => mod.CorePrinciples),
);
const FinancialRegulatoryList = dynamic(() =>
  import('./Sections').then((mod) => mod.FinancialRegulatoryList),
);
const InvestmentReturnSlider = dynamic(() =>
  import('./Sections').then((mod) => mod.InvestmentReturnSlider),
);
const OurGlobalPresence = dynamic(() =>
  import('./Sections').then((mod) => mod.OurGlobalPresence),
);
const TeamMembers = dynamic(() =>
  import('./Sections').then((mod) => mod.TeamMembers),
);
const ContactUsTabs = dynamic(
  () => import('./Sections/ContactUsTabs/ContactUsTabs'),
);
const PortfolioBuilder = dynamic(() => import('./Sections/PortfolioBuilder'));
const ContentSpacer = dynamic(() => import('./Spacer/Spacer'));
const Tabs = dynamic(() => import('./Tabs/Tabs'));
const Title = dynamic(() => import('./Title/Title'));
const WithSideHug = dynamic(() => import('./WithSideHug/WithSideHug'));
const RiskProfliler = dynamic(
  () => import('@/components/RiskProfliler/RiskProfliler'),
);
const RetirementPlanner = dynamic(() => import('./Sections/RetirementPlanner'));
const Inpl = dynamic(() => import('./Sections/Inpl/Inpl'));
const ContactTheTFO = dynamic(() => import('./Sections/Inpl/ContactTheTFO'));
const MediaVideo = dynamic(() => import('./Sections/Inpl/MediaVideo'));
const InplCalculator = dynamic(() => import('./InplCalculator'));
const InplOpportunityCards = dynamic(
  () => import('./Sections/Inpl/InplOpportunityCards'),
);
const DownloadContentForm = dynamic(
  () => import('./Forms/DownloadContentForm'),
);
const FeatureWithSideHugForm = dynamic(
  () => import('./Features/WithSideHugForm/WithSideHugForm'),
);
const InquiryOptions = dynamic(() => import('./InquiryOptions/InquiryOptions'));
const FeatureWithImageAccordion = dynamic(
  () => import('./Features/WithImageAccordion/WithImageAccordion'),
);
const Image = dynamic(() => import('./Image/Image'));
const Simple = dynamic(() => import('./Cards/Simple'));
const Badge = dynamic(() => import('./Badge/Badge'));
const ArticleVideoPlayer = dynamic(
  () => import('./ArticleVideoPlayer/ArticleVideoPlayer'),
);
const Events = dynamic(() => import('./Events'));
const FeatureWithComponents = dynamic(
  () => import('./Features/WithComponents/WithComponents'),
);
const ReferralForm = dynamic(() => import('./Forms/ReferralForm'));
const WhatsAppInviteForm = dynamic(() => import('./Forms/WhatsAppInviteForm'));
const LottiePlayer = dynamic(() => import('./LottiePlayer/LottiePlayer'));
const DynamicContent = dynamic(() => import('./DynamicContent/DynamicContent'));
const BlockOptionsList = dynamic(
  () => import('./BlockOptionsList/BlockOptionsList'),
);
const InvitationsTable = dynamic(
  () => import('./InvitationsTable/InvitationsTable'),
);
const SaveYourSpotForm = dynamic(() => import('./Forms/SaveYourSpotForm'));

const components = {
  page: Page,
  insightsHome: InsightsHome,
  articlesList: Articles,
  articlePage: Article,
  card: TopImage,
  cards: Cards,
  hero: Hero,
  accordion: FAQ,
  featureWithStatistics: FeatureWithStatistics,
  ceoQuote: CeoQuote,
  featureWithMultiLayoutImages: FeatureWithMultiLayoutImages,
  financialRegulatoryList: FinancialRegulatoryList,
  partnerAssetManager: PartnerAssetManager,
  InvestmentSolutions: OurInvestmentSolutions,
  hearFromExpert: HearFromExperts,
  createAccountBanner: CreateAccountBanner,
  contactUs: ContactOurExperts,
  sectionTitle: Title,
  tabs: Tabs,
  contentSpacer: ContentSpacer,
  corePrinciples: CorePrinciples,
  iconWithContent: IconWithContent,
  featureSideHugWithImage: WithSideHug,
  investmentSlider: InvestmentReturnSlider,
  teamMembers: TeamMembers,
  contactUsTabs: ContactUsTabs,
  'card-item': CardItem,
  cardWithReadMore: CardWithReadMore,
  globalPresence: OurGlobalPresence,
  aboutUsIntro: AboutUsIntro,
  carousel: TFOCarousel,
  buttons: TFOButtons,
  insightsCategories: InsightsCategories,
  scheduleACallForm: ScheduleCallForm,
  generalEnquiryForm: GeneralEnquiryForm,
  feedbackForm: FeedBackForm,
  featuredArticle: FeaturedArticle,
  popularArticles: PopularArctiles,
  portfolioBuilder: PortfolioBuilder,
  diversificationTool: DiversificationTool,
  postList: ArticleList,
  breadCrumb: BreadCrumb,
  riskProfiler: RiskProfliler,
  retirementPlanner: RetirementPlanner,
  investNowPayLater: Inpl,
  ContactTheTFO: ContactTheTFO,
  MediaVideo: MediaVideo,
  inplCalculator: InplCalculator,
  inplOpportunityCards: InplOpportunityCards,
  downloadContentForm: DownloadContentForm,
  featureWithSideHugForm: FeatureWithSideHugForm,
  feedbackColumnComponent: InquiryOptions,
  featureWithAccordionImage: FeatureWithImageAccordion,
  image: Image,
  simpleCard: Simple,
  badge: Badge,
  articleVideoPlayer: ArticleVideoPlayer,
  events: Events,
  featureWithComponents: FeatureWithComponents,
  referralForm: ReferralForm,
  whatsappInviteForm: WhatsAppInviteForm,
  lottieAnimation: LottiePlayer,
  blockOptionsList: BlockOptionsList,
  dynamicContent: DynamicContent,
  invitationsTable: InvitationsTable,
  saveYourSpotForm: SaveYourSpotForm,
  slider: TFOSlider,
};

export default components;
