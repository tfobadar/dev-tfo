import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import { getLinkFromStoryblok } from '@/helpers/getLinkFromStoryblok';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import { StoryblokComponentProps } from '@/types/component';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Container } from '@chakra-ui/react';
import { Breadcrumb } from '@tfo/mytfo-components';
import { useRouter } from 'next/router';

type IParams = {
  isContainer?: boolean;
};

export default function BreadCrumb({
  blok,
  isContainer = true,
}: StoryblokComponentProps & IParams) {
  const router = useRouter();

  const Wrapper = isContainer ? Container : Box;
  const breadcrumbItems = blok?.breadCrumbs?.map((item: any) => {
    let href = `${getLinkFromStoryblok(item.href).replace(/\s/g, '-')}`;

    return {
      text: item.text,
      isCurrentPage: item.isCurrentPage,
      href: href.replace(/([^:]\/)\/+/g, '$1'),
    };
  });

  return (
    <Wrapper maxWidth={isContainer ? MAX_CONTAINER_WIDTH : 'full'}>
      <Breadcrumb
        breadcrumbItems={breadcrumbItems}
        separator={
          isEnglishLanguage(router.locale) ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )
        }
      />
    </Wrapper>
  );
}
