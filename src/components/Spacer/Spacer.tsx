import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import { StoryblokComponentProps } from '@/types/component';
import { Container, Divider, Spacer } from '@chakra-ui/react';

export default function ContentSpacer({ blok }: StoryblokComponentProps) {
  let height = ['80px', '80px', '120px'];
  if (blok.height && blok.heightMobile) {
    height = [
      `${blok.heightMobile}px`,
      `${blok.heightMobile}px`,
      `${blok.height}px`,
    ];
  }
  return (
    <Container id={blok.section_id} maxWidth={MAX_CONTAINER_WIDTH}>
      <Spacer height={height} />
      {blok.showHorizontalLine && <Divider />}
      <Spacer height={height} />
    </Container>
  );
}
