import renderRichText from '@/helpers/renderRichText';
import { trackAccordianEvent } from '@/helpers/trackClickEvents';
import {
  AccordionButtonProps,
  AccordionItemProps,
  AccordionPanelProps,
  AccordionProps,
} from '@chakra-ui/accordion';
import { Accordion } from '@tfo/mytfo-components';
import { StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { MouseEvent } from 'react';
interface AccordionGridProps extends AccordionProps {
  accordionItems: { title?: string; description: StoryblokRichtext }[];
  itemProps?: AccordionItemProps;
  buttonProps?: AccordionButtonProps;
  panelProps?: AccordionPanelProps;
  isOpen?: boolean;
}

export default function AccordionGrid({
  accordionItems,
  itemProps = {},
  buttonProps = {},
  panelProps = {},
  isOpen,
  ...rest
}: AccordionGridProps) {
  const getAccordionItems = (
    accordionItems?: { title?: string; description: StoryblokRichtext }[],
  ) => {
    if (!accordionItems || !Array.isArray(accordionItems)) {
      return [];
    }

    return accordionItems.map((item) => ({
      title: item?.title,
      description: renderRichText({ content: item?.description }),
    }));
  };
  const handleAccordianItemClick = (event: MouseEvent<HTMLDivElement>) => {
    const currentTitle =
      event.target instanceof Element
        ? event.target
            .closest('.chakra-accordion__item')
            ?.querySelector('button div')
        : null;
    trackAccordianEvent({ label: `${currentTitle?.textContent}` });
  };
  return (
    <Accordion
      accordionItems={getAccordionItems(accordionItems)}
      defaultIndex={isOpen ? [0] : undefined}
      display="grid"
      gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}
      gap={{ base: '4', md: '8' }}
      alignItems="start"
      itemProps={{
        mb: 0,
        bg: 'gray.850',
        border: '1px solid',
        borderColor: 'gray.750',
        onClick: (event) => handleAccordianItemClick(event),
        ...itemProps,
      }}
      buttonProps={{
        px: '5',
        py: ['4', '10'],
        fontWeight: 'medium',
        fontSize: ['lg', 'xl'],
        ...buttonProps,
      }}
      panelProps={{
        color: 'gray.400',
        textAlign: 'start',
        fontWeight: 'normal',
        fontSize: ['md', 'lg'],
        p: '6',
        pt: '0',
        ...panelProps,
      }}
      {...rest}
    />
  );
}
