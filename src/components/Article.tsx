import formatDate from '@/helpers/formatDate';
import { SBStoryData, StoryblokComponentProps } from '@/types/component';
import { storyblokEditable, StoryblokComponent } from '@storyblok/react';
import { Box, Container, Text, chakra } from '@chakra-ui/react';
import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import renderRichText from '@/helpers/renderRichText';
import ContentSpacer from './Spacer/Spacer';
import getFieldsByComponent from '@/helpers/getFieldsByComponent';
import { useArticleBottomBanner } from '@/hooks/useArticleBottomBanner';
import renderAsString from '@/helpers/renderRichTextAsString';
import {
  ABOUT_FAMILY_OFFICE_TEXT_EN,
  ABOUT_FAMILY_OFFICE_TEXT_AR,
  KEEP_READING_TITLE_EN,
  KEEP_READING_TITLE_AR,
  CATEGORIES,
} from '@/constants/article';
import { useAboutTFOContent } from '@/hooks/useAboutTFOContent';
import { useKeepReadingContent } from '@/hooks/useKeepReadingContent';
import { useRouter } from 'next/router';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import dynamic from 'next/dynamic';
import { useContext, useEffect } from 'react';
import HeaderContext from '@/utils/HeaderContext';
import ArticleVideoPlayer from './ArticleVideoPlayer/ArticleVideoPlayer';

const Reveal = dynamic(
  import('@/animations/Reveal').then((mod) => mod.Reveal),
  { ssr: false },
);
const Article = (props: StoryblokComponentProps) => {
  const { toggleLanguageSwitch } = useContext(HeaderContext);
  const { blok } = props;
  useEffect(() => {
    if (blok.noArabicVersion || blok.noEnglishVersion) {
      toggleLanguageSwitch(false);
    }
    return () => {
      toggleLanguageSwitch(true);
    };
  }, []);

  const { asPath, locale } = useRouter();

  const bottomBannerContent = useArticleBottomBanner();
  const aboutTFOContent = useAboutTFOContent();
  const keepReadingContent = useKeepReadingContent();

  const setCreateAccountBanner = (bottomSection: SBStoryData[]) => {
    const createAccountBanner = getFieldsByComponent({
      list: bottomSection,
      component: 'createAccountBanner',
    });

    createAccountBanner.text = bottomBannerContent.text;
    createAccountBanner.textProps = bottomBannerContent.textProps;
    createAccountBanner.description = bottomBannerContent.description;
    createAccountBanner.buttons[0].text = bottomBannerContent.buttonText;
    createAccountBanner.wrapperProps = bottomBannerContent.wrapperProps;
    createAccountBanner.buttons[0].link.cached_url = `${
      process.env.NEXT_PUBLIC_ARTICLE_SIGN_UP ||
      bottomBannerContent.link?.cached_url
    }`;
    createAccountBanner.buttons[0].link.target = `${bottomBannerContent.link?.target}`;
  };

  const setAboutTFO = (bottomSection: SBStoryData[]) => {
    const aboutTFO = getFieldsByComponent({
      list: bottomSection,
      component: 'sectionTitle',
    });
    const title = renderAsString({ content: aboutTFO?.title });

    if (
      title === ABOUT_FAMILY_OFFICE_TEXT_EN ||
      title === ABOUT_FAMILY_OFFICE_TEXT_AR
    ) {
      aboutTFO.title = aboutTFOContent.title;
      aboutTFO.description = aboutTFOContent.description;
    }
  };

  const setKeepReading = (bottomSection: SBStoryData[]) => {
    const keepReading = getFieldsByComponent({
      list: bottomSection,
      component: 'sectionTitle',
      index: 1,
    });
    const title = renderAsString({ content: keepReading?.title });

    if (title === KEEP_READING_TITLE_EN || title === KEEP_READING_TITLE_AR) {
      keepReading.title = keepReadingContent.title;
    }
  };

  const setArticlesPostList = (bottomSection: SBStoryData[]) => {
    const keepReading = getFieldsByComponent({
      list: bottomSection,
      component: 'postList',
    });

    keepReading.postsPerPageMobile = 1;
    keepReading.currentPostUUID = blok._uid;
  };

  const setBreadCrumb = (topSection: SBStoryData[]) => {
    const slugs = asPath.split('/');
    const slugPartOne = slugs?.[1] || 'insights';
    const slugPartTwo = slugs?.[2];

    const breadcrumb = getFieldsByComponent({
      list: topSection,
      component: 'breadCrumb',
    });
    const sectionTitle = getFieldsByComponent({
      list: topSection,
      component: 'sectionTitle',
    });

    sectionTitle.as = 'h1';

    breadcrumb.breadCrumbs[0].text = isEnglishLanguage(locale)
      ? // @ts-ignore
        CATEGORIES[slugPartOne]?.en
      : // @ts-ignore
        CATEGORIES[slugPartOne]?.ar;

    breadcrumb.breadCrumbs[0].href.url = `/${locale}/${slugPartOne}`;

    breadcrumb.breadCrumbs[1].text = isEnglishLanguage(locale)
      ? // @ts-ignore
        CATEGORIES[slugPartTwo]?.en
      : // @ts-ignore
        CATEGORIES[slugPartTwo]?.ar;
    breadcrumb.breadCrumbs[1].href.url = `/${locale}/${slugPartOne}/${slugPartTwo}`;

    breadcrumb.breadCrumbs[2].text = renderRichText({
      content: sectionTitle.title,
    });
  };

  return (
    <main {...storyblokEditable(blok)}>
      <ContentSpacer
        blok={{
          heightMobile: 38,
          height: 48,
          showHorizontalLine: false,
        }}
      />
      {blok.topSection.length
        ? blok?.topSection?.map((blokItem: any) => {
            // update breadcrumb
            setBreadCrumb(blok.topSection);

            return <StoryblokComponent blok={blokItem} key={blokItem._uid} />;
          })
        : null}
      <Container className="article-content" maxWidth={MAX_CONTAINER_WIDTH}>
        <Reveal>
          {!blok.noTopBannerImage && <ArticleVideoPlayer blok={blok} />}
          <Box>
            {renderRichText({
              content: blok.content,
              removeParagraphTag: false,
              paragraphProps: { marginBottom: 4 },
            })}
          </Box>
        </Reveal>
      </Container>

      {blok.bottomSection
        ? blok.bottomSection?.map((blokItem: any) => {
            // update bottom create account banner
            setCreateAccountBanner(blok.bottomSection);

            // update about TFO
            setAboutTFO(blok.bottomSection);

            // update Keep reading
            setKeepReading(blok.bottomSection);

            // update `postPerPageMobile`
            setArticlesPostList(blok.bottomSection);

            return <StoryblokComponent blok={blokItem} key={blokItem._uid} />;
          })
        : null}
    </main>
  );
};

export default Article;
