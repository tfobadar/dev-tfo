import { StoryblokComponentProps } from '@/types/component';
import { storyblokEditable, StoryblokComponent } from '@storyblok/react';

const Page = (props: StoryblokComponentProps) => {
  const { blok } = props;

  return (
    <main {...storyblokEditable(blok)}>
      {blok.body
        ? blok.body.map((blok: any) => (
            <StoryblokComponent blok={blok} key={blok._uid} />
          ))
        : null}
    </main>
  );
};

export default Page;
