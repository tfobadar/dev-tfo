import { Heading, Link, Text, TextProps, chakra } from '@chakra-ui/react';
import NextLink from 'next/link';
import {
  render,
  MARK_LINK,
  NODE_PARAGRAPH,
  StoryblokRichtext,
  NODE_BR,
  NODE_HR,
  NODE_HEADING,
  NODE_UL,
} from 'storyblok-rich-text-react-renderer';
import { trackLinkEvent } from './trackClickEvents';
import ArticleVideoPlayer from '@/components/ArticleVideoPlayer/ArticleVideoPlayer';
import React from 'react';
import { EMAIL_PLACEHOLDER } from '@/constants/globals';
import Badge from '@/components/Badge/Badge';
import CustomUnorderedList from '@/components/UnorderedList/UnorderedList';
import { formValues } from '@/types/contactUs';
import TFOButtons from '@/components/Buttons/Buttons';

type IParams = {
  content: StoryblokRichtext;
  removeParagraphTag?: boolean;
  paragraphProps?: TextProps;
  email?: string;
  bulletsType?: string;
  formValues?: formValues | unknown;
};

export function replacePlaceholder(text: string, values: any) {
  let replacedText = text;
  if (values) {
    Object.entries(values).map(([key, value]) => {
      replacedText = replacedText?.replace(`[${key}]`, `${value}`);
      return replacedText;
    })?.[0];
  }
  return replacedText;
}

export default function renderRichText({
  content,
  removeParagraphTag = true,
  paragraphProps = {},
  email,
  bulletsType,
  formValues,
}: IParams) {
  return render(content, {
    nodeResolvers: {
      // @ts-ignore
      [NODE_PARAGRAPH]: (children) => {
        const modifiedChildren = React.Children.map(children, (child: any) => {
          if (typeof child === 'string') {
            if (formValues) {
              return replacePlaceholder(child, formValues);
            }
            return child.replace(EMAIL_PLACEHOLDER, email ? email : '');
          }
          return child;
        });
        return removeParagraphTag ? (
          <>{modifiedChildren}</>
        ) : (
          <Text {...paragraphProps} color="gray.400">
            {modifiedChildren}
          </Text>
        );
      },
      [NODE_BR]: () => <chakra.br display={['none', 'none', 'block']} />,
      [NODE_HR]: () => <chakra.hr my={12} />,
      [NODE_HEADING]: (children) => (
        <Heading fontSize={['lg', 'lg', '2xl']} fontWeight={'normal'} mb={4}>
          {children}
        </Heading>
      ),
      [NODE_UL]: (children) => {
        return (
          <CustomUnorderedList bulletsType={bulletsType}>
            {children}
          </CustomUnorderedList>
        );
      },
    },
    blokResolvers: {
      ['contentSpacer']: () => <br />,
      // @ts-ignore
      ['articleVideoPlayer']: (props) => <ArticleVideoPlayer blok={props} />,
      // @ts-ignore
      // Badge component is rich text with some style.
      ['badge']: (props) => <Badge blok={props} />,
      // Button Component inside rich text.
      ['buttons']: (props) => (
        <TFOButtons
          // @ts-ignore
          blok={props}
          customProps={{
            display: 'inline-block',
          }}
        />
      ),
    },
    markResolvers: {
      [MARK_LINK]: (children, props) => {
        const { linktype, href, target = '_self' } = props;

        if (linktype === 'email') {
          return <a href={`mailto:${href}`}>{children}</a>;
        }
        return (
          <Link
            as={NextLink}
            href={href}
            target={target}
            onClick={() =>
              trackLinkEvent({
                label: children as string,
                placement: 'middlePage',
              })
            }
          >
            {children}
          </Link>
        );
      },
    },
  });
}
