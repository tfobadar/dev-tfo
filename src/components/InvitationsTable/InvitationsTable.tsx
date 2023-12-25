import React, { useEffect, useState } from 'react';
import { Reveal } from '@/animations/Reveal';
import {
  Container,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react';
import { MAX_CONTAINER_WIDTH } from '@/constants/globals';
import { StoryblokComponentProps } from '@/types/component';
import { SbBlokData, StoryblokComponent } from '@storyblok/react';
import YourInvitations from '../subcomponents/Cards/YourInvitations';
import api from '@/helpers/getAxiosInstance';
import getStatusColor from '@/helpers/getStatusColor';
import { InvitationsTypes } from '@/types/invitations';
import { GET_REFERRAL_INVITATIONS } from '@/components/Forms/constants';
import Loader from '../subcomponents/Spinner/Loader';
import { getMaskedEmail } from '@/helpers/getMaskEmail';
import getStatusArContent from '@/helpers/getStatusArContent';
import isEnglishLanguage from '@/helpers/isEnglishLanguage';
import { useRouter } from 'next/router';

export default function InvitationsTable({
  blok,
  queryParams,
}: StoryblokComponentProps) {
  const toast = useToast();
  const isMobileScreen = useBreakpointValue({ base: true, md: false });
  const [tableData, setTableData] = useState([]);
  const columnHeading = blok.columnHeading;
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        api.defaults.baseURL = process.env.NEXT_PUBLIC_REFERRAL_API_URL;
        const response = await api.get(
          `${GET_REFERRAL_INVITATIONS}${queryParams}`,
        );
        if (response) {
          setTableData(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        toast({
          title: 'Something went wrong.',
          status: 'error',
          duration: 5000,
        });
      }
    };
    fetchData();
  }, []);
  return (
    <Container maxWidth={MAX_CONTAINER_WIDTH}>
      <Reveal>
        <Loader isLoading={isLoading} bg={'gray.1000'} />
        {tableData.length ? (
          isMobileScreen ? (
            <YourInvitations
              invitationsData={tableData}
              columnHeading={columnHeading}
            />
          ) : (
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    {columnHeading.map(
                      (heading: { name: string }, index: number) => (
                        <Th
                          key={heading.name}
                          ps={index !== 0 ? 6 : '2'}
                          py="4"
                          border="0px"
                          fontSize="sm"
                          fontWeight="normal"
                          textTransform="inherit"
                        >
                          {heading.name}
                        </Th>
                      ),
                    )}
                  </Tr>
                </Thead>
                <Tbody>
                  {tableData.map((invitation: InvitationsTypes, index) => (
                    <Tr
                      key={index}
                      fontSize="sm"
                      borderBottom="3px solid"
                      borderColor="black"
                      bg={index % 2 === 0 ? 'gray.800' : 'gray.850'}
                    >
                      <Td>{invitation.createdDate}</Td>
                      <Td>
                        {invitation.firstName} {invitation.lastName}
                      </Td>
                      <Td>{getMaskedEmail(invitation.emailAddress)}</Td>
                      <Td>
                        <Text
                          borderRadius="md"
                          color="black"
                          py="3px"
                          px="12px"
                          fontSize="xs"
                          fontWeight="medium"
                          display="inherit"
                          bg={getStatusColor(invitation.status)}
                        >
                          {isEnglishLanguage(router.locale)
                            ? invitation.status
                            : getStatusArContent(invitation.status)}
                        </Text>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )
        ) : blok.defaultComponents ? (
          blok.defaultComponents.map((blok: SbBlokData) => (
            <StoryblokComponent
              blok={blok}
              key={blok._uid}
              queryParams={queryParams}
            />
          ))
        ) : null}
      </Reveal>
    </Container>
  );
}
