import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import getStatusColor from '@/helpers/getStatusColor';
import { InvitationsTypes } from '@/types/invitations';

export default function YourInvitations(props: {
  invitationsData: InvitationsTypes[];
  columnHeading: InvitationsTypes[];
}) {
  const columnName = props.columnHeading;
  return (
    <>
      {props.invitationsData.map((invitation: InvitationsTypes, index) => (
        <Flex
          key={index}
          p={4}
          mb="0.5"
          gap={6}
          fontSize="sm"
          bg={index % 2 === 0 ? 'gray.800' : 'gray.850'}
          borderRadius="sm"
          direction="column"
        >
          <Text textAlign="center">{invitation.createdDate}</Text>
          <Flex justifyContent="space-between">
            <Text color="gray.500">{columnName[1].name}</Text>
            <Text>
              {invitation.firstName} {invitation.lastName}
            </Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text color="gray.500">{columnName[2].name}</Text>
            <Text>{invitation.emailAddress}</Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text color="gray.500">{columnName[3].name}</Text>
            <Text
              py="2px"
              px="10px"
              bg={getStatusColor(invitation?.status)}
              color="gray.900"
              borderRadius="md"
              fontWeight="medium"
            >
              {invitation.status}
            </Text>
          </Flex>
        </Flex>
      ))}
    </>
  );
}
