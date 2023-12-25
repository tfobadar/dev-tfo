import { contentStyleProps } from '@/constants/modals/solutionsOverlay';
import getButtonsListFromStoryblok from '@/helpers/getButtonsListFromStoryblok';
import { getImageFromStoryblok } from '@/helpers/getImageFromStoryblok';
import renderRichText from '@/helpers/renderRichText';
import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import { Buttons, CategoryDistributionBar, theme } from '@tfo/mytfo-components';
import { ButtonsByLimit } from '@tfo/mytfo-components/lib/types/common';
import Image from 'next/image';

export default function SolutionsOverlay({ content }: any) {
  const { title, heading, icon, content: body, footer } = content ?? {};

  const buttons: ButtonsByLimit = {
    ...getButtonsListFromStoryblok({
      ctas: footer,
      buttonsProps: [
        {
          fontWeight: 'medium',
          fontSize: 'md',
          width: ['full', 'auto', 'auto'],
        },
      ],
    }),
  };

  const barData = content.distributionBarProps.distributionBar.map(
    (barProps: any) => ({
      percentage: barProps.percentage,
      color: barProps.color,
      label: barProps.label,
    }),
  );

  const tag: any = {
    my: '5',
    px: '2.5',
    py: '1.5',
    opacity: 0.8,
    borderRadius: 'base',
    fontWeight: 'medium',
    color: 'contrast.200',
    bg: 'tfo.primary.800',
  };

  return (
    <Flex direction={'column'}>
      {title && (
        <Heading
          fontWeight={'normal'}
          fontSize={'xs'}
          textTransform={'uppercase'}
          letterSpacing={'wider'}
          textAlign={'start'}
          mb={10}
          color={'white'}
        >
          {title}
        </Heading>
      )}

      {content.icon.filename && (
        <Box mb="6">
          <Image {...getImageFromStoryblok(icon)} width={24} height={24} />
        </Box>
      )}

      <Heading textAlign="start" fontSize={'2xl'} fontWeight={'normal'}>
        {heading}
      </Heading>

      <Box display="flex">
        <Text {...tag}>{content.subTitle}</Text>
      </Box>

      <CategoryDistributionBar
        listProps={{
          display: 'flex',
          flexWrap: 'wrap',
          textAlign: 'start',
        }}
        height={6}
        distributionBar={barData}
        showDistributionBar={false}
      />

      <Divider my={8} />

      <Box textAlign={'start'} fontSize="lg" __css={contentStyleProps}>
        {renderRichText({ content: body, removeParagraphTag: false })}
      </Box>

      {footer.length ? (
        <>
          <Divider my={6} />
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Text color={theme.colors.gray['300']} textAlign={['left']}>
              {renderRichText({ content: footer[0].text })}
            </Text>
            <Buttons {...buttons} />
          </Flex>
        </>
      ) : null}
    </Flex>
  );
}
