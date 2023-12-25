import { StoryblokComponentProps } from '@/types/component';
import {
  Box,
  Container,
  Flex,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { Cards, Modal } from '@tfo/mytfo-components';
import { PortfolioProps } from '@tfo/mytfo-components/lib/types/cards/portfolio';
import { useRouter } from 'next/router';
import { render } from 'storyblok-rich-text-react-renderer';
import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import { useState } from 'react';
import SolutionsOverlay from './subcomponents/Modals/SolutionsOverlay';
import Image from 'next/image';
import { getImageFromStoryblok } from '@/helpers/getImageFromStoryblok';
import { trackButtonEvent } from '@/helpers/trackClickEvents';
import renderAsString from '@/helpers/renderRichTextAsString';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import TFOSwiper from './Carousel/TFOSwiper';
import { SwiperSlide } from 'swiper/react';
import dynamic from 'next/dynamic';
import { CheckIcon } from '@chakra-ui/icons';

const Reveal = dynamic(
  import('@/animations/Reveal').then((mod) => mod.Reveal),
  { ssr: false },
);
const { Portfolio } = Cards;

export default function OurInvestmentSolutions({
  blok,
}: StoryblokComponentProps) {
  const router = useRouter();
  const { locale } = router;
  const dir = locale == 'en' ? false : true;
  const isMobileScreen = useBreakpointValue({ base: true, md: false });

  const { isOpen, onClose, onOpen } = useDisclosure();
  const [modalContent, setModalContent] = useState(null);

  const getPortfolioCard = (
    portfolios: any,
    wrapWithSwipperSlide: boolean = false,
  ) => {
    return portfolios.map((portfolio: any) => {
      let icon = {};
      let titleIcon = {};
      if (portfolio.icon?.filename) {
        icon = {
          icon: (
            <Image
              {...getImageFromStoryblok(portfolio.icon)}
              width={isMobileScreen ? 52 : 62}
              height={isMobileScreen ? 52 : 62}
              style={{ marginBottom: '17px' }}
            />
          ),
        };
      }

      if (portfolio.titleIcon?.filename) {
        titleIcon = {
          titleIcon: (
            <Image
              {...getImageFromStoryblok(portfolio.titleIcon)}
              width={18}
              height={18}
              style={{ display: 'inline', marginInlineStart: '10px' }}
            />
          ),
        };
      }
      const props: PortfolioProps = {
        ...icon,
        title: {
          children: portfolio.title,
          fontSize: { base: 'xl', sm: '2xl' },
          ...(isEnglishLanguage(locale) && { w: { md: 'min-content' } }),
        },
        ...titleIcon,
        subTitle: portfolio.subTitle,
        badgeProps: {
          bgColor: portfolio?.subTitleBadgeColor,
          fontSize: { base: 'xs', md: '2xs', lg: 'xs' },
        },
        description: portfolio.description,
        cardProps: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          w: { base: 'calc(100% - 16px)', md: 'full' },
          px: 4,
          py: 8,
        },
        distributionBarProps: {
          showDistributionBar: false,
          distributionBar: portfolio?.distributionBarProps
            ?.filter((item: any) => item.label)
            ?.map((barProps: any) => ({
              percentage: barProps.percentage,
              color: barProps.color.color,
              label: barProps.label,
              icon: <CheckIcon color="tfo.primary.500" />,
              subTitlesListStyleProps: {
                alignItems: 'flex-start',
                '&:last-child': {
                  mb: 0,
                },
              },
            })),
          height: 3,
          wrapperProps: {
            fontSize: 'sm',
            mt: 3,
            minH: isEnglishLanguage(locale)
              ? { base: '200px', lg: '150px' }
              : { base: '250px', lg: '150px' },
          },
        },
        buttons: [
          {
            children: render(portfolio.cta[0].text),
            variant: portfolio.cta[0].variant,
            size: 'lg',
            fontWeight: dir ? 'bold' : 'medium',
            fontSize: 'md',
            textDecor: 'none',
            width: portfolio?.cta[0]?.icon?.filename ? 'auto' : 'full',
            ...(portfolio?.cta[0]?.icon?.filename && {
              leftIcon: (
                <Image
                  src={portfolio?.cta[0]?.icon?.filename}
                  alt={portfolio?.cta[0]?.icon?.alt}
                  width={40}
                  height={40}
                />
              ),
            }),
            iconSpacing: '3',
            _hover: {
              bgColor: 'transparent',
            },
            _focus: {
              bgColor: 'transparent',
            },
            onClick: () => {
              trackButtonEvent({
                label: `${portfolio.title}-${renderAsString({
                  content: portfolio.cta[0].text,
                })}`,
                placement: 'middlePage',
              });
              setModalContent({
                ...portfolio.modal?.[0],
                distributionBarProps: {
                  distributionBar: portfolio?.distributionBarProps
                    ?.filter((item: any) => item.modalLabel)
                    ?.map((barProps: any) => ({
                      percentage: barProps.percentage,
                      color: barProps.color.color,
                      label: barProps.modalLabel,
                    })),
                },
                subTitle: portfolio.subTitle,
              });
              onOpen();
            },
          },
        ],
      };

      if (wrapWithSwipperSlide) {
        return (
          <SwiperSlide key={portfolio.title}>
            <Portfolio {...props} />
          </SwiperSlide>
        );
      }
      return <Portfolio key={portfolio.title} {...props} />;
    });
  };

  return (
    <Container maxWidth={MAX_CONTAINER_WIDTH}>
      <Reveal>
        <Box
          className="investmentSolutions"
          sx={{
            '&': {
              '@media screen and (max-width: 48em)': {
                width: '100vw',
                position: 'relative',
                left: '50%',
                right: '50%',
                marginLeft: '-50vw',
                marginRight: '-50vw',
                '& .swiper': {
                  marginStart: '20px !important',
                },
                '.swiper-wrapper': {
                  pointerEvents: 'all',
                },
              },
            },
          }}
        >
          {isMobileScreen ? (
            <TFOSwiper slidesPerGroup={1} slidesPerView={1.3} spaceBetween={0}>
              {getPortfolioCard(blok.PortfolioItems, true)}
            </TFOSwiper>
          ) : (
            <Flex
              display={{ base: 'none', md: 'flex' }}
              gap={{ base: 4, lg: 8 }}
              px={{ base: 4, lg: 0 }}
            >
              {getPortfolioCard(blok.PortfolioItems)}
            </Flex>
          )}
          {modalContent && (
            <Modal
              size={'2xl'}
              isOpen={isOpen}
              onClose={onClose}
              contentProps={{
                pb: 6,
                my: 10,
                maxH: '590px',
                overflowY: 'auto',
              }}
              overlayProps={{ bg: 'rgba(34, 34, 34, 0.5)' }}
              closeButtonProps={{
                marginTop: 6,
                borderRadius: '50%',
                right: isEnglishLanguage(locale) ? 3 : 'unset',
                left: isEnglishLanguage(locale) ? 'unset' : 3,
              }}
              customModalBody={<SolutionsOverlay content={modalContent} />}
            />
          )}
        </Box>
      </Reveal>
    </Container>
  );
}
