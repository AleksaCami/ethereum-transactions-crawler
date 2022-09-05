import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  useToast
} from '@chakra-ui/react';
import axios from 'axios';

// Constants
import { ETHERSCAN_API_KEY } from '../config/apikey';

// Utils
import { isEmpty } from '../utils/general.utils';

function HomePage() {
  const [walletAddress, setWalletAddress] = useState('');
  const [accBallanceAddress, setAccBalanceAddress] = useState('');
  const [startBlock, setStartBlock] = useState('');
  const [endBlock, setEndBlock] = useState('');
  const [defaultEndBlock, setDefaltEndBlock] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

  const toast = useToast();
  const history = useHistory();

  const searchTransactions = (event) => {
    event.preventDefault();
    let startBlockParam = startBlock;
    let endBlockParam = endBlock;

    if (isEmpty(startBlock)) {
      startBlockParam = 0;
    }
    if (isEmpty(endBlock)) {
      endBlockParam = defaultEndBlock;
    }

    history.replace(`/transactions/${walletAddress}/${startBlockParam}/${endBlockParam}`);
    // Nesto zeza hash router, morao sam da premostim ovako :)
    window.location.reload();
  }

  const checkAccountBalance = async (event) => {
    event.preventDefault();

    if (isEmpty(selectedDate)) {
      return toast({
        title: 'Please select date and time',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top'
      });
    }
    const formattedTimestamp = new Date(selectedDate).getTime() / 1000;

    const response = await axios.get(
      "https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=" +
      formattedTimestamp +
      "&closest=before&apikey=" +
      ETHERSCAN_API_KEY
    );

    let startBlockParam = 0;
    let endBlockParam = defaultEndBlock;

    history.replace(`/balance/${accBallanceAddress}/${startBlockParam}/${endBlockParam}`);
    // Nesto zeza hash router, morao sam da premostim ovako :)
    window.location.reload();
  }


  /**
   * Returns end block for the current time.
   * Sets end block to state.
   */
  const getEndBlock = async () => {
    const formattedTimestamp = Math.floor(Date.now() / 1000);

    const response = await axios.get(
      "https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=" +
      formattedTimestamp +
      "&closest=before&apikey=" +
      ETHERSCAN_API_KEY
    );

    setDefaltEndBlock(response.data.result);
  }

  useEffect(() => {
    getEndBlock()
  }, []);

  return (
    <Flex
      marginTop={'200px'}
      alignItems={'center'}
      justifyContent={'center'}
      flexDir={'column'}
    >
      <Center width={'100%'}>
        <Box width={'100%'} margin={'100px'}>
          <Heading fontSize={'2xl'} as='h2' size='1xl' noOfLines={1} marginBottom={'10px'}>Transactions Crawler</Heading>
          <form onSubmit={(e) => searchTransactions(e)}>
            <Flex gap={'20px'} marginBottom={'15px'} alignItems={'center'}>
              <InputGroup maxWidth={"620px"} size='xl' padding={'4px'}>
                <Input
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.currentTarget.value)}
                  padding={'0 0 0 15px'} borderRadius={'6px'}
                  minWidth={'525px'}
                  placeholder='Search wallet address'
                  type={'text'}
                  required
                  _placeholder={{ color: '#b6bbc2' }}
                />
                <InputRightAddon borderRadius={'0 4px 4px 0'} color={'blackAlpha.700'} children={<Button type='submit'>Search</Button>} />
              </InputGroup>
              <Input
                value={startBlock}
                onChange={(e) => setStartBlock(e.currentTarget.value)}
                maxWidth={"480px"}
                placeholder='Start block (optional)'
                type={'text'}
                _placeholder={{ color: '#b6bbc2' }}
              />
              <Input
                value={endBlock}
                onChange={(e) => setEndBlock(e.currentTarget.value)}
                maxWidth={"480px"}
                placeholder='End block (optional)'
                type={'text'}
                _placeholder={{ color: '#b6bbc2' }}
              />
            </Flex>
          </form>
          <Heading fontSize={'2xl'} as='h2' size='1xl' noOfLines={1} marginBottom={'10px'}>Check Account Balance</Heading>
          <form onSubmit={(e) => checkAccountBalance(e)}>
            <Flex gap={'20px'} alignItems={'center'}>
              <InputGroup maxWidth={"620px"} size='xl' padding={'4px'}>
                <Input
                  value={accBallanceAddress}
                  onChange={(e) => setAccBalanceAddress(e.currentTarget.value)}
                  padding={'0 0 0 15px'}
                  borderRadius={'6px'}
                  minWidth={'525px'}
                  placeholder='Search wallet address'
                  type={'text'}
                  required
                  _placeholder={{ color: '#b6bbc2' }}
                />
                <InputRightAddon borderRadius={'0 4px 4px 0'} color={'blackAlpha.700'} children={<Button type='submit'>Search</Button>} />
              </InputGroup>
              <Input
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.currentTarget.value)}
                maxWidth={"480px"}
                type="datetime-local"
                placeholder='Select date'
                _placeholder={{ color: '#b6bbc2' }}
              />
            </Flex>
          </form>
        </Box>
      </Center>
    </Flex>
  );
}

export default HomePage;