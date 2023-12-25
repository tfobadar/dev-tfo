import { useRouter } from 'next/router';

import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import { StoryblokComponentProps } from '@/types/component';
import {
  Box,
  Container,
  Flex,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import renderRichText from '@/helpers/renderRichText';
import LottiePlayer from '@/components/LottiePlayer/LottiePlayer';

const Reveal = dynamic(
  import('@/animations/Reveal').then((mod) => mod.Reveal),
  { ssr: false },
);
export default function CeoQuote({ blok }: StoryblokComponentProps) {
  const router = useRouter();
  const { locale } = router;
  const isDesktopScreen = useBreakpointValue({ base: false, md: true });
  const isMobileScreen = useBreakpointValue({ base: true, md: false });

  return (
    <Container maxWidth={MAX_CONTAINER_WIDTH}>
      <Reveal>
        <Flex
          gap="4"
          alignItems="center"
          direction={{ base: 'column', md: 'row' }}
        >
          <Box
            w="224px"
            h="224px"
            borderRadius="50%"
            order={{ base: 0, md: '1' }}
            background="linear-gradient(152deg, rgba(185, 152, 85, 0.17) 22.61%, rgba(185, 152, 85, 0.00) 62.37%)"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src={blok.photo.filename}
              alt={blok.photo.alt}
              height="196"
              width="196"
              style={{
                borderRadius: '50%',
                objectFit: 'cover',
                objectPosition: 'center',
                height: '196px',
                width: '196px',
              }}
            />
          </Box>
          <Box flex="1" pos="relative" px="5" mt={{ base: '24', md: '0' }}>
            <Box position="absolute" top={{ base: '-55px', md: '-70px' }}>
              {blok?.showAnimation ? (
                <LottiePlayer
                  blok={{ jsonURL: blok?.imageJsonURL, showInMobile: true }}
                  customStyleProps={{
                    width: isMobileScreen ? 32 : 50,
                    height: isMobileScreen ? 32 : 50,
                    transform: isEnglishLanguage(locale)
                      ? 'unset'
                      : 'scale(-1, 1)',
                  }}
                  containerCustomStyleProps={{
                    p: [0, 0, 0, 0],
                  }}
                />
              ) : (
                <Image
                  width={isMobileScreen ? 30 : 45}
                  height={32}
                  src={blok.quoteIcon.filename}
                  alt={blok.quoteIcon.alt}
                  style={{
                    display: 'block',
                    transform: isEnglishLanguage(locale)
                      ? 'unset'
                      : 'rotate(180deg)',
                  }}
                />
              )}
            </Box>

            <Text fontSize={{ base: 'lg', md: '2xl' }} as="span">
              {blok.quote}
            </Text>
            <Image
              src={blok.quoteIcon.filename}
              alt={blok.quoteIcon.alt}
              width={16}
              height={12}
              style={{
                display: 'inline-block',
                position: 'relative',
                top: '5px',
                transform: isEnglishLanguage(locale)
                  ? 'rotate(180deg)'
                  : 'unset',
                insetInlineStart: '10px',
              }}
            />
            <Box mt={{ base: '6', md: '10' }}>
              <Text
                color="#c7c7c7"
                fontSize={{ base: 'xs', md: 'md' }}
                textTransform="uppercase"
              >
                {renderRichText({
                  content: blok?.title,
                })}
              </Text>
            </Box>
          </Box>
        </Flex>
      </Reveal>
    </Container>
  );
}
