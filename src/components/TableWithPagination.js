import { useState } from "react";
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
  View,
  Slider,
  Text,
} from "@adobe/react-spectrum";

export default function TableWithPagination({ itemsList }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return itemsList?.items?.slice(startIndex, endIndex);
  };

  return (
    <Flex justifyContent={"center"} direction="column" maxHeight={"100vh"}>
      <TableView
        flex
        density="spacious"
        aria-label="Student list with sorting by name"
        sortDescriptor={itemsList?.sortDescriptor}
        onSortChange={itemsList?.sort}
        selectionStyle="highlight"
        minHeight={"88vh"}
        maxHeight={"100vh"}
        maxWidth={"99%"}
        onAction={(key) => alert(`Opening item ${key}...`)}
      >
        <TableHeader>
          <Column align="start" key="student_name" allowsSorting>
            Student name
          </Column>
          <Column key="course_name">Course name</Column>
          <Column key="lesson_name">Lesson name</Column>
          <Column align="end" key="progress">
            Progress
          </Column>
        </TableHeader>
        <TableBody
          items={getPaginatedData()}
          loadingState={itemsList?.loadingState}
        >
          {(item) => (
            <Row key={item.id}>
              {(columnKey) => <Cell>{item[columnKey]}</Cell>}
            </Row>
          )}
        </TableBody>
      </TableView>
      <Flex
        maxHeight={"12vh"}
        direction={"row"}
        justifyContent="space-between"
        alignItems={"center"}
        margin={10}
      >
        <View
          borderRadius={"large"}
          marginStart={10}
          padding={10}
          backgroundColor={"gray-300"}
        >
          <Slider
            isFilled
            step={10}
            maxValue={50}
            label="Items per page"
            value={itemsPerPage}
            onChange={(value) => {
              setItemsPerPage(value);
              setCurrentPage(1);
            }}
          />
        </View>
        <ButtonGroup flex align="center">
          <Button
            variant="primary"
            style="fill"
            onPress={() => setCurrentPage(currentPage - 1)}
            isDisabled={currentPage === 1}
          >
            Previous
          </Button>
          <Flex
            marginX={15}
            justifyContent={"center"}
            alignItems={"center"}
            width={"size-400"}
            height={"size-400"}
          >
            <Text>{currentPage}</Text>
          </Flex>
          <Button
            variant="primary"
            style="fill"
            onPress={() => setCurrentPage(currentPage + 1)}
            isDisabled={
              currentPage === Math.ceil(itemsList?.items?.length / itemsPerPage)
            }
          >
            Next
          </Button>
        </ButtonGroup>
        <View
          borderRadius={"large"}
          padding={10}
          maxHeight={30}
          marginEnd={10}
          backgroundColor={"gray-300"}
        >
          {(currentPage - 1) * itemsPerPage + getPaginatedData()?.length} /
          {itemsList?.items?.length}
        </View>
      </Flex>
    </Flex>
  );
}
