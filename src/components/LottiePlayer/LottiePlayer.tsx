import Lottie from 'react-lottie-player';
import { Reveal } from '@/animations/Reveal';
import { Box, Container, useBreakpointValue } from '@chakra-ui/react';
import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import React, { useState, useEffect, useRef } from 'react';
import { StoryblokComponentProps } from '@/types/component';

export default function LottiePlayer({
  blok,
  customStyleProps,
  containerCustomStyleProps,
}: StoryblokComponentProps) {
  const lottieRef = useRef(null);
  const [isLottieVisible, setIsLottieVisible] = useState(false);
  const lottieCustomSize = useBreakpointValue({
    base: { width: 'auto', height: 'auto' },
    xl: { width: '616px', height: '408px' },
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsLottieVisible(true);
          }
        });
      },
      { threshold: 1 },
    );
    if (lottieRef.current) {
      observer.observe(lottieRef.current);
    }
  }, []);

  return (
    <Container maxWidth={MAX_CONTAINER_WIDTH} sx={containerCustomStyleProps}>
      <Reveal>
        <Box
          display={{
            base: blok.showInMobile ? 'block' : 'none',
            md: 'block',
          }}
          ref={lottieRef}
        >
          {isLottieVisible ? (
            <Lottie
              play
              loop={true}
              style={customStyleProps ? customStyleProps : lottieCustomSize}
              {...(blok?.jsonURL
                ? {
                    path: blok?.jsonURL,
                  }
                : {
                    animationData: JSON.parse(blok?.animationJSON),
                  })}
            />
          ) : (
            <Box
              visibility="hidden"
              style={customStyleProps ? customStyleProps : lottieCustomSize}
            />
          )}
        </Box>
      </Reveal>
    </Container>
  );
}
