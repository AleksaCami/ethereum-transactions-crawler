import { React } from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  useColorModeValue,
  Image,
  Heading,
  Divider
} from '@chakra-ui/react';

const Links = ['Home'];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'/'}>
    {children}
  </Link>
);

export default function NavMenu() {
  return (
    <Box marginLeft={10} marginRight>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <HStack spacing={8} alignItems={'center'}>
          <Flex flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
            <Link href={'/'}>
              <Image
                boxSize='50px'
                src='/ethereum_logo.svg'
                alt='Ethereum logo'
              />
            </Link>
            <Heading as='h1' size='1xl' noOfLines={1}>Ethereum Transactions Crawler</Heading>
          </Flex>
          <Divider orientation='vertical' color={'whiteAlpha.800'} borderTop={'2px'} height={'30px'} />
          <HStack
            as={'nav'}
            spacing={4}
            display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </HStack>
        </HStack>
      </Flex>
    </Box>
  );
}