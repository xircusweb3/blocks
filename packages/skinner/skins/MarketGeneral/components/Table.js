import { 
  TableContainer, Table, Thead, Tr, Th, Td, Tbody, Skeleton, HStack,
  useColorModeValue as mode,
} from '@chakra-ui/react'

export const CustomTable = ({ fields = [], rows = [], isLoading, loaderRows = 4, loaderHeight = 24, hoverStyle, rowStyle, onRowClick, placeholder = 'No Data Yet', ...rest }) => (
  <TableContainer borderWidth={1} borderRadius="md" borderColor={mode('gray.100', 'gray.900')}>
    <Table variant="unstyled" {...rest}>
      <Thead>
        <Tr color="gray.500" bg={mode('#fcfcfc', '#0c0c0c')} >
          {
            fields.map(f => <Th py={2} key={f.key} {...f.sx}>{f.label}</Th>)
          }
        </Tr>
      </Thead>
      <Tbody fontSize="sm">
        {
          isLoading 
          ? Array.from(Array(loaderRows)).map((tr, trKey) => <Tr key={trKey}>{fields.map((f, fKey) => <Td key={fKey}><Skeleton key={f.key} height={`${loaderHeight}px`} /></Td>)}</Tr>)
          : rows.map((row, rowId) => (
            <Tr key={rowId} _hover={hoverStyle} onClick={() => onRowClick && onRowClick(row, rowId)} {...rowStyle}>
              { 
                fields.map((field, fieldId) => 
                  <Td key={`${rowId}-${fieldId}`} {...field.style}>
                    {field.render ? field.render(row, rowId) : row[field.key]}
                  </Td>
                )
              }
            </Tr>
          ))
        }
        {
          (
            rows.length == 0 && isLoading === false) && (
              <Tr>
                <Td color="gray.500" textAlign="center" colSpan={fields.length}>
                    {
                      (typeof placeholder == 'string') 
                      ? placeholder 
                      : placeholder(fields, rows, isLoading)
                    }
                </Td> 
              </Tr>
          )
        }
      </Tbody>
    </Table>
  </TableContainer>  
)