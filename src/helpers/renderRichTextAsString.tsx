import {
  render,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_STRIKE,
  MARK_UNDERLINE,
  MARK_CODE,
  MARK_STYLED,
  MARK_LINK,
  NODE_HEADING,
  NODE_CODEBLOCK,
  NODE_IMAGE,
  NODE_PARAGRAPH,
  NODE_QUOTE,
  NODE_OL,
  NODE_UL,
  NODE_LI,
  NODE_HR,
  NODE_BR,
  StoryblokRichtext,
} from 'storyblok-rich-text-react-renderer';

type IParams = {
  content: StoryblokRichtext;
};
const renderAsString = ({ content }: IParams) => {
  if (typeof content === 'string') {
    return content;
  }
  if (content.content?.[0]?.content?.[0]?.marks) {
    delete content.content?.[0]?.content?.[0]?.marks;
  }

  return render(content, {
    markResolvers: {
      [MARK_BOLD]: (children: any) => children,
      [MARK_ITALIC]: (children: any) => children,
      [MARK_STRIKE]: (children: any) => children,
      [MARK_UNDERLINE]: (children: any) => children,
      [MARK_CODE]: (children: any) => children,
      [MARK_STYLED]: (children: any) => children,
      [MARK_LINK]: (children: any) => children,
    },
    nodeResolvers: {
      [NODE_HEADING]: (children: any) => children,
      [NODE_CODEBLOCK]: (children: any) => children,
      [NODE_PARAGRAPH]: (children: any) => children,
      [NODE_QUOTE]: (children: any) => children,
      [NODE_OL]: (children: any) => children,
      [NODE_UL]: (children: any) => children,
      [NODE_LI]: (children: any) => children,
      [NODE_IMAGE]: () => null,
      [NODE_HR]: (): any => null,
      [NODE_BR]: () => null,
    },
  })
    ?.flat(2)
    ?.filter((str: any) => Boolean(str))
    ?.join(' ');
};

export default renderAsString;
