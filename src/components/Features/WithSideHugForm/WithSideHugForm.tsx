import JewelleryForm from '@/components/Forms/JewelleryForm';
import { MAX_CONTAINER_WIDTH, WEBINAR_FORM_TYPE } from '@/constants/globals';
import { StoryblokComponentProps } from '@/types/component';
import {
  Container,
  Flex,
  Box,
  useBreakpointValue,
  Divider,
} from '@chakra-ui/react';
import { SbBlokData, StoryblokComponent } from '@storyblok/react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const Reveal = dynamic(
  import('@/animations/Reveal').then((mod) => mod.Reveal),
  { ssr: false },
);
export default function FeatureWithSideHugForm({
  blok,
}: StoryblokComponentProps) {
  const isMobileScreen = useBreakpointValue({ base: true, md: false });
  const typeWebinar = blok.form[0]?.formType === WEBINAR_FORM_TYPE;

  return (
    <Container
      maxWidth={blok?.image?.filename ? 'full' : MAX_CONTAINER_WIDTH}
      id={!isMobileScreen && blok.form[0]?.sectionTitle[0]?.id}
      {...(blok?.image?.filename && {
        p: { md: 0, lg: 0 },
      })}
    >
      <Reveal>
        <Flex
          gap={typeWebinar ? 8 : 'unset'}
          direction={{
            base:
              blok?.image?.filename && blok?.mobileImagePosition === 'top'
                ? 'column-reverse'
                : 'column',
            md:
              blok?.image?.filename && blok?.desktopImagePosition === 'left'
                ? 'row-reverse'
                : 'row',
          }}
        >
          <Box
            width={['full', 'full', '50%']}
            bg={
              blok?.form[0]?.component === 'formWithQ&A' ? 'white' : 'inherit'
            }
          >
            {blok?.form[0]?.component === 'formWithQ&A' ? (
              <Box zIndex={2}>
                <JewelleryForm blok={blok?.form[0]} />
              </Box>
            ) : blok.components ? (
              blok?.components?.map((blok: SbBlokData) => (
                <StoryblokComponent blok={blok} key={blok?._uid} />
              ))
            ) : null}
          </Box>
          {typeWebinar && (
            <>
              {isMobileScreen ? (
                <Divider my={8} />
              ) : (
                <Divider orientation={'vertical'} height="auto" />
              )}
            </>
          )}
          <Flex width={['full', 'full', '50%']}>
            {blok?.image?.filename ? (
              <Image
                src={
                  isMobileScreen
                    ? blok?.mobileImage?.filename
                    : blok?.image?.filename
                }
                alt={blok?.image?.alt}
                height={1138}
                width={1080}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  marginTop: isMobileScreen ? 25 : 0,
                  zIndex: 3,
                  position: 'relative',
                }}
              />
            ) : (
              <StoryblokComponent blok={blok?.form?.[0]} />
            )}
          </Flex>
        </Flex>
      </Reveal>
    </Container>
  );
}
