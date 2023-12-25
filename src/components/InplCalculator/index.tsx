import { StoryblokComponentProps } from '@/types/component';
import dynamic from 'next/dynamic';
const InplCalculatorBasic = dynamic(import('./InplCalculatorBasic'), {
  ssr: false,
});
const InplCalculatorYAYA = dynamic(import('./FlexFund/InplCalculatorYAYA'), {
  ssr: false,
});
export default function InplCalculator({ blok }: StoryblokComponentProps) {
  if (blok?.isFlexFund) {
    return <InplCalculatorYAYA blok={blok} />;
  } else {
    return <InplCalculatorBasic blok={blok} />;
  }
}
