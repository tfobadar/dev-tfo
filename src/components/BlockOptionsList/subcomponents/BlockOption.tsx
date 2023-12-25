import renderRichText from '@/helpers/renderRichText';
import { StoryblokComponentProps } from '@/types/component';
import { Box } from '@chakra-ui/react';

export default function BlockOption({
  blok,
  submitSelection,
  referrRewardAmount,
}: StoryblokComponentProps & {
  submitSelection: (type: string) => void;
  referrRewardAmount?: string;
}) {
  return (
    <Box
      borderRadius={'4px'}
      bg={'gray.850'}
      p={8}
      fontSize={'lg'}
      fontWeight={'normal'}
      border={'1px solid'}
      borderColor={'transparent'}
      _hover={{ borderColor: 'tfo.primary.500', cursor: 'pointer' }}
      onClick={() => submitSelection(`${blok.type}`)}
    >
      {renderRichText({
        content: blok.title,
        formValues: {
          rewards: `$${referrRewardAmount}`,
        },
      })}
    </Box>
  );
}
