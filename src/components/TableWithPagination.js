import { useState, useEffect } from "react";
import {
  Column,
  TableView,
  TableBody,
  TableHeader,
  Row,
  Cell,
  ButtonGroup,
  Button,
  Flex,
} from "@adobe/react-spectrum";

export default function TableWithPagination({ itemsList }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return itemsList?.items.slice(startIndex, endIndex);
  };

  return (
    <Flex justifyContent={"center"} direction="column">
      <TableView
        flex
        density="spacious"
        aria-label="Student list with sorting by name"
        sortDescriptor={itemsList.sortDescriptor}
        onSortChange={itemsList.sort}
      >
        <TableHeader>
          <Column align="start" key="student_name" allowsSorting>
            Student name
          </Column>
          <Column key="course_name">
            Course name
          </Column>
          <Column key="lesson_name">
            Lesson name
          </Column>
          <Column align="end" key="progress">
            Progress
          </Column>
        </TableHeader>
        <TableBody
          items={getPaginatedData()}
          loadingState={itemsList.loadingState}
        >
          {(item) => (
            <Row key={item.id}>
              {(columnKey) => <Cell>{item[columnKey]}</Cell>}
            </Row>
          )}
        </TableBody>
      </TableView>

      <ButtonGroup margin={20} align="center">
        <Button
          variant="primary"
          staticColor="black"
          style="fill"
          onPress={() => setCurrentPage(currentPage - 1)}
          isDisabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="primary"
          staticColor="black"
          style="fill"
          onPress={() => setCurrentPage(currentPage + 1)}
          isDisabled={
            currentPage === Math.ceil(itemsList.items.length / itemsPerPage)
          }
        >
          Next
        </Button>
      </ButtonGroup>
    </Flex>
  );
}
