import { Cards } from '@tfo/mytfo-components';
import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import { SBImage, StoryblokComponentProps } from '@/types/component';
import {
  Box,
  Container,
  Grid,
  useBreakpointValue,
  chakra,
} from '@chakra-ui/react';
import Image from 'next/image';
import renderRichText from '@/helpers/renderRichText';
import { getImageFromStoryblok } from '@/helpers/getImageFromStoryblok';
import { StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { SwiperSlide } from 'swiper/react';
import dynamic from 'next/dynamic';
const TFOSwiper = dynamic(import('@/components/Carousel/TFOSwiper'), {
  ssr: false,
});
const { WithIcon: CardWithIcon } = Cards;
export default function InplOpportunityCards({
  blok,
}: StoryblokComponentProps) {
  const isMobile = useBreakpointValue({ base: true, md: false, lg: false });
  const getCards = () => {
    return blok?.cards?.map(
      (
        card: Record<string, string | StoryblokRichtext | SBImage>,
        index: number,
      ) => {
        const isDescriptionBlurred =
          Array.isArray(card?.blurredFieldList) &&
          card?.blurredFieldList.includes('description')
            ? true
            : false;
        return (
          <SwiperSlide key={`${card.component}-${index}`}>
            <CardWithIcon
              key={`${card.component}-${index}`}
              badge={{
                children: card?.badge as string,
              }}
              image={
                <Image
                  {...getImageFromStoryblok(card?.icon as SBImage)}
                  width={400}
                  height={182}
                  src={
                    `${(card?.icon as SBImage)?.filename}/m/1100x660` as string
                  }
                />
              }
              heading={{
                children: renderRichText({
                  content: card?.heading as StoryblokRichtext,
                }),
                px: 5,
              }}
              subHeading={{
                children: renderRichText({
                  content: card?.subHeading as StoryblokRichtext,
                }),
              }}
              description={{
                children: isDescriptionBlurred ? (
                  <chakra.span>
                    {renderRichText({
                      content:
                        card?.blurredDescriptionLabel as StoryblokRichtext,
                    })}{' '}
                    <chakra.span filter={'blur(5px)'}>
                      {renderRichText({
                        content:
                          card?.blurredDescriptionValue as StoryblokRichtext,
                      })}
                    </chakra.span>
                  </chakra.span>
                ) : (
                  renderRichText({
                    content: card?.description as StoryblokRichtext,
                  })
                ),
                color: 'gray.400',
                mb: 4,
                px: [4, 4, 5],
                fontSize: 'sm',
                noOfLines: 4,
              }}
              wrapperProps={{
                alignItems: 'center',
                textAlign: 'center',
                borderRadius: 'md',
                bg: 'gray.850',
                w: isMobile ? '90% !important' : 'full',
                minH: isMobile ? '380px' : 'auto',
                height: 'full',
              }}
            />
          </SwiperSlide>
        );
      },
    );
  };
  return (
    <Container maxW={MAX_CONTAINER_WIDTH}>
      {isMobile ? (
        <Box
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
              },
            },
          }}
        >
          <TFOSwiper slidesPerView={1.3} slidesPerGroup={1}>
            {getCards()}
          </TFOSwiper>
        </Box>
      ) : (
        <Grid gridTemplateColumns={['1fr', '1fr 1fr 1fr']} gridGap={8}>
          {getCards()}
        </Grid>
      )}
    </Container>
  );
}
