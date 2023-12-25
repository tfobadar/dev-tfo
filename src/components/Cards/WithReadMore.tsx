import cardWithBorder from '@/constants/cards/card';
import getButtonsListFromStoryblok from '@/helpers/getButtonsListFromStoryblok';
import renderRichText from '@/helpers/renderRichText';
import { useCardWithEqualWidth } from '@/hooks/useCardWithEqualWidth';
import { Card } from '@/types/card';
import { Collapse, HeadingProps, TextProps } from '@chakra-ui/react';
import { Cards } from '@tfo/mytfo-components';
import { useState } from 'react';

const { WithIcon: CardWithIcon } = Cards;

export default function CardWithReadMore({
  blok,
  cardsPerRow,
  gaps,
  wrapperWidth,
}: Card) {
  const { desktop = '4', mobile = '1' } = cardsPerRow ?? {};
  const cardWithEqualWidth = useCardWithEqualWidth({
    desktop,
    mobile,
    gaps,
    wrapperWidth,
  });
  const { wrapperProps: cardWrapperProps } = cardWithBorder;
  const [noOfLines, setNoOfLines] = useState(5);
  const [show, setShow] = useState(false);

  const handleToggle = () => {
    setNoOfLines(!show ? 50 : 5);
    setShow(!show);
  };

  let wrapperProps = {
    ...cardWrapperProps,
    ...cardWithEqualWidth,
  };
  let image = {};
  let headingProps: HeadingProps = { fontSize: 'lg' };
  let descriptionProps: TextProps = {};

  return (
    <CardWithIcon
      wrapperProps={wrapperProps}
      {...image}
      heading={{
        children: renderRichText({ content: blok.heading }),
        ...headingProps,
      }}
      description={{
        children: (
          <Collapse
            startingHeight={95}
            in={show}
            style={{
              textOverflow: 'ellipsis',
              overflow: noOfLines === 5 ? 'initial' : 'hidden',
            }}
          >
            {renderRichText({ content: blok.description })}
          </Collapse>
        ),
        noOfLines,
        ...descriptionProps,
      }}
      buttons={{
        ...getButtonsListFromStoryblok({
          ctas: blok.ctas,
          buttonsProps: [
            {
              onClick: handleToggle,
            },
          ],
          isAlternateText: show,
        }),
      }}
    />
  );
}
