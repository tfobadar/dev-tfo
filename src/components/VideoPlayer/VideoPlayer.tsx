import React, { useState } from 'react';
import { VIDEO_QUERY_PARAMS } from './constants';
import { VideoProps } from '@/types/video';
import Image from 'next/image';
import { Box, useBreakpointValue } from '@chakra-ui/react';
import Loader from '../subcomponents/Spinner/Loader';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getLinkFromStoryblok } from '@/helpers/getLinkFromStoryblok';
const VideoPlayer = (blok: VideoProps) => {
  let boxProps = {};
  const { videoUrl, src, alt, heroBannerLink } = blok;
  const [isPoster, setIsPoster] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { query } = useRouter();

  const handlePosterClick = () => {
    setIsPoster(!isPoster);
  };

  const handleIframeLoading = () => {
    // This delay is required for minimizing flicker
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  if (videoUrl) {
    boxProps = {
      onClick: handlePosterClick,
    };
  }
  const PosterImage = (
    <Image
      className="videoPoster"
      priority={true}
      quality={query?.slug?.includes('unlock-financial-freedom') ? 100 : 75}
      src={src}
      alt={alt}
      width={580}
      height={350}
      style={{
        position: 'relative',
        objectFit: 'cover',
        width: '100%',
        height: '100%',
        zIndex: '2',
        cursor: videoUrl || heroBannerLink ? 'pointer' : 'default',
      }}
    />
  );
  return (
    <>
      <div className="plyr__video-embed" id="player">
        {isPoster ? (
          <Box position="relative" {...boxProps}>
            {blok.showPlayButton && (
              <Image
                src="https://a.storyblok.com/f/234231/27x27/e0410c2281/play-button.svg"
                width={isMobile ? 42 : 124}
                height={isMobile ? 42 : 124}
                alt="play button"
                style={{
                  position: 'absolute',
                  zIndex: 9,
                  top: '39%',
                  left: '45%',
                  cursor: 'pointer',
                }}
              />
            )}
            {heroBannerLink ? (
              <Link
                href={getLinkFromStoryblok(heroBannerLink)}
                target={heroBannerLink?.target || '_self'}
              >
                {PosterImage}
              </Link>
            ) : (
              PosterImage
            )}
          </Box>
        ) : (
          <>
            <Loader isLoading={isLoading} />
            <iframe
              src={`${videoUrl}?${VIDEO_QUERY_PARAMS}`}
              allowFullScreen
              allow="autoplay"
              onLoad={handleIframeLoading}
            ></iframe>
          </>
        )}
      </div>
    </>
  );
};

export default VideoPlayer;
