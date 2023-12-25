import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import renderRichText from '@/helpers/renderRichText';
import { trackTabClickEvent } from '@/helpers/trackClickEvents';
import { StoryblokComponentProps } from '@/types/component';
import { Box, BoxProps, Container, TabListProps } from '@chakra-ui/react';
import { ISbStoryData, StoryblokComponent } from '@storyblok/react';
import { Tabs } from '@tfo/mytfo-components';
import { TabsList } from '@tfo/mytfo-components/lib/types/tabs';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import TabsContext from '@/utils/TabsContext';
import dynamic from 'next/dynamic';
import { formValues } from '@/types/contactUs';
import ReferralFormContext from '@/utils/ReferralFormContext';

const Reveal = dynamic(
  import('@/animations/Reveal').then((mod) => mod.Reveal),
  { ssr: false },
);
type IParams = {
  tabListProps?: TabListProps;
  tabListWrapperProps?: BoxProps;
};

export default function TabsComponent({
  blok,
  tabListProps,
  tabListWrapperProps,
  ...rest
}: IParams & StoryblokComponentProps) {
  const router = useRouter();
  const { updateData } = useContext(TabsContext);
  const [referralData, setReferralData] = useState<formValues>();

  const updateReferralData = (newValue: formValues) => {
    setReferralData(newValue);
  };
  const tabs = blok.tabItem
    ?.filter((tab: ISbStoryData & { [key: string]: any }) => !tab?.hideTab)
    ?.map(
      (tab: ISbStoryData & { [key: string]: any }, index: number): TabsList => {
        return {
          tab: {
            title: tab.name,
            tabProps: {
              h: 'auto',
              bg: 'transparent',
              fontSize: ['sm', 'md'],
              paddingX: 3,
              paddingY: 2,
              border: '1px solid',
              borderColor: 'gunmetal.600',
              _selected: {
                bg: 'gunmetal.600',
              },
              _hover: {
                bg: 'gunmetal.600',
              },
              onClick: () => {
                // this is required for pages that have pagination
                // this resets the url to pathname
                // eg: /insights/articles?page=5 => /insights/articles
                router.replace(window.location.pathname, undefined, {
                  shallow: true,
                });

                trackTabClickEvent({
                  label: tab.name,
                  placement: 'middlePage',
                });
                updateData(index);
              },
            },
          },

          tabPanel: {
            body: (
              <>
                <Container
                  maxWidth={MAX_CONTAINER_WIDTH}
                  textAlign={['start', 'start', 'center']}
                >
                  {renderRichText({
                    content: tab.body,
                    removeParagraphTag: false,
                  })}
                </Container>
                {tab.components?.map(
                  (
                    component: ISbStoryData & { component: string },
                    index: number,
                  ) => {
                    return (
                      <Box key={`${component.component}-${index}`}>
                        {blok?.preserveFormValues ? (
                          <ReferralFormContext.Provider
                            value={{ referralData, updateReferralData }}
                          >
                            <StoryblokComponent blok={component} {...rest} />
                          </ReferralFormContext.Provider>
                        ) : (
                          <StoryblokComponent blok={component} {...rest} />
                        )}
                      </Box>
                    );
                  },
                )}
              </>
            ),
            PanelProps: { p: 0 },
          },
        };
      },
    );

  return (
    <Reveal>
      <Tabs
        isLazy
        variant="enclosed"
        tabListProps={{
          border: 'none',
          justifyContent: [
            blok?.alignMobile || 'flex-start',
            blok?.alignMobile || 'flex-start',
            blok?.alignDesktop || 'center',
          ],
          gap: 6,
          py: 4,
          paddingBottom: [0, 0, 4],
          mb: ['32px', '32px', '24px'],
          flexWrap: 'wrap',
          ...tabListProps,
        }}
        tabs={tabs}
        tabListWrapperProps={{
          width: 'full',
          overflowX: { base: 'auto', md: 'unset' },
          overflowY: 'clip',
          ...tabListWrapperProps,
        }}
      />
    </Reveal>
  );
}
