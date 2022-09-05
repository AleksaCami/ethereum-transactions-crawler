import React, { useState, useEffect } from 'react'
import axios from 'axios';

// Components
import { Box, Flex, useColorModeValue, Text, Heading } from '@chakra-ui/react';

// Constants
import { ETHERSCAN_API_KEY } from '../config/apikey';
import { ETH_DECIMAL_DIVIDER } from '../constants/app.constants';

const Balance = ({ match }) => {
  const [balance, setBalance] = useState(0);
  const [finalBalance, setFinalBalance] = useState(0);

  const calculateBalanceForAddress = async () => {
    const response = await axios.get(
      "https://api.etherscan.io/api?action=balance&address=" +
      match.params.address +
      "&tag=latest&module=account&apikey=" +
      ETHERSCAN_API_KEY
    );

    let calculatedBalance = response.data.result / ETH_DECIMAL_DIVIDER;
    setBalance(calculatedBalance);

    const status = true;
    let page = 1;
    for (page; status === true; page++) {
      const response = await axios.get(
        "https://api.etherscan.io/api?module=account&action=txlist&address=" +
        match.params.address +
        "&startblock=" +
        match.params.startBlock +
        "&endblock=" +
        match.params.endBlock +
        "&page=" +
        page +
        "&sort=asc&offset=100&apikey=" +
        ETHERSCAN_API_KEY
      );
      console.log(response);

      if (response.data.status === '1') {
        const transactions = response.data.result;

        for (const transaction of transactions) {
          if (transaction.from === match.params.address) {
            let balance = finalBalance + transaction.value / ETH_DECIMAL_DIVIDER
              + (transaction.gasPrice / ETH_DECIMAL_DIVIDER) * transaction.gasUsed;

            setFinalBalance(balance);
          }

          if (transaction.to === match.params.address) {
            let balance = finalBalance - transaction.value / ETH_DECIMAL_DIVIDER
              + (transaction.gasPrice / ETH_DECIMAL_DIVIDER) * transaction.gasUsed;

            setFinalBalance(balance)
          }
        }
      }
    }
  }

  useEffect(() => {
    calculateBalanceForAddress();
  }, [])

  return (
    <Box py={'80px'}>
      <Flex gap={'50px'}>
        <Box
          role={'group'}
          p={6}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}
        >
          <Heading paddingBottom={'15px'} size='lg' color={'gray.800'}>Current Contract</Heading>
          <Text color={'gray.800'} fontSize='2xl'>Balance: {balance} ETH</Text>
        </Box>
        <Box
          role={'group'}
          p={6}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}
        >
          <Heading paddingBottom={'15px'} size='lg' color={'gray.800'}>Amount</Heading>
          <Text color={'gray.800'} fontSize='2xl'>At Selected Time and Date: {finalBalance} ETH</Text>
        </Box>
        <Box
          role={'group'}
          p={6}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}
        >
          <Heading paddingBottom={'15px'} size='lg' color={'gray.800'}>Change</Heading>
          <Text color={'gray.800'} fontSize='2xl'>Difference: {balance - finalBalance} ETH</Text>
        </Box>
      </Flex>
    </Box>
  )
}

export default Balance;
