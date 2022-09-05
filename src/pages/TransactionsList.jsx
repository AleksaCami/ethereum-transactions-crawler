import React, { useEffect, useState } from 'react'
import axios from 'axios';

// Components
import { Box, Center, Flex, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import Pagination from 'react-pagination-js';
import "react-pagination-js/dist/styles.css"; // import css

// Constants
import { ETHERSCAN_API_KEY } from '../config/apikey';
import { ETH_DECIMAL_DIVIDER } from '../constants/app.constants';

// Utils
import { formatTimestampToDate } from '../utils/general.utils';

function TransactionsList({ match }) {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);

  /**
   * Returns ETH transaction data.
   * Sets transaction list to state.
   */
  const getTransactionData = async () => {
    const response = await axios.get(
      "https://api.etherscan.io/api?module=account&action=txlist&address=" +
      match.params.address +
      "&startblock=" +
      match.params.startBlock +
      "&endblock=" +
      match.params.endBlock +
      "&page=" +
      page +
      "&sort=asc&offset=10&apikey=" +
      ETHERSCAN_API_KEY
    );

    setTransactions(response.data.result);
  }

  useEffect(() => {
    getTransactionData();
  }, [page]);

  return (
    <>
      <Box>
        <Flex marginLeft={'0'} marginTop={'50px'} marginBottom={'30px'}>
          <Heading color={'white.700'} fontSize={'2xl'} as='h2' size='1xl' noOfLines={1} marginBottom={'10px'}>
            Current Contract: {match.params.address}
          </Heading>
        </Flex>

        <Center py={8}>
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
            <TableContainer>
              <Table variant='simple' colorScheme='whiteAlpha'>
                <Thead>
                  <Tr>
                    <Th color={'black'}>Block Hash</Th>
                    <Th color={'black'}>Timestamp</Th>
                    <Th color={'black'}>Block No.</Th>
                    <Th color={'black'}>ETH</Th>
                    <Th color={'black'}>From</Th>
                    <Th color={'black'}>To</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {transactions.map(
                    ({
                      blockHash,
                      blockNumber,
                      timeStamp,
                      from,
                      value,
                      to
                    }, idx) => (
                      <Tr key={idx}>
                        <Td color={'black'}>{blockHash}</Td>
                        <Td color={'black'}>{formatTimestampToDate(timeStamp)}</Td>
                        <Td color={'black'}>{blockNumber}</Td>
                        <Td color={'black'}>{value / ETH_DECIMAL_DIVIDER}</Td>
                        <Td color={'black'}>{from}</Td>
                        <Td color={'black'}>{to}</Td>
                      </Tr>
                    )
                  )}
                </Tbody>
              </Table>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 10
                }}
              >
                <Pagination
                  currentPage={page}
                  totalSize={10000}
                  sizePerPage={10}
                  changeCurrentPage={page => setPage(page)}
                  theme="border-bottom"
                />
              </div>
            </TableContainer>
          </Box>
        </Center>
      </Box>
    </>
  )
}

export default TransactionsList;
