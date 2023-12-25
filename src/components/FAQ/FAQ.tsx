import { StoryblokComponentProps } from '@/types/component';
import { Box, Container, useBreakpointValue } from '@chakra-ui/react';
import { Accordion, Button, theme, Features } from '@tfo/mytfo-components';
import { getLinkFromStoryblok } from '@/helpers/getLinkFromStoryblok';
import NextLink from 'next/link';
import renderRichText from '@/helpers/renderRichText';
import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import {
  trackFAQEvent,
  trackAccordianEvent,
  trackButtonEvent,
} from '@/helpers/trackClickEvents';
import renderAsString from '@/helpers/renderRichTextAsString';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { AccordionItems } from '@tfo/mytfo-components/lib/types/accordion';
import { StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import Image from 'next/image';
import { getImageFromStoryblok } from '@/helpers/getImageFromStoryblok';

const { WithImageAccordion } = Features;
const Reveal = dynamic(
  import('@/animations/Reveal').then((mod) => mod.Reveal),
  { ssr: false },
);
export default function FAQ({
  blok,
  featureWithImageAccordion = false,
}: StoryblokComponentProps) {
  const { locale } = useRouter();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const getFaqAccordion = (faqs: any) => {
    return faqs.map((faq: any, idx: number) => {
      const hideLastBorderBottom =
        blok.hideLastBorderBottom && faqs.length - 1 == idx;
      const props: any = {
        accordionItems: [
          {
            title: faq.title,
            description: renderRichText({ content: faq.description }),
          },
        ],
        panelProps: {
          color: theme.colors.gray[400],
          pt: 6,
          pb: 0,
          px: 0,
        },
        itemProps: {
          py: { base: 6, md: 10 },
          pb: hideLastBorderBottom ? '0px !important' : { base: 6, md: 10 },
          m: 0,
        },
        buttonProps: {
          p: 0,
          fontSize: 'lg',
          onClick: () => trackFAQEvent({ label: faq.title }),
        },
        iconProps: {
          display: { base: 'none ', md: 'block' },
        },
        borderBottom: hideLastBorderBottom ? 'none' : '1px solid',
        borderColor: theme.colors.gray[750],
        defaultIndex: faq?.isOpen ? [0] : null,
      };
      return <Accordion key={faq.title} {...props} />;
    });
  };

  const getFeatureWithImageAccordion = (accordionItems: AccordionItems[]) => {
    const accordionImageItems: AccordionItems[] = accordionItems.map(
      (accordionItem) => ({
        title: accordionItem?.title,
        titleActiveIcon: (
          <Image
            // @ts-ignore
            {...getImageFromStoryblok(accordionItem?.titleActiveIcon)}
            height={32}
            width={32}
          />
        ),
        titleInactiveIcon: (
          <Image
            // @ts-ignore
            {...getImageFromStoryblok(accordionItem?.titleInactiveIcon)}
            height={32}
            width={32}
          />
        ),
        description: renderRichText({
          // @ts-ignore
          content: accordionItem?.description as StoryblokRichtext,
        }),
        image: (
          <Image
            // @ts-ignore
            {...getImageFromStoryblok(accordionItem?.image)}
            width={isMobile ? 285 : 302}
            height={isMobile ? 594 : 629}
            objectFit="cover"
          />
        ),
        buttonProps: {
          // @ts-ignore
          onClick: () => {
            const section = document.getElementById(
              `accordion-button-${accordionItem.title}`,
            );
            if (section && isMobile) {
              setTimeout(() => {
                window.scrollTo({
                  top: section?.offsetTop - 120,
                  behavior: 'smooth',
                });
              }, 400);
            }
            trackAccordianEvent({ label: accordionItem?.title || '' });
          },
          px: 0,
          color: 'gray.600',
          fontSize: '18px',
          fontWeight: 'normal',
          _focusVisible: {
            outline: 'none',
          },
          _expanded: {
            color: '#ffffff',
            fontSize: ['18px', '18px', '22px'],
          },
          sx: {
            '& div': {
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
            },
          },
        },
        panelProps: {
          px: 0,
          paddingBottom: '40px',
          color: theme.colors.gray[400],
          gap: '40px',
          display: 'flex',
          flexDirection: 'column',
          borderBottom: `1px solid ${theme.colors.gunmetal[700]}`,
        },
        itemProps: {
          py: { base: '12px', md: '10px' },
          margin: 0,
          id: accordionItem.title,
        },
      }),
    );

    return <WithImageAccordion accordionItems={accordionImageItems} />;
  };

  const getCtaBtn = (btns: any) => {
    return btns?.map((btn: any) => {
      const props: any = {
        children: renderRichText({ content: btn.text }),
        variant: btn.variant,
        as: NextLink,
        size: 'lg',
        fontWeight: isEnglishLanguage(locale) ? 'medium' : 'bold',
        href: getLinkFromStoryblok(btn.link),
        onClick: () => {
          trackButtonEvent({
            label: renderAsString({ content: btn.text }),
            placement: 'middlePage',
          });
        },
      };
      return <Button key={btn.text} {...props} />;
    });
  };

  return (
    <Container maxWidth={MAX_CONTAINER_WIDTH} id={blok?.id}>
      <Reveal>
        <Box
          mb={{ base: 3.5, md: 0 }}
          textAlign={{
            base: 'start',
            md: blok.alignTitle ? blok.alignTitle : 'center',
          }}
        >
          <Box mb="6" fontSize={{ base: '24px', md: '4xl' }}>
            {blok.title as string}
          </Box>
          {blok.description && (
            <Box
              color={theme.colors.gray[400]}
              fontSize={{ base: 'sm', md: 'md' }}
            >
              {renderRichText({ content: blok.description })}
            </Box>
          )}
        </Box>

        {featureWithImageAccordion
          ? getFeatureWithImageAccordion(blok.accordionItems)
          : getFaqAccordion(blok.accordionItems)}

        {blok?.footer.length > 0 ? (
          <Box textAlign="center">
            <Box
              color={theme.colors.gray[400]}
              my={{ base: '10', md: '10' }}
              mt={{ base: '16' }}
            >
              {renderRichText({ content: blok.footer?.[0]?.text })}
            </Box>
            {getCtaBtn(blok.footer?.[0]?.buttons)}
          </Box>
        ) : null}
      </Reveal>
    </Container>
  );
}
